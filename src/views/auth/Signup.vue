<template>
  <div class="signup-container font-poppins main-container">
    <div class="signin-inner desktop-padding header-container text-center">
      <a class="logo" href="/"
        ><img src="@/assets/ma_logo_white.svg" alt="logo" class="mat-logo"
      /></a>
    </div>
    <div class="signup body-container">
      <div class="type-selection" v-if="showMemberTypeForm && !errorMessage">
        <div class="content mb-5">
          <h3 class="mt-3 text-header-black font-weight-bolder">
            Welcome To <span class="logo-text">Matrimony Assist</span> Signup
          </h3>
          <div class="type mx-auto">
            <p class="text-center py-2">
              Let's get started. Please select your account type, you are
              registering as a
            </p>

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
                  <button
                    class="btn no-shadow disabled p-2 fs-20 br-30 btn-type mt-5"
                  >
                    Match Maker
                  </button>
                  <p
                    class="fs-12 mt-5"
                    v-for="(info, iIndex) in getInstruction"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
            </a-row>

            <a-row :gutter="16" class="desktop-view">
              <a-col :span="8">
                <a-card class="br-card shadow type-card">
                  <button
                    @click="onSelectAccountType(1)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 1 }"
                  >
                    Candidate
                  </button>
                  <p
                    class="fs-12 mt-5"
                    v-for="(info, iIndex) in instructions[0].data"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card class="br-card shadow type-card">
                  <button
                    @click="onSelectAccountType(2)"
                    class="btn no-shadow p-2 fs-20 br-30 btn-type"
                    :class="{ active: signupModel.account_type == 2 }"
                  >
                    Representative
                  </button>
                  <p
                    class="fs-12 mt-5"
                    v-for="(info, iIndex) in instructions[1].data"
                    :key="iIndex"
                  >
                    <a-icon type="check" class="text-success" /> {{ info }}
                  </p>
                </a-card>
              </a-col>
              <a-col :span="8">
                <a-card class="br-card shadow type-card">
                  <button
                    class="btn no-shadow disabled p-2 fs-20 br-30 btn-type"
                  >
                    Match Maker
                  </button>
                  <p
                    class="fs-12 mt-5"
                    v-for="(info, iIndex) in instructions[2].data"
                    :key="iIndex"
                  >
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
                <span class="confirm-text text-white"
                  >Confirm I'm a
                  <span class="fw-600">{{
                    signupModel.account_type == 1
                      ? "Candidate"
                      : "Representative"
                  }}</span></span
                >
              </p>
              <button
                class="btn btn-continue w-50 fs-20"
                @click="onHandleContinue"
              >
                Continue
              </button>
            </div>
          </div>
          <p class="flex-center-center mt-3 bottom-text font-poppins">
            Already on <span class="logo-text ml-2"> Matrimony Assist? </span>

            <router-link
              to="/login"
              class="
                btn btn-sm-sign btn-outline-primary btn-round-sm
                ms-2
                text-nowrap
                join-now-btn
              "
            >
              Sign in
            </router-link>
          </p>
        </div>
      </div>

<!--      <div class="type-selection" v-if="showMemberFormType && !errorMessage">-->
<!--        <div class="content mb-5">-->
<!--          <h3 class="mt-3 text-header-black font-weight-bolder">-->
<!--            Welcome To <span class="logo-text">Matrimony Assist</span> Signup-->
<!--          </h3>-->
<!--          <div class="type mx-auto">-->
<!--            <p class="text-center py-2">How would you like to complete the registration form?</p>-->

<!--            <a-row :gutter="16" class="mobile-view">-->
<!--              <a-col :span="24">-->
<!--                <a-card class="br-card shadow">-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 1"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type"-->
<!--                      :class="{ active: signupModel.form_type == 1 }"-->
<!--                  >-->
<!--                    Long Form-->
<!--                  </button>-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 2"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type mt-5"-->
<!--                      :class="{ active: signupModel.form_type == 2 }"-->
<!--                  >-->
<!--                    Short Form-->
<!--                  </button>-->
<!--                  <p class="fs-12 mt-5">-->
<!--                    <a-icon type="check" class="text-success"/>-->
<!--                    You have to complete the {{ signupModel.form_type == 2 ? 'short form' : 'full form' }} of-->
<!--                    candidate-->
<!--                  </p>-->
<!--                </a-card>-->
<!--              </a-col>-->
<!--            </a-row>-->

