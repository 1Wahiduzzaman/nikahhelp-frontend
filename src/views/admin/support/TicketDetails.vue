<template>
	<v-card
			class="mx-auto border-danger"
	 max-width="600"
	>
		<v-card-title>
			<v-icon>
				mdi-bug
			</v-icon>
			Issue Type:
			{{ viewingTicket.issue_type }}
		</v-card-title>
		<v-card-subtitle>
			Message:
		</v-card-subtitle>
		<v-card-text>
			{{ viewingTicket.issue }}
		</v-card-text>
		<v-card-text  class="d-flex justify-end">
			<v-icon large  color="secondary" @click="sendMessage">
				mdi-reply
			</v-icon>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "TicketDetails",

	computed: {
		...mapGetters([
				'viewingTicket'
		])
	},

	methods: {
		sendMessage() {
			//this.$store.dispatch('getSupportMessages', this.viewingTicket.id);
			this.$router.push({ name: 'sendTicketMessage', params: { id: this.viewingTicket.id}});
		}
	}

}
</script>

<style scoped>

</style>