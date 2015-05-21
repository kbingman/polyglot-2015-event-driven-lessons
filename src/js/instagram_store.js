import $ from 'jquery';
import _ from 'lodash';
import { EventEmitter } from 'events';

import { AppDispatcher } from './app_dispatcher';

// var instagramstore = DeLorean.Flux.createStore({
//
//
//
//     actions: {
//         updateQuery: 'updateQuery',
//         updateInstagramRecords: 'updateInstagramRecords'
//     },
//
//     updateQuery: function(query) {
//         query = query.replace(/\s/g, '');
//
//         if (this.query != query) {
//             this.state.records = [];
//             this.state.query = query;
//         }
//     },
//
//     updateInstagramRecords: function(data) {
//         console.log('update', +new Date());
//         this.state.records = this.records.concat(data.data);
//
//         if (data.pagination) {
//             this.state.maxID = data.pagination.next_max_tag_id;
//             this.state.minID = data.pagination.min_tag_id;
//         }
//         this.emit('app:change');
//     },
//
//     getState: function() {
//         return this.state
//     }
//
// });

var state = {
    records: [],
    query: undefined,
}

var instagramStore = _.extend(EventEmitter.prototype, {
    emitChange:function(){
        this.emit(CHANGE_EVENT);
    },

    addChangeListener:function(callback){
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener:function(callback){
        this.removeListener(CHANGE_EVENT, callback)
    },

    getState: function() {
        return _productData;
    },

    dispatcherIndex: AppDispatcher.register(function(payload){
        // switch(payload.action.actionType) {
        //     case 'PRODUCT_SEARCH_RESULTS':
        //         _paging = false;
        //         _parseResponseData(payload.action);
        //         break;
        //     case 'PRODUCT_SEARCH_PAGING':
        //         _paging = true;
        //         _parseResponseData(payload.action);
        //         break;
        //     default:
        //         return true;
        // }
        InstagramStore.emitChange();

        return true;
    })
});


export { instagramStore }
