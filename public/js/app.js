'use strict'

// UI - Interaction handlers
$('[data-search]').on('submit', listenForQuery);

// API - Application Events
$(document).on('app:change', renderResults);
$(document).on('instagram:search', searchInstagram);

var state = {
    query: undefined,
    records: []
};

function updateState(data) {
    state.records = data.response.data || state.records;
    state.query = data.query || state.query;

    $(document).trigger('app:change', state);
}

function listenForQuery(e) {
    e.preventDefault();
    var query = $(e.target).find('[name=query]').val();
    query = query.replace(/\s/g, '');

    $(document).trigger('instagram:search', { query: query });
}

function renderResults(e, state) {
    var html = state.records.map(function(record) {
        var item = '<img data-id="' + record.id + '" src=' + record.images.thumbnail.url + '>';

        return '<div class="thumbnail">' + item + '</div>';
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
    var options = getAjaxOptions(data.query);

    return $.ajax(options)
        .done(function(response) {
            console.log('ajax', +new Date());
            updateState({
                query: data.query,
                response: response
            });
        })
        .error(function(response) {
            console.log(response);
        });
}
