import $ from 'jquery';
import { searchInstagram } from './api';

// UI - Interaction handlers
$('[data-search]').on('submit', listenForQuery);

// API - Application Events
$(document).on('app:change', renderResults);
$(document).on('app:updateState', updateState);
$(document).on('instagram:search', searchInstagram);

var state = {
    records: []
};

function updateState(e, data) {
    console.log('updateState', +new Date());
    state.records = data.response.data || state.records;
    state.query = data.query;
    state.maxID = data.response.pagination.next_max_tag_id;
    state.minID = data.response.pagination.min_tag_id;

    $(document).trigger('app:change', state);
}

function listenForQuery(e) {
    e.preventDefault();
    var query = $(e.target).find('[name=query]').val();
    query = query.replace(/\s/g, '');

    $(document).trigger('instagram:search', { query: query });
}

function renderResults(e, state) {
    console.log('renderResults', +new Date());
    var html = state.records.map(function(record) {
        var $div = $('<div></div>');
        var $img = $('<img src=' + record.images.thumbnail.url + '>');

        return $div.addClass('thumbnail').html($img);
    });
    $('[data-results]').html(html);
}
