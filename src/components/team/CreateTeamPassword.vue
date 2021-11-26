<template>
  <div class="mt-4 box">
    <a-row>
      <a-col :span="24">
        <a-input
            v-model="password"
            size="large"
            type="password"
            class="team-name-input"
            placeholder="Type Team Password"
        />
      </a-col>
    </a-row>
    <a-row class="mt-4">
      <a-col :span="24">
        <a-input
            v-model="confirm_password"
            size="large"
            type="password"
            class="team-name-input"
            placeholder="Re-Type New Password"
        />
      </a-col>
    </a-row>
    <div class="position">
      <div class="position-absolute footer-cancel-btn">
        <a-button class="back-button button float-left text-white" v-on:click="$emit('cancel_button')">Back</a-button>
      </div>
      <div class="position-absolute footer-conf-btn">
        <a-button class="confirm-button button float-right bg-primary text-white" @click="goNextStep(2)">Save & Continue</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateTeamPassword",
  data() {
    return {
      password: null,
      confirm_password: null
    }
  },
  methods: {
    goNext() {
      this.$emit("goNext", 3);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.box {
  padding: 40px;
  .position {
    bottom: 50px;
    .footer-cancel-btn {
      bottom: 20px;
      left: 12px;
      .button {
        border-radius: 16px;
        background: $bg-brand;
      }
    }
    .footer-conf-btn {
      bottom: 20px;
      right: 12px;
      .button {
        border-radius: 16px;
      }
    }
  }
}
</style>
