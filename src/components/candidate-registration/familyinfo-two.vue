<template>
  <div class="family-info">
    <div class="section-heading heading-text">
      <h5>Family Information</h5>
      <p>Your Family's Information</p>
    </div>
    <a-collapse
      :activeKey="activePanel"
      :bordered="false"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <!-- 1. Family Details  -->
      <a-collapse-panel key="1" header="1. Family Details">
        <a-form-model
          ref="familyInformationForm"
          :model="familyInformation"
          :rules="rules"
          class="form-ma"
        >
          <a-row>
            <!-- Father's Profession -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.fathersProfession"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your father's Profession?
                  </div>
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="fathersProfession"
                    prop="fathersProfession"
                  >
                    <a-select
                      @change="onValueChange"
                      id="fathersProfession"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      placeholder="Please select Fathet's Profession"
                      v-model="familyInformation.fathersProfession"
                      class="select-ma"
                    >
                      <a-select-option :value="null" disabled
                        >Select your father's profession</a-select-option
                      >
                      <a-select-option
                        :value="value"
                        :key="key"
                        style="width: 100px"
                        v-for="(value, key) in candidateDetails.occupations"
                      >
                        {{ value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseCandidateFatherProfession"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[4].first"
                        @click="arr[4].first = !arr[4].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[4].first = !arr[4].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapseCandidateFatherProfession">
                    <div class="card card-body bubble">
                      Select your father's profession
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Mother's Profession -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.mothersProfession"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your mother's Profession?
                  </div>
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="mothersProfession"
                    prop="mothersProfession"
                  >
                    <a-select
                      @change="onValueChange"
                      id="mothersProfession"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      placeholder="Please select Fathet's Profession"
                      v-model="familyInformation.mothersProfession"
                      class="select-ma"
                    >
                      <a-select-option :value="null" disabled
                        >Select your mother's profession</a-select-option
                      >
                      <a-select-option
                        :value="value"
                        :key="key"
                        style="width: 100px"
                        v-for="(value, key) in candidateDetails.occupations"
                      >
                        {{ value }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseCandidateMotherProfession"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[3].first"
                        @click="arr[3].first = !arr[3].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[3].first = !arr[3].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapseCandidateMotherProfession">
                    <div class="card card-body bubble">
                      Select your mothers' profession
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Siblings -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.siblings"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Do you have any siblings?
                  </div>
                  <!-- <need-help title="Siblings information"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="siblings" prop="siblings">
                    <a-textarea
                      @blur="onValueChange"
                      id="siblings"
                      placeholder="2 Brothers, 2 Sisters"
                      :rows="3"
                      v-model="familyInformation.siblings"
                    ></a-textarea>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseSiblingsInfomation"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[2].first"
                        @click="arr[2].first = !arr[2].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[2].first = !arr[2].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapseSiblingsInfomation">
                    <div class="card card-body bubble">
                      Siblings information
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- About Family -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.otherFamilyInfo"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Would you like to share any other information about your
                    family?
                  </div>
                  <!-- <need-help
										title="Any other family info you would like to share"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="otherFamilyInfo"
                    prop="otherFamilyInfo"
                  >
                    <a-textarea
                      @blur="onValueChange"
                      id="otherFamilyInfo"
                      placeholder="Would you like to share any other information about your family"
                      :rows="3"
                      v-model="familyInformation.otherFamilyInfo"
                    ></a-textarea>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseAnyotherFamilyLike"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[1].first"
                        @click="arr[1].first = !arr[1].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[1].first = !arr[1].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapseAnyotherFamilyLike">
                    <div class="card card-body bubble">
                      Any other family info you would like to share
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Country Of Origin -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.countryOfOrigin"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Is your ancestral home same as your country of birth?
                  </div>
                  <!-- <need-help title="Select your country of birth"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="countryOfOrigin"
                    prop="countryOfOrigin"
                  >
                    <a-select
                      @change="onValueChange"
                      id="countryOfOrigin"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      ref="select"
                      style="width: 150px"
                      placeholder="Please select country of origin"
                      v-model="familyInformation.countryOfOrigin"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="null">
                        Select your country of birth</a-select-option
                      >
                      <a-select-option
                        show-search
                        :value="item.name"
                        v-bind:key="index"
                        style="width: 100px"
                        v-for="(item, index) in candidateDetails.countries"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseSelectCountryOfBirth"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[0].first"
                        @click="arr[0].first = !arr[0].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[0].first = !arr[0].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapseSelectCountryOfBirth">
                    <div class="card card-body bubble">
                      Select your country of birth
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-button
            shape="round"
            type="primary"
            style="float: right"
            class="mt-3"
            @click="handleSubmitForm"
          >
            Save & Continue
          </a-button>
        </a-form-model>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import {
  ARR_FAMILY_INFO,
  _PROFESSIONS,
  RULES_FAMILY_INFO,
} from "./models/candidate";
export default {
  name: "familyInfoTwo",
  components: { NeedHelp },
  props: {
    candidateDetails: {
      type: Object,
    },
  },

  data() {
    return {
      rules: RULES_FAMILY_INFO,
      familyInformation: this.getDefaultFamilyInfo(),
      arr: ARR_FAMILY_INFO,
      professions: _PROFESSIONS,
    };
  },
  created() {
    this.activePanel = 1;
  },
  mounted() {
    this.checkDisabled();
  },
  methods: {
    checkDisabled(e) {
      this.$emit("disabled", {
        value: true,
        current: 2,
      });
    },
    handleSubmitForm() {
      this.$refs.familyInformationForm.validate((valid) => {
        if (valid) {
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onValueChange(e) {
      console.log(this.familyInformation);
      this.checkDisabled();
    },
    getDefaultFamilyInfo() {
      return {
        fathersName: "",
        mothersName: "",
        fathersProfession: undefined,
        mothersProfession: undefined,
        siblings: "",
        otherFamilyInfo: "",
        countryOfOrigin: undefined,
        updateApiStatus: false,
      };
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.family-info {
  .section-heading {
    text-align: center;
    color: $color-brand;
    h5 {
      color: $color-brand;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>