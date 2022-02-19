<template>
  <div id="accordion" class="personal-info">
    <a-collapse
      accordion
      :activeKey="activeKey"
      :bordered="false"
      @change="onChangePanel"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <a-collapse-panel key="1" header="1. Essential Information">
        <a-form-model
          ref="repPersonalInfoFormOne"
          :rules="rules"
          v-if="personalInformation && personalInformation.essential"
          :model="personalInformation.essential"
          class="form-ma"
        >
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_gender"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your gender?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_gender" prop="per_gender">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'per_gender', 'essential')"
                  id="per_gender"
                  placeholder="please select"
                  :reduce="(option) => option.value"
                  v-model="personalInformation.essential.per_gender"
                  label="name"
                  :options="[
                    { name: 'Male', value: 1 },
                    { name: 'Female', value: 2 },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needper_gender"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[0].first"
                    @click="toggle(0)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(0)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="Needper_gender"
              >
                <div class="card card-body bubble">
                  Please make sure your gender selection is correct. After
                  submitting your profile form for approval, a mistake can only
                  be changed by MatrimonyAssist Admin. This is because a
                  representative can be a candidate also in another team.
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.dob"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your date of birth?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="dob" prop="dob">
                <DropdownDatePicker
                  id="dob"
                  displayFormat="dmy"
                  dropdownClass="custom-select"
                  :key="default_date"
                  :default-date="personalInformation.essential.dob"
                  v-model="personalInformation.essential.dob"
                  :on-change="onChangeDD"
                  :maxYear="new Date().getFullYear() - 18"
                  :minYear="1940"
                ></DropdownDatePicker>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needdob"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[1].first"
                    @click="toggle(1)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(1)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div data-parent="#accordion" class="collapse" id="Needdob">
                <div class="card card-body bubble">
                  Please make sure your DoB is correct. Once your profile is
                  submitted for approval a mistake can only be changed by
                  contacting MatrimonyAssist Admin Team with a valid proof of
                  ID. This is important because a representative can be a
                  candidate in another team.
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_occupation"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your occupation?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_occupation" prop="per_occupation">
                <v-select
                  :clearable="false"
                  :open="true"
                  class="style-chooser"
                  @input="onValueChange($event, 'per_occupation', 'essential')"
                  id="per_occupation"
                  placeholder="please select"
                  :reduce="(option) => option.name"
                  v-model="personalInformation.essential.per_occupation"
                  label="name"
                  :options="representativeDetails.occupations"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>

              <a-input
                class="w-100 mt-2"
                placeholder="Please specify"
                v-if="personalInformation.essential.per_occupation == 'Other'"
                @blur="onValueChange($event, 'per_occupation', 'essential')"
              />
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needper_occupation"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[2].first"
                    @click="toggle(2)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(2)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="Needper_occupation"
              >
                <div class="card card-body bubble">
                  We ask this question about your occupation for monitoring
                  purposes to understand the different types of people who are
                  happily giving their time to assist a loved one to find a
                  marriage partner.
                </div>
              </div>
            </div>
          </div>

          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormOne"
          >
            Save & Continue
          </a-button>
        </a-form-model>
      </a-collapse-panel>
      <a-collapse-panel
        key="2"
        header="2. Contact Details"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="repPersonalInfoFormTwo"
          v-if="personalInformation && personalInformation.personal"
          :model="personalInformation.personal"
          :rules="rules_personal"
          class="form-ma"
        >
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.personal
                      .per_current_residence_country &&
                    personalInformation.personal.per_current_residence_city
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />
                Where is your current place of residence?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-12 col-md-6">
                  <a-form-model-item
                    ref="per_current_residence_country"
                    prop="per_current_residence_country"
                  >
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onCountryChange($event, 'per_current_residence_country','contact')"
                      id="per_current_residence_country"
                      :placeholder="'Country'"
                      v-model="
                        personalInformation.personal
                          .per_current_residence_country
                      "
                      label="name"
                      :reduce="(option) => option.id"
                      :options="representativeDetails.countries"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-6">
                  <a-form-model-item
                    ref="per_current_residence_city"
                    prop="per_current_residence_city"
                  >
                    <v-select
                      :clearable="false"
                      :loading="loading"
                      class="style-chooser"
                      @input="
                        onValueChange(
                          $event,
                          'per_current_residence_city',
                          'contact'
                        )
                      "
                      id="per_current_residence_city"
                      placeholder="Select City"
                      :reduce="(option) => option.name"
                      v-model="
                        personalInformation.personal.per_current_residence_city
                      "
                      label="name"
                      :options="personalInformation.personal.residenceCities"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </a-form-model-item>
                </div>
              </div>
              <a-input
                class="w-100 mt-2"
                v-if="
                  personalInformation.personal.per_current_residence_country ==
                    'Other' ||
                  personalInformation.personal.per_current_residence_city ==
                    'Other'
                "
                placeholder="Please specify"
                @change="
                  onValueChange($event, 'per_current_residence_city', 'contact')
                "
              />
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needper_current_residence_country"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[3].first"
                    @click="toggle(3)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(3)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="Needper_current_residence_country"
              >
                <div class="card card-body bubble">
                  We ask this question as we may need to crosscheck this
                  information with any future ID checks that may be necessary in
                  case there are queries about the authenticity of individual
                  registrations.
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.personal.mobile_number"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your Phone number?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="mobile_number" prop="mobile_number">
                <a-input
                  class="w-100"
                  placeholder="+8801685117737"
                  id="inputNumber"
                  :maxLength="10"
                  v-model="personalInformation.personal.mobile_number"
                  @blur="onValueChange($event, 'mobile_number', 'contact')"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needmobile_number"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[4].first"
                    @click="toggle(4)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(4)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div
                data-parent="#accordion"
                class="collapse"
                id="Needmobile_number"
              >
                <div class="card card-body bubble">
                  Please provide tooltip texts so we can place it here
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your Email address?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-input
                class="w-100"
                placeholder="Email Address"
                id="inputNumber"
                :value="personalInformation.personal.email"
                :disabled="true"
              />
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#Needemail"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span
                    v-if="arr[5].first"
                    @click="toggle(5)"
                  >
                    Need Help?
                  </span>
                  <span v-else @click="toggle(5)">
                    Hide Help?
                  </span>
                </a>
              </p>
              <div data-parent="#accordion" class="collapse" id="Needemail">
                <div class="card card-body bubble">
                  Please provide tooltip texts so we can place it here
                </div>
              </div>
            </div>
          </div>
          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormTwo"
          >
            Save & Continue
          </a-button>
        </a-form-model>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import DropdownDatePicker from "vue-dropdown-datepicker";
