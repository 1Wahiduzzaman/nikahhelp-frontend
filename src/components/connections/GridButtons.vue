<template>
  <div class="mt-2">
    <div v-if="type == 'connected'">
      <div class="d-flex align-items-center justify-content-between mb-1">
<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('block')"-->
<!--            class="d-flex align-items-center mr-2 justify-content-center block-button grid-action-btn"-->
<!--            shape="round" size="small">-->
<!--          <a-icon type="stop"/>-->
<!--          Block-->
<!--        </a-button>-->

        <a-button type="primary" block
                  @click="$emit('disconnectTeam')"
                  class="d-flex align-items-center bg-dark justify-content-center grid-action-btn"
                  shape="round" size="small">
          <a-icon type="disconnect"/>
          Disconnect <span style="visibility: hidden">l</span>
        </a-button>
      </div>
      <div class="d-flex align-items-center justify-content-between">
        <a-button
            type="primary" block
            @click="$emit('startConversation')"
            class="d-flex align-items-center mr-2 justify-content-center grid-action-btn" shape="round"
            size="small">
          <a-icon type="wechat"/>
          Chat
        </a-button>
        <a-button
            type="primary" block
            @click="$emit('viewProfile')"
            class="d-flex align-items-center ml-2 justify-content-center grid-action-btn" shape="round"
            size="small">
          <a-icon type="user"/>
          View Profile
        </a-button>
      </div>
    </div>
    <div v-if="type == 'Request received'">
      <div class="d-flex align-items-center justify-content-between mb-1">
        <a-button
            type="primary" block
            @click="$emit('acceptRequest')"
            class="d-flex align-items-center mr-6 grid-action-btn btn-success"
            shape="round" size="small">
          <a-icon type="stop"/>
          Accept
        </a-button>

        <a-button type="primary" block
                  @click="$emit('declineRequest')"
                  class="d-flex align-items-center grid-action-btn btn-decline"
                  shape="round" size="small">
          <a-icon type="disconnect"/>
          Decline <span style="visibility: hidden">lsdd</span>
        </a-button>
      </div>
      <div class="d-flex align-items-center justify-content-between">
<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('block')"-->
<!--            class="d-flex align-items-center mr-4 block-button grid-action-btn" shape="round"-->
<!--            size="small">-->
<!--          <a-icon type="wechat"/>-->
<!--          Block-->
<!--        </a-button>-->
        <a-button
            type="primary" block
            @click="$emit('viewProfile')"
            class="d-flex align-items-center grid-action-btn justify-content-center" shape="round"
            size="small">
          <a-icon type="user"/>
          View Profile
        </a-button>
      </div>
    </div>
    <div v-if="type == 'Request send'">
      <div class="d-none align-items-center justify-content-between mb-1">
<!--        <a-button-->
<!--            type="primary" block-->
<!--            class="d-flex align-items-center justify-content-center grid-action-btn btn-info"-->
<!--            shape="round" size="small">-->
<!--          <a-icon type="cross"/>-->
<!--          Cancel-->
<!--        </a-button>-->

<!--        <a-button type="primary" block-->
<!--                  class="d-flex align-items-center ml-2 grid-action-btn btn-info"-->
<!--                  shape="round" size="small">-->
<!--          <a-icon type="login" />-->
<!--          Resend <span style="visibility: hidden">texti</span>-->
<!--        </a-button>-->
      </div>
      <div class="d-flex align-items-center justify-content-between mt-5">
<!--        <a-button-->
<!--            type="primary" block-->
<!--            @click="$emit('block')"-->
<!--            class="d-flex align-items-center block-button grid-action-btn mr-2" shape="round"-->
<!--            size="small">-->
<!--          <a-icon type="stop"/>-->
<!--          Block-->
<!--        </a-button>-->
        <a-button
            type="primary" block
            class="d-flex align-items-center justify-content-center grid-action-btn btn-info"
            shape="round" size="small">
          <a-icon type="cross"/>
          Cancel
        </a-button>
        <a-button
            type="primary" block
            @click="$emit('viewProfile')"
            class="d-flex align-items-center ml-2 justify-content-center grid-action-btn" shape="round"
            size="small">
          <a-icon type="user"/>
          View Profile
        </a-button>
      </div>
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