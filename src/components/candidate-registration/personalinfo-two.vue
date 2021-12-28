<template>
  <div id="personalInfoAccordian" class="personal-info">
    <div class="section-heading heading-text">
      <h5>Personal Information</h5>
      <p>Your Personal Information</p>
    </div>
    <a-collapse
      accordion
      @change="changeActivekey"
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
          v-if="
            personalInformation &&
            personalInformation.essential &&
            activeKey == 1
          "
          :rules="rules"
          :model="personalInformation.essential"
          class="form-ma"
        >
          <!-- Gender -->
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
                  @input="onValueChange($event, 'essential')"
                  id="per_gender"
                  :reduce="(option) => option.value"
                  placeholder="Select your gender"
                  v-model="personalInformation.essential.per_gender"
                  label="name"
                  :options="[
                    { name: 'Male', value: 1 },
                    { name: 'Female', value: 2 },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_gender"
                  ref="select"
                  placeholder="Select your gender"
                  class="select-ma w-100"
                  v-model="personalInformation.essential.per_gender"
                >
                  <a-select-option disabled :value="0"
                    >Select your gender</a-select-option
                  >
                  <a-select-option :value="1">Male</a-select-option>
                  <a-select-option :value="2">Female</a-select-option>
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoGender"
              >
                <div class="card card-body bubble">Select Your Gender</div>
              </div>
            </div>
          </div>

          <!-- DOB -->
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
              <a-form-model-item ref="dob" prop="dob" class="dob-select">
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
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoDateOfBirth"
              >
                <div class="card card-body bubble">Choose DOB</div>
              </div>
            </div>
          </div>

          <!-- Height -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_height"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your height?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_height" prop="per_height">
                <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_height"
                  :showSearch="true"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :showArrow="true"
                  style="width: 150px"
                  placeholder="Please select your height"
                  v-model.number="personalInformation.essential.per_height"
                  class="select-ma w-100"
                >
                  <a-select-option :value="0" disabled
                    >Select your height</a-select-option
                  >
                  <a-select-option
                    :value="item.value"
                    :key="key"
                    style="width: 100px"
                    v-for="(item, key) in heightTV"
                  >
                    <div v-html="item.label"></div>
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHeight"
              >
                <div class="card card-body bubble">
                  Please provide height in cm
                </div>
              </div>
            </div>
          </div>

          <!-- Employment status -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_employment_status"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your employment status?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_employment_status"
                prop="per_employment_status"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_employment_status"
                  :reduce="(option) => option.value"
                  placeholder="Select your employment status"
                  v-model="personalInformation.essential.per_employment_status"
                  label="name"
                  :options="employment_Statuses"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'essential')"
                  id="per_employment_status"
                  ref="select"
                  placeholder="Select your employment status"
                  class="select-ma w-100"
                  v-model="
                    personalInformation.essential.per_employment_status
                  "
                >
                  <a-select-option disabled :value="0"
                    >Select your employment status</a-select-option
                  >
                  <a-select-option value="employed"
                    >Employed</a-select-option
                  >
                  <a-select-option value="unemployed"
                    >Unemploymed</a-select-option
                  >
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                class="collapse"
                id="collapsePersonalInfoEmploymentSatus"
              >
                <div class="card card-body bubble">
                  Your current employment status
                </div>
              </div>
            </div>
          </div>

          <!-- Occupations -->
          <div class="row mt-3 pb-2 border-bottom">
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
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_occupation"
                  placeholder="Please select your occupation"
                  :reduce="(option) => option.name"
                  v-model="personalInformation.essential.per_occupation"
                  label="name"
                  :options="candidateDetails.occupations"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                  <a-select-option :value="0" disabled
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoOccupation"
              >
                <div class="card card-body bubble">Your current profession</div>
              </div>
            </div>
          </div>

          <!-- Education Level -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_education_level_id"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your highest level of education?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_education_level_id"
                prop="per_education_level_id"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_education_level_id"
                  :reduce="(option) => option.id"
                  placeholder="Please select your education status"
                  v-model="personalInformation.essential.per_education_level_id"
                  label="name"
                  :options="candidateDetails.studylevels"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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

                  <a-select-option disabled :value="0"
                    >Select your education level</a-select-option
                  >
                  <a-select-option
                    :value="item.id"
                    v-bind:key="index"
                    v-for="(item, index) in candidateDetails.studylevels"
                    >{{ item.name }}</a-select-option
                  >
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHighestLevelEducation"
              >
                <div class="card card-body bubble">
                  Your highest level of education
                </div>
              </div>
            </div>
          </div>

          <!-- Religion -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.essential.per_religion_id"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your religion?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_religion_id" prop="per_religion_id">
                <v-select
                  :calculate-position="withPopper"
                  append-to-body
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'essential')"
                  id="per_religion_id"
                  :reduce="(option) => option.id"
                  placeholder="Select your religion"
                  v-model="personalInformation.essential.per_religion_id"
                  label="name"
                  :options="candidateDetails.religions"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoReligion"
              >
                <div class="card card-body bubble">Your religion</div>
              </div>
            </div>
          </div>
          <!-- TODO - Practicing Religion Missing? -->
          <!-- Essential Information End -->

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

      <!-- 2. General Information -->
      <a-collapse-panel
        key="2"
        header="2. General Information"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormTwo"
          v-if="
            personalInformation && personalInformation.general && activeKey == 2
          "
          :model="personalInformation.general"
          :rules="rules"
          class="form-ma"
        >
          <!-- Ethnicity -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_ethnicity"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your ethnicity?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_ethnicity" prop="per_ethnicity">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'general')"
                  id="per_ethnicity"
                  placeholder="Please select your ethnicities"
                  v-model="personalInformation.general.per_ethnicity"
                  label="name"
                  :options="candidateDetails.ethnicities"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'general')"
                  id="per_ethnicity"
                  :showSearch="true"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                  :showArrow="true"
                  ref="select"
                  style="width: 150px"
                  placeholder="Please select your ethnicities"
                  v-model="personalInformation.general.per_ethnicity"
                  class="select-ma w-100"
                >
                  <a-select-option :value="0" disabled
                    >Select Ethnicity</a-select-option
                  >

                  <a-select-option
                    v-for="(ethnicity, key) in candidateDetails.ethnicities"
                    :value="ethnicity"
                    :key="key"
                  >
                    {{ ethnicity }}
                  </a-select-option>
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEthnicity"
              >
                <div class="card card-body bubble">Your Ethnicity</div>
              </div>
            </div>
          </div>

          <!-- Mother Tongue -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_mother_tongue"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your mother tongue?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_mother_tongue"
                prop="per_mother_tongue"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'general')"
                  id="per_mother_tongue"
                  placeholder="Select your mother tongue"
                  v-model="personalInformation.general.per_mother_tongue"
                  label="name"
                  :options="candidateDetails.languages"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                  <a-select-option disabled :value="0"
                    >Select your mother tongue</a-select-option
                  >
                  <a-select-option
                    v-for="language in candidateDetails.languages"
                    :value="language"
                    :key="language.id"
                  >
                    {{ language }}
                  </a-select-option>
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoSpeakingLanguage"
              >
                <div class="card card-body bubble">Your Mother Language</div>
              </div>
            </div>
          </div>

          <!-- Nationality -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_nationality"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your nationality?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_nationality" prop="per_nationality">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'general')"
                  id="per_nationality"
                  placeholder="Select Country"
                  :reduce="(option) => option.id"
                  v-model="personalInformation.general.per_nationality"
                  label="name"
                  :options="candidateDetails.countries"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfonationality"
              >
                <div class="card card-body bubble">Your Nationality</div>
              </div>
            </div>
          </div>

          <!-- Country Of Birth -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_country_of_birth"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your country of birth?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_country_of_birth"
                prop="per_country_of_birth"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'general')"
                  id="per_country_of_birth"
                  placeholder=" Select your Country of birth"
                  :reduce="(option) => option.id"
                  v-model="personalInformation.general.per_country_of_birth"
                  label="name"
                  :options="candidateDetails.countries"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                <div class="card card-body bubble">Your country of birth</div>
              </div>
            </div>
          </div>

          <!-- General Health and Well being -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.general.per_health_condition"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />How would you describe your general health and wellbeing?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_health_condition"
                prop="per_health_condition"
              >
                <a-textarea
                  @blur="onValueChange($event, 'general')"
                  id="per_health_condition"
                  placeholder="Exp: Bangladesh"
                  :rows="3"
                  :maxLength="200"
                  v-model="personalInformation.general.per_health_condition"
                ></a-textarea>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHealthCondition"
              >
                <div class="card card-body bubble">
                  Your current health condition
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

      <!-- 3. Contact Details -->
      <a-collapse-panel
        key="3"
        header="3. Contact Details"
        style="margin-top: 5px"
      >
        <a-form-model
          ref="personalInfoFormThree"
          v-if="
            personalInformation && personalInformation.contact && activeKey == 3
          "
          :model="personalInformation.contact"
          class="form-ma"
          :rules="rules"
        >
          <!-- Current Residence -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.contact.per_current_residence_country &&
                    personalInformation.contact.per_current_residence_city
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your current place of residence?
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
                      @input="onCountryChange($event, 'contact', 'residence')"
                      id="per_current_residence_country"
                      placeholder="Select Country"
                      v-model="
                        personalInformation.contact
                          .per_current_residence_country
                      "
                      :reduce="(option) => option.id"
                      label="name"
                      :options="candidateDetails.countries"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                    <!-- <a-select
                      @change="
                        onCountryChange($event, 'contact', 'residence')
                      "
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
                    </a-select> -->
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-6 mobile-margin">
                  <a-form-model-item
                    ref="per_current_residence_city"
                    prop="per_current_residence_city"
                  >
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onValueChange($event, 'contact')"
                      id="per_current_residence_city"
                      placeholder="Select City"
                      v-model.number="
                        personalInformation.contact.per_current_residence_city
                      "
                      :reduce="(option) => option.name"
                      label="name"
                      :options="personalInformation.contact.residenceCities"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                    <!-- <a-select
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
                        v-for="city in personalInformation.contact
                          .residenceCities"
                        :key="city.id"
                        :value="city.id"
                        >{{ city.name }}</a-select-option
                      >
                    </a-select> -->
                  </a-form-model-item>
                </div>
              </div>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoCurrentResidenceCity"
              >
                <div class="card card-body bubble">
                  Provide current residence's country and city
                </div>
              </div>
            </div>
          </div>

          <!-- Permanent Address Heading -->
          <div class="pt-3">
            <div class="mb-2 font-weight-bold fs-16">
              What is your permanent address?
            </div>
          </div>

          <!-- Permanent Post Code  -->
          <div class="row mt-3">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_permanent_post_code"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Post Code
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_permanent_post_code"
                prop="per_permanent_post_code"
              >
                <a-input
                  @blur="onValueChange($event, 'contact')"
                  id="postCode"
                  :maxLength="10"
                  placeholder="Post Code"
                  v-model="personalInformation.contact.per_permanent_post_code"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoPostCode"
              >
                <div class="card card-body bubble">
                  Post Code for permanent address
                </div>
              </div>
            </div>
          </div>

          <!-- Permanent Residence -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.contact.per_permanent_country &&
                    personalInformation.contact.per_permanent_city
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Permanent Country and City
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-12 col-md-6">
                  <a-form-model-item
                    ref="per_permanent_country"
                    prop="per_permanent_country"
                  >
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onCountryChange($event, 'contact', 'permanant')"
                      id="per_permanent_country"
                      placeholder="Select Country"
                      v-model="
                        personalInformation.contact.per_permanent_country
                      "
                      :reduce="(option) => option.id"
                      label="name"
                      :options="candidateDetails.countries"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                    <!-- <a-select
                      @change="
                        onCountryChange($event, 'contact', 'permanant')
                      "
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
                    </a-select> -->
                  </a-form-model-item>
                </div>
                <div class="col-12 col-md-6 mobile-margin">
                  <a-form-model-item
                    ref="per_permanent_city"
                    prop="per_permanent_city"
                  >
                    <v-select
                      :clearable="false"
                      class="style-chooser"
                      @input="onValueChange($event, 'contact')"
                      id="per_permanent_city"
                      placeholder="Select City"
                      v-model="personalInformation.contact.per_permanent_city"
                      :reduce="(option) => option.name"
                      label="name"
                      :options="personalInformation.contact.permanantCities"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                    <!-- <a-select
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
                        v-for="city in personalInformation.contact
                          .permanantCities"
                        :key="city.id"
                        :value="city.id"
                        >{{ city.name }}</a-select-option
                      >
                    </a-select> -->
                  </a-form-model-item>
                </div>
              </div>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="personalInfoParmanentCountryCity"
              >
                <div class="card card-body bubble">
                  Permanent address Country and City
                </div>
              </div>
            </div>
          </div>

          <!-- Home Permanent Address  -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_permanent_address"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Home Address
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_permanent_address"
                prop="per_permanent_address"
              >
                <a-textarea
                  @blur="onValueChange($event, 'contact')"
                  id="per_permanent_address"
                  :rows="3"
                  :maxLength="200"
                  v-model="personalInformation.contact.per_permanent_address"
                  placeholder="Sample Text"
                ></a-textarea>
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoFullAddress"
              >
                <div class="card card-body bubble">Full address</div>
              </div>
            </div>
          </div>

          <!-- Mobile Number -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.contact.mobile_number &&
                    personalInformation.contact.mobile_country_code
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your mobile number?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <div class="row">
                <div class="col-4">
                  <a-form-model-item
                    ref="mobile_country_code"
                    prop="mobile_country_code"
                  >
                    <a-select
                      @change="onValueChange($event, 'contact')"
                      id="mobile_country_code"
                      ref="select"
                      v-model="personalInformation.contact.mobile_country_code"
                      placeholder="Country Code"
                    >
                      <a-select-option value="">Select</a-select-option>
                      <a-select-option value="+44">+44</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </div>
                <div class="col-8">
                  <a-form-model-item ref="mobile_number" prop="mobile_number">
                    <a-input
                      @blur="onValueChange($event, 'contact')"
                      id="mobile_number"
                      :maxLength="10"
                      v-model="personalInformation.contact.mobile_number"
                      placeholder="Mobile Number"
                    />
                  </a-form-model-item>
                </div>
              </div>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsepersonalInfoContactNumber"
              >
                <div class="card card-body bubble">
                  Provide mobile number with country code
                </div>
              </div>
            </div>
          </div>

          <!-- Email Address -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.contact.per_email"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your email address?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
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
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEmailId"
              >
                <div class="card card-body bubble">
                  Your registered email address. Read only field.
                </div>
              </div>
            </div>
          </div>

          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormThree"
          >
            Save & Continue
          </a-button>
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
          v-if="
            personalInformation &&
            personalInformation.more_about &&
            activeKey == 4
          "
          :model="personalInformation.more_about"
          :rules="rules"
          class="form-ma"
        >
          <!-- Martial Status -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_marital_status"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your marital status?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_marital_status"
                prop="per_marital_status"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'more_about')"
                  id="per_marital_status"
                  placeholder="Select your Marital Status"
                  v-model="personalInformation.more_about.per_marital_status"
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    { name: 'Single', value: 'single' },
                    { name: 'Married', value: 'married' },
                    { name: 'Divorced', value: 'divorced' },
                    {
                      name: 'Divorced with Children',
                      value: 'divorced_with_children',
                    },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoMaritalStatus"
              >
                <div class="card card-body bubble">Current Marital Status</div>
              </div>
            </div>
          </div>

          <!-- Current Living Arrangement -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    personalInformation.more_about.per_currently_living_with
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your current living arrangement?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_currently_living_with"
                prop="per_currently_living_with"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'more_about')"
                  id="per_currently_living_with"
                  placeholder="Please select Currently Living With"
                  v-model="
                    personalInformation.more_about.per_currently_living_with
                  "
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    { name: 'Parents', value: 'Parents' },
                    {
                      name: 'Live in my own home',
                      value: 'Live in my own home',
                    },
                    {
                      name: 'live in others home',
                      value: 'live in others home',
                    },
                    { name: 'Other', value: 'Other' },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'more_about')"
                  id="per_currently_living_with"
                  ref="select"
                  placeholder="Currently Living With"
                  v-model="
                    personalInformation.more_about.per_currently_living_with
                  "
                  class="select-ma"
                >
                  <a-select-option disabled :value="0"
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoCuurentlyLivingWith"
              >
                <div class="card card-body bubble">
                  Current living situation
                </div>
              </div>
            </div>
          </div>

          <!-- Willing to relocate -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_willing_to_relocate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Are you willing to relocate?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_willing_to_relocate"
                prop="per_willing_to_relocate"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'more_about')"
                  id="per_willing_to_relocate"
                  placeholder="Willing to relocate"
                  v-model="
                    personalInformation.more_about.per_willing_to_relocate
                  "
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    { name: 'Yes', value: 1 },
                    {
                      name: 'No',
                      value: 2,
                    },
                    {
                      name: `Let's discuss`,
                      value: 3,
                    },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'more_about')"
                  id="per_willing_to_relocate"
                  ref="select"
                  placeholder="Willing to relocate"
                  v-model="
                    personalInformation.more_about.per_willing_to_relocate
                  "
                  class="select-ma"
                >
                  <a-select-option disabled :value="0"
                    >Select your option</a-select-option
                  >
                  <a-select-option value="1">Yes</a-select-option>
                  <a-select-option value="2">No</a-select-option>
                  <a-select-option value="3">Let's discuss</a-select-option>
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoWillingToRelocate"
              >
                <div class="card card-body bubble">
                  Willing To change your location of living
                </div>
              </div>
            </div>
          </div>

          <!-- Smoker? -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_smoker"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Are you a smoker?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_smoker" prop="per_smoker">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  @input="onValueChange($event, 'more_about')"
                  id="per_smoker"
                  placeholder="Please select Are you a Smoker"
                  v-model="personalInformation.more_about.per_smoker"
                  :reduce="(option) => option.value"
                  label="name"
                  :options="[
                    { name: 'Yes', value: 1 },
                    {
                      name: 'No',
                      value: 2,
                    },
                    {
                      name: `Former smoker`,
                      value: 3,
                    },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
                  @change="onValueChange($event, 'more_about')"
                  id="per_smoker"
                  ref="select"
                  placeholder="Are you a Smoker"
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoSmokerOrNot"
              >
                <div class="card card-body bubble">Smoker or not</div>
              </div>
            </div>
          </div>

          <!-- Language I speak -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_language_speak"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What language do you speak?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_language_speak"
                prop="per_language_speak"
              >
                <v-select
                  id="per_language_speak"
                  :clearable="false"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_language_speak',
                      'more_about'
                    )
                  "
                  placeholder="Please select the languages you speak"
                  v-model="personalInformation.more_about.per_language_speak"
                  label="name"
                  :options="[`Don't Mind`, ...candidateDetails.languages]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
                <!-- <a-select
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
                  <a-select-option disabled :value="0"
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoSpeakingLanguages"
              >
                <div class="card card-body bubble">Language you speak</div>
              </div>
            </div>
          </div>

          <!-- Hobbies -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_hobbies_interests"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What are your hobbies and leisure interests?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <v-select
                id="per_hobbies_interests"
                :clearable="false"
                :multiple="true"
                class="nationality-select"
                @input="
                  onMultiValueChange(
                    $event,
                    'per_hobbies_interests',
                    'more_about'
                  )
                "
                placeholder="Please select your hobbies"
                v-model="personalInformation.more_about.per_hobbies_interests"
                label="name"
                :options="candidateDetails.hobbies"
                ><template #open-indicator>
                  <a-icon type="down" />
                </template>
              </v-select>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoHobbies"
              >
                <div class="card card-body bubble">Your hobbies</div>
              </div>
            </div>
          </div>

          <!-- Food and cuisine -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_food_cuisine_like"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What are your favorite food and cuisine?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_food_cuisine_like"
                prop="per_food_cuisine_like"
              >
                <v-select
                  id="per_food_cuisine_like"
                  :clearable="false"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_food_cuisine_like',
                      'more_about'
                    )
                  "
                  placeholder="Please select your Food and Cuisine you like"
                  v-model="personalInformation.more_about.per_food_cuisine_like"
                  label="name"
                  :options="candidateDetails.foods"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                </v-select>
                <!-- <a-select
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
                  <a-select-option disabled :value="0"
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

                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoFavoriteFood"
              >
                <div class="card card-body bubble">
                  Favorite Food and cuisine.
                </div>
              </div>
            </div>
          </div>

          <!-- Things I enjoy -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_things_enjoy"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What types of things do you enjoy?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <v-select
                id="per_things_enjoy"
                :clearable="false"
                :multiple="true"
                class="nationality-select"
                @input="
                  onMultiValueChange($event, 'per_things_enjoy', 'more_about')
                "
                placeholder="Please select your hobbies"
                v-model="personalInformation.more_about.per_things_enjoy"
                label="name"
                :options="candidateDetails.hobbies"
                ><template #open-indicator>
                  <a-icon type="down" />
                </template>
              </v-select>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
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
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoEnjoyfullThings"
              >
                <div class="card card-body bubble">Things you enjoy</div>
              </div>
            </div>
          </div>

          <!-- Thankful for-->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_thankfull_for"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What kind of things are you thankful for in life?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_thankfull_for"
                prop="per_thankfull_for"
              >
                <v-select
                  id="per_things_enjoy"
                  :clearable="false"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_thankfull_for',
                      'more_about'
                    )
                  "
                  placeholder="Please select your Thankfull For"
                  :reduce="(option) => option.value"
                  v-model="personalInformation.more_about.per_thankfull_for"
                  label="label"
                  :options="candidateDetails.thankfulThings"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                </v-select>
                <!-- <a-select
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
                  <a-select-option disabled :value="0"
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoThankulFor"
              >
                <div class="card card-body bubble">
                  kind of things are you thankful for
                </div>
              </div>
            </div>
          </div>
          <!-- Improve Myself -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_thankfull_for"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />How I improve myself?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_improve_myself"
                prop="per_improve_myself"
              >
                <v-select
                  id="per_improve_myself"
                  :clearable="false"
                  :multiple="true"
                  class="nationality-select"
                  @input="
                    onMultiValueChange(
                      $event,
                      'per_improve_myself',
                      'more_about'
                    )
                  "
                  placeholder="Please select how you improve?"
                  :reduce="(option) => option.value"
                  v-model="personalInformation.more_about.per_improve_myself"
                  label="label"
                  :options="[]"
                  ><template #open-indicator>
                    <a-icon type="down" />
                  </template>
                </v-select>
                <!-- <a-select
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
                  <a-select-option disabled :value="0"
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
                </a-select> -->
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoImproveMyself"
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoImproveMyself"
              >
                <div class="card card-body bubble">Improve myself</div>
              </div>
            </div>
          </div>
          <!-- About Me -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_about"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />A little bit about me
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="per_about" prop="per_about">
                <a-textarea
                  @blur="onValueChange($event, 'more_about')"
                  id="per_about"
                  placeholder="Exp: 19/ burder way, england"
                  :rows="3"
                  :maxLength="200"
                  v-model="personalInformation.more_about.per_about"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
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
              <div
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoMoreAboutMe"
              >
                <div class="card card-body bubble">
                  A little bit about yourself
                </div>
              </div>
            </div>
          </div>
          <!-- Additional Info -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="personalInformation.more_about.per_about"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Additional Information (optional)
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="per_additional_info_text"
                prop="per_additional_info_text"
              >
                <a-textarea
                  @blur="onValueChange($event, 'more_about')"
                  id="per_additional_info_text"
                  placeholder="Additional Information"
                  :maxLength="200"
                  :rows="3"
                  v-model="
                    personalInformation.more_about.per_additional_info_text
                  "
                />
              </a-form-model-item>
              <div class="image-container text-center">
                <input
                  type="file"
                  class="input-image"
                  name="avatar"
                  @change="getResume"
                />
                <div class="img-preview mb-2">
                  <div class="mt-3 color-primary">{{ resumeDocument }}</div>
                </div>
                <span class="mb-2"
                  >The format supported are pdf, docx. Maximum file size 15
                  mb</span
                >
              </div>
            </div>
            <div class="col-12 col-md-6 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePersonalInfoMoreAdditionaInfo"
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
                class="collapse"
                data-parent="#personalInfoAccordian"
                id="collapsePersonalInfoMoreAdditionaInfo"
              >
                <div class="card card-body bubble">Additional Information</div>
              </div>
            </div>
          </div>
          <a-button
            shape="round"
            type="primary"
            style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
            class="mt-5"
            @click="handleSubmitFormFour"
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
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";
import { ARR_PersonalInfo, RULESPERSONALINFO } from "./models/candidate";
import { HEIGHTS, Employment_Statuses } from "../../models/data";
import ApiService from "../../services/api.service";
import vSelect from "vue-select";
import { createPopper } from "@popperjs/core";
export default {
  name: "PersonalInfoTwo",
  components: {
    DropdownDatePicker,
    NeedHelp,
    vSelect,
  },
  props: {
    candidateDetails: {
      type: Object,
    },
    personalInformation: {
      type: Object,
    },
  },
  data() {
    return {
      activeKey: 1,
      default_date: null,
      resumeDocument: null,
      rules: RULESPERSONALINFO,
      employment_Statuses: Employment_Statuses,
      languages: languages,
      hobbies: hobbies,
      foods: foods,
      thankfulThings: thankfulThings,
      ethnicityList: ethnicities,
      arr: ARR_PersonalInfo,
      heightTV: HEIGHTS,
    };
  },

  methods: {
    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width;
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -1],
            },
          },
          {
            name: "toggleClass",
            enabled: true,
            phase: "write",
            fn({ state }) {
              component.$el.classList.toggle(
                "drop-up",
                state.placement === "top"
              );
            },
          },
        ],
      });

      return () => popper.destroy();
    },
    getResume(e) {
      let file = e.target.files[0];

      if (!this.imageSizeCheck(file) || !this.ValidateSingleInput(file)) {
        file = "";
        this.resumeDocument = "";
        return;
      }
      this.resumeDocument = file.name;
      this.personalInformation.more_about.per_additional_info_doc =
        e.target.files[0];
      this.$store
        .dispatch("savePersonalMoreAboutFile", {
          per_additional_info_doc:
            this.personalInformation.more_about.per_additional_info_doc,
        })
        .then((data) => {})
        .catch((error) => {});
    },
    imageSizeCheck(file) {
      if (file["size"] > 2111775) {
        this.$error({
          title: "Validation Error",
          content: "Image size can't be more than 2 mb",
          center: true,
        });
        return false;
      }
      return true;
    },
    ValidateSingleInput(oInput) {
      let _validFileExtensions = [".pdf", ".doc", ".docx"];

      var sFileName = oInput.name;
      if (sFileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
          var sCurExtension = _validFileExtensions[j];
          if (
            sFileName
              .substr(
                sFileName.length - sCurExtension.length,
                sCurExtension.length
              )
              .toLowerCase() == sCurExtension.toLowerCase()
          ) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          this.$error({
            title: "Validation Error",
            content: "File must be pdf, doc or docx",
            center: true,
          });
          oInput.name = "";
          return false;
        }
      }

      return true;
    },

    changeActivekey(key) {
      this.activeKey = key;
    },
    onValueChange(e, action) {
      console.log(this.personalInformation);
      this.save(action);
    },

    handleSubmitFormOne() {
      this.$refs.personalInfoFormOne.validate((valid) => {
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
      this.$refs.personalInfoFormTwo.validate((valid) => {
        if (valid) {
          this.activeKey = ["3"];
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
          this.activeKey = ["4"];
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
    onChangeDD(d, m, y) {
      this.save("essential");
    },
    onMultiValueChange(e, name, action) {
      if (this.personalInformation.more_about[name].length > 3) {
        this.personalInformation.more_about[name] =
          this.personalInformation.more_about[name].splice(0, 3);
        return;
      }

      this.personalInformation.more_about[name] =
        this.personalInformation.more_about[name][
          this.personalInformation.more_about[name].length - 1
        ] == "Don't Mind"
          ? ["Don't Mind"]
          : this.personalInformation.more_about[name].filter(
              (item) => item != "Don't Mind"
            );

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
        .dispatch("savePersonalEssentialInfo", {
          ...this.personalInformation.essential,
          per_religion_id:
            this.personalInformation.essential.per_religion_id == 0
              ? null
              : this.personalInformation.essential.per_religion_id,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 1,
          });
        })
        .catch((error) => {});
    },
    async saveGeneralInfo() {
      await this.$store
        .dispatch("savePersonalGeneralInfo", this.personalInformation.general)
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 1,
          });
        })
        .catch((error) => {});
    },
    async saveContactInfo() {
      await this.$store
        .dispatch("savePersonalContactInfo", this.personalInformation.contact)
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 1,
          });
        })
        .catch((error) => {});
    },
    async saveMoreAboutInfo() {
      let {
        per_about,
        per_additional_info_text,
        per_children,
        per_have_children,
        per_marital_status,
        per_smoker,
        per_willing_to_relocate,
        per_currently_living_with,
        per_food_cuisine_like,
        per_hobbies_interests,
        per_improve_myself,
        per_language_speak,
        per_thankfull_for,
        per_things_enjoy,
      } = this.personalInformation.more_about;
      await this.$store
        .dispatch("savePersonalMoreAboutInfo", {
          ...{
            per_about,
            per_additional_info_text,
            per_children,
            per_have_children,
            per_marital_status,
            per_smoker,
            per_willing_to_relocate,
            per_currently_living_with,
            per_food_cuisine_like,
            per_hobbies_interests,
            per_improve_myself,
            per_language_speak,
            per_thankfull_for,
            per_things_enjoy,
          },
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
        .then((data) => {
          this.$emit("valueChange", {
            value: this.personalInformation,
            current: 1,
          });
        })
        .catch((error) => {});
    },
    async onCountryChange(e, name, action) {
      const res = await ApiService.get(`v1/utilities/cities/${e}`);

      if (res.status === 200) {
        switch (action) {
          case "permanant":
            this.personalInformation.contact.permanantCities = [];
            this.personalInformation.contact.permanantCities.push(
              ...res.data.data
            );
            break;
          case "residence":
            this.personalInformation.contact.residenceCities = [];
            this.personalInformation.contact.residenceCities.push(
              ...res.data.data
            );
            break;
        }
      }

      this.saveContactInfo();
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .trim()
        .toLowerCase()
        .startsWith(input.toLowerCase());
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.personal-info {
  padding: 0 0.75rem;
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

  .text-box {
    border-color: $color-secondary;
    border-radius: 5px;
    color: $color-secondary;
  }
  .custom-select {
    font-size: 12px !important;
  }
  .anticon {
    color: #b3b2b2;
  }
}
input[type="file"] {
  cursor: pointer;
  width: 100%;
  height: 34px;
  overflow: hidden;
  border-radius: 20px !important;
}

input[type="file"]:before {
  width: 100%;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  content: "Upload";
  display: inline-block;
  color: white;
  background: #8781bd;
  border: 1px solid #98a0e2;
  padding: 0 10px;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

#checkIcon {
  height: 18px;
  margin-right: 5px;
}

input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
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
