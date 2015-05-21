import { SearchAPI } from './search_api';
import { instagramstore } from './instagram_store';
import { AppDispatcher } from './app_dispatcher';

var actionCreator = {

    search: function (query) {
        Dispatcher.searchInstagram(query);
        SearchAPI.searchInstagram(query)
            .done(actionCreator.receiveInstagramData)
            .error(actionCreator.handleAPIError);
    },

    getNextPage: function(query, maxID) {
        SearchAPI.searchInstagram(query, maxID)
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
