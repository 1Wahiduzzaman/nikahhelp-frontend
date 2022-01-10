<template>
  <div>
    <div class="forget-password pb-4 font-poppins">
      <div class="inner">
        <div class="signin-inner desktop-padding">
          <a class="logo" href="/"><img src="@/assets/ma_logo_white.svg" alt="logo" class="mat-logo" /></a>
          <h3 id="welcome-back-tag" class="welcome-back-tag"><b>{{ message ? 'Reset password link sent' : 'Forget your password?' }}</b></h3>
        </div>
        <form class="form" @submit.prevent="handleSubmit">
          <Spinner v-if="isLoading" />
          <div v-else-if="error" class="text-black-50">
            <p>{{ error }}</p>
            <div class="flex justify-content-center align-items-center">
              <button class="">
                Back to
                <router-link
                    to="/login"
                    class="
                btn btn-sm btn-outline-primary btn-round-sm btn-signinup
                ms-2
                text-nowrap
                join-now-btn
              "
                >
                  Sign in
                </router-link>
              </button>
              <h4 class="fs-16 pt-1 pl-2 pr-1 text-white text-black-50">or</h4>
              <button class="">
                <router-link
                    to="/signup"
                    class="
                btn btn-sm btn-outline-primary btn-round-sm btn-signinup
                ms-2
                text-nowrap
                join-now-btn
              "
                >
                  Join now
                </router-link>
              </button>
            </div>
          </div>
          <div v-else>
            <div class="mb-3" v-if="!message">
              <h5 class="fs-18 text-black-50">Retrieve your password here</h5>
              <p class="fs-14 text-black-50">Please enter your email address below. You will receive a link to reset your password.</p>

              <a-input
                type="email"
                class="form-control rounded-input"
                id="email"
                v-model="email"
                placeholder="Enter email"
              />
              <p v-if="!formIsValid" class="text-danger fs-14">
                Please enter a valid email address
              </p>
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

              <router-link role="button" class="btn btn-primary w-50 text-white" to="/login" :class="{'flex justify-content-center': message}">
                &#xab; Sign in
              </router-link>
            </div>
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
  min-height:  calc(100vh - 118px);;
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
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
    .logo {
      max-width: 250px;
      display: inline-block;
      .mat-logo {
        width: 120px;
        height: 80px;
        @media (min-width: 768px) {
          width: 170px;
          height: 110px;
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
      padding: 20px 10px;
      border-radius: 12px;
      max-width: 400px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin-top: 36px;

      .button-container {
        width: 100%;
        display: flex;
      }
      .warning {
        color: red;
        font-size: 14px;
        margin-top: 5px;
      }
      .message {
        font-size: 14px;
        padding: 10px 15px;
      }
    }
  }
}
.btn-style {
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
#welcome-back-tag {
  background: -webkit-linear-gradient(white, pink, white, #8debf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.welcome-back-tag {
  @media (min-width: 768px) {
    margin-top: 20px;
  }
}
.rounded-input {
  border-radius: 30px;
}
.join-now-btn {
  color: $color-primary;
  border: 1px solid $border-primary;
  font-size: 10px;
  @media (min-width: 576px) {
    font-size: 12px;
  }
}
.join-now-btn:focus {
  outline: none;
  box-shadow: none;
}
.join-now-btn:hover {
  background: $bg-primary;
  box-shadow: 0 2px 2px #999;
  color: #FFFFFF;
  border: none;
}
</style>