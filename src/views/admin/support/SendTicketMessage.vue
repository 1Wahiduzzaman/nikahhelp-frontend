<template>
  <v-card
		  class="mx-auto"
   max-width="500"
  >
	  <v-textarea class="mx-2" v-model="message" placeholder="more information"></v-textarea>
	  <v-card-actions class="d-flex justify-end">
		  <v-icon @click="sendMessage">
			  mdi-send
		  </v-icon>
	  </v-card-actions>
  </v-card>
</template>

<script>
export default {
	name: "SendTicketMessage",
	props: ['id'],

	data() {
		return {
			message: ''
		}
	},

	methods: {
		sendMessage() {
			const user = localStorage.getItem('user');
			console.log(user);
			this.$store.dispatch('submitTicketRequests', {
				message: this.message,
				ticket_id: this.id,
				user: user
			});

			this.$router.push({name: 'ticketMessages'});
		}
	}
}
</script>

<style scoped>

</style>