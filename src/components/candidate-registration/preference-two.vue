<template>
  <div id="accordion" class="preference">
    <div class="section-heading heading-text">
      <h5>So, what kind of life companion are you looking for </h5>
      <p>Your preferences about your companion</p>
    </div>

    <a-collapse
      @change="changeActivekey"
      accordion
      :activeKey="activeKey"
      :bordered="false"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <a-collapse-panel
        key="1"
        header="1.1 Preferences about your prospective companion"
      >
        <a-form-model
          v-if="preferenceData && activeKey == 1"
          ref="preferenceFormOne"
          :model="preferenceData"
          :rules="rules"
          class="form-ma"
        >
          <!-- Preferred Age -->
          <div class="row mt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What should be the age range of your prospective companion?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <SelectGroup
                @selected="onDropdownChange"
                :uniqueNames="['pre_partner_age_min', 'pre_partner_age_max']"
                :values="[
                  preferenceData.pre_partner_age_min,
                  preferenceData.pre_partner_age_max,
                ]"
                :size="'default'"
                :options="ageTV"
                :placeholder="'Age'"
                class="form-right-content w-full ant-dropdown-half"
              />
            </div>
            <div class="col-12 none-padding mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseExampleAge"
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
                data-parent="#accordion"
                class="collapse"
                id="collapseExampleAge"
              >
                <div class="card card-body bubble">
                 Provide your preferred age range
                </div>
              </div>
            </div>
          </div>

          <!-- Preferred Height -->
          <div class="row pt-3 pb-3 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    preferenceData.pre_height_min > 0 &&
                    preferenceData.pre_height_max > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is your preferred height range for your prospective
               companion?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <SelectGroup
                @selected="onDropdownChange"
                :values="[
                  preferenceData.pre_height_min,
                  preferenceData.pre_height_max,
                ]"
                :uniqueNames="['pre_height_min', 'pre_height_max']"
                :options="heightTV"
                :placeholder="'Height'"
                :size="'default'"
                class="form-right-content w-full height-select"
              />
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseExample"
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
                data-parent="#accordion"
                class="collapse"
                id="collapseExample"
              >
                <div class="card card-body bubble">
                  Provide your preferred height range in 'cm'
                </div>
              </div>
            </div>
          </div>

          <!-- Preferred country -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    !preferenceData.pre_has_country_allow_preference ||
                    preferenceData.preferred_countries[0]
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Do you have a preference about where your companion comes from?
              </div>
            </div>
            <div class="col-12 col-md-6 non-padding-mobile-margin">
              <div class="mobile-center mb-3 mobile-switch">
                <span class="ml-1 mr-1">No </span>
                <a-switch
                  @change="
                    onRateChange($event, 'pre_has_country_allow_preference')
                  "
                  v-model.lazy="preferenceData.pre_has_country_allow_preference"
                >
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
                <span class="ml-1">Yes</span>
              </div>

              <div v-if="preferenceData.pre_has_country_allow_preference">
                <div class="row my-1">
                  <div class="col-md-6 mobile-margin">
                    <v-select
                      :clearable="false"
                      id="preferred_countries0"
                      class="style-chooser select-ma w-100"
                      v-model.lazy="preferenceData.preferred_countries[0]"
                      label="name"
                      placeholder="Select Country"
                      :options="candidateDetails.countries"
                      @input="onChangeCountry($event, 'listOne', 'allowed')"
                    >
                      <span slot="no-options">Select Country</span>
                      <template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </div>
                  <div class="col-md-6 mobile-margin">
                    <v-select
                      :clearable="false"
                      id="preferred_cities0"
                      class="style-chooser"
                      label="name"
                      placeholder="Select City"
                      v-model.lazy="preferenceData.preferred_cities[0]"
                      :options="preferenceData.allowedCity.listOne"
                      @input="onValueChange"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </div>
                </div>

                <!-- <div class="row my-1">
                  <div class="col-md-6">
                    <a-select
                      @change="
                        onChangeCountry($event, 'listTwo', 'allowed')
                      "
                      id="preferred_countries1"
                      style="width: 150px"
                      :filter-option="filterOption"
                      :showSearch="true"
                      placeholder="Select Country"
                      v-model.lazy="preferenceData.preferred_countries[1]"
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
                  </div>
                  <div class="col-md-6">
                    <a-select
                      @change="onValueChange"
                      id="preferred_cities1"
                      style="width: 150px"
                      :filter-option="filterOption"
                      :showSearch="true"
                      placeholder="Select City"
                      v-model.lazy="preferenceData.preferred_cities[1]"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select City</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
                        v-bind:key="index"
                        style="width: 100px"
                        v-for="(item, index) in preferenceData.allowedCity
                          .listTwo"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div>

                <div class="row my-1">
                  <div class="col-md-6">
                    <a-select
                      @change="
                        onChangeCountry($event, 'listThree', 'allowed')
                      "
                      id="preferred_countries2"
                      style="width: 150px"
                      :filter-option="filterOption"
                      :showSearch="true"
                      placeholder="Select Country"
                      v-model.lazy="preferenceData.preferred_countries[2]"
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
                  </div>
                  <div class="col-md-6">
                    <a-select
                      @change="onChangeCountry"
                      id="preferred_cities2"
                      style="width: 150px"
                      :filter-option="filterOption"
                      :showSearch="true"
                      placeholder="Select City"
                      v-model.lazy="preferenceData.preferred_cities[2]"
                      class="select-ma w-100"
                    >
                      <a-select-option disabled :value="0"
                        >Select Country</a-select-option
                      >
                      <a-select-option
                        :value="item.id"
                        v-bind:key="index"
                        style="width: 100px"
                        v-for="(item, index) in preferenceData.allowedCity
                          .listThree"
                      >
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#countryCity"
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
              <div data-parent="#accordion" class="collapse" id="countryCity">
                <div class="card card-body bubble">
                  Provide your preferred countries and cities. You can choose
                  upto 3 pairs
                </div>
              </div>
            </div>
          </div>

          <!-- Disallowed country -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    !preferenceData.pre_has_country_disallow_preference ||
                    preferenceData.bloked_countries[0]
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Is there any country and city that you do not wish to be
                contacted from?
              </div>
            </div>
            <div class="col-12 col-md-6 non-padding-mobile-margin">
              <div class="mobile-center mb-3 mobile-switch">
                <span class="ml-1 mr-1">No</span>
                <a-switch
                  @change="
                    onRateChange($event, 'pre_has_country_disallow_preference')
                  "
                  v-model.lazy="
                    preferenceData.pre_has_country_disallow_preference
                  "
                >
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
                <span class="ml-1">Yes</span>
              </div>
              <div v-if="preferenceData.pre_has_country_disallow_preference">
                <div class="row my-1">
                  <div class="col-md-6 mobile-margin">
                    <v-select
                      :clearable="false"
                      id="bloked_countries0"
                      class="style-chooser"
                      v-model.lazy="preferenceData.bloked_countries[0]"
                      label="name"
                      placeholder="Select Country"
                      :options="candidateDetails.countries"
                      @input="onChangeCountry($event, 'listOne', 'disAllowed')"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </div>
                  <div class="col-md-6 mobile-margin">
                    <v-select
                      :clearable="false"
                      id="blocked_cities0"
                      class="style-chooser"
                      placeholder="Select City"
                      v-model.lazy="preferenceData.blocked_cities[0]"
                      label="name"
                      :options="preferenceData.disAllowedCity.listOne"
                      @input="onValueChange"
                      ><template #open-indicator>
                        <a-icon type="down" /> </template
                    ></v-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#forbiddenCountryCity"
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
                data-parent="#accordion"
                class="collapse"
                id="forbiddenCountryCity"
              >
                <div class="card card-body bubble">
                  Are there countries or cities that you do not wish to be
                  contacted from?
                </div>
              </div>
            </div>
          </div>

          <!-- Religion -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_partner_religion_id.length > 0"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is the preferred religion of your prospective companion?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <v-select
                :clearable="false"
                :multiple="true"
                id="pre_partner_religion_id"
                :reduce="(option) => option.id"
                class="nationality-select form-right-content w-full"
                placeholder="you may select up to three"
                @input="onMultiValueChange($event, 'pre_partner_religion_id')"
                v-model.lazy="preferenceData.pre_partner_religion_id"
                label="name"
                :options="[
                  { id: -1, name: `Don't Mind` },
                  ...candidateDetails.religions,
                ]"
              >
                <template #open-indicator>
                  <a-icon type="down" />
                </template>
              </v-select>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseExampleReligion"
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
                data-parent="#accordion"
                class="collapse"
                id="collapseExampleReligion"
              >
                <div class="card card-body bubble">
                  Preferred Religions for partner.
                </div>
              </div>
            </div>
          </div>

          <!-- Ethnic Background -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_ethnicities"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Which ethnic background do you prefer your prospective companion
                to be from?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <v-select
                :clearable="false"
                id="pre_ethnicities"
                class="style-chooser w-full form-right-content"
                placeholder="you may select up to three"
                @input="onValueChange"
                v-model.lazy="preferenceData.pre_ethnicities"
                label="name"
                :options="[`Don't Mind`, ...ethnicityList]"
              >
                <template #open-indicator> <a-icon type="down" /> </template
              ></v-select>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseExampleEthnicity"
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
                data-parent="#accordion"
                class="collapse"
                id="collapseExampleEthnicity"
              >
                <div class="card card-body bubble">
                  Select Partner's Ethnicity
                </div>
              </div>
            </div>
          </div>

          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    preferenceData &&
                    preferenceData.preferred_nationality &&
                    preferenceData.preferred_nationality.length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What is the preferred nationality of your prospective companion?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="preferred_nationality"
                prop="preferred_nationality"
              >
                <v-select
                  id="preferred_nationality"
                  :clearable="false"
                  :multiple="true"
                  class="nationality-select w-full form-right-content"
                  @input="
                    onNationalityValueChange($event, 'preferred_nationality')
                  "
                  v-model.lazy="preferenceData.preferred_nationality"
                  placeholder="you may select up to three"
                  label="name"
                  :options="[
                    { id: -1, name: `Don't Mind` },
                    ...candidateDetails.countries,
                  ]"
                >
                  <template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseExamplePartnerNationality"
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
              <div
                data-parent="#accordion"
                class="collapse"
                id="collapseExamplePartnerNationality"
              >
                <div class="card card-body bubble">
                  Preferred Partner's Nationality. You can select multiple
                  values
                </div>
              </div>
            </div>
          </div>

          <!-- Education and study level -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_study_level_id"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Which is the minimum education level you prefer your
                prospective companion to have?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="pre_study_level_id"
                prop="pre_study_level_id"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser w-full form-right-content"
                  @input="onValueChange"
                  :reduce="(option) => option.id"
                  placeholder="please select"
                  v-model.lazy="preferenceData.pre_study_level_id"
                  label="name"
                  :options="[
                    { id: -1, name: `Don't Mind` },
                    ...candidateDetails.studylevels,
                  ]"
                >
                  <template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapseMinimumEducation"
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
                data-parent="#accordion"
                class="collapse"
                id="collapseMinimumEducation"
              >
                <div class="card card-body bubble">
                  Minimum Education Level of Partner
                </div>
              </div>
            </div>
          </div>

          <!-- Employment Status -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_employment_status"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What employment status do you prefer you prospective companion
                to have?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="pre_employment_status"
                prop="pre_employment_status"
              >
                <v-select
                  :clearable="false"
                  class="style-chooser w-full form-right-content"
                  :reduce="(option) => option.value"
                  @input="onValueChange"
                  placeholder="please select"
                  v-model.lazy="preferenceData.pre_employment_status"
                  label="name"
                  :options="[
                    { value: 'other', name: `Don't Mind` },
                    ...employment_Statuses,
                  ]"
                >
                  <template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerEmploymentStatus"
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
                data-parent="#accordion"
                class="collapse"
                id="collapsePartnerEmploymentStatus"
              >
                <div class="card card-body bubble">
                  Partner's Employment Status
                </div>
              </div>
            </div>
          </div>

          <!-- Occupations -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="
                    preferenceData.pre_occupation &&
                    preferenceData.pre_occupation.length > 0
                  "
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />What occupation(s) do you prefer your prospective companion to
                have?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="pre_occupation" prop="pre_occupation">
                <v-select
                  :clearable="false"
                  :multiple="true"
                  @input="onMultiNameChange($event, 'pre_occupation')"
                  :reduce="(option) => option.name"
                  class="nationality-select form-right-content w-full"
                  v-model.lazy="preferenceData.pre_occupation"
                  placeholder="you may select up to three"
                  label="name"
                  :options="[`Don't Mind`, ...candidateDetails.occupations]"
                >
                  <template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#partner-occupation"
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
                data-parent="#accordion"
                class="collapse"
                id="partner-occupation"
              >
                <div class="card card-body bubble">Partner's occupuation</div>
              </div>
            </div>
          </div>

          <!-- Divorcee -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Are you willing to accept a divorcee?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin mobile-center">
              <div>
                <span class="mr-1">No</span>
                <a-switch
                  @change="onRateChange($event, 'pre_preferred_divorcee')"
                  v-model.lazy="preferenceData.pre_preferred_divorcee"
                >
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
                <span class="ml-1">Yes</span>
              </div>
              <div
                v-if="preferenceData.pre_preferred_divorcee"
                class="divorcee-child"
              >
                Are you willing to accept a divorcee with children?
              </div>
              <div v-if="preferenceData.pre_preferred_divorcee">
                <span class="mr-1">No</span>
                <a-switch
                  @change="onValueChange"
                  v-model.lazy="preferenceData.pre_preferred_divorcee_child"
                >
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
                <span class="ml-1">Yes</span>
              </div>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#divorceePartnerAcceptance"
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
                data-parent="#accordion"
                class="collapse"
                id="divorceePartnerAcceptance"
              >
                <div class="card card-body bubble">This field is optional</div>
              </div>
            </div>
          </div>

          <!-- Other Preference -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_other_preference"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Do you have any other requirements?
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item
                ref="pre_other_preference"
                prop="pre_other_preference"
              >
                <a-textarea
                  @blur="onValueChange"
                  :rows="3"
                  :maxLength="200"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  id="pre_other_preference"
                  v-model.lazy.lazy="preferenceData.pre_other_preference"
                  placeholder="maximum 500 characters"
                  class="w-full form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#otherRequirementsForPartner"
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
                data-parent="#accordion"
                id="otherRequirementsForPartner"
              >
                <div class="card card-body bubble">Here you can write other things that are important to you but could not provide elsewhere above</div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="row pt-3 pb-2 border-bottom">
            <div class="col-12 col-md-6 none-padding">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_description"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Describe your requirements about your preferred companion
              </div>
            </div>
            <div class="col-12 col-md-6 mobile-margin">
              <a-form-model-item ref="pre_description" prop="pre_description">
                <a-textarea
                  @blur="onValueChange"
                  :rows="3"
                  :maxLength="1000"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  id="pre_description"
                  v-model.lazy.lazy="preferenceData.pre_description"
                  placeholder="maximum 1000 charaters"
                  class="w-full form-right-input"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help none-padding">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#anyotherRequirementOnPartner"
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
                data-parent="#accordion"
                id="anyotherRequirementOnPartner"
              >
                <div class="card card-body bubble">
                  Any other requirements for companion
                </div>
              </div>
            </div>
          </div>
        </a-form-model>

        <a-button
          shape="round"
          type="primary"
          style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
          class="mt-5"
          @click="handleSubmitFormOne"
        >
          Save & Continue
        </a-button>
      </a-collapse-panel>

      <!-- Important things for you (Ratings) -->
      <a-collapse-panel
        key="2"
        header="1.2 Think of the people who know you well. Now, how would they rate the following aspects in their search for a prospective companion for you?"
        style="margin-top: 5px"
      >
        <a-form-model
          v-if="preferenceData && activeKey == 2"
          ref="preferenceFormTwo"
          :model="preferenceData"
          class="form-ma"
        >
          <!-- Character -->
          <!-- <div class="row py-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_strength_of_character_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Do you have any other requirements?
              </div>
            </div>

            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_strength_of_character_rate"
                prop="pre_strength_of_character_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_strength_of_character_rate"
                  v-model.lazy="preferenceData.pre_strength_of_character_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>

            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerCharacterRating"
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
                data-parent="#accordion"
                id="collapsePartnerCharacterRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div> -->


          <!-- Looks and Appearance -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_look_and_appearance_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />
                Looks, appearance & attractiveness
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_look_and_appearance_rate"
                prop="pre_look_and_appearance_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_look_and_appearance_rate"
                  v-model.lazy="preferenceData.pre_look_and_appearance_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerLookApperence"
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
                data-parent="#accordion"
                id="collapsePartnerLookApperence"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Religiosity/Faith -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_religiosity_or_faith_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Religiosity/faith compatibility in practice, or commitment to improve
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_religiosity_or_faith_rate"
                prop="pre_religiosity_or_faith_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_religiosity_or_faith_rate"
                  v-model.lazy="preferenceData.pre_religiosity_or_faith_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerReligiousFaith"
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
                data-parent="#accordion"
                id="collapsePartnerReligiousFaith"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Manners, Social skills and ethics -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_manners_socialskill_ethics_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Manners, Social skills, etiquettes & consideration for others
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_manners_socialskill_ethics_rate"
                prop="pre_manners_socialskill_ethics_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_manners_socialskill_ethics_rate"
                  v-model.lazy="
                    preferenceData.pre_manners_socialskill_ethics_rate
                  "
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerMannerSocialSkills"
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
                data-parent="#accordion"
                id="collapsePartnerMannerSocialSkills"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Emotional Maturity and compatibility -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_emotional_maturity_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Emotional maturity and general intelligence
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_emotional_maturity_rate"
                prop="pre_emotional_maturity_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_emotional_maturity_rate"
                  v-model.lazy="preferenceData.pre_emotional_maturity_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerEmotionMaturityRating"
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
                id="collapsePartnerEmotionMaturityRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Good Listener -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_good_listener_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Good Listener
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_good_listener_rate"
                prop="pre_good_listener_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_good_listener_rate"
                  v-model.lazy="preferenceData.pre_good_listener_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerGoodlistenerRating"
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
                data-parent="#accordion"
                class="collapse"
                id="collapsePartnerGoodlistenerRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Good talker -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_good_talker_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Good communicator and great to have two way converstations with
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_good_talker_rate"
                prop="pre_good_talker_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_good_talker_rate"
                  v-model.lazy="preferenceData.pre_good_talker_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerGoodTalkerRating"
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
                id="collapsePartnerGoodTalkerRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Willing to learn -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_wiling_to_learn_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Willing to learnfrom feedback and constructive criticism
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_wiling_to_learn_rate"
                prop="pre_wiling_to_learn_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_wiling_to_learn_rate"
                  v-model.lazy="preferenceData.pre_wiling_to_learn_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerWillingToLearnRating"
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
                id="collapsePartnerWillingToLearnRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Family or Social Status -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_family_social_status_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Family,  social status, respectability
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_family_social_status_rate"
                prop="pre_family_social_status_rate"
                class="text-center"
              >
                <a-rate
                  v-model.lazy="preferenceData.pre_family_social_status_rate"
                  id="pre_family_social_status_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerFamilySocialStatusRating"
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
                id="collapsePartnerFamilySocialStatusRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Employment or Wealth -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_employment_wealth_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Employment and financial stability
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_employment_wealth_rate"
                prop="pre_employment_wealth_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_employment_wealth_rate"
                  v-model.lazy="preferenceData.pre_employment_wealth_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerEmploymentWealthrating"
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
                data-parent="#accordion"
                class="collapse"
                id="collapsePartnerEmploymentWealthrating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div class="row pt-3 border-bottom">
            <div class="col-12 col-md-6">
              <div class="mb-2 font-weight-bold">
                <a-icon
                  v-if="preferenceData.pre_education_rate"
                  class="color-success mr-2 fs-18 fw-500"
                  type="check"
                />Education and academic accomplishments
              </div>
            </div>
            <div class="col-12 col-md-6">
              <a-form-model-item
                ref="pre_education_rate"
                prop="pre_education_rate"
                class="text-center"
              >
                <a-rate
                  id="pre_education_rate"
                  v-model.lazy="preferenceData.pre_education_rate"
                  @change="onChangeRate"
                  :tooltips="desc"
                  class="form-right-content"
                />
              </a-form-model-item>
            </div>
            <div class="col-12 mobile-margin mobile-help">
              <p>
                <a
                  class="color-blue fw-700 fs-14"
                  data-toggle="collapse"
                  href="#collapsePartnerEducationRating"
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
                id="collapsePartnerEducationRating"
              >
                <div class="card card-body bubble">
                  Provide ratings. This field is required.
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <a-button
              shape="round"
              type="primary"
              style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
              class="mt-5"
              @click="handleSubmitFormTwo"
            >
              Save & Continue
            </a-button>
          </div>
        </a-form-model>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import vSelect from "vue-select";
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import ethnicities from "@/common/ethnicities.js";
import { ARR, RULES, RULES_RATE } from "./models/candidate";
import SelectGroup from "@/components/ui/selects/SelectGroup";
import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
import ApiService from "@/services/api.service";
export default {
  name: "PreferenceTwo",
  components: { vSelect, NeedHelp, SelectGroup },
  props: {
    candidateDetails: {
      type: Object,
    },
    preferenceData: {
      type: Object,
    },
  },

  data() {
    return {
      attributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
      activeKey: 1,
      desc: [
        "Not important",
        "Quite important",
        "Important",
        "Very important",
        "Extremely important",
      ],
      rules: RULES,
      RULES_RATE: RULES_RATE,
      arr: ARR,
      ageTV: AGES,
      heightTV: HEIGHTS,
      employment_Statuses: Employment_Statuses,
      ethnicityList: ethnicities,
    };
  },
  mounted() {},
  created() {},
  computed: {},

  methods: {
    changeActivekey(key) {
      this.activeKey = key;
    },
    onDropdownChange({ name, value }) {
      this.preferenceData[name] = value;
      this.savePreference();
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .trim()
        .toLowerCase()
        .startsWith(input.toLowerCase());
    },

    handleSubmitFormOne() {
      this.$refs.preferenceFormOne.validate((valid) => {
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
      this.$refs.preferenceFormTwo.validate((valid) => {
        if (valid) {
          this.activeKey = null;
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
            this.activeKey = null;
          }, 100);
          return false;
        }
      });
    },
    onNationalityValueChange(e, name) {
      if (
        this.preferenceData[name][this.preferenceData[name].length - 1].name !=
          `Don't Mind` &&
        this.preferenceData[name].length > 3
      ) {
        this.preferenceData[name] = this.preferenceData[name].splice(0, 3);
        return;
      }
      this.preferenceData[name] =
        this.preferenceData[name][this.preferenceData[name].length - 1].name ==
        `Don't Mind`
          ? [{ id: 999999, name: `Don't Mind` }]
          : this.preferenceData[name].filter(
              (item) => item.name != `Don't Mind`
            );

      this.savePreference();
    },
    onMultiValueChange(e, name) {
      if (
        this.preferenceData[name][this.preferenceData[name].length - 1] != -1 &&
        this.preferenceData[name].length > 3
      ) {
        this.preferenceData[name] = this.preferenceData[name].splice(0, 3);
        return;
      }
      this.preferenceData[name] =
        this.preferenceData[name][this.preferenceData[name].length - 1] == -1
          ? [-1]
          : this.preferenceData[name].filter((item) => item != -1);

      this.savePreference();
    },
    onMultiNameChange(e, name) {
      if (
        this.preferenceData[name][this.preferenceData[name].length - 1] !=
          `Don't Mind` &&
        this.preferenceData[name].length > 3
      ) {
        this.preferenceData[name] = this.preferenceData[name].splice(0, 3);
        return;
      }
      this.preferenceData[name] =
        this.preferenceData[name][this.preferenceData[name].length - 1] ==
        `Don't Mind`
          ? [`Don't Mind`]
          : this.preferenceData[name].filter((item) => item != `Don't Mind`);

      this.savePreference();
    },
    onValueChange(e, name) {
      this.savePreference();
    },
    onRateChange(e, name) {
      if (!this.preferenceData.pre_has_country_allow_preference) {
        this.preferenceData.preferred_countries = [];
        this.preferenceData.preferred_cities = [];
      }
      if (!this.preferenceData.pre_has_country_disallow_preference) {
        this.preferenceData.bloked_countries = [];
        this.preferenceData.blocked_cities = [];
      }
      if (!this.preferenceData.pre_preferred_divorcee) {
        this.preferenceData.pre_preferred_divorcee_child = false;
      }
      this.savePreference();
    },

    savePreference() {
      const response = this.$store.dispatch("savePreferenceInfoAbout", {
        ...this.preferenceData,

        pre_nationality:
          this.preferenceData.preferred_nationality.length > 0
            ? this.preferenceData.preferred_nationality.map((n) => n.id)
            : null,
        pre_partner_religions:
          this.preferenceData.pre_partner_religion_id.join(","),
        pre_partner_comes_from: this.preferenceData.preferred_countries.map(
          (c, index) => {
            return {
              country: c.id,
              city:
                this.preferenceData.preferred_cities.length > 0
                  ? this.preferenceData.preferred_cities[index]
                    ? this.preferenceData.preferred_cities[index].id
                    : null
                  : null,
            };
          }
        ),
        pre_disallow_preference: this.preferenceData.bloked_countries.map(
          (c, index) => {
            return {
              country: c.id,
              city:
                this.preferenceData.blocked_cities.length > 0
                  ? this.preferenceData.blocked_cities[index]
                    ? this.preferenceData.blocked_cities[index].id
                    : null
                  : null,
            };
          }
        ),
      });
      response
        .then((data) => {
          this.$emit("valueChange", {
            value: this.preferenceData,
            current: 0,
          });
        })
        .catch((error) => {});
    },

    onChangeRate(value) {
      const {
        pre_education_rate,
        pre_emotional_maturity_rate,
        pre_employment_wealth_rate,
        pre_family_social_status_rate,
        pre_good_listener_rate,
        pre_good_talker_rate,
        pre_look_and_appearance_rate,
        pre_manners_socialskill_ethics_rate,
        pre_religiosity_or_faith_rate,
        pre_wiling_to_learn_rate,
        pre_strength_of_character_rate,
      } = this.preferenceData;
      const response = this.$store.dispatch("savePreferenceRatingInfo", {
        pre_education_rate,
        pre_emotional_maturity_rate,
        pre_employment_wealth_rate,
        pre_family_social_status_rate,
        pre_good_listener_rate,
        pre_good_talker_rate,
        pre_look_and_appearance_rate,
        pre_manners_socialskill_ethics_rate,
        pre_religiosity_or_faith_rate,
        pre_wiling_to_learn_rate,
        pre_strength_of_character_rate,
      });
      response
        .then((data) => {
          this.$emit("valueChange", {
            value: this.preferenceData,
            current: 0,
          });
        })
        .catch((error) => {});
    },
    async onChangeCountry(e, name, action) {
      const res = await ApiService.get(`v1/utilities/cities/${e.id}`);

      if (res.status === 200) {
        switch (name) {
          case "listOne":
            action == "allowed"
              ? (this.preferenceData.allowedCity.listOne = [])
              : (this.preferenceData.disAllowedCity.listOne = []);
            action == "allowed"
              ? this.preferenceData.allowedCity.listOne.push(...res.data.data)
              : this.preferenceData.disAllowedCity.listOne.push(
                  ...res.data.data
                );
            break;
          case "listTwo":
            action == "allowed"
              ? this.preferenceData.allowedCity.listTwo.push(...res.data.data)
              : this.preferenceData.disAllowedCity.listTwo.push(
                  ...res.data.data
                );
            break;
          case "listThree":
            action == "allowed"
              ? this.preferenceData.allowedCity.listThree.push(...res.data.data)
              : this.preferenceData.disAllowedCity.listThree.push(
                  ...res.data.data
                );
            break;
        }
      }

      this.savePreference();
    },
  },

  watch: {},
};
</script>

