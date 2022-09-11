<template>
  <div>
	  <v-card v-for="message in ticketMessages" :key="message.id">
		  {{ message.message}}
	  </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "TicketMessages",

	computed: {
		...mapGetters([
				'ticketMessages'
		])
	}
}
</script>

<style scoped>

</style>