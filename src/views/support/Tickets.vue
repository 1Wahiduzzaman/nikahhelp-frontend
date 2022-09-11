<template>
	<div class="col-12 col-lg-8">
		<h2 class="">Past ticket history</h2>
		<v-card v-for="ticket in getUserTickets" :key="ticket.id" class="mb-3" @click="viewUserTicket(ticket.id)">
			<v-list-item>
				<v-list-item-title>
					<v-icon>
						mdi-bug
					</v-icon>
					{{ ticket.issue_type }}
				</v-list-item-title>
			</v-list-item>
		</v-card>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "Tickets",

	computed: {
		...mapGetters([
				'getUserTickets'
		])
	},

	methods: {
		...mapActions([
			'viewUserTicket'
		])
	}

}
</script>

<style scoped>

</style>