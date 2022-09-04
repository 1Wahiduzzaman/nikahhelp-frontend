<template>
		<v-list-item @click="ticketList">
			<v-list-item-title>
				<v-list-item-avatar>
					<v-img :src="reporter.per_avatar_url"></v-img>
				</v-list-item-avatar>
				{{ reporter.first_name + ' ' + reporter.last_name }}
			</v-list-item-title>

			<v-list-item-title>
				Number of Tickets Submitted: {{ ticketsNumber }}
			</v-list-item-title>
		</v-list-item>
</template>

<script>
export default {
	name: "Reporter",

	props: ['reporter'],

	computed: {
		ticketsNumber() {
			return this.reporter?.ticket_submission.length;
		}
	},

	methods: {
		ticketList() {
			this.$store.dispatch('getSelectedTickets', this.reporter?.ticket_submission);

			this.$router.push({ name: 'ticket'});
		}
	}
}
</script>

<style scoped>

</style>