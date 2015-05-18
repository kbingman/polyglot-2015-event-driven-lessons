'use strict'

// UI - Interaction handlers
$('[data-search]').on('submit', listenForQuery);

// API - Application Events
$(document).on('instagram:results', renderResults);
$(document).on('instagram:search', searchInstagram);

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
    };
};

function searchInstagram(e, data) {
    var options = getAjaxOptions(data.query);

    return $.ajax(options)
        .done(function(response) {
            $(document).trigger('instagram:results', response);
        })
        .error(function(response) {
            console.log(response);
        });
}
