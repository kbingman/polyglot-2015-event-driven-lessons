import { SearchAPI } from './search_api';
import { instagramstore } from './instagram_store';
import { Dispatcher } from './dispatcher';

var actionCreator = {

    search: function (query) {
        Dispatcher.searchInstagram(query);
        SearchAPI.searchInstagram(instagramstore.query)
            .done(actionCreator.receiveInstagramData)
            .error(actionCreator.handleAPIError);
    },

    getNextPage: function() {
        SearchAPI.searchInstagram(instagramstore.query, instagramstore.maxID)
            .done(actionCreator.receiveInstagramData)
            .error(actionCreator.handleAPIError);
    },

    receiveInstagramData: function(data) {
        console.log(+new Date());
        Dispatcher.updateInstagramRecords(data);
    },

    handleAPIError: function(error) {
        console.log(error);
    }
};

export { actionCreator }
