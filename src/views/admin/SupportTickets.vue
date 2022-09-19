<template>
		<v-container>
			<v-card
					
			>
				<component :is="supportComponent"></component>
			</v-card>
		</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Reporter from '@/views/admin/Reporter.vue';
import TicketDetails from '@/views/admin/support/TicketDetails.vue';
import SendTicketMessage from '@/views/admin/support/SendTicketMessage.vue';
import TicketMessages from '@/views/admin/support/TicketMessages.vue';
export default {
	name: "SupportTickets",

	data() {
		return {
			tickets: [],
			userTickets: []
		}
	},

	components: {
		Reporter,
		TicketDetails,
		SendTicketMessage,
		TicketMessages
	},

	created() {
		this.getTicketsFromUsers();
	},

	computed: {
		...mapGetters([
			'supportComponent'
		])
	},

	methods: {
		...mapActions([
			'getTicketsFromUsers'
		]), 
	}
}
</script>

<style scoped>

</style>