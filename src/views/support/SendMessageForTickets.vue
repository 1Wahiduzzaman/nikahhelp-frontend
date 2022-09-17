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
    name: 'SendMessageForTickets',
    
    data() {
        return {
            message: ''
        }
    },

    methods: {
        sendMessage() {

        }
    }
}
</script>

<style>

</style>