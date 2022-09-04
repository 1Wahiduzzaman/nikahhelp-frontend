<template>
		<v-container>
			<v-card
					id="ticket-reporter"
					class="mx-auto"
					max-width="700"

			>
				<v-list-item v-for="user in users" :key="user.id">
					<reporter :reporter="user" @giveBackTicketList="recievedTickets"></reporter>
				</v-list-item>

				<v-list-item v-for="ticket in userTickets" :key="ticket.id">
					<ticket :ticket="ticket"></ticket>
				</v-list-item>
			</v-card>


		</v-container>
</template>

<script>
import ApiService from "@/services/api.service";
import Reporter from "@/views/admin/Reporter";
import Ticket from "@/views/admin/Ticket";

export default {
	name: "SupportTickets",

	data() {
		return {
			users: [],
			userTickets: []
		}
	},

	components: {
		Ticket,
		Reporter: Reporter,
	},

	created() {
		this.fetchUsers();
	},

	methods: {
		fetchUsers() {
			 ApiService.get('/v1/admin/get-users-with-tickets')
					 .then(data => data.data)
					 .then(data => {
						 this.users = data.data;
					 })
		},

		recievedTickets(payload) {
			this.userTickets = payload;
		}
	}
}
</script>

<style scoped>

</style>