import $ from 'jquery';

var BASE_API = 'https://api.instagram.com/v1';

var SearchAPI = {

    /**
     * This is a utils function, used by the Actions to communicate with
     * our API
     */
    searchInstagram: function(query) {
        var url = BASE_API + '/tags/' + query + '/media/recent';
        var options = this.getAjaxOptions(url);

        return $.ajax(options);
    },

    getAjaxOptions: function(url) {
        return {
            url: url,
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {
                client_id: API_KEY
            },
        }
    }

}

export { SearchAPI }