<!--            <a-row :gutter="16" class="desktop-view">-->
<!--              <a-col :span="12">-->
<!--                <a-card class="br-card shadow type-card">-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 1"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type"-->
<!--                      :class="{ active: signupModel.form_type == 1 }"-->
<!--                  >-->
<!--                    Long Form-->
<!--                  </button>-->
<!--                  <p class="fs-12 mt-5">-->
<!--                    <a-icon type="check" class="text-success"/>-->
<!--                    You have to complete the full form of candidate-->
<!--                  </p>-->
<!--                </a-card>-->
<!--              </a-col>-->
<!--              <a-col :span="12">-->
<!--                <a-card class="br-card shadow type-card">-->
<!--                  <button-->
<!--                      @click="signupModel.form_type = 2"-->
<!--                      class="btn no-shadow p-2 fs-20 br-30 btn-type"-->
<!--                      :class="{ active: signupModel.form_type == 2 }"-->
<!--                  >-->
<!--                    Short Form-->
<!--                  </button>-->
<!--                  <p class="fs-12 mt-5">-->
<!--                    <a-icon type="check" class="text-success"/>-->
<!--                    You have to complete the short form of candidate-->
<!--                  </p>-->
<!--                </a-card>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--            <div class="mt-5 footer" v-if="signupModel.account_type > 0">-->
<!--              <button-->
<!--                  class="btn btn-continue w-50 fs-20 mt-4"-->
<!--                  @click="selectNexStepAfterFormType"-->
<!--              >-->
<!--                Continue-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <p class="flex-center-center mt-3 bottom-text font-poppins">-->
<!--            Already on <span class="logo-text ml-2"> Matrimony Assist? </span>-->

