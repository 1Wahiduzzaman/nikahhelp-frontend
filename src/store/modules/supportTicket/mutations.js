

export default {
    selectedTickets(state, payload) {
        state.ticketList = payload;
    },

    viewTicket(state, payload) {
        state.ticket = payload;
    },

    ticketMessages(state, payload) {
        state.ticketMessages = payload;
    },

    error(state, payload) {
        state.supportError = payload;
    },

    getMyTickets(state, payload) {
        state.userTickets = payload;
    }
};