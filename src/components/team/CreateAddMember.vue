<template>
  <div class="mt-4 box">
    <div class="px-4">
      <h4 class="fs-14">Team ID: #658412373</h4>
      <div class="d-flex align-items-center">
        <h4 class="fs-16">To activate team add a member</h4>
        <a-icon type="info-circle" class="ml-2 fs-12" />
      </div>
    </div>
    <div class="dropdowns d-flex mt-4">
      <a-select
          placeholder="Role"
          class="w-full"
      >
         <a-select-option value="Owner+Admin"> Owner Admin </a-select-option>
        <a-select-option value="Admin"> Admin </a-select-option>
        <a-select-option value="Member"> Member </a-select-option>
      </a-select>

      <a-select
          placeholder="Add as a"
          class="w-full ml-2"
      >
        <a-select-option value="Owner+Admin"> Candidate </a-select-option>
        <a-select-option value="Admin"> Representative </a-select-option>
        <a-select-option value="Member"> Match Maker </a-select-option>
      </a-select>

      <a-select
          placeholder="Relationship"
          class="w-full ml-2"
      >
        <a-select-option value="Owner+Admin"> Father </a-select-option>
        <a-select-option value="Admin"> Mother </a-select-option>
        <a-select-option value="Member"> Brother </a-select-option>
        <a-select-option value="Member"> Sister </a-select-option>
        <a-select-option value="Member"> Grand Father </a-select-option>
        <a-select-option value="Member"> Grand Mother </a-select-option>
        <a-select-option value="Member"> Brother-in-law </a-select-option>
        <a-select-option value="Member"> Sister-in-law </a-select-option>
      </a-select>

      <a-input
          placeholder="Paste link here"
          class="ant-input-box color-primary ml-2"
          size="medium"
      >
        <a-icon slot="suffix" type="forward" class="input-suffix fs-16" />
      </a-input>
    </div>
    <div class="position">
      <div class="position-absolute footer-cancel-btn">
        <a-button class="back-button button float-left text-white" v-on:click="$emit('cancel_button')">Back</a-button>
      </div>
      <div class="position-absolute footer-conf-btn">
        <a-button class="confirm-button button float-right bg-primary text-white" @click="goNextStep()">Save & Continue</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateAddMember",
  data() {
    return {

    }
  },
  methods: {
    goNextStep() {
      this.$emit("goNext", 4);
    }
  }
}
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.ant-input-suffix {
  right: 6px !important;
}
.box {
  .px-4 {
    .fs-14 {
      color: #aaaaaa;
    }
    .d-flex {
      .fs-16 {
        color: #aaaaaa;
      }
      .fs-12 {
        margin-top: -6px;
      }
    }
  }
  .dropdowns {
    .ant-input-box > input{
      height: 20px !important;
    }
  }
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