<!--            <router-link-->
<!--                to="/login"-->
<!--                class="-->
<!--                    btn btn-sm-sign btn-outline-primary btn-round-sm-->
<!--                    ms-2-->
<!--                    text-nowrap-->
<!--                    join-now-btn-->
<!--                  "-->
<!--            >-->
<!--              Sign in-->
<!--            </router-link>-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->

      < h3
        v-if="!showMemberTypeForm && !showMemberFormType"
        class="mt-6 text-header-black font-weight-bolder text-center"
      >
        Welcome To <span class="logo-text">Matrimony Assist</span> Signup
      </h3>

      <div v-if="showMemberForm && !errorMessage" class="signup-inner">
        <a-form-model
          ref="signupFormTwo"
          :model="signupModel"
          :rules="rules"
          class="form-signup br-card"
        >
          <div>
            <h4 class="fs-16 text-white fw-400">Type your name</h4>
            <div class="mb-3">
              <a-form-model-item ref="first_name" prop="first_name">
                <a-input
                  type="text"
                  class="form-control fs-16"
                  id="first_name"
                  @change="generateScreenName"
                  v-model="signupModel.first_name"
                  placeholder="First Name"
                />
              </a-form-model-item>
            </div>
            <div class="mb-3">
              <a-form-model-item ref="last_name" prop="last_name">
                <a-input
                  type="text"
                  class="form-control fs-16"
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
                  class="form-control fs-16"
                  id="screen_name"
                  v-model="signupModel.screen_name"
                  placeholder="* Screen Name"
                  :maxLength="15"
                  @change="trimTheScreenName"
                />
              </a-form-model-item>
            </div>

            <a-tooltip placement="right" class="fs-12 mb-2">
              <template v-slot:title>
                We have made a screen name for you, you can keep it or change to
                something suitable. Please make sure you choose a screen name
                wisely as it communicates something about yourself.
              </template>
              <span class="text-white"
                >* Please choose a sensible screen name, if you don't wish your
                real name to appear on search result.</span
              >
            </a-tooltip>
            <a-button
              @click="backToMemberType"
              class="btn btn-secondary w-100"
              type="primary"
              :loading="isLoading"
            >
              Back
            </a-button>
            <button
              @click="handleSubmit"
              class="btn btn-continue w-100 mt-2 h-32 pt-1"
            >
              Continue
            </button>
          </div>
        </a-form-model>
        <p class="flex-center-center mt-3 bottom-text">
          Already on <span class="logo-text ml-2"> Matrimony Assist? </span>

          <router-link
            to="/login"
            class="
              btn btn-sm-sign btn-outline-primary btn-round-sm
              ms-2
              text-nowrap
              join-now-btn
            "
          >
            Sign in
          </router-link>
        </p>
      </div>

      <div v-if="showSignupForm && !errorMessage" class="signup-inner">
        <!--        <a href="/" class="logo"-->
        <!--          ><img src="@/assets/logo.png" alt="logo" class="mat-logo"-->
        <!--        /></a>-->
        <a-form-model
          ref="signupFormOne"
          :model="signupModel"
          :rules="rules"
          class="form-signup"
        >
          <div>
            <h4 class="fs-16 text-white fw-400">Type your email & password</h4>
            <div class="mb-3">
              <a-form-model-item ref="email" prop="email">
                <a-input
                  type="email"
                  class="fs-16"
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
                  id="password"
                  v-model="signupModel.password"
                  placeholder="Password"
                  class="fs-16"
                />
              </a-form-model-item>
            </div>
            <div class="mb-3">
              <a-form-model-item ref="confirmPassword" prop="confirmPassword">
                <a-input-password
                  type="password"
                  id="confirmPassword"
                  v-model="signupModel.confirmPassword"
                  placeholder="Confirm password"
                  class="fs-16"
                />
              </a-form-model-item>
            </div>
            <button
              @click="backToForm"
              class="btn btn-secondary w-100 mt-1 h-32 pt-1"
            >
              Back
            </button>
            <button
              @click="handleSubmitSignUp"
              class="btn submit w-100 h-32 mt-2"
            >
              <a-icon type="loading" class="text-white" v-if="isLoading" />
              Agree & Join
            </button>
            <!--            <div class="loading-dock position-relative mt-1 h-32 pt-1">-->
            <!--              <svg id="load-b" x="0px" y="0px" viewBox="0 0 150 150">-->
            <!--                <circle class="loading-inner" cx="75" cy="75" r="60"/>-->
            <!--              </svg>-->
            <!--              <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">-->
            <!--                <circle class="loading-inner" cx="75" cy="75" r="60"/>-->
            <!--              </svg>-->
            <!--              <button class="btn btn-block submit h-32" @click="handleSubmitSignUp">Agree & join</button>-->
            <!--              <svg id="check" style="width:24px; height:24px" viewBox="0 0 24 24">-->
            <!--                <path fill="#FFFFFF" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />-->
            <!--              </svg>-->
            <!--            </div>-->

            <span class="fs-12 mt-2 text-white"
              >By clicking Agree & Join, you agree to Matrimony Assist
              <a class="link" href="/user-agreement">User Agreement, </a>
              <a class="link" href="/privacy-cookie-policy"
                >Privacy and Cookie Policy</a
              >
            </span>
          </div>
        </a-form-model>
        <p class="flex-center-center mt-3 bottom-text">
          Already on <span class="logo-text"> Matrimony Assist? </span>

          <router-link
            to="/login"
            class="
              btn btn-sm-sign btn-outline-primary btn-round-sm
              ms-2
              text-nowrap
              join-now-btn
            "
          >
            Sign in
          </router-link>
        </p>
      </div>

      <div v-if="errorMessage" class="signup-inner mt-5">
        <div class="error pt-2">
          <p class="mb-0">
            {{ errorMessage }}
          </p>
          <div class="flex justify-content-center align-items-center">
            <button @click="resetData" class="mt-2">
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
            <h4 class="fs-16 pt-3 pl-2 pr-1 text-white">or</h4>
            <button @click="resetData" class="mt-2">
              <router-link
                to="/signup"
                class="
                  btn btn-sm btn-outline-primary btn-round-sm btn-signinup
                  ms-2
                  text-nowrap
                  join-now-btn
                "
              >
                Join now with another email
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer class="footer-container" :class="{ 'footer-pos': errorMessage }" />
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
      var regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (value === "") {
        callback(new Error("Enter a password"));
      }
      if (!regex.test(value)) {
        callback(
          new Error(
            "Your password must contain at least 8 characters including a symbol, upper and lower case letters and a number."
          )
        );
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
        form_type: 1,
      },
      instructions: [
        {
          title: "candidiate",
          data: [
            "Candidate is either the bride or groom looking to get married",
            "Create your own team or join a team",
            "Represented by only ONE team",
            "Be a representative for another 4 candidates",
          ],
        },
        {
          title: "representative",
          data: [
            "Anyone can be a representative, they simply help and guide the candidate to find suitable match",
            "Create your own team or join a team",
            "Can switch account to candidate",
            "Can create or join upto 5 teams",
          ],
        },
        {
          title: "match-maker",
          data: [
            "Matchmaker is a professional who helps the candidate to find prospects ",
            "Matchmaker role is same as representative",
            "Can not switch membership to candidate",
            "Can create or join upto 100+ teams",
          ],
        },
      ],
      showMemberForm: false,
      showMemberTypeForm: true,
      showSignupForm: false,
      showMemberFormType: false,
      isLoading: false,
      isConfirm: false,
      rules: {
        email: [
          {
            required: true,
            message: "Choose a email address",
            trigger: "change",
          },
          {
            type: "email",
            message: "Please input a valid email",
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
          {
            required: true,
            message: "Enter last name",
            trigger: "change",
            color: "#FFFFFFF",
          },
          {
            min: 3,
            message: "Use 3 characters or more for your last name",
            trigger: "blur",
          },
        ],

        password: [{ validator: validatePass, trigger: "change" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }, ,],
      },
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters["errorMessage"];
    },
    getInstruction() {
      let index = 0;
      if (this.signupModel && this.signupModel.account_type) {
        return this.instructions[this.signupModel.account_type - 1].data;
      }
      return this.instructions[index].data;
    },
  },
  methods: {
    trimTheScreenName() {
      this.signupModel.screen_name = this.signupModel.screen_name.replace(
        /[^A-Z0-9]/gi,
        ""
      );
    },
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
            form_type
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
              form_type
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
    selectNexStepAfterFormType() {
      this.showMemberTypeForm = false;
      this.showMemberFormType = false;
      this.showSignupForm = false;
      this.showMemberForm = true;
    },
    onHandleContinue() {
      if (this.isConfirm) {
        this.showMemberTypeForm = false;

        // short & long form
        // if(this.signupModel.account_type == 1) {
        //   this.showMemberFormType = true;
        //   this.showSignupForm = false;
        //   this.showMemberForm = false;
        //
        // } else {
        //   this.showSignupForm = false;
        //   this.showMemberForm = true;
        //   this.showMemberFormType = false;
        // }

        // old
        this.showSignupForm = false;
        this.showMemberForm = true;
      } else {
        this.$error({
          title: "Please confirm your account type",
          center: true,
        });
      }
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
      this.isLoading = false;
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
    addLoader() {
      let submit = document.querySelector(".submit");
      submit.classList.remove("return");
      submit.blur();
      document.querySelector(".loading-dock").classList.add("loaded");
      document.getElementById("load").style.display = "initial";
      document.getElementById("load-b").style.display = "initial";
      setTimeout(function () {
        document.getElementById("load").style.opacity = 1;
      }, 750);
      setTimeout(function () {
        document.getElementById("load-b").style.opacity = 1;
      }, 1400);
    },
    removeLoader() {
      let submit = document.querySelector(".submit");
      document.querySelector(".loading-dock").classList.remove("loaded");
      document.getElementById("load").style.display = "none";
      document.getElementById("load-b").style.display = "none";
      document.getElementById("load").style.opacity = 0;
      document.getElementById("load-b").style.opacity = 0;
      submit.classList.add("return");
      submit.innerHTML = "Submit";
      document.getElementById("check").style.display = "none";
    },
  },
  created() {
    this.$store.state.auth.errorMessage = null;
  }
};
</script>

