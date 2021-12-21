<template>
  <div>
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from "@/views/design/Layout";
export default {
  components: {
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
