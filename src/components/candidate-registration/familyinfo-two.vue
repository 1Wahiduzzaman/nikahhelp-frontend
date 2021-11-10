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
          v-if="familyInformation"
          :model="familyInformation"
          :rules="rules"
          class="form-ma"
        >
          <a-row>
            <!-- Father Name  -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.father_name"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Post Code
                  </div>
                  <!-- <need-help
										title="Post Code for permanent address"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_permanent_post_code"
                    prop="per_permanent_post_code"
                  >
                    <a-input
                      @blur="onValueChange"
                      id="familyInformation.father_name"
                      placeholder="Father Name"
                      v-model="familyInformation.father_name"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseFamilyInformationFatherName"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[6].first"
                        @click="arr[6].first = !arr[6].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[6].first = !arr[6].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapseFamilyInformationFatherName"
                  >
                    <div class="card card-body bubble">
                      Post Code for permanent address
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <!-- Father's Profession -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.father_profession"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your father's Profession?
                  </div>
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="father_profession"
                    prop="father_profession"
                  >
                    <a-select
                      @change="onValueChange"
                      id="father_profession"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      placeholder="Please select Fathet's Profession"
                      v-model="familyInformation.father_profession"
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
                        v-if="arr[5].first"
                        @click="arr[5].first = !arr[5].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[5].first = !arr[5].first">
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
            <!-- Father Name  -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="familyInformation.mother_name"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Post Code
                  </div>
                  <!-- <need-help
										title="Post Code for permanent address"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_permanent_post_code"
                    prop="per_permanent_post_code"
                  >
                    <a-input
                      @blur="onValueChange"
                      id="familyInformation.mother_name"
                      placeholder="Father Name"
                      v-model="familyInformation.mother_name"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapseFamilyInformationMotherName"
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
                  <div
                    class="collapse"
                    id="collapseFamilyInformationMotherName"
                  >
                    <div class="card card-body bubble">
                      Post Code for permanent address
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
                      v-if="familyInformation.mother_profession"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your mother's Profession?
                  </div>
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="mother_profession"
                    prop="mother_profession"
                  >
                    <a-select
                      @change="onValueChange"
                      id="mother_profession"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      placeholder="Please select Fathet's Profession"
                      v-model="familyInformation.mother_profession"
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
                      v-if="familyInformation.siblings_desc"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Do you have any siblings?
                  </div>
                  <!-- <need-help title="Siblings information"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="siblings_desc" prop="siblings_desc">
                    <a-textarea
                      @blur="onValueChange"
                      id="siblings_desc"
                      placeholder="2 Brothers, 2 Sisters"
                      :rows="3"
                      v-model="familyInformation.siblings_desc"
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
                      v-if="familyInformation.family_info"
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
                  <a-form-model-item ref="family_info" prop="family_info">
                    <a-textarea
                      @blur="onValueChange"
                      id="family_info"
                      placeholder="Would you like to share any other information about your family"
                      :rows="3"
                      v-model="familyInformation.family_info"
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
                      v-if="familyInformation.country_of_origin"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Is your ancestral home same as your country of birth?
                  </div>
                  <!-- <need-help title="Select your country of birth"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="country_of_origin"
                    prop="country_of_origin"
                  >
                    <a-select
                      @change="onValueChange"
                      id="country_of_origin"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      ref="select"
                      style="width: 150px"
                      placeholder="Please select country of origin"
                      v-model="familyInformation.country_of_origin"
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
          <!-- <a-button
            shape="round"
            type="primary"
            style="float: right"
            class="mt-3"
            @click="handleSubmitForm"
          >
            Save & Continue
          </a-button> -->
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
    familyInformation: {
      type: Object,
    },
  },

  data() {
    return {
      rules: RULES_FAMILY_INFO,
      // familyInformation: this.getDefaultFamilyInfo(),
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
      this.saveFamilyInfo();
    },
    getDefaultFamilyInfo() {
      return {
        country_of_origin: null,
        family_info: null,
        father_name: null,
        father_profession: null,
        is_publish: false,
        mother_name: null,
        mother_profession: null,
        siblings_desc: null,
      };
    },

    saveFamilyInfo() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.$store
        .dispatch("updateFamilyInfo", {
          ...this.familyInformation,
          uid: userInfo.id,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.familyInformation,
            current: 3,
          });
        })
        .catch((error) => {});
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