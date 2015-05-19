import $ from 'jquery';

var SearchAPI = {

    getAjaxOptions: function(query) {
        var url = 'https://api.instagram.com/v1/tags/' + query + '/media/recent';
        return {
            url: url,
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                client_id: API_KEY
            },
        }
    },

    searchInstagram: function(e, data) {
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
    },

    initialize: function() {
        $(document).on('instagram:search', this.searchInstagram);
    }
}

export { SearchAPI }