<style scoped lang="scss">
//Vue Select CSS is declared globally
@import "@/styles/base/_variables.scss";

.preference {
  padding: 0 0.75rem;
  @media (min-width: 768px) {
    padding: 0;
  }
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

  .form-ma {
    .pre-age {
      max-width: 100% !important;
      margin: 0px auto;
    }
    .anticon {
      color: #b3b2b2;
    }
    .ant-slider {
      margin-bottom: 16px;
      .ant-slider-track {
        height: 14px;
        background-color: #8983c1;
      }
      .ant-slider-rail {
        height: 14px;
        border-radius: 4px;
        border: 1px solid #c5c5c5;
        background-color: #ffffff;
      }
      .ant-slider-handle {
        border-radius: 4px;
        border: 1px solid #ffffff;
        width: 24px;
        height: 24px;
        margin-top: -6px;
        background-color: #6158a9;
        &::after {
          width: 2px;
          height: 2px;
          background-color: #ffffff;
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &:hover {
        .ant-slider-track {
          background-color: #6e64bf;
        }
        .ant-slider-handle:not(.ant-tooltip-open) {
          border-color: #6e64bf;
        }
      }
    }

    .slider {
      border: 1px solid $color-primary;
    }
    .height {
      padding-top: 6px;
      margin-top: 5px;
      input {
        width: 45%;
        height: 36px;
        outline: none;
        padding: 0 15px;
        border-color: #6158a9;
      }
    }

    .ant-rate {
      color: $color-primary;
    }
    .column {
      display: grid;
      justify-content: center;
      align-items: center;
    }
    .divorcee-child {
      background-color: #d5d5da;
      margin: 10px 0px 10px 0px;
      padding: 10px;
    }
    .text-box {
      border-color: $color-secondary;
      border-radius: 5px;
      color: $color-secondary;
    }
  }
  .remove,
  .add {
    border: 0;
    padding: 0;
    background: transparent;
    svg {
      width: 30px;
      .cls-1 {
        fill: red;
      }
      .cls-2 {
        fill: #ffffff;
      }
    }
  }
  .add {
    svg {
      width: 30px;
      .cls-1 {
        fill: #6259a8;
      }
      .cls-2 {
        fill: #ffffff;
      }
    }
    span {
      color: #6259a8;
    }
  }
}

.religion-design {
  background-color: red;
  color: red;
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
