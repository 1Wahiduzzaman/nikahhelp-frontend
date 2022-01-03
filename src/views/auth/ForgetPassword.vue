<template>
  <div>
    <div class="forget-password">
      <div class="inner">
        <a href="/" class="logo"><img src="@/assets/logo.png" alt="logo" class="mat-logo" /></a>
        <template v-if="!message">
          <h3 class="fs-22">Forget your password?</h3>
          <h5 class="fs-18">Retrieve your password here</h5>
          <p class="fs-14 text-white">Please enter your email address below. You will receive a link to reset your password.</p>
        </template>
        <template v-if="message">
          <h3>Reset password link sent</h3>
        </template>
        <form class="form" @submit.prevent="handleSubmit">
          <Spinner v-if="isLoading" />
          <p v-else-if="error">
            {{ error }}
            <router-link
              to="/login"
              class="
                btn btn-sm btn-outline-primary btn-round-sm
                ms-2
                text-nowrap
              "
            >
              Sign in
            </router-link>
          </p>
          <div v-else>
            <div class="mb-3" v-if="!message">
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                placeholder="Enter email"
              />
            </div>
            <p v-if="message" class="message">
              {{ message }}
            </p>
            <div class="button-container">
              <button
                type="submit"
                class="btn btn-primary w-100"
                v-if="!message"
              >
                Get Verification Link
              </button>

              <button type="button" class="btn btn-primary w-100">
                <router-link style="color: #fff" to="/login"
                  >Back to Sign in
                </router-link>
              </button>
            </div>
            <p v-if="!formIsValid" class="warning">
              Please enter a valid email or password
            </p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
export default {
  name: "ForgetPassword",
  components: {
    Footer,
    Spinner,
  },
  data() {
    return {
      email: "",
      isLoading: false,
      error: null,
      formIsValid: true,
      message: null,
    };
  },
  methods: {
    async handleSubmit() {
      // Todo -- form validation. and success message
      this.formIsValid = true;
      if (this.email === "" || !this.email.includes("@")) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
      };
      try {
        await this.$store.dispatch("forgetPassword", actionPayload);
        this.message =
          "We have sent you a link to reset your password. This link is valid for 24 hours.";
        //this.$router.go("/dashboard");
      } catch (error) {
        this.error = "Invalid email, email is not registerd";
        // this.message =
        //   "We have sent you a link to reset your password. This link is valid for 24 hours.";
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.forget-password {
  min-height:  calc(100vh - 100px);;
  background-color: #522e8e;
  background-image: linear-gradient(
    0deg,
    #522e8e 0%,
    #932784 46%,
    #e02076 100%
  );
  .inner {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
      padding: 50px 15px;
    }
    .logo {
      max-width: 250px;
      display: inline-block;
      margin-bottom: 8px;
      .mat-logo {
        width: 180px;
        @media (min-width: 768px) {
          width: 250px;
        }
      }
    }
    h3,
    h5,
    h6 {
      color: $bg-white;
    }
    .form {
      background: $bg-white;
      padding: 50px 30px;
      border-radius: 5px;
      max-width: 400px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .button-container {
        width: 325px;
        display: flex;
        @media (min-width: 320px) and (max-width: 480px) {
          width: 100%;
        }
      }
      .warning {
        color: red;
        font-size: 14px;
        margin-top: 5px;
      }
      .message {
        font-size: 24px;
        margin-top: 5px;
        margin-left: -15px;
        margin-right: -15px;
        font-weight: bold;
        background: -webkit-linear-gradient(
          rgb(186, 95, 247),
          rgb(132, 111, 228),
          #6d189e,
          rgb(51, 28, 153)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
.btn-style {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>