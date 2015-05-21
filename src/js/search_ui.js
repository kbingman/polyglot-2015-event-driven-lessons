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

    render: function(state) {
        var title = '<h2>Results for ' + state.query + '</h2>';
        var records = state.records.map(function(record) {
            var item = '<img src=' + record.images.thumbnail.url + '>';

            return '<div class="thumbnail">' + item + '</div>';
        });

        return title + records;
    },

    updateUI: function() {
        var state = instagramStore.getState();
        $('[data-results]').html(this.render(state));
    },

    initialize: function() {
        $('[data-search]').on('submit', this.listenForQuery);

        // Sets up store to render on change
        instagramStore.addChangeListener(this.updateUI.bind(this));
    }
}

export { SearchUI }
