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
            this.records = [];
            this.query = query;
        }
    },

    updateInstagramRecords: function(data) {
        console.log('update', +new Date());
        this.records = this.records.concat(data.data);

        if (data.pagination) {
            this.maxID = data.pagination.next_max_tag_id;
            this.minID = data.pagination.min_tag_id;
        }
        // this.emit('app:change');
        $(document).trigger('app:change');
    }

});

export { instagramstore }
