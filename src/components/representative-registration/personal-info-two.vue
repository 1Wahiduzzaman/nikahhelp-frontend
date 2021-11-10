<template>
  <div class="personal-info">
    <a-collapse
      accordion
      :default-active-key="activePanel"
      :key="activePanel"
      :bordered="false"
      @change="onChangePanel"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <a-collapse-panel key="1" header="1. Essential Information">
        <form class="form-ma">
          <a-row>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row type="flex" justify="between" align="top"> -->

              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="representativeInfo.gender"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your gender?
                  </div>
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      Please provide tooltip texts so we can place it
                      here</template
                    >
                    <span class="color-info fw-500">Need help?</span>
                  </a-tooltip>
                </a-col>
                <a-col span="12">
                  <!-- ToDo:: need to add a fake option as placeholders are not working -->
                  <a-select
                    class="select-ma w-100"
                    v-model="representativeInfo.gender"
                    @change="(value) => (representativeInfo.gender = value)"
                    placeholder="Select a Gender"
                  >
                    <a-select-option value="Male"> Male </a-select-option>
                    <a-select-option value="Female"> Female </a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row type="flex" justify="between" align="top"> -->
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="default_date || dobFromDatePicker"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your date of birth?
                  </div>
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      Please provide tooltip texts so we can place it
                      here</template
                    >
                    <span class="color-info fw-500">Need help?</span>
                  </a-tooltip>
                </a-col>
                <a-col :span="12" class="date-of-birth text-left">
                  <!-- <a-date-picker class="w-100" v-model.lazy="representativeInfo.dob" /> -->
                  <DropdownDatePicker
                    displayFormat="dmy"
                    dropdownClass="custom-select"
                    :key="default_date"
                    :default-date="default_date"
                    v-model="dobFromDatePicker"
                    :on-change="onChangeDD"
                    :maxYear="new Date().getFullYear() - 18"
                    :minYear="1940"
                  ></DropdownDatePicker>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row type="flex" justify="between" align="top"> -->
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="representativeInfo.occupation"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your occupation?
                  </div>
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      Please provide tooltip texts so we can place it
                      here</template
                    >
                    <span class="color-info fw-500">Need help?</span>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-select
                    :showSearch="true"
                    option-filter-prop="children"
                    :filter-option="filterOption"
                    :showArrow="true"
                    v-model="representativeInfo.occupation"
                    class="select-ma w-100"
                    placeholder="Select Occupation"
                    @change="(value) => (representativeInfo.occupation = value)"
                  >
                    <a-select-option
                      :value="value"
                      :key="key"
                      style="width: 100px"
                      v-for="(value, key) in occupations"
                    >
                      {{ value }}
                    </a-select-option>

                    <!-- <a-select-option value="Other"> Other </a-select-option> -->
                  </a-select>
                  <a-input
                    class="w-100 mt-2"
                    placeholder="Please specify"
                    v-if="representativeInfo.occupation == 'Other'"
                    @change="
                      (value) => (representativeInfo.occupationOther = value)
                    "
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </form>
      </a-collapse-panel>
      <a-collapse-panel
        key="2"
        header="2. Contact Details"
        style="margin-top: 5px"
      >
        <form class="form-ma">
          <a-row>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row :gutter="[16]" type="flex" justify="between" align="top"> -->
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        representativeResidence.country &&
                        representativeResidence.city
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />
                    Where is your current place of residance?
                  </div>
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      Please provide tooltip texts so we can place it
                      here</template
                    >
                    <span class="color-info fw-500">Need help?</span>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-row :gutter="[8]">
                    <a-col :span="12">
                      <a-select
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="representativeResidence.country"
                        class="select-ma w-100"
                        :placeholder="'Country'"
                        @change="onChangeCountryResidence"
                      >
                        <a-select-option
                          :value="value"
                          :key="key"
                          style="width: 100px"
                          v-for="(value, key) in countries"
                        >
                          {{ value.name }}
                        </a-select-option>

                        <!-- <a-select-option value="Other"> Other </a-select-option> -->
                      </a-select>
                    </a-col>
                    <a-col :span="12">
                      <a-select
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="representativeResidence.city"
                        class="select-ma w-100"
                        placeholder="Select Issue"
                        @change="
                          (value) => (representativeResidence.city = value)
                        "
                      >
                        <a-select-option
                          :value="value"
                          :key="key"
                          style="width: 100px"
                          v-for="(value, key) in cities1"
                        >
                          {{ value.name }}
                        </a-select-option>

                        <!-- <a-select-option value="Other"> Other </a-select-option> -->
                      </a-select>
                    </a-col>
                  </a-row>
                  <a-input
                    class="w-100 mt-2"
                    v-if="
                      representativeResidence.country == 'Other' ||
                      representativeResidence.city == 'Other'
                    "
                    placeholder="Please specify"
                    @change="
                      (value) =>
                        (representativeResidence.specifiedAddress = value)
                    "
                  />
                </a-col>
              </a-row>
              <!-- <a-row class="form-item py-3 border-bottom" :gutter="[16]" type="flex" justify="between" align="top"> -->
              <a-row
                class="form-item py-3 border-bottom"
                :gutter="[16]"
                type="flex"
                align="top"
              >
                <a-col :span="24">
                  <!--<a-icon
										v-if="
											representativePermanentAddress.country &&
											representativePermanentAddress.city
										"
										class="color-success mr-2 fs-18 fw-500"
										type="check"
									/> -->
                  <div class="mb-2">
                    <strong> What is your permanent address? </strong>
                  </div>
                </a-col>
                <!-- <a-col :span="12">
                  <div class="mb-2"><a-icon class="color-success mr-2 fs-18 fw-500" type="check" />Post code</div>
                </a-col>
                <a-col :span="12">
                  <a-row :gutter="[8]" type="flex">
                    <a-col :span="17"><a-input placeholder="e.gu: gu4985" v-model="representativePermanentAddress.postCode" /></a-col>
                    <a-col :span="7"><a-button class="" shape="round" type="primary">Find Address</a-button></a-col>
                  </a-row>
                </a-col> -->
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
                            representativePermanentAddress.country &&
                            representativePermanentAddress.city
                          "
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Country
                      </div>
                      <span class="color-info fw-500">Need help?</span>
                    </a-col>
                    <a-col :span="12">
                      <a-row :gutter="[8]">
                        <a-col :span="12">
                          <a-select
                            :showSearch="true"
                            option-filter-prop="children"
                            :filter-option="filterOption"
                            :showArrow="true"
                            v-model="representativePermanentAddress.country"
                            class="select-ma w-100"
                            placeholder="Select Country"
                            @change="onChangeCountryPermanent"
                          >
                            <a-select-option
                              :value="value"
                              :key="key"
                              style="width: 100px"
                              v-for="(value, key) in countries"
                            >
                              {{ value.name }}
                            </a-select-option>

                            <!-- <a-select-option value="Other">
                              Other
                            </a-select-option> -->
                          </a-select>
                        </a-col>
                        <a-col :span="12">
                          <a-select
                            :showSearch="true"
                            option-filter-prop="children"
                            :filter-option="filterOption"
                            :showArrow="true"
                            v-model="representativePermanentAddress.city"
                            class="select-ma w-100"
                            placeholder="Select City"
                            @change="
                              (value) =>
                                (representativePermanentAddress.city = value)
                            "
                          >
                            <a-select-option
                              :value="value"
                              :key="key"
                              style="width: 100px"
                              v-for="(value, key) in cities2"
                            >
                              {{ value.name }}
                            </a-select-option>

                            <!-- <a-select-option value="Other">
                              Other
                            </a-select-option> -->
                          </a-select>
                        </a-col>
                      </a-row>
                      <a-input
                        class="w-100 mt-2"
                        v-if="
                          representativePermanentAddress.country == 'Other' ||
                          representativePermanentAddress.city == 'Other'
                        "
                        placeholder="Please specify"
                        @change="
                          (value) =>
                            (representativePermanentAddress.other = value)
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
                          v-if="representativePermanentAddress.postCode"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Post Code
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <a-input
                        class="w-100 mt-2"
                        placeholder="Please specify"
                        v-model="representativePermanentAddress.postCode"
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
                          v-if="representativePermanentAddress.homeAddress"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Home Address
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <template>
                        <a-textarea
                          placeholder="Sample text here"
                          :rows="4"
                          v-model="representativePermanentAddress.homeAddress"
                        />
                      </template>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row :gutter="[16]" type="flex" justify="between" align="top"> -->
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="phoneNumber && phoneNumber.length > 10"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your Phone number?
                  </div>
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      Please provide tooltip texts so we can place it
                      here</template
                    >
                    <span class="color-info fw-500">Need help?</span>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-input
                    class="w-100"
                    placeholder="+8801685117737"
                    id="inputNumber"
                    v-model="phoneNumber"
                  />
                </a-col>
              </a-row>
            </a-col>
            <!-- <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row :gutter="[16]" type="flex" justify="between" align="top">
                <a-col :span="12">
                  <div class="mb-2"><a-icon class="color-success mr-2 fs-18 fw-500" type="check" />What is your Mobile number?</div>
                  <span class="color-info fw-500">Need help?</span>
                </a-col>
                <a-col :span="12">
                  <div class="mobile-verification">
                    <a-input-group class="mb-2">
                      <a-row :gutter="8" type="flex" align="middle">
                        <a-col :span="7">
                          <a-select class="select-ma w-100 rounded-right" placeholder="Gender">
                            <a-select-option value="jack"> Male </a-select-option>
                            <a-select-option value="lucy"> Female </a-select-option>
                          </a-select>
                        </a-col>
                        <a-col :span="13">
                          <a-input class="rounded" default-value="26888888" />
                        </a-col>
                        <a-col :span="4">
                          <a-button class="rounded-left" shape="round" type="primary">Ok</a-button>
                        </a-col>
                      </a-row>
                    </a-input-group>
                    <a-input-group class="mb-2">
                      <a-row :gutter="8" type="flex" align="middle">
                        <a-col :span="7">
                          <a-select class="select-ma w-100 rounded-right" placeholder="+44">
                            <a-select-option value="jack"> Male </a-select-option>
                            <a-select-option value="lucy"> Female </a-select-option>
                          </a-select>
                        </a-col>
                        <a-col :span="13">
                          <a-input class="rounded" default-value="26888888" />
                        </a-col>
                        <a-col :span="4">
                          <a-button class="rounded-left flex-center-center" shape="round" type="primary"
                            ><a-icon class="fs-16" type="sync"
                          /></a-button>
                        </a-col>
                      </a-row>
                    </a-input-group>
                    <span class="fs-11 color-info mb-2">Please enter the verification code we sent your phone</span>
                    <a-input-group>
                      <a-row :gutter="4">
                        <a-col :span="3">
                          <a-input class="rounded-right" default-value="" />
                        </a-col>
                        <a-col :span="3">
                          <a-input default-value="" />
                        </a-col>
                        <a-col :span="3">
                          <a-input default-value="" />
                        </a-col>
                        <a-col :span="3">
                          <a-input default-value="" />
                        </a-col>
                        <a-col :span="3">
                          <a-input default-value="" />
                        </a-col>
                        <a-col :span="3">
                          <a-input default-value="" />
                        </a-col>
                        <a-col :span="6">
                          <a-button class="rounded-left" shape="round" type="primary">verify</a-button>
                        </a-col>
                      </a-row>
                    </a-input-group>
                    <span class="fs-11 color-danger">You entered wrong verification code</span>
                    <div class="mt-2 fw-500">
                      +44 444 949403938389
                      <a-button class="btn-success" shape="round" size="small">verify</a-button>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col> -->
            <a-col class="form-item py-3" :span="24">
              <!-- <a-row :gutter="[16]" type="flex" justify="between" align="top"> -->
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your Email address?
                  </div>
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      Please provide tooltip texts so we can place it
                      here</template
                    >
                    <span class="color-info fw-500">Need help?</span>
                  </a-tooltip>
                </a-col>
                <a-col :span="12">
                  <a-input
                    class="w-100"
                    placeholder="Email Address"
                    id="inputNumber"
                    :value="$store.state.user.user.email"
                    :disabled="true"
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import DropdownDatePicker from "vue-dropdown-datepicker";
import ApiService from "../../services/api.service";
export default {
  props: ["activePanel", "repData"],
  name: "personInfoRefTwo",
  components: {
    DropdownDatePicker,
  },
  data() {
    return {
      representativeInfo: {
        gender: undefined,
        dob: undefined,
        occupation: undefined,
        ocupationOther: undefined,
      },
      representativeResidence: {
        country: undefined,
        city: undefined,
        specifiedAddress: undefined,
      },
      representativePermanentAddress: {
        postCode: undefined,
        country: undefined,
        city: undefined,
        homeAddress: undefined,
        other: undefined,
      },
      phoneNumber: undefined,
      emailAddress: this.$store.state.user.user.email,
      dobFromDatePicker: undefined,
      activeKey: "",

      default_date: undefined,

      countries: [],
      cities1: [],
      cities2: [],

      occupations: [],
    };
  },
  watch: {
    repData(newValue, preValue) {
      console.log(newValue);
      this.$forceUpdate();
    },
  },
  beforeUpdate() {
    // console.log(this.repData)
  },
  async mounted() {
    this.setPersonalInfoRepData();
    this.getCountries();
    this.getOccupations();
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async getOccupations() {
      let occupationObject = [];
      await ApiService.get("v1/occupations")
        .then((data) => {
          // console.log(data);
          occupationObject = data.data.data.occupations;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
      for (const [key, _occupation] of Object.entries(occupationObject)) {
        this.occupations.push(_occupation);
      }
    },
    async getCountries() {
      let ccObject;
      await ApiService.get("v1/utilities/countries")
        .then((data) => {
          // console.log(data);
          ccObject = data.data.data;
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
      ccObject.map((_countries) => {
        this.countries.push(_countries);
      });
    },
    async setPersonalInfoRepData() {
      console.log("Getting called");
      // console.log(this.repData);
      if (this.repData) {
        if (this.repData.per_gender != null) {
          if (this.repData.per_gender == 1) {
            this.representativeInfo.gender = "Male";
          } else if (this.repData.per_gender == 2) {
            this.representativeInfo.gender = "Female";
          }
        }

        // for setting value
        if (this.repData.dob != null) {
          this.default_date = this.repData.dob;
          this.dobFromDatePicker = this.repData.dob;
        } else {
          this.default_date = undefined;
        }

        if (this.repData.per_occupation != null) {
          this.representativeInfo.occupation = this.repData.per_occupation;
        }

        if (this.repData.per_current_residence_country != null) {
          this.representativeResidence.country =
            this.repData.per_current_residence_country;
        }

        if (this.repData.per_current_residence_city != null) {
          this.representativeResidence.city =
            this.repData.per_current_residence_city;
        }

        if (this.repData.per_permanent_country != null) {
          this.representativePermanentAddress.country =
            this.repData.per_permanent_country;
        }

        if (this.repData.per_permanent_city != null) {
          this.representativePermanentAddress.city =
            this.repData.per_permanent_city;
        }

        if (this.repData.per_permanent_post_code != null) {
          this.representativePermanentAddress.postCode =
            this.repData.per_permanent_post_code;
        }

        if (this.repData.per_permanent_address != null) {
          this.representativePermanentAddress.homeAddress =
            this.repData.per_permanent_address;
        }

        if (this.repData.per_telephone_no != null)
          this.phoneNumber = this.repData.per_telephone_no;
      }
    },
    onChangeDD(d, m, y) {
      console.log(this.dobFromDatePicker);
    },
    onChangePanel(e) {
      this.activeKey = e;
      this.$emit("pannelChanged", e);
    },
    onChangeCountryResidence(value) {
      this.representativeResidence.country = value;
      this.countries.map((_country) => {
        if (_country.name == value) {
          this.cities1 = _country.cities;
        }
      });
    },
    onChangeCountryPermanent(value) {
      this.representativePermanentAddress.country = value;
      this.countries.map((_country) => {
        if (_country.name == value) {
          this.cities2 = _country.cities;
        }
      });
    },
  },

  // watch: {
  //   activeKey(val) {
  //     console.log(val);
  //   },
  // },
};
</script>

<style>
.ant-tooltip-inner {
  border-radius: 0px;
}
</style>
