<template>
  <div class="success-message">
    <header>
      <a href="/"><img src="@/assets/logo.png" alt="" /></a>
    </header>
    <h3 class="mt-3">Email Verification Successful</h3>
    <h4 class="mt-3">CONGRATULATIONS !</h4>
    <img src="@/assets/icon/check-circle-success.svg" alt="icon" />
    <p class="mt-3">Your email has been verified successfully.</p>
    <p class="mt-4">
      Please now proceed to complete the rest of the membership form.
    </p>

    <button
      @click="handleClick"
      class="btn btn-sm btn-round-sm ms-2 text-nowrap"
    >
      Continue
    </button>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer";

export default {
  name: "Success",
  components: {
    Footer,
  },

  methods: {
    handleClick() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.account_type === 1) {
        this.$router.push("/candidate-registration");
      } else {
        this.$router.push("/representative-registration");
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
  h3,
  h4 {
    font-family: $body-font;
  }
  h4 {
    color: #42bf28;
  }
  img {
    height: 80px;
  }
  button {
    background-color: $color-secondary;
    padding: 0px 20px;
    color: white;
  }
  .footer {
    bottom: 0;
    width: 100%;
    position: fixed;
  }
}
</style>