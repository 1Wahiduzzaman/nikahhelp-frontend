import ApiService from "@/services/api.service";


export default {
    getSelectedTickets(context, payload) {
        context.commit('selectedTickets', payload);
    },

    viewSingleTicket(context, payload) {
        context.commit('viewTicket', payload);
    },

    getSupportMessages(context, payload) {
        ApiService.get(`/v1/admin/getAllTicketMessages/${payload}`)
            .then((data) => {
                context.commit('ticketMessages', data.data.data);
                context.commit('error', false);
            }).catch((err) => {
            console.log(err);
            context.commit('error', true);
        })
    },

    submitTicketRequests(context, payload) {
        ApiService.post('/v1/admin/submitTicketRequests', {
            message: payload.message,
            ticket_id: payload.ticket_id,
            user: payload.user
        }).then((data) => {
            context.dispatch('getSupportMessages', payload.ticket_id);

        });
    },

    getMyTickets(context, payload) {
        ApiService.get(`/v1/getAllTickets/${payload}`)
            .then((data) => {
                context.commit('getMyTickets', data.data.data);
            })
    }
}