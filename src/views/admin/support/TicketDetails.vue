<template>
	<div class="col-12 col-lg-8">
    <h2>Current Ticket</h2>
    <v-card class="d-flex justify-space-between" flat>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item" @click="">Tickets</li>
          <li class="breadcrumb-item">Selected Tickets</li>
        </ol>
      </nav>
    </v-card>

    <v-card-actions class="d-flex justify-end">
      <v-tooltip top v-if="currentTicket.resolve > 0">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-4"
            color="success"
            v-bind="attrs"
            v-on="on"
            @click=""
          >
            mdi-check-circle
          </v-icon>
        </template>
        <span>Resolve ticket</span>
      </v-tooltip>
      <v-tooltip top v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-icon large v-bind="attrs" v-on="on" color="warning">
            mdi-circle
          </v-icon>
        </template>
        <span>Pending</span>
      </v-tooltip>
    </v-card-actions>
    <v-card>
      <v-list-item>
        <v-list-item-title>
          <v-icon> mdi-bug </v-icon>
          {{ currentTicket.issue }}
        </v-list-item-title>

        <v-list-item-title>
          type of issue:
          {{ currentTicket.issue_type }}
        </v-list-item-title>

        <v-list-item>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                @click=""
                v-bind="attrs"
                v-on="on"
              >
                mdi-message-reply
              </v-icon>
            </template>
            <span>Send message</span>
          </v-tooltip>
        </v-list-item>
      </v-list-item>
    </v-card>
    <v-card>
      <v-card-text class="mt-4">
        {{ currentTicket.issue }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "TicketDetails",

	computed: {
		...mapGetters([
				'currentTicket'
		])
	},

	methods: {
		...mapActions([
			'sendMessage'
		])
		// sendMessage() {
		// 	//this.$store.dispatch('getSupportMessages', this.viewingTicket.id);
		// 	this.$router.push({ name: 'sendTicketMessage', params: { id: this.viewingTicket.id}});
		// }
	}

}
</script>

<style scoped>

</style>