<style scoped lang="scss">
$turquoise: #2cd797;
$dark-text: hsl(0, 0%, 13%);
$border-width: 2px;
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_inputs.scss";
.signup-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh);
  overflow-y: auto;
  .signup {
    @media (min-width: 768px) {
      //height: 100vh;
    }
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
      //background-image: linear-gradient(
      //        0deg,
      //        #e02076 0%,
      //        #932784 50%,
      //        #522e8e 100%
      //);
      @media (min-width: 768px) {
        padding: 16px 15px;
      }
      .error {
        color: #ffffff;
        height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
      }
      .logo {
        max-width: 250px;
        display: inline-block;
        margin-bottom: 20px;
        .mat-logo {
          width: 138px;
          @media (min-width: 768px) {
            width: 200px;
            height: 130px;
          }
        }
      }
      .form-signup {
        background-image: linear-gradient(
          0deg,
          #e02076 0%,
          #932784 50%,
          #522e8e 100%
        );
        //background: $bg-white;
        padding: 20px;
        border-radius: 5px;
        @media (min-width: 768px) {
          margin-top: 8px;
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
        color: #92e0f1;
        &:hover {
          text-decoration: underline;
        }
      }
      .bottom-text {
        //color: white;
        font-size: 12px;
        @media (min-width: 768px) {
          font-size: 16px;
        }
        .logo-text {
          font-family: $header-font;
          margin-left: 10px;
          margin-right: 5px;
          font-size: 16px;
          @media (min-width: 768px) {
            font-size: 24px;
          }
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
  //color: #ffffff;
  font-size: 14px;
  //border: 1px solid #ffffff;
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
  color: #ffffff;
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
.logo-text {
  color: $color-brand !important;
  font-style: italic;
  font-family: $header-font;
  font-size: 20px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
}
.mat-logo {
  width: 120px;
  height: 80px;
  @media (min-width: 768px) {
    width: 170px;
    height: 110px;
  }
}
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
.type-card {
  height: 320px;
  @media (min-width: 1240px) {
    height: auto;
  }
}
.btn-continue {
  border-radius: 30px;
  border: 2px solid $color-white;
  //color: $turquoise;
  color: #ffffff;
  &:hover {
    background: $turquoise;
    color: #ffffff;
  }
}
.btn-secondary {
  &:hover {
    background: $bg-white !important;
    color: $color-primary !important;
    border: none !important;
    box-shadow: none;
  }
}
.h-32 {
  height: 32px;
}
.btn.btn-sm-sign {
  font-size: 12px;
  padding: 1px 8px;
  border: 1px solid #522e8e;
  color: $color-primary;
  font-family: "Poppins", sans-serif;
  &:hover {
    color: #ffffff;
  }
}
.ant-form-explain {
  color: #ffffff !important;
}
//agree button css
.loading-dock {
  //width: 330px;
  //height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button.submit {
  cursor: pointer;
  width: 100%;
  color: white;
  border-radius: 40px;
  border: 1px solid $border-white;
  transition: all 0.2s;
  font-size: 16px;
  padding-top: 3px;
  &:hover {
    background: $turquoise;
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    //background: $turquoise;
    color: white;
    box-shadow: none;
  }

  &.popout {
    animation: circle-to-button 0.5s linear forwards;
  }
  &.return {
    animation: fade-to-original 0.3s linear;
    &:hover {
      background: $turquoise;
      color: white;
    }
  }
}
.btn-signinup {
  color: #ffffff;
  border: 1px solid #ffffff;
  font-size: 10px;
  @media (min-width: 576px) {
    font-size: 12px;
  }
}
.footer-pos {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.loaded {
  button.submit {
    background-color: $turquoise;
    animation: button-to-circle 0.5s linear forwards;
    animation-delay: 0.3s;
  }
  #load {
    animation: loading-circle 3s linear forwards;
    animation-delay: 1s;
  }
}

#load,
#load-b {
  display: none;
  position: absolute;
  width: 58px;
  height: 58px;
  opacity: 0;
  .loading-inner {
    stroke: {
      dasharray: 900;
      // Thickness of line
      width: 8;
      miterlimit: 10;
      linecap: round;
    }
    stroke: #c3c3c3;
    fill: transparent;
  }
}
#load-b {
  opacity: 0;
  .loading-inner {
    stroke: $turquoise;
  }
}

svg {
  position: absolute;
  display: none;
}

@keyframes loading-circle {
  0% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
  50% {
    opacity: 1;
    stroke-dashoffset: -100;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: -600;
  }
}

@keyframes button-to-circle {
  0% {
    width: 160px;
    color: $turquoise;
    border-color: $turquoise;
    background-color: $turquoise;
  }
  50% {
    color: rgba(255, 255, 255, 0);
  }
  90% {
    width: 50px;
    color: rgba(255, 255, 255, 0);
    border-color: #c3c3c3;
  }
  100% {
    width: 50px;
    border-color: rgba(255, 255, 255, 0);
    color: rgba(255, 255, 255, 0);
    background-color: rgba(255, 255, 255, 0);
  }
}

@keyframes circle-to-button {
  0% {
    border-color: $turquoise;
    background-color: $turquoise;
    height: 50px;
    width: 50px;
  }
  50% {
    height: 50px;
    width: 50px;
  }
  100% {
    height: 50px;
    width: 160px;
    border-color: $turquoise;
    background-color: $turquoise;
  }
}

@keyframes fade-to-original {
  0% {
    background-color: $turquoise;
  }
  100% {
    background-color: white;
  }
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.header-container {
  flex-shrink: 0;
}
.body-container {
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
}
.footer-container {
  flex-shrink: 0;
}
.fs-16 {
  input {
    font-size: 16px !important;
  }
}
</style>