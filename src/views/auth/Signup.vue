<template>
  <div class="signup-container">
    <div class="signin-inner desktop-padding">
      <a class="logo" href="/"><img src="@/assets/ma_logo_white.svg" alt="logo" class="mat-logo" /></a>
    </div>
    <div class="signup">
      <div class="type-selection" v-if="showMemberTypeForm && !errorMessage">
        <div class="content mb-5">
          <h3 class="mt-3 text-header-black font-weight-bolder">
            Welcome To <span class="logo-text">Matrimony Assist</span> Signup
          </h3>
          <div class="type mx-auto">
            <p class="text-center py-2">Let's get started. Please select your account type, you are registering as a</p>

            <a-row :gutter="16" class="mobile-view">
              <a-col :span="24">
                <a-card class="br-card shadow">
                  <button
                      @click="onSelectAccountType(1)"
                      class="btn no-shadow p-2 fs-20 br-30 btn-type"
                      :class="{ active: signupModel.account_type == 1 }"
                  >
                    Candidate
                  </button>
                  <button
                      @click="onSelectAccountType(2)"
                      class="btn no-shadow p-2 fs-20 br-30 btn-type mt-5"
                      :class="{ active: signupModel.account_type == 2 }"
                  >
                    Representative
                  </button>
                  <button class="btn no-shadow disabled p-2 fs-20 br-30 btn-type mt-5">
                    Match Maker
                  </button>
                  <p class="fs-12 mt-5" v-for="(info, iIndex) in getInstruction" :key="iIndex">
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
            </a-row>

            <a-row :gutter="16" class="desktop-view">
              <a-col :span="8">
                <a-card class="br-card shadow">
                  <button
                    @click="onSelectAccountType(1)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 1 }"
                  >
                    Candidate
                  </button>
                  <p class="fs-12 mt-5" v-for="(info, iIndex) in instructions[0].data" :key="iIndex">
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card class="br-card shadow">
                  <button
                    @click="onSelectAccountType(2)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 2 }"
                  >
                    Representative
                  </button>
                  <p class="fs-12 mt-5" v-for="(info, iIndex) in instructions[1].data" :key="iIndex">
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card class="br-card shadow">
                  <button class="btn no-shadow disabled p-2 fs-20 br-30 btn-type">
                    Match Maker
                  </button>
                  <p class="fs-12 mt-5" v-for="(info, iIndex) in instructions[2].data" :key="iIndex">
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
            </a-row>
            <div class="mt-5 footer" v-if="signupModel.account_type > 0">
              <p>
                <input
                  v-model="isConfirm"
                  type="checkbox"
                  class="confirm-type"
                />
                <span class="confirm-text"
                  >Confirm I'm a
                  <span class="fw-700">{{
                    signupModel.account_type == 1
                      ? "Candidate"
                      : "Representative"
                  }}</span></span
                >
              </p>
              <button
                :disabled="isConfirm ? false : true"
                class="btn btn-continue w-50 fs-20"
                :class="isConfirm ? 'btn-active' : 'disabled'"
                @click="onHandleContinue"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showMemberForm && !errorMessage" class="signup-inner">
        <a href="/" class="logo"><img src="@/assets/logo.png" alt="logo" /></a>

        <a-form-model
          ref="signupFormTwo"
          :model="signupModel"
          :rules="rules"
          class="form-signup"
        >
          <div>
            <div class="mb-3">
              <a-form-model-item ref="first_name" prop="first_name">
                <a-input
                  type="text"
                  class="form-control"
                  id="first_name"
                  @change="generateScreenName"
                  v-model="signupModel.first_name"
                  placeholder="FIrst Name"
                />
              </a-form-model-item>
            </div>
            <div class="mb-3">
              <a-form-model-item ref="last_name" prop="last_name">
                <a-input
                  type="text"
                  class="form-control"
                  @change="generateScreenName"
                  id="lastName"
                  v-model="signupModel.last_name"
                  placeholder="Last Name"
                />
              </a-form-model-item>
            </div>
            <div class="mb-3">
              <a-form-model-item ref="screen_name" prop="screen_name">
                <a-input
                  type="text"
                  class="form-control"
                  id="screen_name"
                  v-model="signupModel.screen_name"
                  placeholder="* Screen Name"
                />
              </a-form-model-item>
            </div>

            <a-tooltip placement="right" class="fs-12 mb-2">
              <template v-slot:title>
                We have made a screen name for you, you can keep it or change to
                something suitable. Please make sure you choose a screen name
                wisely as it communicates somthing about your self.
              </template>
              * Please choose a sensible screen name, if you don't wish your
              real name to appear on search result.
            </a-tooltip>
            <a-button
              @click="backToMemberType"
              class="btn btn-secondary w-100"
              type="primary"
              :loading="isLoading"
            >
              Back
            </a-button>
            <a-button
              @click="handleSubmit"
              class="btn btn-secondary w-100"
              type="primary"
              :loading="isLoading"
            >
              Continue
            </a-button>
          </div>
        </a-form-model>
      </div>
      <div v-if="showSignupForm && !errorMessage" class="signup-inner">
        <a href="/" class="logo"
          ><img src="@/assets/logo.png" alt="logo" class="mat-logo"
        /></a>
        <a-form-model
          ref="signupFormOne"
          :model="signupModel"
          :rules="rules"
          class="form-signup"
        >
          <div>
            <div class="mb-3">
              <a-form-model-item ref="email" prop="email">
                <a-input
                  type="email"
                  class="form-control fs-14"
                  id="email"
                  v-model="signupModel.email"
                  aria-describedby="emailHelp"
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
                  v-model="signupModel.password"
                  placeholder="Password"
                />
              </a-form-model-item>
            </div>
            <div class="mb-3">
              <a-form-model-item ref="confirmPassword" prop="confirmPassword">
                <a-input-password
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="signupModel.confirmPassword"
                  placeholder="Confirm password"
                />
              </a-form-model-item>
            </div>
            <button
              @click="backToForm"
              class="btn btn-agreeJoin-pink w-100"
            >
              Back
            </button>
            <button
              @click="handleSubmitSignUp"
              class="btn btn-agreeJoin-pink w-100"
            >
              Agree & Join
            </button>

            <span class="fs-12 mt-2"
              >By clicking Agree & Join, you agree to Matrimony Assist
              <a class="link" href="">User Agreement, Privacy Policy</a> and
              <a class="link" href="">Cookie Policy</a>
            </span>
          </div>
        </a-form-model>
        <p class="flex-center-center mt-3 bottom-text">
          Already on <span class="logo-text"> Matrimony Assist? </span>

          <router-link
            to="/login"
            class="
              btn btn-sm btn-outline-primary btn-round-sm
              ms-2
              text-nowrap
              join-now-btn
            "
          >
            Sign in
          </router-link>
        </p>
      </div>

      
      <div v-if="errorMessage" class="signup-inner">
        <p class="error">
          {{ errorMessage }}
          <button @click="resetData">
            <router-link
              to="/login"
              class="
                btn btn-sm btn-outline-primary btn-round-sm
                ms-2
                text-nowrap
                join-now-btn
              "
            >
              Sign in
            </router-link>
          </button>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/auth/Footer.vue";
