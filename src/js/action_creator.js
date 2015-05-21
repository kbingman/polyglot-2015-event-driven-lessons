import { SearchAPI } from './search_api';
import { instagramstore } from './instagram_store';
import { AppDispatcher } from './app_dispatcher';

var actionCreator = {

    search: function (query) {
        AppDispatcher.handleViewAction({
            actionType: 'UPDATE_QUERY',
            query: query
        });
        SearchAPI.searchInstagram(query)
            .done(actionCreator.receiveInstagramData)
            .error(actionCreator.handleAPIError);
    },

    receiveInstagramData: function(response) {
        AppDispatcher.handleViewAction({
            actionType: 'UPDATE_RECORDS',
            response: response
        });
    },

    handleAPIError: function(error) {
        // real error handling goes here
        console.log(error);
    }
};

export { actionCreator }
