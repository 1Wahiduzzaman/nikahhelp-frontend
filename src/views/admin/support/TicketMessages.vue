<template>
	<v-list>
		<v-card v-for="message in listOfMessages" :key="message" max-width="600" class="mx-auto pa-3">

			<v-list-item-title>
				<v-icon>
					mdi-message
				</v-icon>
				{{ message.message }}
			</v-list-item-title>
			<v-spacer></v-spacer>
			<v-list-item-title>
				Reply by:
				{{ message.user.full_name }}
			</v-list-item-title>
		</v-card>
	</v-list>
</template>

<script>
import {mapGetters } from "vuex";

export default {
	name: "TicketMessages",

	computed: {
		...mapGetters([
				'listOfMessages'
		]),
	}
}
</script>

<style scoped>

</style>