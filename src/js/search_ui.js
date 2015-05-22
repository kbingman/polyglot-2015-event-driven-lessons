import $ from 'jquery';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

import { instagramStore } from './instagram_store';
import { actionCreator } from './action_creator';

var _vTree;

var SearchUI = {
    /**
     * Calls the Search Action with the current query
     */
    listenForQuery: function(e) {
        e.preventDefault();
        var query = $(e.target).find('[name=query]').val();
        query = query.replace(/\s/g, '');

        actionCreator.search(query);
    },

    showRecord: function(e) {
        console.log(record);
    },

    /**
     * This is a little verbose and in a real app would probably
     * be replaced with JSX, but it shows how the virtual DOM is
     * built up and can be easily diffed.
     * In addition, this is a pure function, which just transforms
     * the state into a virtual DOM tree.
     */
    render: function(state) {
        return h('div#results.results', [
            h('h2#title', state.query || 'No Results'),
            h('ul', state.records.map(function (record) {
                return h('li.thumbnail',
                    { onclick:  function(e) {
                        console.log(record);
                    }},
                    h('img', {
                        src: record.images.thumbnail.url,
                        dataset: { id: record.id },
                        onclick: function(e) { console.log(record) }
                    })
                );
            }))
        ]);
    },

    /**
     * This does the actual diffing and updating
     */
    updateUI: function() {
        var state = instagramStore.getState();
        var newTree = this.render(state);
        var patches = diff(_vTree, newTree);

        this.node = patch(this.node, patches);
        _vTree = newTree;
    },

    /**
     * Sets up the UI Event Listeners
     * and the the Store to render on change
     */
    initialize: function() {
        // Get initial state and
        var state = instagramStore.getState();
        _vTree = this.render(state);
        this.node = createElement(_vTree);

        $('#results').replaceWith($(this.node));

        // Bind Events
        $('[data-search]').on('submit', this.listenForQuery);

        instagramStore.addChangeListener(this.updateUI.bind(this));
    }
}

export { SearchUI }
