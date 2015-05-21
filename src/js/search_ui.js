import $ from 'jquery';
import { instagramStore } from './instagram_store';
import { actionCreator } from './action_creator';

var SearchUI = {
    listenForQuery: function(e) {
        e.preventDefault();
        var query = $(e.target).find('[name=query]').val();
        query = query.replace(/\s/g, '');

        actionCreator.search(query);
    },

    renderResults: function() {
        var state = instagramStore.getState();
        var html = state.records.map(function(record) {
            var $div = $('<div></div>');
            var $img = $('<img src=' + record.images.thumbnail.url + '>');

            return $div.addClass('thumbnail').html($img);
        });
        $('[data-results]').html(html);
    },

    initialize: function() {
        $('[data-search]').on('submit', this.listenForQuery);

        // Sets up store to render on change
        instagramStore.addChangeListener(this.renderResults.bind(this));
    }
}

export { SearchUI }
