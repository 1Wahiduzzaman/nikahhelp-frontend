<template>
	<div class="border-bottom pt-2 pb-1 position-relative">
		<div class="flex flex-div">
      <img :src="avatarSrc" alt="avatar" class="user-circle-img">
      <div class="flex flex-column ml-2">
        <h4 class="notification-headline py-2"><strong>{{ notification && notification.sender && notification.sender.full_name ? notification.sender.full_name : '' }}</strong> {{ notification.title }}</h4>
<!--        <p class="notification-text">-->
<!--          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard-->
<!--        </p>-->
      </div>
    </div>
    <h4 class="notification-time-text text-end">{{ createdAt(notification.created_at) }}</h4>
    <div class="status-box position-absolute bg-brand" v-if="notification.seen == 0"></div>
	</div>
</template>

<script>
import {format} from "timeago.js";
// import Notification from "@/common/notification.js";

export default {
	name: "Notification",
	props: ["notification"],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
  },
  methods: {
    createdAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },
  },
  mounted() {
    // console.log(Notification.storeNotification({ id: 1 }))
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.flex-div {
  .user-circle-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  .flex {
    .notification-headline {
      font-size: 14px;
    }
    .notification-text {
      font-size: 12px;
      color: #a7a7a7;
    }
  }
}
.notification-time-text {
  font-size: 14px;
  color: $color-primary;
}
.status-box {
  width: 8px;
  height: 8px;
  top: 12px;
  right: 2px;
  border-radius: 50%;
}
.bg-brand {
  background: #E51F76
}
</style>
