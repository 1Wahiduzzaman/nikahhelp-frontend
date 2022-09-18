<template>
		<v-container>
			<v-card
					id="ticket-reporter"
					class="mx-auto"
					max-width="700"

			>
				<component :is="supportComponent"></component>
			</v-card>
		</v-container>
</template>

<script>
import ApiService from "@/services/api.service";
import Reporter from "@/views/admin/Reporter";
import Ticket from "@/views/admin/Ticket";
import { mapGetters } from 'vuex';

export default {
	name: "SupportTickets",

	data() {
		return {
			tickets: [],
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

	computed: {
		...mapGetters([
			'supportComponent'
		])
	},

	methods: {
		fetchUsers() {
			 ApiService.get('/v1/admin/get-users-with-tickets')
					 .then(data => data.data)
					 .then(data => {
						 this.tickets = data.data;
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