<template>
  <div>
    <Loader :isLoading="loading" />
    <div class="success-message font-poppins main-container" v-if="!loading">
      <header class="header-container text-center">
        <a href="/"><img src="@/assets/Icons/Logo/SVG/White Logo.svg" alt=""/></a>
      </header>
      <h1 class="text-center text-danger mt-2">Email verification failed</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerifyEmail",
  mounted() {
    this.verifyEmail();
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    async verifyEmail() {
      const actionPayload = {
        token: this.$route.params.token,
      };
      try {
        const data = await this.$store.dispatch("verify", actionPayload);
        if (data.status === 200) {
          localStorage.setItem('user', JSON.stringify(data.data.data));
          const user = JSON.parse(localStorage.getItem("user"));
          user.is_verified = 1;
          user.data_input_status = 0;
          user.status = "1";
          localStorage.setItem("token", `"${user.token}"`);
          delete user.token;
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/email-verification-success");
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.success-message {
  text-align: center;
  header {
    height: 100px;
    background-color: $bg-secondary;
    img {
      margin-top: 10px;
      height: 80px;
    }
  }
  h4 {
    font-family: $body-font;
  }
  h4 {
    color: #42bf28;
  }
  img {
    height: 80px;
  }
}
.header-container {
  flex-shrink: 0;
}
</style>