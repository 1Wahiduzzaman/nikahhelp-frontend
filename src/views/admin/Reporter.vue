<template>
	<div>
		<v-card
					id="ticket-reporter"
					class="mx-auto mb-4"
					max-width="700"
					v-for="ticket in getTicketFromUsers" 
						:key="ticket.id"
	>
			<v-list-item  @click="goToTicket(ticket.id)">
					<v-list-item-avatar>
						<v-img :src="ticket.user.get_candidate.per_avatar_url"></v-img>
					</v-list-item-avatar>
					<v-list-item-title>
						{{ ticket.user.full_name }}
					</v-list-item-title>
					<v-list-item-title>
						issue type:
						{{ ticket.issue_type }}
					</v-list-item-title>
					<v-list-item>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-icon large v-bind="attrs" v-on="on" :color="ticket.color">
									mdi-circle
								</v-icon>
							</template>
							<span>{{ ticketState(ticket.resolve) }}</span>
						</v-tooltip>
					</v-list-item>
			</v-list-item>
	</v-card>
	</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: "Reporter",

	computed: {
		...mapGetters([
			'getTicketFromUsers'
		])
	},

	methods: {
		...mapActions([
			'goToTicket'
		]),

		ticketState(state) {
			return state > 0 ? 'Resolved' : 'Pending';
		}
	}
}
</script>

<style scoped>

</style>