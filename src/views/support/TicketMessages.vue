<template>
  <div class="col-12 col-lg-8">
	<h2>Ticket Messages</h2>
	<v-card class="d-flex justify-space-between" flat>
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item" @click="backToList">Tickets</li>
				<li class="breadcrumb-item" @click="goTo(ticketMessages[0].ticket_id)">Selected Tickets</li>
				<li class="breadcrumb-item active" aria-current="page">Ticket Messages</li>
			</ol>
		</nav>
		<v-icon large @click="messageReply(ticketMessages[0].id)">
			Reply:
			mdi-message-reply
		</v-icon>
	</v-card>
	  <v-card v-for="message in ticketMessages" :key="message.id" class="mb-3">
		<v-list-item>
			<v-list-item-title>
				{{ message.message}}
			</v-list-item-title>
			<v-list-item-title>
				reply by:
				{{ getName(message.user) }}
			</v-list-item-title>
		</v-list-item>
	  </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "TicketMessages",

	computed: {
		...mapGetters([
				'ticketMessages'
		]),

		accountDetails() {
			return JSON.parse(localStorage.getItem('user'));
		}
	},

	methods: {
		...mapActions([
			'backToList',
			'goTo',
			'messageReply'
		]),

		getName(user) {
			return this.accountDetails.id === JSON.parse(user)?.id ? 'You' : JSON.parse(user)?.full_name;
		}
	}

}
</script>