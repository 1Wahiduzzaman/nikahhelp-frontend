<template>
  <div class="position-relative">
    <Layout>
      <router-view />
      <instant-notification />
    </Layout>
  </div>
</template>

<script>
import Layout from "@/views/design/Layout";
import InstantNotification from "../notification/InstantNotification";
// import ApiService from "@/services/api.service";
export default {
  components: {
    InstantNotification,
    Layout,
  },
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
      notifications: []
    };
  },
  mounted() {
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      this.$socket.emit('ping', {user_id: loggedUser.id});

      this.sockets.subscribe('ping_success', function (res) {
        // console.log(res);
        if (res && res.online_users) {
          this.online_users = res.online_users;
        }
      });
    }
  },
  created() {
    // ApiService.get("v1/list-notification").then(response => {
    //   this.notifications = response.data.data;
    // }).catch(e => {
    //   console.log(e);
    // });
  },
};
</script>



<style lang="scss">
</style>
