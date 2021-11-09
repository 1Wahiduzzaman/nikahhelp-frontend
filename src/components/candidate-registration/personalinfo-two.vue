<template>
  <div class="personal-info">
    <div class="section-heading heading-text">
      <h5>Personal Information</h5>
      <p>Your Personal Information</p>
    </div>
    <a-collapse
      accordion
      :activeKey="activeKey"
      :bordered="false"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <!-- <pre>{{ $store.state.candidateInfo.personalInformation }}</pre> -->
      <!-- 1. Essential Information -->
      <a-collapse-panel key="1" header="1. Essential Information">
        <a-form-model
          ref="personalInfoFormOne"
          v-if="personalInformation && personalInformation.essential"
          :model="personalInformation.essential"
          :rules="rules"
          class="form-ma"
        >
          <a-row type="flex" align="top">
            <!-- Gender -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_gender"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your gender?
                  </div>
                  <!-- <need-help title="Select Your Gender"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_gender" prop="per_gender">
                    <a-select
                      @change="onValueChange($event, 'essential')"
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
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoGender"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[27].first"
                        @click="arr[27].first = !arr[27].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[27].first = !arr[27].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoGender">
                    <div class="card card-body bubble">Select Your Gender</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- DOB -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.dob"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your date of birth?
                  </div>
                  <!-- <need-help title="Choose DOB"></need-help> -->
                </a-col>
                <a-col :span="12" class="date-of-birth text-left">
                  <a-form-model-item ref="dob" prop="dob">
                    <DropdownDatePicker
                      id="dob"
                      displayFormat="dmy"
                      dropdownClass="custom-select"
                      :key="default_date"
                      :default-date="personalInformation.essential.default_date"
                      v-model="personalInformation.essential.dob"
                      :on-change="onChangeDD"
                      :maxYear="new Date().getFullYear() - 18"
                      :minYear="1940"
                    ></DropdownDatePicker>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoDateOfBirth"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[26].first"
                        @click="arr[26].first = !arr[26].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[26].first = !arr[26].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoDateOfBirth">
                    <div class="card card-body bubble">Choose DOB</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Height -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_height"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your height?
                  </div>
                  <!-- <need-help title="Please provide height in cm"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_height" prop="per_height">
                    <a-input
                      id="per_height"
                      suffix="cm"
                      @blur="onValueChange($event, 'essential')"
                      v-model.number="personalInformation.essential.per_height"
                      placeholder="Enter your height"
                      type="number"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoHeight"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[25].first"
                        @click="arr[25].first = !arr[25].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[25].first = !arr[25].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoHeight">
                    <div class="card card-body bubble">
                      Please provide height in cm
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Tele -->
            <!-- <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_telephone_no"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your Telephone No?
                  </div>
              
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_telephone_no" prop="per_telephone_no">
                    <a-input
                      id="per_telephone_no"
                      @blur="onValueChange($event, 'essential')"
                      v-model="personalInformation.essential.per_telephone_no"
                      placeholder="Enter your Telephone no"
                      type="text"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoHeight"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[25].first"
                        @click="arr[25].first = !arr[25].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[25].first = !arr[25].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoHeight">
                    <div class="card card-body bubble">
                      Please provide height in cm
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col> -->

            <!-- Employment status -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_employment_status"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your employment status?
                  </div>
                  <!-- <need-help title="Your current employment status"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_employment_status"
                    prop="per_employment_status"
                  >
                    <a-select
                      @change="onValueChange($event, 'essential')"
                      id="per_employment_status"
                      ref="select"
                      placeholder="Select your employment status"
                      class="select-ma w-100"
                      v-model="
                        personalInformation.essential.per_employment_status
                      "
                    >
                      <a-select-option disabled :value="null"
                        >Select your employment status</a-select-option
                      >
                      <a-select-option value="employed"
                        >Employed</a-select-option
                      >
                      <a-select-option value="unemployed"
                        >Unemploymed</a-select-option
                      >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoEmploymentSatus"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[24].first"
                        @click="arr[24].first = !arr[24].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[24].first = !arr[24].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoEmploymentSatus"
                  >
                    <div class="card card-body bubble">
                      Your current employment status
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Occupations -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_occupation"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your occupation?
                  </div>
                  <!-- <need-help title="Your current profession"></need-help> -->
                </a-col>

                <a-col :span="12">
                  <a-form-model-item ref="per_occupation" prop="per_occupation">
                    <a-select
                      @change="onValueChange($event, 'essential')"
                      id="per_occupation"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      style="width: 150px"
                      placeholder="Please select your education status"
                      v-model="personalInformation.essential.per_occupation"
                      class="select-ma w-100"
                    >
                      <a-select-option :value="null" disabled
                        >Select your occupation</a-select-option
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
                      href="#collapsePersonalInfoOccupation"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[23].first"
                        @click="arr[23].first = !arr[23].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[23].first = !arr[23].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoOccupation">
                    <div class="card card-body bubble">
                      Your current profession
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <!-- Education Level -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.essential.per_education_level_id
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your highest level of education?
                  </div>
                  <!-- <need-help
										title="Your highest level of education"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_education_level_id"
                    prop="per_education_level_id"
                  >
                    <a-select
                      @change="onValueChange($event, 'essential')"
                      id="per_education_level_id"
                      :showSearch="true"
                      :filter-option="filterOption"
                      :showArrow="true"
                      placeholder="Please select your education status"
                      v-model="
                        personalInformation.essential.per_education_level_id
                      "
                      class="select-ma w-100"
                    >
                      <!-- <a-select-option value="">Bs</a-select-option>
                  <a-select-option value="a">MS</a-select-option>
                  <a-select-option value="b">other</a-select-option>      -->
                      <a-select-option disabled :value="0"
                        >Select your education level</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
                        v-bind:key="index"
                        v-for="(item, index) in candidateDetails.studylevels"
                        >{{ item.name }}</a-select-option
                      >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoHighestLevelEducation"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[22].first"
                        @click="arr[22].first = !arr[22].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[22].first = !arr[22].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoHighestLevelEducation"
                  >
                    <div class="card card-body bubble">
                      Your highest level of education
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Religion -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.essential.per_religion_id"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your religion?
                  </div>
                  <!-- <need-help title="Your religion"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_religion_id"
                    prop="per_religion_id"
                  >
                    <a-select
                      @change="onValueChange($event, 'essential')"
                      id="per_religion_id"
                      :showSearch="true"
                      :filter-option="filterOption"
                      ref="select"
                      placeholder="Select your religion"
                      v-model="personalInformation.essential.per_religion_id"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select your Religion</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
                        v-bind:key="index"
                        v-for="(item, index) in candidateDetails.religions"
                        class="ma-select w-100"
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
                      href="#collapsePersonalInfoReligion"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[21].first"
                        @click="arr[21].first = !arr[21].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[21].first = !arr[21].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoReligion">
                    <div class="card card-body bubble">Your religion</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- TODO - Practicing Religion Missing? -->

            <!-- Essential Information End -->
          </a-row>
          <!-- <a-button
            shape="round"
            type="primary"
            style="float: right"
            class="mt-3"
            @click="handleSubmitFormOne"
          >
            Save & Continue
          </a-button> -->
        </a-form-model>
      </a-collapse-panel>

      <!-- 2. General Information -->
      <a-collapse-panel
        key="2"
        header="2. General Information"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormTwo"
          v-if="personalInformation && personalInformation.general"
          :model="personalInformation.general"
          :rules="rules"
          class="form-ma"
        >
          <a-row type="flex" align="top">
            <!-- Ethnicity -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.general.per_ethnicity"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your ethnicity?
                  </div>
                  <!-- <need-help title="Your Ethnicity"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_ethnicity" prop="per_ethnicity">
                    <a-select
                      @change="onValueChange($event, 'general')"
                      id="per_ethnicity"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      ref="select"
                      style="width: 150px"
                      placeholder="Please select"
                      v-model="personalInformation.general.per_ethnicity"
                      class="select-ma w-100"
                    >
                      <a-select-option :value="null" disabled
                        >Select Ethnicity</a-select-option
                      >

                      <a-select-option
                        v-for="(ethnicity, key) in candidateDetails.ethnicities"
                        :value="ethnicity"
                        :key="key"
                      >
                        {{ ethnicity }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoEthnicity"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[20].first"
                        @click="arr[20].first = !arr[20].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[20].first = !arr[20].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoEthnicity">
                    <div class="card card-body bubble">Your Ethnicity</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Mother Tounge -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.general.per_mother_tongue"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your mother tongue?
                  </div>
                  <!-- <need-help title="Your Mother Language"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_mother_tongue"
                    prop="per_mother_tongue"
                  >
                    <a-select
                      @change="onValueChange($event, 'general')"
                      id="per_mother_tongue"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="true"
                      ref="select"
                      placeholder="Select your mother tongue"
                      v-model="personalInformation.general.per_mother_tongue"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="null"
                        >Select your mother tongue</a-select-option
                      >
                      <a-select-option
                        v-for="language in candidateDetails.languages"
                        :value="language"
                        :key="language.id"
                      >
                        {{ language }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoSpeakingLanguage"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[19].first"
                        @click="arr[19].first = !arr[19].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[19].first = !arr[19].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoSpeakingLanguage"
                  >
                    <div class="card card-body bubble">
                      Your Mother Language
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Nationality -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.general.per_nationality"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your nationality?
                  </div>
                  <!-- <need-help title="Your Nationality"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_nationality"
                    prop="per_nationality"
                  >
                    <a-select
                      @change="onValueChange($event, 'general')"
                      id="per_nationality"
                      :filter-option="filterOption"
                      :showSearch="true"
                      style="width: 150px"
                      placeholder="Country"
                      v-model="personalInformation.general.per_nationality"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select your nationality</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
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
                      href="#collapsePersonalInfonationality"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[18].first"
                        @click="arr[18].first = !arr[18].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[18].first = !arr[18].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfonationality">
                    <div class="card card-body bubble">Your Nationality</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Country Of Birth -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.general.per_country_of_birth"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your country of birth?
                  </div>
                  <!-- <need-help title="Your country of birth"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_country_of_birth"
                    prop="per_country_of_birth"
                  >
                    <a-select
                      @change="onValueChange($event, 'general')"
                      id="per_country_of_birth"
                      :filter-option="filterOption"
                      :showSearch="true"
                      style="width: 150px"
                      placeholder="Country"
                      v-model="personalInformation.general.per_country_of_birth"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select your country of birth</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
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
                      href="#collapsePersonalInfoCountryOfBirth"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[17].first"
                        @click="arr[17].first = !arr[17].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[17].first = !arr[17].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoCountryOfBirth">
                    <div class="card card-body bubble">
                      Your country of birth
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- General Health and Well being -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.general.per_health_condition"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />How would you describe your general health and wellbeing?
                  </div>
                  <!-- <need-help title="Your current health condition"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_health_condition"
                    prop="per_health_condition"
                  >
                    <a-textarea
                      @blur="onValueChange($event, 'general')"
                      id="per_health_condition"
                      placeholder="Exp: Bangladesh"
                      cols="30"
                      rows="3"
                      v-model="personalInformation.general.per_health_condition"
                      class="w-100 text-box"
                    ></a-textarea>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoHealthCondition"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[16].first"
                        @click="arr[16].first = !arr[16].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[16].first = !arr[16].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoHealthCondition"
                  >
                    <div class="card card-body bubble">
                      Your current health condition
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
            @click="handleSubmitFormTwo"
          >
            Save & Continue
          </a-button> -->
        </a-form-model>
      </a-collapse-panel>

      <!-- 3. Contact Details -->
      <a-collapse-panel
        key="3"
        header="3. Contact Details"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormThree"
          v-if="personalInformation && personalInformation.contact"
          :model="personalInformation.contact"
          :rules="rules"
          class="form-ma"
        >
          <a-row>
            <!-- Current Residence -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.contact
                          .per_current_residence_country &&
                        personalInformation.contact.per_current_residence_city
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your current place of residence?
                  </div>
                  <!-- <need-help
										title="Provide current residence's country and city"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-row :span="24">
                    <a-col :span="11">
                      <!-- Current Country -->
                      <a-form-model-item
                        ref="per_current_residence_country"
                        prop="per_current_residence_country"
                      >
                        <a-select
                          @change="onValueChange($event, 'contact')"
                          id="per_current_residence_country"
                          style="width: 150px"
                          :filter-option="filterOption"
                          :showSearch="true"
                          placeholder="Country"
                          v-model="
                            personalInformation.contact
                              .per_current_residence_country
                          "
                          class="select-ma w-100"
                        >
                          <a-select-option disabled :value="0"
                            >Select Country</a-select-option
                          >
                          <a-select-option
                            :value="item.id"
                            v-bind:key="index"
                            style="width: 100px"
                            v-for="(item, index) in candidateDetails.countries"
                          >
                            {{ item.name }}
                          </a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="11">
                      <!-- Current City -->

                      <a-form-model-item
                        ref="per_current_residence_city"
                        prop="per_current_residence_city"
                      >
                        <a-select
                          @change="onValueChange($event, 'contact')"
                          id="per_current_residence_city"
                          style="width: 150px"
                          placeholder="City"
                          :filter-option="filterOption"
                          :showSearch="true"
                          v-model.number="
                            personalInformation.contact
                              .per_current_residence_city
                          "
                          class="select-ma w-100"
                        >
                          <a-select-option disabled :value="0"
                            >Select City</a-select-option
                          >
                          <a-select-option
                            v-for="city in []"
                            :key="city.id"
                            :value="city.id"
                            >{{ city.name }}</a-select-option
                          >
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoCurrentResidenceCity"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[15].first"
                        @click="arr[15].first = !arr[15].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[15].first = !arr[15].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoCurrentResidenceCity"
                  >
                    <div class="card card-body bubble">
                      Provide current residence's country and city
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Permanent Address Heading -->
            <a-col class="form-item py-3" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">What is your permanent address?</div>
                </a-col>
                <a-col :span="12"> </a-col>
              </a-row>
            </a-col>

            <!-- Permanent Post Code  -->
            <a-col class="form-item py-3" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.contact.per_permanent_post_code"
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
                      @blur="onValueChange($event, 'contact')"
                      id="postCode"
                      placeholder="Post Code"
                      v-model="
                        personalInformation.contact.per_permanent_post_code
                      "
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoPostCode"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[14].first"
                        @click="arr[14].first = !arr[14].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[14].first = !arr[14].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoPostCode">
                    <div class="card card-body bubble">
                      Post Code for permanent address
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Permanent Residence -->
            <a-col class="form-item py-3" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.contact.per_permanent_country &&
                        personalInformation.contact.per_permanent_city
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Permanent Country and City
                  </div>
                  <!-- <need-help
										title="Permanent address Country and City"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-row :span="24">
                    <a-col :span="11">
                      <!-- Permanent Country -->
                      <a-form-model-item
                        ref="per_permanent_country"
                        prop="per_permanent_country"
                      >
                        <a-select
                          @change="onValueChange($event, 'contact')"
                          id="per_permanent_country"
                          style="width: 150px"
                          placeholder="Country"
                          :filter-option="filterOption"
                          :showSearch="true"
                          v-model="
                            personalInformation.contact.per_permanent_country
                          "
                          class="select-ma w-100"
                        >
                          <a-select-option disabled :value="0"
                            >Select Country</a-select-option
                          >
                          <a-select-option
                            :value="item.id"
                            v-bind:key="index"
                            style="width: 100px"
                            v-for="(item, index) in candidateDetails.countries"
                          >
                            {{ item.name }}
                          </a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="11">
                      <!-- Current City -->
                      <a-form-model-item
                        ref="per_permanent_city"
                        prop="per_permanent_city"
                      >
                        <a-select
                          @change="onValueChange($event, 'contact')"
                          id="per_permanent_city"
                          style="width: 150px"
                          placeholder="City"
                          :filter-option="filterOption"
                          :showSearch="true"
                          v-model="
                            personalInformation.contact.per_permanent_city
                          "
                          class="select-ma w-100"
                        >
                          <a-select-option disabled :value="0"
                            >Select City</a-select-option
                          >
                          <a-select-option
                            v-for="city in []"
                            :key="city.id"
                            :value="city.id"
                            >{{ city.name }}</a-select-option
                          >
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#personalInfoParmanentCountryCity"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[13].first"
                        @click="arr[13].first = !arr[13].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[13].first = !arr[13].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="personalInfoParmanentCountryCity">
                    <div class="card card-body bubble">
                      Permanent address Country and City
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Home Permanent Address  -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.contact.per_permanent_address"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Home Address
                  </div>
                  <!-- <need-help title="Full address"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_permanent_address"
                    prop="per_permanent_address"
                  >
                    <a-textarea
                      @blur="onValueChange($event, 'contact')"
                      id="per_permanent_address"
                      cols="30"
                      rows="3"
                      v-model="
                        personalInformation.contact.per_permanent_address
                      "
                      class="w-100 text-box"
                      placeholder="Sample Text"
                    ></a-textarea>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoFullAddress"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[12].first"
                        @click="arr[12].first = !arr[12].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[12].first = !arr[12].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoFullAddress">
                    <div class="card card-body bubble">Full address</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Mobile Number -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.contact.mobile_number &&
                        personalInformation.contact.mobile_country_code
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your mobile number?
                  </div>
                  <!-- <need-help
										title="Provide mobile number with country code"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-row :span="24">
                    <a-col :span="6">
                      <a-form-model-item
                        ref="mobile_country_code"
                        prop="mobile_country_code"
                      >
                        <a-select
                          @change="onValueChange($event, 'contact')"
                          id="mobile_country_code"
                          ref="select"
                          v-model="
                            personalInformation.contact.mobile_country_code
                          "
                          placeholder="Country Code"
                        >
                          <a-select-option value="">Select</a-select-option>
                          <a-select-option value="+880">+880</a-select-option>
                          <a-select-option value="+66">+66</a-select-option>
                          <a-select-option value="+77">+77</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :span="1"></a-col>
                    <a-col :span="17">
                      <a-form-model-item
                        ref="mobile_number"
                        prop="mobile_number"
                      >
                        <a-input
                          @blur="onValueChange($event, 'contact')"
                          id="mobile_number"
                          v-model="personalInformation.contact.mobile_number"
                          placeholder="Mobile Number"
                        />
                      </a-form-model-item>
                    </a-col>
                    <!-- <a-col :span="6">
											<a-button type="primary">Verify</a-button>
										</a-col> -->
                  </a-row>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsepersonalInfoContactNumber"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[11].first"
                        @click="arr[11].first = !arr[11].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[11].first = !arr[11].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsepersonalInfoContactNumber">
                    <div class="card card-body bubble">
                      Provide mobile number with country code
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Email Address -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.contact.email"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your email address?
                  </div>
                  <!-- <need-help
										title="Your registered email address. Read only field."
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_email" prop="per_email">
                    <a-input
                      @blur="onValueChange($event, 'contact')"
                      id="per_email"
                      type="email"
                      :value="personalInformation.contact.per_email"
                      placeholder="Sample email"
                      :disabled="true"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoEmailId"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[10].first"
                        @click="arr[10].first = !arr[10].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[10].first = !arr[10].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoEmailId">
                    <div class="card card-body bubble">
                      Your registered email address. Read only field.
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
            @click="handleSubmitFormThree"
          >
            Save & Continue
          </a-button> -->
        </a-form-model>
      </a-collapse-panel>

      <!-- 4. More About You -->
      <a-collapse-panel
        key="4"
        header="4. More About You"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormFour"
          v-if="personalInformation && personalInformation.more_about"
          :model="personalInformation.more_about"
          :rules="rules"
          class="form-ma"
        >
          <a-row>
            <!-- Martial Status -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.more_about.per_marital_status"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your marital status?
                  </div>
                  <!-- <need-help title="Current Marital Status"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_marital_status"
                    prop="per_marital_status"
                  >
                    <a-select
                      @change="onValueChange($event, 'more_about')"
                      id="per_marital_status"
                      ref="select"
                      placeholder="Select your Marital Status"
                      v-model="
                        personalInformation.more_about.per_marital_status
                      "
                      class="select-ma"
                    >
                      <a-select-option value="single">Single</a-select-option>
                      <a-select-option value="married">Married</a-select-option>
                      <a-select-option value="divorced"
                        >Divorced</a-select-option
                      >
                      <a-select-option value="divorced_with_children"
                        >Divorced with Children</a-select-option
                      >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoMaritalStatus"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[9].first"
                        @click="arr[9].first = !arr[9].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[9].first = !arr[9].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div class="collapse" id="collapsePersonalInfoMaritalStatus">
                    <div class="card card-body bubble">
                      Current Marital Status
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Current Living Arrangement -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.more_about.per_currently_living_with
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your current living arrangement?
                  </div>
                  <!-- <need-help title="Current living situation"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_currently_living_with"
                    prop="per_currently_living_with"
                  >
                    <a-select
                      @change="onValueChange($event, 'more_about')"
                      id="per_currently_living_with"
                      ref="select"
                      placeholder="Currently Living With"
                      v-model="
                        personalInformation.more_about.per_currently_living_with
                      "
                      class="select-ma"
                    >
                      <a-select-option disabled :value="null"
                        >Select your current living arrangement</a-select-option
                      >
                      <a-select-option value="parents">Parents</a-select-option>
                      <a-select-option value="live in my own home"
                        >Live in my own home</a-select-option
                      >
                      <a-select-option value="live in others home"
                        >Live in others home</a-select-option
                      >
                      <a-select-option value="other">Other</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoCuurentlyLivingWith"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[8].first"
                        @click="arr[8].first = !arr[8].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[8].first = !arr[8].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoCuurentlyLivingWith"
                  >
                    <div class="card card-body bubble">
                      Current living situation
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Willing to relocate -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.more_about.per_willing_to_relocate
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Are you willing to relocate?
                  </div>
                  <!-- <need-help
										title="Willing To change your location of living"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_willing_to_relocate"
                    prop="per_willing_to_relocate"
                  >
                    <a-select
                      @change="onValueChange($event, 'more_about')"
                      id="per_willing_to_relocate"
                      ref="select"
                      placeholder="Willing to relocate"
                      v-model="
                        personalInformation.more_about.per_willing_to_relocate
                      "
                      class="select-ma"
                    >
                      <a-select-option disabled :value="null"
                        >Select your option</a-select-option
                      >
                      <a-select-option value="1">Yes</a-select-option>
                      <a-select-option value="2">No</a-select-option>
                      <a-select-option value="3">Let's discuss</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoWillingToRelocate"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <span
                        v-if="arr[7].first"
                        @click="arr[7].first = !arr[7].first"
                      >
                        Need Help?
                      </span>
                      <span v-else @click="arr[7].first = !arr[7].first">
                        Hide Help?
                      </span>
                    </a>
                  </p>
                  <div
                    class="collapse"
                    id="collapsePersonalInfoWillingToRelocate"
                  >
                    <div class="card card-body bubble">
                      Willing To change your location of living
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Smoker? -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.more_about.per_smoker"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Are you a smoker?
                  </div>
                  <!-- <need-help title="Smoker or not"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_smoker" prop="per_smoker">
                    <a-select
                      @change="onValueChange($event, 'more_about')"
                      id="per_smoker"
                      ref="select"
                      placeholder="Smoker"
                      v-model="personalInformation.more_about.per_smoker"
                      class="select-ma"
                    >
                      <a-select-option disabled :value="0"
                        >Select whether you are a smoker or
                        not?</a-select-option
                      >
                      <a-select-option :value="1">Yes</a-select-option>
                      <a-select-option :value="2">No</a-select-option>
                      <a-select-option :value="3"
                        >Former smoker</a-select-option
                      >
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoSmokerOrNot"
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
                  <div class="collapse" id="collapsePersonalInfoSmokerOrNot">
                    <div class="card card-body bubble">Smoker or not</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Languague I speak -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.more_about.per_language_speak"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What language do you speak?
                  </div>
                  <!-- <need-help title="Language you speak"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <!-- <a-select
                    :showArrow="true"
                    placeholder="Language I Speak?"
                    v-model="
                      $store.state.candidateInfo.personalInformation.more_about
                        .per_language_speak
                    "
                    class="select-ma"
                  >
                    <a-select-option disabled :value="null"
                      >Select your language</a-select-option
                    >
                    <a-select-option value="English">English</a-select-option>
                    <a-select-option value="Bangla">Bangla</a-select-option>
                  </a-select> -->
                  <a-form-model-item
                    ref="per_language_speak"
                    prop="per_language_speak"
                  >
                    <a-select
                      @change="
                        onMultiValueChange(
                          $event,
                          'per_language_speak',
                          'more_about'
                        )
                      "
                      id="per_language_speak"
                      option-filter-prop="children"
                      :showSearch="true"
                      :filter-option="filterOption"
                      :showArrow="false"
                      ref="select"
                      mode="multiple"
                      placeholder="Select the language you speak"
                      v-model="
                        personalInformation.more_about.per_language_speak
                      "
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="null"
                        >Select the language you speak</a-select-option
                      >
                      <a-select-option value="Don't Mind"
                        >Don't Mind
                      </a-select-option>
                      <a-select-option
                        v-for="(
                          spoken_language, key
                        ) in candidateDetails.languages"
                        :value="spoken_language"
                        :key="key"
                      >
                        {{ spoken_language }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoSpeakingLanguages"
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
                  <div
                    class="collapse"
                    id="collapsePersonalInfoSpeakingLanguages"
                  >
                    <div class="card card-body bubble">Language you speak</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Hobbies -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.more_about.per_hobbies_interests
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What are your hobbies and leisure interests?
                  </div>
                  <!-- <need-help title="Your hobbies"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <!-- <a-select
                    :showArrow="true"
                    placeholder="My hobbies & interest"
                    v-model="
                      $store.state.candidateInfo.personalInformation.more_about
                        .per_hobbies_interests
                    "
                    class="select-ma"
                  >
                    <a-select-option disabled :value="null"
                      >Select your Hobby</a-select-option
                    >
                    <a-select-option value="Music">Music</a-select-option>
                    <a-select-option value="Cricket">Cricket</a-select-option>
                  </a-select> -->
                  <a-form-model-item
                    ref="per_hobbies_interests"
                    prop="per_hobbies_interests"
                  >
                    <a-select
                      @change="
                        onMultiValueChange(
                          $event,
                          'per_hobbies_interests',
                          'more_about'
                        )
                      "
                      id="per_hobbies_interests"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="false"
                      ref="select"
                      mode="multiple"
                      placeholder="Select your hobbies"
                      v-model="
                        personalInformation.more_about.per_hobbies_interests
                      "
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="null"
                        >Select your hobbies
                      </a-select-option>
                      <a-select-option value="Don't Mind"
                        >Don't Mind
                      </a-select-option>
                      <a-select-option
                        v-for="(hobby, key) in candidateDetails.hobbies"
                        :value="hobby"
                        :key="key"
                      >
                        {{ hobby }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoHobbies"
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
                  <div class="collapse" id="collapsePersonalInfoHobbies">
                    <div class="card card-body bubble">Your hobbies</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Food and cuisine -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        personalInformation.more_about.per_food_cuisine_like
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What are your favorite food and cuisine?
                  </div>
                  <!-- <need-help title="Favorite Food and cuisine"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_food_cuisine_like"
                    prop="per_food_cuisine_like"
                  >
                    <a-select
                      @change="
                        onMultiValueChange(
                          $event,
                          'per_food_cuisine_like',
                          'more_about'
                        )
                      "
                      id="per_food_cuisine_like"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="false"
                      mode="multiple"
                      placeholder="Food and Cuisine I like"
                      v-model="
                        personalInformation.more_about.per_food_cuisine_like
                      "
                      class="select-ma"
                    >
                      <a-select-option disabled :value="null"
                        >Select your Favorite Food Cuisine</a-select-option
                      >
                      <a-select-option value="Don't Mind"
                        >Don't Mind
                      </a-select-option>
                      <a-select-option
                        :value="value"
                        :key="key"
                        v-for="(value, key) in candidateDetails.foods"
                      >
                        {{ value }}
                      </a-select-option>
                      <!-- <a-select-option value="Chinese">Chinese</a-select-option>
										<a-select-option value="Italian">Italian</a-select-option> -->
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoFavoriteFood"
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
                  <div class="collapse" id="collapsePersonalInfoFavoriteFood">
                    <div class="card card-body bubble">
                      Favorite Food and cuisine.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Things I enjoy -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.more_about.per_things_enjoy"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What types of things do you enjoy?
                  </div>
                  <!-- <need-help title="Things you enjoy"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <!-- <a-select
                    :showArrow="true"
                    placeholder="Things I Enjoy"
                    v-model="
                      $store.state.candidateInfo.personalInformation.more_about
                        .per_things_enjoy
                    "
                    class="select-ma"
                  >
                    <a-select-option disabled :value="null"
                      >Select things you enjoy</a-select-option
                    >
                    <a-select-option value="Music">Music</a-select-option>
                    <a-select-option value="Cricket">Cricket</a-select-option>
                  </a-select> -->
                  <a-form-model-item
                    ref="per_things_enjoy"
                    prop="per_things_enjoy"
                  >
                    <a-select
                      @change="
                        onMultiValueChange(
                          $event,
                          'per_things_enjoy',
                          'more_about'
                        )
                      "
                      id="per_things_enjoy"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      :showArrow="false"
                      ref="select"
                      mode="multiple"
                      placeholder="Select your hobbies"
                      v-model="personalInformation.more_about.per_things_enjoy"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="null"
                        >Select things you enjoy
                      </a-select-option>
                      <a-select-option value="Don't Mind"
                        >Don't Mind
                      </a-select-option>
                      <a-select-option
                        v-for="(hobby, key) in candidateDetails.hobbies"
                        :key="key"
                        :value="hobby"
                      >
                        {{ hobby }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoEnjoyfullThings"
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
                    class="collapse"
                    id="collapsePersonalInfoEnjoyfullThings"
                  >
                    <div class="card card-body bubble">Things you enjoy</div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Thankful for-->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.more_about.per_thankfull_for"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What kind of things are you thankful for in life?
                  </div>
                  <!-- <need-help
										title="kind of things are you thankful for"
									></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item
                    ref="per_thankfull_for"
                    prop="per_thankfull_for"
                  >
                    <a-select
                      @change="
                        onMultiValueChange(
                          $event,
                          'per_thankfull_for',
                          'more_about'
                        )
                      "
                      id="per_thankfull_for"
                      :showSearch="true"
                      option-filter-prop="children"
                      :filter-option="filterOption"
                      placeholder="I'm Thankfull For"
                      mode="multiple"
                      v-model="personalInformation.more_about.per_thankfull_for"
                      class="select-ma"
                    >
                      <a-select-option disabled :value="null"
                        >Select things you are thankful for</a-select-option
                      >
                      <a-select-option value="Don't Mind"
                        >Don't Mind
                      </a-select-option>
                      <a-select-option
                        :value="value.value"
                        :key="key"
                        style="width: 100px"
                        v-for="(value, key) in candidateDetails.thankfulThings"
                      >
                        {{ value.label }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoThankulFor"
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
                  <div class="collapse" id="collapsePersonalInfoThankulFor">
                    <div class="card card-body bubble">
                      kind of things are you thankful for
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- About Me -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="12">
                  <div class="mb-2">
                    <a-icon
                      v-if="personalInformation.more_about.per_about"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />A little about me
                  </div>
                  <!-- <need-help title="A little about yourself"></need-help> -->
                </a-col>
                <a-col :span="12">
                  <a-form-model-item ref="per_about" prop="per_about">
                    <a-textarea
                      @blur="onValueChange($event, 'more_about')"
                      id="per_about"
                      placeholder="Exp: 19/ burder way, england"
                      :rows="3"
                      v-model="personalInformation.more_about.per_about"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <p>
                    <a
                      class="color-blue fw-700 fs-14"
                      data-toggle="collapse"
                      href="#collapsePersonalInfoMoreAboutMe"
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
                  <div class="collapse" id="collapsePersonalInfoMoreAboutMe">
                    <div class="card card-body bubble">
                      A little about yourself
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
            @click="handleSubmitFormFour"
          >
            Save & Continue
          </a-button> -->
        </a-form-model>
      </a-collapse-panel>

      <!-- Current Residence -->
      <!-- <a-col :span="12">
				<a-form-item label="Current Residence">
					<a-input
						placeholder="Exp: London, england"
						v-model="
							$store.state.candidateInfo.personalInformation.current_residence
						"
					/>
				</a-form-item>
			</a-col> -->
    </a-collapse>

    <!-- {{ $store.state.candidateInfo.personalInformation }} -->
  </div>
</template>
<script>
import DropdownDatePicker from "vue-dropdown-datepicker";
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";
import { ARR_PersonalInfo, RULESPERSONALINFO } from "./models/candidate";

export default {
  name: "PersonalInfoTwo",
  components: {
    DropdownDatePicker,
    NeedHelp,
  },
  props: {
    activePanel: {
      type: Number,
    },
    candidateDetails: {
      type: Object,
    },
    personalInformation: {
      type: Object,
    },
  },
  data() {
    return {
      activeKey: ["1"],
      default_date: null,
      rules: RULESPERSONALINFO,
      languages: languages,
      hobbies: hobbies,
      foods: foods,
      thankfulThings: thankfulThings,
      ethnicityList: ethnicities,
      arr: ARR_PersonalInfo,
    };
  },
  created() {},
  mounted() {
    this.checkDisabled();
  },
  methods: {
    onValueChange(e, action) {
      console.log(this.personalInformation);
      this.checkDisabled();
      this.save(action);
    },
    checkDisabled() {
      this.$emit("disabled", {
        value: true,
        current: 1,
      });
    },
    handleSubmitFormOne() {
      this.$refs.personalInfoFormOne.validate((valid) => {
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
    handleSubmitFormTwo() {
      this.$refs.personalInfoFormTwo.validate((valid) => {
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
    handleSubmitFormThree() {
      this.$refs.personalInfoFormThree.validate((valid) => {
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
    handleSubmitFormFour() {
      this.$refs.personalInfoFormFour.validate((valid) => {
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
    onChangeDD(d, m, y) {
      this.save("essential");
    },
    onMultiValueChange(e, name, action) {
      this.personalInformation.more_about[name] =
        this.personalInformation.more_about[name][
          this.personalInformation.more_about[name].length - 1
        ] == "Don't Mind"
          ? ["Don't Mind"]
          : this.personalInformation.more_about[name].filter(
              (item) => item != "Don't Mind"
            );

      this.checkDisabled();
      this.save(action);
    },

    save(action) {
      switch (action) {
        case "essential":
          this.saveEssentialInfo();
          break;
        case "general":
          this.saveGeneralInfo();
          break;
        case "contact":
          this.saveContactInfo();
          break;
        case "more_about":
          this.saveMoreAboutInfo();
          break;
      }
    },
    async saveEssentialInfo() {
      await this.$store
        .dispatch(
          "savePersonalEssentialInfo",
          this.personalInformation.essential
        )
        .then((data) => {})
        .catch((error) => {});
    },
    async saveGeneralInfo() {
      await this.$store
        .dispatch("savePersonalGeneralInfo", this.personalInformation.general)
        .then((data) => {})
        .catch((error) => {});
    },
    async saveContactInfo() {
      await this.$store
        .dispatch("savePersonalContactInfo", this.personalInformation.contact)
        .then((data) => {})
        .catch((error) => {});
    },
    async saveMoreAboutInfo() {
      await this.$store
        .dispatch("savePersonalMoreAboutInfo", {
          ...this.personalInformation.more_about,
          per_smoker: this.personalInformation.more_about.per_smoker
            ? this.personalInformation.more_about.per_smoker.toString()
            : "",
          per_things_enjoy: this.personalInformation.more_about.per_things_enjoy
            ? this.personalInformation.more_about.per_things_enjoy.join(",")
            : this.personalInformation.more_about.per_things_enjoy,
          per_hobbies_interests: this.personalInformation.more_about
            .per_hobbies_interests
            ? this.personalInformation.more_about.per_hobbies_interests.join(
                ","
              )
            : this.personalInformation.more_about.per_hobbies_interests,
          per_language_speak: this.personalInformation.more_about
            .per_language_speak
            ? this.personalInformation.more_about.per_language_speak.join(",")
            : this.personalInformation.more_about.per_language_speak,
          per_thankfull_for: this.personalInformation.more_about
            .per_thankfull_for
            ? this.personalInformation.more_about.per_thankfull_for.join(",")
            : this.personalInformation.more_about.per_thankfull_for,
          per_food_cuisine_like: this.personalInformation.more_about
            .per_food_cuisine_like
            ? this.personalInformation.more_about.per_food_cuisine_like.join(
                ","
              )
            : this.personalInformation.more_about.per_food_cuisine_like,
        })
        .then((data) => {})
        .catch((error) => {});
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.personal-info {
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
  .card {
    background-color: #d9eafa;
  }
  .bubble {
    position: relative;
    width: 280px;
    height: 70px;
    padding: 5px;
    // color: #32557f;
    border-radius: 5px;
    // border: 3px solid #32557f;

    &::before,
    &::after {
      content: "\0020";
      display: block;
      position: absolute;
      top: -15px;
      left: 10px;
      z-index: 2;
      width: 0;
      height: 0;
      overflow: hidden;
      border: solid 15px transparent;
      border-top: 0;
      border-bottom-color: #d9eafa;
    }

    &::before {
      top: -18px;
      z-index: 1;
      border-bottom-color: #d9eafa;
    }
  }
  .text-box {
    border-color: $color-secondary;
    border-radius: 5px;
    color: $color-secondary;
  }
  .custom-select {
    font-size: 12px !important;
  }
}
</style>
