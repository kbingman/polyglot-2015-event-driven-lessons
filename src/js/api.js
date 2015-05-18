import $ from 'jquery';

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
            $(document).trigger('app:updateState', {
                query: data.query,
                response: response
            });
        })
        .error(function(response) {
            console.log(response);
        });
}

export { searchInstagram }
