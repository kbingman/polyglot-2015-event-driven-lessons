import $ from 'jquery';
import _ from 'lodash';
import { EventEmitter } from 'events';

import { AppDispatcher } from './app_dispatcher';

var _state = {
    records: [],
    query: undefined,
}

function _setStateQuery(payload) {
    _state.query = payload.query;
}

function _setStateRecords(payload) {
    _state.records = payload.response.data;
}

var CHANGE_EVENT = 'change';

var instagramStore = {
    emitChange: function(){
        $(document).trigger(CHANGE_EVENT);
    },

    addChangeListener: function(callback){
        $(document).on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
        $(document).off(CHANGE_EVENT, callback);
    },

    getState: function() {
        return _state;
    },

    dispatcherIndex: AppDispatcher.register(function(payload){
        switch(payload.actionType) {
            case 'UPDATE_QUERY':
                _setStateQuery(payload);
                break;
            case 'UPDATE_RECORDS':
                _setStateRecords(payload);
                break;
            default:
                return true;
        }

        instagramStore.emitChange();
        return true;
    })
};

export { instagramStore }
