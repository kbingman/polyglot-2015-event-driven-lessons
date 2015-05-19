import $ from 'jquery';
import { searchInstagram } from './search_api';


var SearchUI = {
    listenForQuery: function(e) {
        e.preventDefault();
        var query = $(e.target).find('[name=query]').val();
        query = query.replace(/\s/g, '');

        $(document).trigger('instagram:search', { query: query });
    },

    renderResults: function(e, state) {
        console.log('renderResults', +new Date());
        var html = state.records.map(function(record) {
            var $div = $('<div></div>');
            var $img = $('<img src=' + record.images.thumbnail.url + '>');

            return $div.addClass('thumbnail').html($img);
        });
        $('[data-results]').html(html);
    },

    initialize: function() {
        $('[data-search]').on('submit', this.listenForQuery);
        $(document).on('app:change', this.renderResults);
    }
}

export { SearchUI }
