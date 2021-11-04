<template>
  <div class="login-container">
    <div class="signin">
      <div class="signin-inner" style="padding-top: 50px">
        <a class="logo"><img src="@/assets/logo.png" alt="logo" /></a>
        <h3 id="welcome-back-tag"><b>Welcome Back</b></h3>
      </div>

      <div class="welcome-back">
        <p class="welcome-back-text">
          Don't miss your next opportunity. Sign in to stay updatd on
          your<strong id="name">Matrimony Assist</strong> world.
        </p>
      </div>

      <div class="signin-inner">
        <a-form-model
          ref="signinForm"
          :model="signinModel"
          :rules="rules"
          class="form-signin"
        >
          <!-- <Spinner v-if="isLoading" /> -->
          <p v-if="error">
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
          <div else>
            <div class="mb-3">
              <a-form-model-item ref="email" prop="email">
                <a-input
                  type="email"
                  id="email"
                  v-model="signinModel.email"
                  placeholder="Enter email"
                />
              </a-form-model-item>
            </div>

            <div class="mb-3">
              <a-form-model-item ref="password" prop="password">
                <a-input-password
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="signinModel.password"
                  placeholder="password"
                />
              </a-form-model-item>
            </div>
            <button
              type="button"
              @click="handleSubmit"
              class="btn btn-primary w-100"
            >
              Sign in
            </button>

            <p
              class="
                forgot
                btn btn-sm btn-outline-primary btn-round-sm
                ms-2
                text-nowrap
                mt-4
              "
            >
              <router-link to="/forgot-password" style="color: #ec1fab">
                Forgot Password?
              </router-link>
            </p>
          </div>
        </a-form-model>

        <div class="join-now" style="padding-bottom: 50px">
          <p
            class="flex-center-center mt-3"
            style="
              color: #c2f0fd;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            "
          >
            New to <strong id="name"> Matrimonial Assist? </strong>

            <router-link
              to="/signup"
              class="
                btn btn-sm btn-outline-primary btn-round-sm
                ms-2
                text-nowrap
              "
              style="margin-left: 5px; font-weight: bold"
            >
              Join Now
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
import InputPassword from "@/components/ui/InputPassword";
export default {
  name: "Login",
  components: {
    Footer,
    Spinner,
    InputPassword,
  },
  data() {
    return {
      signinModel: {
        email: "",
        password: "",
      },
      isLoading: false,
      error: null,
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email address",
          },
        ],

        password: [{ required: true, message: "Please input your password" }],
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.$refs.signinForm.validate((valid) => {
        if (valid) {
          try {
            this.$store.dispatch("login", this.signinModel);
          } catch (error) {
            this.error = error.response.data.message;
          }
        } else {
          return false;
        }
      });
    },

    refreshLogin() {
      this.isLoading = false;
      this.error = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_inputs.scss";
.login-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh);

  .signin {
    height: 100vh;
    background-color: #522e8e;
    background-image: linear-gradient(
      0deg,
      #522e8e 0%,
      #932784 46%,
      #e02076 100%
    );

    .signin-inner {
      max-width: 400px;
      padding: 50px, 15px;
      margin: 0 auto;
      text-align: center;
      .logo {
        max-width: 250px;
        display: inline-block;
        margin-bottom: 20px;
      }
      .form-signin {
        background: $bg-white;
        padding: 20px;
        border-radius: 5px;

        .forgot {
          font-size: 14px;
          font-weight: bold;
          margin-top: 5px;
          text-decoration: none;
          color: #b30d7e;
          padding: 5px 15px 5px 15px;
          border-color: #b30d7e;
        }
        .forgot:hover {
          box-shadow: 2px 2px 2px #989597;
          background-color: white;
        }
        .warning {
          color: red;
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }

  #name {
    font-family: Rochester, cursive;
    font-size: 20px;
    color: white;
    padding-left: 7px;
  }

  .welcome-back {
    .welcome-back-text {
      padding-top: 0px;
      padding-bottom: 10px;
      text-align: center;
      margin-top: 0px;
      margin-bottom: 0px;
      color: #c2f0fd;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  }

  #join-now {
    background-color: #43e3e6fd;
    color: white;
    border: white;
    margin: 5px;
  }

  #join-now:hover {
    color: #f5e6f4;
    box-shadow: 2px 2px 2px #383332;
  }

  #welcome-back-tag {
    background: -webkit-linear-gradient(white, pink, white, #8debf2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .btn-primary {
    box-shadow: 0px 0px;
    &:hover,
    &:not(:disabled):not(.disabled):active {
      box-shadow: 2px 2px 2px #999;
    }
  }
}

.ant-form-item {
  margin-bottom: 0px;
}
</style>
