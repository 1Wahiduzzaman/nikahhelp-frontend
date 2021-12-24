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
export default {
  components: {
    InstantNotification,
    Layout,
  },
  data() {
    return {};
  },
  created() {},
};
</script>



<style lang="scss">
</style>
