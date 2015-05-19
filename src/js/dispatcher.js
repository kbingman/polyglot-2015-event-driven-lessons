import DeLorean from 'delorean';
import { instagramstore } from './instagram_store';

var Dispatcher = DeLorean.Flux.createDispatcher({

    searchInstagram: function (query) {
        this.dispatch('updateQuery', query);
    },

    updateInstagramRecords: function (data) {
        this.dispatch('updateInstagramRecords', data);
    },

    getStores: function () {
        return {
            instagramstore: instagramstore
        };
    }

});

export { Dispatcher }
