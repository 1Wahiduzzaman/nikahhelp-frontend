<template>
  <div>
    <!-- <div class="loader" v-if="isLoading">
      <v-skeleton-loader
        v-bind="attrs"
        type="list-item-avatar-three-line, image, article"
      ></v-skeleton-loader>
    </div>
    <div v-else> -->
    <Header />
    <Banner />
    <div class="bg-home-page">
      <RecentlyJoined />
      <Feature />
      <Conversation />
      <FindPartner />
      <Footer />
    </div>
    <Cookies />
  </div>
  <!-- </div> -->
</template>

<script>
import Header from "@/components/auth/Header.vue";
import Banner from "@/components/auth/Banner.vue";
import Feature from "@/components/auth/Feature.vue";
import Conversation from "@/components/auth/Conversation.vue";
import RecentlyJoined from "@/components/auth/RecentlyJoined.vue";
import FindPartner from "@/components/auth/FindPartner.vue";
import Footer from "@/components/auth/Footer.vue";
import Cookies from "@/components/cookies/Cookies.vue";

export default {
  name: "Home",
  components: {
    Header,
    Banner,
    RecentlyJoined,
    Feature,
    Conversation,
    FindPartner,
    Footer,
    Cookies,
  },
  data() {
    return {
      isLoading: false,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<style scoped>
.loader {
  height: 100vh;
}
.bg-home-page {
  background: url("~@/assets/full.svg") no-repeat center center / cover;
  background-color: #f5f5ff;
}
</style>
