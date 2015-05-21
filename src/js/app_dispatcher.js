import _ from 'lodash';
import { Dispatcher } from './dispatcher';

var AppDispatcher = _.extend(Dispatcher.prototype, {

    handleViewAction: function(action){
        this.dispatch(action);
    }

});

export { AppDispatcher }