import ApiService from "@/services/api.service";
import vSelect from "vue-select";
import { RULES, RULES_PERSONAL } from "./models/representative";
export default {
  props: {
    representativeDetails: {
      type: Object,
    },
    personalInformation: {
      type: Object,
    },
  },
  name: "personInfoRefTwo",
  components: {
    DropdownDatePicker,
    vSelect,
  },
  data() {
    return {
      rules: RULES,
      rules_personal: RULES_PERSONAL,
      arr: [
        { first: true },
        { first: true },
        { first: true },
        { first: true },
        { first: true },

        { first: true },
        { first: true },
        { first: true },

        { first: true },
        { first: true },
        { first: true },
      ],
      activeKey: ["1"],
      default_date: null,
      phoneNumber: undefined,
    };
  },

  async mounted() {},
  methods: {
       checkValidation(name,action) {
      switch (action) {
        case "essential":
          this.$refs.personalInfoFormOne.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
        case "general":
          this.$refs.personalInfoFormTwo.fields.forEach((f) => {
            if (f.prop == name) {
              f.onFieldBlur();
            }
          });
          break;
      
      }
    },
    handleSubmitFormOne() {
      this.$refs.repPersonalInfoFormOne.validate((valid) => {
        if (valid) {
          this.activeKey = ["2"];
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    handleSubmitFormTwo() {
      this.$refs.repPersonalInfoFormTwo.validate((valid) => {
        if (valid) {
          this.activeKey = null;
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    onValueChange(e, name, action) {
      this.checkValidation(name, action);
      this.save(action);
    },
    async saveEssentialInfo() {
      await this.$store
        .dispatch("createPersonalInfoForRepresentative", {
          ...this.personalInformation.essential,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch((error) => {});
    },
    async saveContactInfo() {
      await this.$store
        .dispatch(
          "creatContactInfoForRepresentative",
          this.personalInformation.personal
        )
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 0,
          });
        })
        .catch((error) => {});
    },
    save(action) {
      switch (action) {
        case "essential":
          this.saveEssentialInfo();
          break;

        case "contact":
          this.saveContactInfo();
          break;
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    toggle(index) {
      this.arr = this.arr.map((a, ind) => {
        if (ind === index) {
          a.first = !a.first;
        } else {
          a.first = true;
        }
        return a;
      });
    },
    onChangeDD(d, m, y) {
      this.save("essential");
    },
    onChangePanel(e) {
      this.activeKey = e;
      this.$emit("pannelChanged", e);
    },
    async onCountryChange(e,name, action) {
       this.checkValidation(name, action);
      if (action === "per_current_residence_country") {
        this.loading = true;
      } else {
        this.loadingPermanant = true;
      }
      const res = await ApiService.get(`v1/utilities/cities/${e}`);
      this.loading = false;
      this.loadingPermanant = false;
      if (res.status === 200) {
        switch (action) {
          case "permanant":
            this.personalInformation.personal.permanantCities = [];
            this.personalInformation.personal.permanantCities.push(
              ...res.data.data
            );
            break;
          case "residence":
            this.personalInformation.personal.residenceCities = [];
            this.personalInformation.personal.residenceCities.push(
              ...res.data.data
            );
            break;
        }
      }

      this.saveContactInfo();
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
@import "@/styles/base/_generic.scss";
.anticon {
  color: #b3b2b2;
}
.ant-tooltip-inner {
  border-radius: 0px;
}
.mobile-margin {
  margin-top: 0.5rem;
}
.mobile-center {
  text-align: center;
}
.mobile-switch {
  margin-top: 12px;
}
@media (min-width: 768px) {
  .form-right-content {
    float: right;
    padding-right: 0;
  }
  .mobile-margin {
    margin-top: 0;
  }
  .non-padding-mobile-margin {
    margin-top: 0;
  }
  .mobile-center {
    text-align: left;
  }
  .mobile-switch {
    margin-top: 0;
  }
}
</style>
