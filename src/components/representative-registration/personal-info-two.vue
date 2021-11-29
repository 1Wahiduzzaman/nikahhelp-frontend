<template>
  <div class="personal-info">
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
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_gender"
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
                  <a-form-model-item ref="per_gender" prop="per_gender">
                    <a-select
                      @change="onValueChange($event, 'per_gender', 'essential')"
                      id="per_gender"
                      ref="select"
                      placeholder="Select gender"
                      class="select-ma w-100"
                      v-model="personalInformation.essential.per_gender"
                    >
                      <a-select-option disabled :value="0"
                        >Select your gender</a-select-option
                      >
                      <a-select-option :value="1">Male</a-select-option>
                      <a-select-option :value="2">Female</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row type="flex" justify="between" align="top"> -->
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.dob"
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
                  <!-- <a-date-picker class="w-100" v-model.lazy="personalInformation.essential.dob" /> -->
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
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row type="flex" justify="between" align="top"> -->
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_occupation"
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
                    v-model="personalInformation.essential.per_occupation"
                    class="select-ma w-100"
                    placeholder="Select Occupation"
                    @change="
                      onValueChange($event, 'per_occupation', 'essential')
                    "
                  >
                    <a-select-option
                      :value="value"
                      :key="key"
                      style="width: 100px"
                      v-for="(value, key) in representativeDetails.occupations"
                    >
                      {{ value }}
                    </a-select-option>

                    <!-- <a-select-option value="Other"> Other </a-select-option> -->
                  </a-select>
                  <a-input
                    class="w-100 mt-2"
                    placeholder="Please specify"
                    v-if="
                      personalInformation.essential.per_occupation == 'Other'
                    "
                    @blur="onValueChange($event, 'per_occupation', 'essential')"
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
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
              <!-- <a-row :gutter="[16]" type="flex" justify="between" align="top"> -->
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.personal.per_county &&
                        personalInformation.personal.per_current_residence_city
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
                        v-model="personalInformation.personal.per_county"
                        class="select-ma w-100"
                        :placeholder="'Country'"
                        @change="onChangeCountryResidence"
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

                        <!-- <a-select-option value="Other"> Other </a-select-option> -->
                      </a-select>
                    </a-col>
                    <a-col :span="12">
                      <a-select
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="
                          personalInformation.personal
                            .per_current_residence_city
                        "
                        class="select-ma w-100"
                        placeholder="Select Issue"
                        @change="
                          onValueChange(
                            $event,
                            'per_current_residence_city',
                            'contact'
                          )
                        "
                      >
                        <a-select-option
                          :value="value"
                          :key="key"
                          style="width: 100px"
                          v-for="(value, key) in representativeDetails.cities"
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
                      personalInformation.personal.per_county == 'Other' ||
                      personalInformation.personal.per_current_residence_city ==
                        'Other'
                    "
                    placeholder="Please specify"
                    @change="onValueChange($event, 'per_county', 'contact')"
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
											personalInformation.personal.country &&
											personalInformation.personal.city
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
                    <a-col :span="17"><a-input placeholder="e.gu: gu4985" v-model="personalInformation.personal.postCode" /></a-col>
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
                            personalInformation.personal
                              .per_permanent_country &&
                            personalInformation.personal.per_permanent_city
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

                            <!-- <a-select-option value="Other">
                              Other
                            </a-select-option> -->
                          </a-select>
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
              </a-row>
            </a-col>
            <a-col class="form-item py-3 border-bottom" :span="24">
              <!-- <a-row :gutter="[16]" type="flex" justify="between" align="top"> -->
              <a-row :gutter="[16]" type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.personal.mobile_number"
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
                    v-model="personalInformation.personal.mobile_number"
                    @blur="onValueChange($event, 'mobile_number', 'contact')"
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
    DropdownDatePicker,vSelect
  },
  data() {
    return {
      activeKey: ["1"],
      rules: {},
      default_date: null,
      phoneNumber: undefined,
    };
  },

  async mounted() {},
  methods: {
    onValueChange(e, name, action) {
      if (action === "essential") {
        this.personalInformation.essential[name] = e;
      } else {
        this.personalInformation.personal[name] = e;
      }
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
    onChangeCountryResidence(value) {
      this.personalInformation.personal.country = value;
      this.countries.map((_country) => {
        if (_country.name == value) {
          this.cities1 = _country.cities;
        }
      });
    },
    onChangeCountryPermanent(value) {
      this.personalInformation.personal.country = value;
      this.countries.map((_country) => {
        if (_country.name == value) {
          this.cities2 = _country.cities;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.ant-tooltip-inner {
  border-radius: 0px;
}
</style>
