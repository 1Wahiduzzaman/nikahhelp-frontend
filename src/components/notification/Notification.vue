<template>
	<div class="border-bottom py-2 position-relative">
		<div class="flex flex-div">
      <img :src="avatarSrc" alt="avatar" class="user-circle-img">
      <div class="flex flex-column ml-2">
        <h4 class="notification-headline"><strong>Justin Web</strong> updated his profile picture</h4>
        <p class="notification-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
    <h4 class="notification-time-text text-end">23 Nov 2021 at at 12:44pm</h4>
    <div class="status-box position-absolute bg-brand"></div>
	</div>
</template>

<script>
export default {
	name: "Notification",
	props: ["notification"],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
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
