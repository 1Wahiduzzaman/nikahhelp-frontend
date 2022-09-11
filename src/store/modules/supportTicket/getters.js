
export default {
    getTickets(state) {
        return state.ticketList;
    },

    viewingTicket(state) {
        return state.ticket;
    },

    listOfMessages(state) {
        return state.ticketMessages.map((mesage) => {
            return {...mesage, user: JSON.parse(mesage.user)};
        });
    },

    supportHasError(state) {
        return state.supportError;
    },

    getUserTickets(state) {
        return state.userTickets;
    },

    currentTicketComponents(state) {
        return state.ticketsComponents;
    },

    getUserTicket(state) {
       return state.userTicket;
    },

    ticketMessages(state, payload) {
       return state.userTicketMessages;
    }
}