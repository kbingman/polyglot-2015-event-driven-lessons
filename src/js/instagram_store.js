import $ from 'jquery';
import DeLorean from 'delorean';

var instagramstore = DeLorean.Flux.createStore({

    records: [],

    query: undefined,

    actions: {
        updateQuery: 'updateQuery',
        updateInstagramRecords: 'updateInstagramRecords'
    },

    updateQuery: function(query) {
        query = query.replace(/\s/g, '');

        if (this.query != query) {
            this.state.records = [];
            this.state.query = query;
        }
    },

    updateInstagramRecords: function(data) {
        console.log('update', +new Date());
        this.state.records = this.records.concat(data.data);

        if (data.pagination) {
            this.state.maxID = data.pagination.next_max_tag_id;
            this.state.minID = data.pagination.min_tag_id;
        }
        // this.emit('app:change');
        $(document).trigger('app:change', this.state);
    },

    getState: function() {
        return this.state
    }

});

export { instagramstore }
