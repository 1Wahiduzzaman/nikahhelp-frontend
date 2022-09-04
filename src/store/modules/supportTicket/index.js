import actions from './actions';
import mutations from  './mutations';
import getters from './getters';

export default {
    state() {
        return {
            ticketList: [],
            ticket: {},
            ticketMessages: [],
            supportError: false,
        }
    },

    actions,
    mutations,
    getters,
}