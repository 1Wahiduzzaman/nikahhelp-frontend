
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
    }
}