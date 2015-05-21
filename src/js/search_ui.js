import $ from 'jquery';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

import { instagramStore } from './instagram_store';
import { actionCreator } from './action_creator';

var _vDOM = 'test';

var SearchUI = {
    listenForQuery: function(e) {
        e.preventDefault();
        var query = $(e.target).find('[name=query]').val();
        query = query.replace(/\s/g, '');

        actionCreator.search(query);
    },

    render: function(state) {
        var vDOM = [
            [h('h2', {id: 'title'}, state.query)],
            []
        ];

        return h('div', { id: 'results' }, [
            h('h2', { id: 'title' }, state.query),
            h('div', {}, state.records.map(function (record) {
                return h('div', { className: 'thumbnail' },
                    h('img', { src: record.images.thumbnail.url })
                );
            }))
        ]);
    },

    updateUI: function() {
        var state = instagramStore.getState();
        var vTree = this.render(state);

        // diffing goes here

        $('#results').replaceWith(createElement(vTree));
    },

    initialize: function() {
        $('[data-search]').on('submit', this.listenForQuery);

        // Sets up store to render on change
        instagramStore.addChangeListener(this.updateUI.bind(this));
    }
}

export { SearchUI }
