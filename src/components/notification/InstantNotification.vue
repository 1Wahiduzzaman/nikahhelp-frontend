<template>
  <div class="position-absolute notification-popup shadow-default" v-if="instantNotification">
    <div class="flex py-2 px-2 position-relative">
      <a-icon type="bell" theme="filled" color="primary" class="color-primary fs-24" size="large" />
      <div class="flex flex-column ml-2">
        <h4 class="border-bottom pb-2 fs-14 pr-2"><strong class="fs-16">{{ notification.team_temp_name }}</strong> has new notification</h4>
        <h4 class="pb-2 fs-14"><b>{{ notification && notification.sender && notification.sender.full_name ? notification.sender.full_name : '' }}</b> {{ notification.title }}</h4>
<!--        <p class="instant-notification-text">-->
<!--          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard-->
<!--          dummy text ever since the 1500s-->
<!--        </p>-->
        <h4 class="text-end fs-12 color-primary">Just now</h4>
      </div>
      <div class="position-absolute close-btn cursor-pointer" @click="closeInstantNotification">&#10006;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstantNotification",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    ping: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  data() {
    return {
      instantNotification: false,
      notification: {}
    }
  },
  methods: {
    closeInstantNotification() {
      this.instantNotification = false;
      this.notification = {};
    }
  },
  mounted() {
    const self = this;
    self.sockets.subscribe('receive_notification', function (res) {
      self.notification = res;
      self.instantNotification = true;
      setTimeout(() => {
        self.instantNotification = false;
        self.notification = {};
      }, 5000);
    });
  }
}
</script>

<style lang="scss">
@import "@/styles/base/_variables.scss";
.notification-popup {
  bottom: 20px;
  left: 20px;
  width: 280px;
  z-index: 9;
  background: #FFFFFF;
  border-radius: 8px;
  @media (min-width: 992px) {
    width: 400px;
  }
}
.instant-notification-text {
  font-size: 12px;
  color: #a7a7a7;
  margin-top: -10px;
}
.close-btn {
  top: 8px;
  right: 6px;
  z-index: 999;
}
</style>