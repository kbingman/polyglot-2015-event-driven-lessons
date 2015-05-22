import $ from 'jquery';

var AppState = {

    state: {
        records: []
    },

    updateState: function(e, data) {
        state.records = data.response.data || state.records;
        state.query = data.query;
        
        $(document).trigger('app:change', state);
    },

    initialize: function() {
        $(document).on('app:updateState', updateState);
    }

}

export { AppState }
