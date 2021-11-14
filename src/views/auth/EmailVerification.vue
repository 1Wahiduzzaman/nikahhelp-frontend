<template>
  <div class="email-verification">
    <header>
      <a href="/"><img src="@/assets/logo.png" alt="" /></a>
    </header>

    <div class="message">
      <h3 class="mt-3 fw-700">Email Verification</h3>
      <p>
        We have sent verification email to
        <br />
        <span>{{ user.email }}</span>
        <br />
        Please check your email or your spam folder and follow the verification
        <br />
        instructions.
      </p>
      <p>
        For user safety we need to ensure that only genuine and identifiable
        <br />
        users are on Matrimony Assist.
      </p>
      <p>
        To help us do that all users of the Matrimony Assist Platform will need
        to
        <br />
        verify their registratation and mobile (cell phone) number.
      </p>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer";
export default {
  name: "EmailVerification",
  components: {
    Footer,
  },
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 0,
    };
  },
  // watch: {
  // 	is_verified: function () {
  // 		this.$router.push("/email-verification-success");
  // 	},
  // },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
        return;
      }
      try {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.is_verified = this.user.is_verified;
      } catch (error) {
        this.error = error.message || "Something went wrong";
        alert(this.error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.email-verification {
  text-align: center;
  header {
    height: 100px;
    background-color: $bg-secondary;
    img {
      margin-top: 10px;
      height: 80px;
    }
  }
  h3 {
    font-family: $body-font;
  }
  span {
    color: $color-secondary;
  }
  .footer {
    bottom: 0;
    width: 100%;
    position: fixed;
  }
}
</style>