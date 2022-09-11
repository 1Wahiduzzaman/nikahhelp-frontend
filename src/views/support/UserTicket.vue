<template>
	<div class="col-12 col-lg-8">
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
				'viewMessages'
		])
	}
}
</script>

<style scoped>

</style>