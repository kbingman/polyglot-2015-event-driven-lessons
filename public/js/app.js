'use strict'
//
var API_KEY = 'cc4b947cbca8405fa1b56f7df01c3677';

// UI - Interaction handlers
$('[data-search]').on('submit', listenForQuery);

// API - Application Events
$(document).on('instagram:results', renderResults);
$(document).on('instagram:search', searchInstagram);

var state = {
    records: []
};

function updateState(data) {
    if (state.query == data.query) {
        state.records = state.records.concat(data.response.data);
    } else {
        state.records = data.response.data;
    }
    state.query = data.query;
    state.maxID = data.response.pagination.next_max_tag_id;
    state.minID = data.response.pagination.min_tag_id;
    $(document).trigger('change');
}

function listenForQuery(e) {
    e.preventDefault();
    var query = $(e.target).find('[name=query]').val();
    query = query.replace(/\s/g, '');

    $(document).trigger('instagram:search', { query: query });
}

function renderResults(e, response) {
    var html = response.data.map(function(record) {
        var $div = $('<div></div>');
        var $img = $('<img src=' + record.images.thumbnail.url + '>');

        return $div.addClass('thumbnail').html($img);
    });
    $('[data-results]').html(html);
}

function getAjaxOptions(query) {
    var url = 'https://api.instagram.com/v1/tags/' + query + '/media/recent';
    return {
        url: url,
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
            client_id: API_KEY
        },
    }
};

function searchInstagram(e, data) {
    return $.ajax(getAjaxOptions(data.query))
        .done(function(response) {
            updateState({
                query: data.query,
                response: response
            });
        })
        .error(function(response) {
            console.log(response);
        });
}