import Spinner from "@/components/ui/Spinner.vue";
import InputPassword from "@/components/ui/InputPassword";
import { CapitalizeFirstLetter } from "../../models/utilities";

export default {
  name: "Signup",
  components: {
    Footer,
    Spinner,
    InputPassword,
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Enter a password"));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Enter password again"));
      } else if (value !== this.signupModel.password) {
        callback(new Error("Password don't match!"));
      } else {
        callback();
      }
    };
    return {
      signupModel: {
        first_name: "",
        last_name: "",
        screen_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        account_type: 0,
      },
      instructions: [
        { title: 'candidiate',
          data: [
              'Variety of information about yourself & the kind of partner you are seeking',
              'Create your own team or join a team',
              'Represented by only ONE team',
              'Be a representative for another 4 candidates'
          ]
        },
        { title: 'representative',
          data: [
            'Very brief information is requested for your profile',
            'Create your own team or join a team',
            'Can switch account to candidate',
            'Can create or join upto 5 teams',
          ]
        },
        { title: 'match-maker',
          data: [
            'Information is requested about your business or work as matchmaker',
            'Matchmaker role is same as representative',
            'Can not switch membership to candidate',
            'Can create or join upto 100+ teams',
          ]
        }
      ],
      showMemberForm: false,
      showMemberTypeForm: true,
      showSignupForm: false,
      isLoading: false,
      isConfirm: false,
      rules: {
        email: [
          {
            required: true,
            message: "Choose a email address",
            trigger: "change",
          },
        ],
        first_name: [
          { required: true, message: "Enter first name", trigger: "change" },
          {
            min: 3,
            message: "Use 3 characters or more for your first name",
            trigger: "blur",
          },
        ],
        last_name: [
          { required: true, message: "Enter last name", trigger: "change" },
          {
            min: 3,
            message: "Use 3 characters or more for your last name",
            trigger: "blur",
          },
        ],
        // screen_name: [
        //   { required: true, message: "Enter screen name", trigger: "blur" },
        // ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 8,
            message: "Use 8 characters or more for your password",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: "blur" },
          ,
          {
            min: 8,
            message: "Use 8 characters or more for your password",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters["errorMessage"];
    },
    getInstruction() {
      let index = 0;
      if(this.signupModel && this.signupModel.account_type) {
        return this.instructions[this.signupModel.account_type - 1].data
      }
      return this.instructions[index].data
    }
  },
  methods: {
    handleSubmitSignUp() {
      this.$refs.signupFormOne.validate((valid) => {
       
         if (valid) {
          const {
            email,
            password,
            first_name,
            last_name,
            screen_name,
            account_type,
          } = this.signupModel;

          try {
            this.isLoading = true;
            this.$store.dispatch("signup", {
              email,
              password,
              first_name,
              last_name,
              screen_name,
              account_type,
            });
          } catch {
            this.isLoading = false;
            this.errorMessage = "The email has already been taken.";
          }
        } else {
          return false;
        }
      });
    },
    generateScreenName() {
      if (
        this.signupModel.last_name.length > 1 &&
        this.signupModel.first_name.length > 2
      ) {
        this.signupModel.screen_name = `${this.signupModel.first_name[1]}${
          this.signupModel.first_name[2]
        }${this.signupModel.last_name[1]}${Math.floor(
          10000 + Math.random() * 90000
        )}`.toUpperCase();
      } else {
        this.signupModel.screen_name = "";
      }
      this.signupModel = {
        ...this.signupModel,
        last_name: CapitalizeFirstLetter(this.signupModel.last_name),
        first_name: CapitalizeFirstLetter(this.signupModel.first_name),
      };
    },
    backToMemberType() {
      this.showMemberTypeForm = true;
      this.showSignupForm = false;
      this.showMemberForm = false;
    },
    onHandleContinue() {
      this.showMemberTypeForm = false;
      this.showSignupForm = false;
      this.showMemberForm = true;
    },
    backToForm() {
      this.showMemberTypeForm = false;
      this.showSignupForm = false;
      this.showMemberForm = true;
    },

    onSelectAccountType(type) {
      this.isConfirm = false;
      this.signupModel.account_type = type;
    },
    resetData() {
      this.$store.commit("setErrorMessage", "");
      localStorage.removeItem("token");
    },
    async handleSubmit() {
      this.$refs.signupFormTwo.validate((valid) => {
        if (valid) {
          this.showMemberTypeForm = false;
          this.showSignupForm = true;
          this.showMemberForm = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_inputs.scss";
.signup-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh);
  overflow-y: auto;
  .signup {
    //height: 100vh;
    //background-color: #522e8e;
    //background-image: linear-gradient(
    //  0deg,
    //  #522e8e 0%,
    //  #932784 46%,
    //  #e02076 100%
    //);
    .mb-3 {
      margin: 0 !important;
    }
    .btn-agreeJoin-pink {
      color: #2cd797;
      //background: #2cd797;
      border: 1px solid #2cd797;
      border-radius: 20px;
      font-size: 16px;
      &:hover,
      &:not(:disabled):not(.disabled):active {
        background: #2cd797;
        color: $color-white;
        border: 1px solid $border-white;
        opacity: 1;
        outline: 0;
        box-shadow: 2px 2px 2px #999;
      }
      &:disabled,
      &.disabled {
        color: $color-white;
        background: #e51f76;
        border: 1px solid $border-primary;
        opacity: 0.6;
      }
      &:focus {
        outline: none;
        box-shadow: none;
      }
      img {
        margin-right: 3px;
      }
    }
    .signup-inner {
      max-width: 400px;
      margin: 0 auto;
      padding: 10px 15px;
      text-align: center;
      @media (min-width: 768px) {
        padding: 80px 15px;
      }
      .error {
        background: #fff;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .logo {
        max-width: 250px;
        display: inline-block;
        margin-bottom: 20px;
        .mat-logo {
          width: 138px;
          @media (min-width: 768px) {
            width: 250px;
          }
        }
      }
      .form-signup {
        background: $bg-white;
        padding: 20px;
        border-radius: 5px;
        @media (min-width: 768px) {
          margin-top: 48px;
        }
        .warning {
          color: red;
          font-size: 14px;
        }
      }
      .hr-line {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          top: 50%;
          left: 0;
          z-index: 1;
          border-bottom: 1px solid $border-default;
        }
        span {
          z-index: 2;
          background: $bg-white;
          position: relative;
          padding: 2px 8px;
        }
      }
      .link {
        color: #3fcbe7;
      }
      .bottom-text {
        color: white;
        .logo-text {
          font-family: $header-font;
          margin-left: 10px;
          margin-right: 5px;
          font-size: 24px;
        }
      }
    }
  }
}
.type-selection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      @media (min-width: 768px) {
        font-size: 28px;
      }
      .logo-text {
        font-family: $header-font;
        color: $color-primary;
        font-weight: 100;
      }
    }
    .type {
      width: 100%;
      //height: 400px;
      //background-color: #e02076;
      background-image: linear-gradient(
              180deg,
              #e02076 0%,
              #932784 50%,
              #522e8e 100%
      );
      @media (min-width: 768px) {
        background-image: linear-gradient(
                0deg,
                #e02076 0%,
                #932784 50%,
                #522e8e 100%
        );
      }
      padding: 20px;
      border-radius: 5px;
      color: #ececec;
      margin-top: 20px;
      @media (min-width: 768px) {
        width: 98%;
      }
      @media (min-width: 992px) {
        width: 80%;
      }
      .btn {
        width: 100%;
      }
      .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .active {
        background: $bg-secondary !important;
        color: $color-white;
      }
      .btn-active {
        //background: $bg-success;
        color: $color-white;
      }
      .btn-continue {
        border-radius: 30px;
        background: $bg-success;
        &:hover {

        }
      }
      .confirm-type {
        margin-top: 10px;
        transform: scale(1.8);
        height: 12px;
      }
      .confirm-text {
        margin-left: 20px;
        font-size: 18px;
      }
    }
  }
}
.join-now-btn {
  color: #ffffff;
  font-size: 14px;
  border: 1px solid #ffffff;
}
.join-now-btn:focus {
  outline: none;
  box-shadow: none;
}
.join-now-btn:hover {
  background: $bg-primary;
  box-shadow: 0 2px 2px #999;
  border: none;
}
.signup-head {
  font-size: 16px;
  color: #FFFFFF;
  margin-top: -12px;
  background: -webkit-linear-gradient(white, pink, white, #8debf2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.signin-inner {
  background: #522e8e;
  display: flex;
  justify-content: center;
}
.mat-logo {
  width: 120px;
  height: 80px;
  @media (min-width: 768px) {
    width: 250px;
    height: 170px;
  }
}
.logo-text {
  color: $color-brand !important;
  font-style: italic;
}
.no-shadow {
  box-shadow: none !important;
}
.br-card {
  border-radius: 10px;
}
.br-30 {
  border-radius: 30px;
}
.btn-type {
  border: 1px solid #522e8e;
}
.desktop-view {
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}
.mobile-view {
  @media (min-width: 768px) {
    display: none;
  }
}
</style>