import $ from 'jquery';

var AppState = {

    state: {
        records: []
    },

    updateState: function(e, data) {
        console.log('updateState', +new Date());
        state.records = data.response.data || state.records;
        state.query = data.query;
        state.maxID = data.response.pagination.next_max_tag_id;
        state.minID = data.response.pagination.min_tag_id;

        $(document).trigger('app:change', state);
    },

    initialize: function() {
        $(document).on('app:updateState', updateState);
    }

}

export { AppState }
