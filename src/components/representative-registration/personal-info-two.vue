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
          v-if="personalInformation && personalInformation.essential"
          :model="personalInformation.essential"
          class="form-ma"
        >
          <a-row>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row type="flex" justify="between" align="top"> -->

              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_gender"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your gender?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <!-- ToDo:: need to add a fake option as placeholders are not working -->
                  <a-form-model-item ref="per_gender" prop="per_gender">
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onValueChange($event, 'per_gender', 'essential')"
                      id="per_gender"
                      placeholder="Select gender"
                      :reduce="(option) => option.value"
                      v-model="personalInformation.essential.per_gender"
                      label="name"
                      :options="[
                        { name: 'Male', value: 1 },
                        { name: 'Female', value: 2 },
                      ]"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
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
                        @click="arr[0].first = !arr[0].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[0].first = !arr[0].first">
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
                      Please provide tooltip texts so we can place it here
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.dob"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your date of birth?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12" class="date-of-birth text-left">
                  <DropdownDatePicker
                    displayFormat="dmy"
                    dropdownClass="custom-select"
                    :key="default_date"
                    :default-date="personalInformation.essential.dob"
                    v-model="personalInformation.essential.dob"
                    :on-change="onChangeDD"
                    :maxYear="new Date().getFullYear() - 18"
                    :minYear="1940"
                  ></DropdownDatePicker>
                </a-col>
                <a-col :span="12">
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
                        @click="arr[1].first = !arr[1].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[1].first = !arr[1].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div data-parent="#accordion" class="collapse" id="Needdob">
                    <div class="card card-body bubble">
                      Please provide tooltip texts so we can place it here
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_occupation"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your occupation?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <v-select
                    :clearable="false"
                    class="style-chooser"
                    @input="
                      onValueChange($event, 'per_occupation', 'essential')
                    "
                    id="per_occupation"
                    placeholder="Select Occupation"
                    :reduce="(option) => option.name"
                    v-model="personalInformation.essential.per_occupation"
                    label="name"
                    :options="representativeDetails.occupations"
                    ><template #open-indicator>
                      <a-icon type="down" /> </template
                  ></v-select>

                  <a-input
                    class="w-100 mt-2"
                    placeholder="Please specify"
                    v-if="
                      personalInformation.essential.per_occupation == 'Other'
                    "
                    @blur="onValueChange($event, 'per_occupation', 'essential')"
                  />
                </a-col>
                <a-col :span="12">
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
                        @click="arr[2].first = !arr[2].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[2].first = !arr[2].first">
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
                      Please provide tooltip texts so we can place it here
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
          class="form-ma"
        >
          <a-row>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.personal
                          .per_current_residence_country &&
                        personalInformation.personal.per_current_residence_city
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />
                    Where is your current place of residance?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-row :gutter="[8]">
                    <a-col :span="12">
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        @input="onCountryChange($event,'residence')"
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
                    </a-col>
                    <a-col :span="12">
                      <v-select
                        :clearable="false"
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
                          personalInformation.personal
                            .per_current_residence_city
                        "
                        label="name"
                        :options="personalInformation.personal.residenceCities"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select>
                    </a-col>
                  </a-row>
                  <a-input
                    class="w-100 mt-2"
                    v-if="
                      personalInformation.personal
                        .per_current_residence_country == 'Other' ||
                      personalInformation.personal.per_current_residence_city ==
                        'Other'
                    "
                    placeholder="Please specify"
                    @change="onValueChange($event, 'per_current_residence_city', 'contact')"
                  />
                </a-col>
                <a-col :span="12">
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
                        @click="arr[3].first = !arr[3].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[3].first = !arr[3].first">
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
                      Please provide tooltip texts so we can place it here
                    </div>
                  </div>
                </a-col>
              </a-row>

              <a-row
                class="form-item py-3 border-bottom"
                :gutter="[16]"
                type="flex"
                align="top"
              >
                <a-col :span="24">
                  <!-- <a-icon
										v-if="
											personalInformation.personal.per_permanent_country &&
											personalInformation.personal.per_permanent_city
										"
										class="color-success mr-2 fs-18 fw-500"
										type="check"
									/> -->
                  <div class="mb-2">
                    <strong> What is your permanent address? </strong>
                  </div>
                </a-col>

                <a-col :span="24">
                  <!-- <a-row class="form-item py-3" :gutter="[16]" type="flex" justify="between" align="top"> -->
                  <a-row
                    class="form-item py-3"
                    :gutter="[16]"
                    type="flex"
                    align="top"
                  >
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="
                            personalInformation.personal
                              .per_permanent_country &&
                            personalInformation.personal.per_permanent_city
                          "
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Country
                      </div>
                    </a-col>
                    <a-col :span="12">
                      <a-row :gutter="[8]">
                        <a-col :span="12">
                          <v-select
                            :clearable="false"
                            class="style-chooser"
                            @input="onCountryChange($event,'permanant')"
                            id="per_permanent_country"
                            :placeholder="'Country'"
                            :reduce="(option) => option.id"
                            v-model="
                              personalInformation.personal.per_permanent_country
                            "
                            label="name"
                            :options="representativeDetails.countries"
                            ><template #open-indicator>
                              <a-icon type="down" /> </template
                          ></v-select>
                          <!-- <a-select
                            :showSearch="true"
                            option-filter-prop="children"
                            :filter-option="filterOption"
                            :showArrow="true"
                            v-model="
                              personalInformation.personal.per_permanent_country
                            "
                            class="select-ma w-100"
                            placeholder="Select Country"
                            @change="onChangeCountryPermanent"
                          >
                            <a-select-option
                              :value="value"
                              :key="key"
                              style="width: 100px"
                              v-for="(
                                value, key
                              ) in representativeDetails.countries"
                            >
                              {{ value.name }}
                            </a-select-option>

                          
                          </a-select> -->
                        </a-col>
                        <a-col :span="12">
                          <v-select
                            :clearable="false"
                            class="style-chooser"
                             @input="onValueChange($event, 'per_permanent_city', 'contact')"
                            id="per_permanent_city"
                            placeholder="Select City"
                            :reduce="(option) => option.name"
                            v-model="
                              personalInformation.personal.per_permanent_city
                            "
                            label="name"
                            :options="personalInformation.personal.permanantCities"
                            ><template #open-indicator>
                              <a-icon type="down" /> </template
                          ></v-select>
                          <!-- <a-select
                            :showSearch="true"
                            option-filter-prop="children"
                            :filter-option="filterOption"
                            :showArrow="true"
                            v-model="
                              personalInformation.personal.per_permanent_city
                            "
                            class="select-ma w-100"
                            placeholder="Select City"
                            @change="onValueChange($event, 'contact')"
                          >
                            <a-select-option
                              :value="value"
                              :key="key"
                              style="width: 100px"
                              v-for="(
                                value, key
                              ) in representativeDetails.cities"
                            >
                              {{ value.name }}
                            </a-select-option>

                           
                          </a-select> -->
                        </a-col>
                      </a-row>
                      <a-input
                        class="w-100 mt-2"
                        v-if="
                          personalInformation.personal.per_permanent_country ==
                            'Other' ||
                          personalInformation.personal.per_permanent_city ==
                            'Other'
                        "
                        placeholder="Please specify"
                        @change="
                          onValueChange($event, 'per_permanent_city', 'contact')
                        "
                      />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="24">
                  <!-- <a-row class="form-item py-3" :gutter="[16]" type="flex" justify="between" align="top"> -->
                  <a-row
                    class="form-item py-3"
                    :gutter="[16]"
                    type="flex"
                    align="top"
                  >
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="
                            personalInformation.personal.per_permanent_post_code
                          "
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Post Code
                      </div>
                    </a-col>
                    <a-col :span="12">
                      <a-input
                        class="w-100 mt-2"
                        placeholder="Please specify"
                        v-model="
                          personalInformation.personal.per_permanent_post_code
                        "
                        @blur="
                          onValueChange(
                            $event,
                            'per_permanent_post_code',
                            'contact'
                          )
                        "
                      />
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="24">
                  <!-- <a-row class="form-item py-3" :gutter="[16]" type="flex" justify="between" align="top"> -->
                  <a-row
                    class="form-item py-3"
                    :gutter="[16]"
                    type="flex"
                    align="top"
                  >
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="
                            personalInformation.personal.per_permanent_address
                          "
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Home Address
                      </div>
                    </a-col>
                    <a-col :span="12">
                      <template>
                        <a-textarea
                          placeholder="Sample text here"
                          :rows="4"
                          v-model="
                            personalInformation.personal.per_permanent_address
                          "
                          @blur="
                            onValueChange(
                              $event,
                              'per_permanent_address',
                              'contact'
                            )
                          "
                        />
                      </template>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#Needaddress"
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
                    data-parent="#accordion"
                    class="collapse"
                    id="Needaddress"
                  >
                    <div class="card card-body bubble">
                      Please provide tooltip texts so we can place it here
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.personal.mobile_number"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your Phone number?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-input
                    class="w-100"
                    placeholder="+8801685117737"
                    id="inputNumber"
                    v-model="personalInformation.personal.mobile_number"
                    @blur="onValueChange($event, 'mobile_number', 'contact')"
                  />
                </a-col>
                <a-col :span="12">
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
                    data-parent="#accordion"
                    class="collapse"
                    id="Needmobile_number"
                  >
                    <div class="card card-body bubble">
                      Please provide tooltip texts so we can place it here
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <a-col class="form-item py-3" :span="24">
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your Email address?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-input
                    class="w-100"
                    placeholder="Email Address"
                    id="inputNumber"
                    :value="personalInformation.personal.email"
                    :disabled="true"
                  />
                </a-col>
                <a-col :span="12">
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
                        @click="arr[5].first = !arr[5].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[5].first = !arr[5].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div data-parent="#accordion" class="collapse" id="Needemail">
                    <div class="card card-body bubble">
                      Please provide tooltip texts so we can place it here
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
import ApiService from "../../services/api.service";
import vSelect from "vue-select";
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
      rules: {},
      default_date: null,
      phoneNumber: undefined,
    };
  },

  async mounted() {},
  methods: {
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
      //   if (action === "essential") {
      //     this.personalInformation.essential[name] = e;
      //   } else {
      //     this.personalInformation.personal[name] = e;
      //   }
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
            current: 1,
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

    onChangeDD(d, m, y) {
      this.save("essential");
    },
    onChangePanel(e) {
      this.activeKey = e;
      this.$emit("pannelChanged", e);
    },
    async onCountryChange(e, action) {
      const res = await ApiService.get(`v1/utilities/cities/${e}`);

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
.anticon {
  color: #b3b2b2;
}
.ant-tooltip-inner {
  border-radius: 0px;
}
</style>
