<template>
  <div class="mt-2">
    <div v-if="type == 'connected'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize"
            block
            rounded
            small
            color="error darken-1"
            dark
            @click="$emit('disconnectTeam')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="disconnect" class="mr-2" />
            Disconnect
          </div>
        </v-btn>
      </div>
      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize"
            style="width: 47%"
            rounded
            small
            color="deep-purple darken-1"
            dark
        >
          <div class="flex justify-center align-center">
            <a-icon type="wechat" class="mr-2" />
            Chat
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize"
            style="width: 47%"
            rounded
            small
            color="deep-purple darken-1"
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="user" class="mr-2" />
            View Profile
          </div>
        </v-btn>

<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('startConversation')"-->
<!--            class="d-flex align-items-center mr-2 justify-content-center grid-action-btn" shape="round"-->
<!--            size="small">-->
<!--          <a-icon type="wechat"/>-->
<!--          Chat-->
<!--        </a-button>-->
<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('viewProfile')"-->
<!--            class="d-flex align-items-center ml-2 justify-content-center grid-action-btn" shape="round"-->
<!--            size="small">-->
<!--          <a-icon type="user"/>-->
<!--          View Profile-->
<!--        </a-button>-->
      </div>
    </div>
    <div v-if="type == 'Request received'">
      <div class="flex flex-wrap justify-space-between px-4">
        <v-btn
            class="text-capitalize"
            style="width: 47%"
            rounded
            small
            color="success darken-1"
            dark
            @click="$emit('acceptRequest')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="check" class="mr-2" />
            Accept
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize"
            style="width: 47%"
            rounded
            small
            color="error darken-1"
            dark
            @click="$emit('declineRequest')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="disconnect" class="mr-2" />
            Decline
          </div>
        </v-btn>

<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('acceptRequest')"-->
<!--            class="d-flex align-items-center mr-6 grid-action-btn btn-success"-->
<!--            shape="round" size="small">-->
<!--          <a-icon type="stop"/>-->
<!--          Accept-->
<!--        </a-button>-->

<!--        <a-button type="primary" block-->
<!--                  @click="$emit('declineRequest')"-->
<!--                  class="d-flex align-items-center grid-action-btn btn-decline"-->
<!--                  shape="round" size="small">-->
<!--          <a-icon type="disconnect"/>-->
<!--          Decline <span style="visibility: hidden">lsdd</span>-->
<!--        </a-button>-->
      </div>
      <div class="flex flex-wrap justify-space-between px-4 mt-3">
        <v-btn
            class="text-capitalize"
            block
            rounded
            small
            color="deep-purple darken-1"
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="user" class="mr-2" />
            View Profile
          </div>
        </v-btn>

<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('viewProfile')"-->
<!--            class="d-flex align-items-center grid-action-btn justify-content-center" shape="round"-->
<!--            size="small">-->
<!--          <a-icon type="user"/>-->
<!--          View Profile-->
<!--        </a-button>-->
      </div>
    </div>
    <div v-if="type == 'Request send'">
      <div class="flex flex-wrap justify-space-between px-4 py-5">
        <v-btn
            class="text-capitalize"
            style="width: 47%"
            rounded
            small
            color="error darken-1"
            dark
            @click="$emit('declineConnection')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="cross" class="mr-2" />
            Cancel
          </div>
        </v-btn>

        <v-btn
            class="text-capitalize"
            style="width: 47%"
            rounded
            small
            color="deep-purple darken-1"
            dark
            @click="$emit('viewProfile')"
        >
          <div class="flex justify-center align-center">
            <a-icon type="user" class="mr-2" />
            View Profile
          </div>
        </v-btn>
      </div>
<!--      <div class="d-flex align-items-center justify-content-between mt-5">-->
<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('declineConnection')"-->
<!--            class="d-flex align-items-center justify-content-center grid-action-btn btn-info"-->
<!--            shape="round" size="small">-->
<!--          <a-icon type="cross"/>-->
<!--          Cancel-->
<!--        </a-button>-->
<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('viewProfile')"-->
<!--            class="d-flex align-items-center ml-2 justify-content-center grid-action-btn" shape="round"-->
<!--            size="small">-->
<!--          <a-icon type="user"/>-->
<!--          View Profile-->
<!--        </a-button>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "GridButtons",
  props: ['type']
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.block-button {
  background: $bg-brand;
}
.block-button:hover {
  background: $bg-brand;
}

.grid-action-btn {
  border-color: #f9f9f9;
}

.btn-success {
  background: #3ab549;
  color: #FFFFFF;
}
.btn-success:hover {
  background: #3ab549;
}

.btn-decline {
  background: #fa4942;
  color: #FFFFFF;
}
.btn-decline:hover {
  background: #fa4942;
}

.btn-info {
  background: #1bb9c2;
}
.btn-info:hover {
  background: #1bb9c2;
}
</style>