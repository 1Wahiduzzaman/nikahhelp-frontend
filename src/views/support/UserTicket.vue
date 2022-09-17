<template>
	<div class="col-12 col-lg-8">
		<h2>Current Ticket</h2>
		<v-card class="d-flex justify-space-between" flat>
			<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li class="breadcrumb-item" @click="backToList">Tickets</li>
				<li class="breadcrumb-item">Selected Tickets</li>
			</ol>
		</nav>
		</v-card>
		
		<v-card>
			<v-list-item>
				<v-list-item-title>
					<v-icon>
						mdi-bug
					</v-icon>
					{{ getUserTicket.issue }}
				</v-list-item-title>

				<v-list-item-title>
					type of issue:
					{{ getUserTicket.issue_type }}
				</v-list-item-title>

				<v-list-item>
					<v-icon @click="viewMessages(getUserTicket.id)">
						mdi-message-reply
					</v-icon>
				</v-list-item>
			</v-list-item>
		</v-card>
	</div>

</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default {
	name: "UserTicket",

	computed: {
		...mapGetters([
				'getUserTicket'
		])
	},

	methods: {
		...mapActions([
				'viewMessages',
				'backToList'
		])
	}
}
</script>

<style scoped>

</style>