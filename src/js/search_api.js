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

    searchInstagram: function(query) {
        var options = this.getAjaxOptions(query);

        return $.ajax(options);
    }

}

export { SearchAPI }
