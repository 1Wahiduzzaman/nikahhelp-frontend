export default {
    supportComponent(state) {
        return state.supportComponent;
    },

    getTicketFromUsers(state) {
        return state.ticketFromUsers.map(item => {
           item.user = JSON.parse(item.user);
           return item;
        }).reverse().sort((a, b) => {
            return a.resolve > b.resolve ? -1 : 1 ;
        });
    },

    currentTicket(state) {
        return state.currentTicket;
    }
};
