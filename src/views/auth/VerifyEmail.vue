<template>
  <div>
    <Loader :isLoading="true" />
  </div>
</template>

<script>
export default {
  name: "VerifyEmail",
  mounted() {
    this.verifyEmail();
  },
  methods: {
    async verifyEmail() {
      const actionPayload = {
        token: this.$route.params.token,
      };
      try {
        const data = await this.$store.dispatch("verify", actionPayload);
        if (data.status === 200) {
          const user = JSON.parse(localStorage.getItem("user"));
          user.is_verified = 1;
          user.data_input_status = 0;
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/email-verification-success");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>