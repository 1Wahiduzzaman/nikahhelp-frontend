<template>
  <div class="preference">
    <div class="section-heading heading-text">
      <h5>Your Preferences</h5>
      <p>Your Preferences About Your Prospective Partner</p>
    </div>

    <a-collapse
      :activeKey="$store.state.candidateInfo.activePanel"
      :bordered="false"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <a-collapse-panel
        key="1"
        header="1. Your Preferences about your prospective partner."
      >
        <form class="form-ma">
          <a-row>
            <!-- Preferred Age -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What should be the age range of your prospective partner?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-slider
                    :min="18"
                    :max="100"
                    range
                    :default-value="[
                      preferenceData.pre_partner_age_min,
                      preferenceData.pre_partner_age_max,
                    ]"
                    @change="onChangeSlider"
                    @afterChange="onAfterChangeSlider"
                  />

                  <p class="text-center fs-18 color-primary">
                    <span class="fw-700"
                      >{{ preferenceData.pre_partner_age_min }}
                      -
                      {{ preferenceData.pre_partner_age_max }}</span
                    >
                    years old
                  </p>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapseExampleAge">
                    <div class="card card-body bubble">
                      Provide your preferred age range
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Preferred Height -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        preferenceData.pre_height_min > 0 &&
                        preferenceData.pre_height_max > 0
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is your preferred height range for your prospective
                    partner?
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <div class="height">
                    <div class="text-center mr-3 mb-2">
                      <span class="fs-18 mr-2">cm</span>
                      <a-switch v-model="heightUnit" />
                      <span class="fs-18 ml-2">ft</span>
                    </div>

                    <a-input
                      v-if="heightUnit == 0"
                      suffix="cm"
                      class="w-45"
                      v-model.number="minHeight"
                      placeholder="Enter your height"
                      type="number"
                    />
                    <a-input
                      v-else
                      suffix="ft"
                      class="w-45"
                      v-model.number="minHeightFt"
                      placeholder="Enter your height"
                      type="number"
                    />
                    <span class="text-center mt-2 ml-2 mr-2">To</span>

                    <a-input
                      v-if="heightUnit == 0"
                      suffix="cm"
                      class="w-45"
                      v-model.number="maxHeight"
                      placeholder="Enter your height"
                      type="number"
                    />
                    <a-input
                      v-else
                      suffix="ft"
                      class="w-45"
                      v-model.number="maxHeightFt"
                      placeholder="Enter your height"
                      type="number"
                    />
                  </div>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body bubble">
                      Provide your preferred height range in 'cm'
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Preferred country -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        preferenceData.preferred_countries[0] &&
                        preferenceData.preferred_cities[0]
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Do you have preferences for countries or cities where your
                    prospective partner comes from?
                  </div>
                  <!-- <need-help
										title="Provide your preferred countries and cities. You can
											choose upto 3 pairs"
									></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <!-- Yes Or No Switch -->
                  <div>
                    <span class="ml-1 mr-1">No </span>
                    <a-switch @change="onChange($event)" v-model="allowSwitch">
                      <a-icon slot="checkedChildren" type="check" />
                      <a-icon slot="unCheckedChildren" type="close" />
                    </a-switch>
                    <span class="ml-1">Yes</span>
                  </div>
                  <!-- Select Country -->
                  <div v-if="allowSwitch">
                    <div class="row my-1">
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.preferred_countries[0]"
                          label="name"
                          placeholder="Select Country"
                          :options="$store.state.candidateInfo.countries"
                          @input="onChangeCountry"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.preferred_cities[0]"
                          label="name"
                          placeholder="Select City"
                          :options="cities"
                        ></v-select>
                      </div>
                    </div>

                    <div class="row my-1">
                      <div class="col-md-6">
                        <v-select
                          v-model="preferenceData.preferred_countries[1]"
                          label="name"
                          placeholder="Select Country"
                          class="style-chooser px-0"
                          :options="$store.state.candidateInfo.countries"
                          @input="onChangeCountry"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          v-model="preferenceData.preferred_cities[1]"
                          class="style-chooser px-0"
                          label="name"
                          placeholder="Select City"
                          :options="cities"
                        ></v-select>
                      </div>
                    </div>
                    <!-- Third Country City -->
                    <div class="row my-1">
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.preferred_countries[2]"
                          label="name"
                          placeholder="Select Country"
                          :options="$store.state.candidateInfo.countries"
                          @input="onChangeCountry"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.preferred_cities[2]"
                          label="name"
                          placeholder="Select City"
                          :options="cities"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="countryCity">
                    <div class="card card-body bubble">
                      Provide your preferred countries and cities. You can
                      choose upto 3 pairs
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Disallowed country -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Are there countries or cities that you do not wish to be
                    contacted from?
                  </div>

                  <!-- <need-help
										title="Choose all the countries that you don't prefer. You can
											choose upto 3 countries. This field is optional."
									>
									</need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <div>
                    <span class="ml-1 mr-1">No</span>
                    <a-switch v-model="disallowSwitch">
                      <a-icon slot="checkedChildren" type="check" />
                      <a-icon slot="unCheckedChildren" type="close" />
                    </a-switch>
                    <span class="ml-1">Yes</span>
                  </div>
                  <!-- Select Country -->
                  <div v-if="disallowSwitch">
                    <!-- First Country City -->
                    <div class="row my-1">
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.bloked_countries[0]"
                          label="name"
                          placeholder="Select Country"
                          :options="$store.state.candidateInfo.countries"
                          @input="onChangeCountry"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.blocked_cities[0]"
                          label="name"
                          placeholder="Select City"
                          :options="cities"
                        ></v-select>
                      </div>
                    </div>
                    <!-- Second Country City -->
                    <div class="row my-1">
                      <div class="col-md-6">
                        <v-select
                          v-model="preferenceData.bloked_countries[1]"
                          label="name"
                          placeholder="Select Country"
                          class="style-chooser px-0"
                          :options="$store.state.candidateInfo.countries"
                          @input="onChangeCountry"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          v-model="preferenceData.blocked_cities[1]"
                          class="style-chooser px-0"
                          label="name"
                          placeholder="Select City"
                          :options="cities"
                        ></v-select>
                      </div>
                    </div>
                    <!-- Third Country City -->
                    <div class="row my-1">
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.bloked_countries[2]"
                          label="name"
                          placeholder="Select Country"
                          :options="$store.state.candidateInfo.countries"
                          @input="onChangeCountry"
                        ></v-select>
                      </div>
                      <div class="col-md-6">
                        <v-select
                          class="style-chooser"
                          v-model="preferenceData.blocked_cities[2]"
                          label="name"
                          placeholder="Select City"
                          :options="cities"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="forbiddenCountryCity">
                    <div class="card card-body bubble">
                      Are there countries or cities that you do not wish to be
                      contacted from?
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Religion -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is the preferred religion of your prospective
                    partner?
                  </div>
                  <!-- <need-help
										title="Preferred Religions for partner."
									></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-select
                    :show-arrow="true"
                    mode="multiple"
                    style="width: 150px"
                    placeholder="Select your preferred religion"
                    @change="handleReligionChange"
                    class="select-ma w-100"
                    v-model="prefReligions"
                  >
                    <a-select-option
                      :value="item.id"
                      v-bind:key="index"
                      v-for="(item, index) in $store.state.candidateInfo
                        .religion_options"
                      >{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapseExampleReligion">
                    <div class="card card-body bubble">
                      Preferred Religions for partner.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Ethnic Background -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_ethnicities"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Which ethnic background do you prefer your prospective
                    partner to be from?
                  </div>
                  <!-- <need-help title="Select Partner's Ethnicity"></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-select
                    :showSearch="true"
                    option-filter-prop="children"
                    :filter-option="filterOption"
                    :showArrow="true"
                    ref="select"
                    style="width: 150px"
                    placeholder="Please select"
                    v-model="preferenceData.pre_ethnicities"
                    class="select-ma w-100"
                  >
                    <a-select-option :value="null" disabled
                      >Select Ethnicity</a-select-option
                    >

                    <a-select-option
                      v-for="(ethnicity, key) in ethnicityList"
                      :value="ethnicity"
                      :key="key"
                    >
                      {{ ethnicity }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapseExampleEthnicity">
                    <div class="card card-body bubble">
                      Select Partner's Ethnicity
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Nationality-->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="
                        preferenceData &&
                        preferenceData.preferred_nationality &&
                        preferenceData.preferred_nationality.length > 0
                      "
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What is the preferred nationality of your prospective
                    partner?
                  </div>
                  <!-- <need-help
										title="Preferred Partner's Nationality. You can select multiple values"
									></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <v-select
                    class="nationality-select"
                    :multiple="true"
                    v-model="preferenceData.preferred_nationality"
                    placeholder="Select Nationality"
                    label="name"
                    :options="$store.state.candidateInfo.countries"
                  ></v-select>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapseExamplePartnerNationality">
                    <div class="card card-body bubble">
                      Preferred Partner's Nationality. You can select multiple
                      values
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Education and study level -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_study_level_id"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Which is the minimum education level you prefer your
                    prospective partner to have?
                  </div>
                  <!-- <need-help
										title="Minimum Education Level of Partner"
									></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-select
                    style="width: 150px"
                    placeholder="Please select your education status"
                    v-model="preferenceData.pre_study_level_id"
                    class="select-ma w-100"
                  >
                    <a-select-option :value="null" disabled
                      >Select minimum education level</a-select-option
                    >
                    <a-select-option
                      :value="item.id"
                      v-bind:key="index"
                      style="width: 100px"
                      v-for="(item, index) in $store.state.candidateInfo
                        .study_level_options"
                    >
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapseMinimumEducation">
                    <div class="card card-body bubble">
                      Minimum Education Level of Partner
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Employment Status -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_employment_status"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What employment status do you prefer you prospective
                    partner to have?
                  </div>
                  <!-- <need-help title="Partner's Employment Status"></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-select
                    style="width: 150px"
                    placeholder="Please select"
                    v-model="preferenceData.pre_employment_status"
                    class="select-ma w-100"
                  >
                    <a-select-option :value="null" disabled
                      >Select current employment status</a-select-option
                    >
                    <a-select-option value="Employed">
                      Employed
                    </a-select-option>
                    <a-select-option value="Unemployed">
                      Unemployed
                    </a-select-option>
                    <a-select-option value="Others">
                      Don't mind
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerEmploymentStatus">
                    <div class="card card-body bubble">
                      Partner's Employment Status
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Occupations -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_occupation"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />What occupation do you prefer your prospective partner to
                    have?
                  </div>
                  <!-- <need-help title="Partner's occupuation"></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <a-select
                    :showSearch="true"
                    option-filter-prop="children"
                    :filter-option="filterOption"
                    v-model="preferenceData.pre_occupation"
                    placeholder="Please select your preferred occupation"
                    class="select-ma w-100"
                  >
                    <a-select-option :value="null" disabled
                      >Select Occupation</a-select-option
                    >
                    <a-select-option
                      :value="value"
                      :key="key"
                      style="width: 100px"
                      v-for="(value, key) in $store.state.candidateInfo
                        .occupations"
                    >
                      {{ value }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="partner-occupation">
                    <div class="card card-body bubble">
                      Partner's occupuation
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Divorcee -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Are you willing to accept a divorcee?
                  </div>
                  <!-- <need-help title="This field is optional"></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <div>
                    <span class="mr-1">No</span>
                    <a-switch v-model="divorceeSwitch">
                      <a-icon slot="checkedChildren" type="check" />
                      <a-icon slot="unCheckedChildren" type="close" />
                    </a-switch>
                    <span class="ml-1">Yes</span>
                  </div>
                  <div v-if="divorceeSwitch" class="divorcee-child">
                    Are you willing to accept a divorcee with children?
                  </div>
                  <div v-if="divorceeSwitch">
                    <span class="mr-1">No</span>
                    <a-switch v-model="divorceeChildSwitch">
                      <a-icon slot="checkedChildren" type="check" />
                      <a-icon slot="unCheckedChildren" type="close" />
                    </a-switch>
                    <span class="ml-1">Yes</span>
                  </div>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="divorceePartnerAcceptance">
                    <div class="card card-body bubble">
                      This field is optional
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Other Preference -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_other_preference"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Do you have any other requirements?
                  </div>
                  <!-- <need-help title="Any other requirements"></need-help> -->
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <textarea
                    cols="30"
                    rows="3"
                    v-model="preferenceData.pre_other_preference"
                    class="w-100 text-box"
                    placeholder="Sample Text"
                  ></textarea>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="otherRequirementsForPartner">
                    <div class="card card-body bubble">
                      Any other requirements
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Description -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_description"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Describe your requirements about your preferred partner in
                    max 250 words
                  </div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="12">
                  <textarea
                    cols="30"
                    rows="3"
                    v-model="preferenceData.pre_description"
                    class="w-100 text-box"
                    placeholder="Sample Text"
                  ></textarea>
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="anyotherRequirementOnPartner">
                    <div class="card card-body bubble">
                      Any other requirements for partner
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </form>

        <!-- <a-form-item>
        <a-button type="primary">Save & Continue</a-button>
      </a-form-item> -->

        <a-button
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
          :loading="loadingButton"
          @click="saveAboutInfo"
        >
          Save & Continue
        </a-button>

        <!-- {{ $store.state.candidateInfo.preference }} -->
      </a-collapse-panel>

      <!-- Important things for you (Ratings) -->
      <a-collapse-panel
        key="2"
        header="2. What things are important to you when considering for a prospective partner?"
        style="margin-top: 5px"
      >
        <form class="form-ma">
          <a-row :gutter="8">
            <!-- What are important to you(Ratings) -->

            <!-- Character -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_strength_of_character_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Do you have any other requirements?
                  </div>
                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_strength_of_character_rate"
                    @change="onChangeCharacter"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerCharacterRating">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Looks and Appearance -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_look_and_appearance_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Looks and appearance
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_look_and_appearance_rate"
                    @change="onChangeLook"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerLookApperence">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Religiosity/Faith -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_religiosity_or_faith_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Religiosity/Faith
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_religiosity_or_faith_rate"
                    @change="onChangeFaith"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerReligiousFaith">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Manners, Social skills and ethics -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_manners_socialskill_ethics_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Manners, Social skills and ethics
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_manners_socialskill_ethics_rate"
                    @change="onChangeManner"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerMannerSocialSkills">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Emotional Maturity and compatibility -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_emotional_maturity_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Emotional Maturity and compatibility
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_emotional_maturity_rate"
                    @change="onChangeMaturity"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                    class="collapse"
                    id="collapsePartnerEmotionMaturityRating"
                  >
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Good Listener -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_good_listener_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Good Listener
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_good_listener_rate"
                    @change="onChangeListener"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerGoodlistenerRating">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Good talker -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_good_talker_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Good Talker
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_good_talker_rate"
                    @change="onChangeTalker"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerGoodTalkerRating">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Willing to learn -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_wiling_to_learn_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Willing to learn
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_wiling_to_learn_rate"
                    @change="onChangeWillToLearn"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                    class="collapse"
                    id="collapsePartnerWillingToLearnRating"
                  >
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <!-- Family or Social Status -->
            <a-col class="form-item py-3 border-bottom" :span="24">
              <a-row type="flex" align="top">
                <a-col :span="10">
                  <div class="mb-2">
                    <a-icon
                      v-if="preferenceData.pre_family_social_status_rate"
                      class="color-success mr-2 fs-18 fw-500"
                      type="check"
                    />Family or Social Status
                  </div>

                  <!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
								</a-col>
								<a-col :span="4"></a-col>
								<a-col :span="10">
									<a-rate
										v-model="preferenceData.pre_family_social_status_rate"
										@change="onChangeSocialStatus"
										:tooltips="desc"
									/>
								</a-col>
								<a-col :span="12">
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
										class="collapse"
										id="collapsePartnerFamilySocialStatusRating"
									>
										<div class="bubble">
											Provide ratings. This field is required.
										</div>
									</div>
								</a-col>
							</a-row>
						</a-col>

						<!-- Employment or Wealth -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="10">
									<div class="mb-2">
										<a-icon
											v-if="preferenceData.pre_employment_wealth_rate"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Employment or Wealth
									</div>

									<!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
								</a-col>
								<a-col :span="4"></a-col>
								<a-col :span="10">
									<a-rate
										v-model="preferenceData.pre_employment_wealth_rate"
										@change="onChangeWealth"
										:tooltips="desc"
									/>
								</a-col>
								<a-col :span="12">
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
										class="collapse"
										id="collapsePartnerEmploymentWealthrating"
									>
										<div class="card card-body bubble">
											Provide ratings. This field is required.
										</div>
									</div>						
								</a-col>
							</a-row>
						</a-col>

						<!-- Education -->
						<a-col class="form-item py-3 border-bottom" :span="24">
							<a-row type="flex" align="top">
								<a-col :span="10">
									<div class="mb-2">
										<a-icon
											v-if="preferenceData.pre_education_rate"
											class="color-success mr-2 fs-18 fw-500"
											type="check"
										/>Education
									</div>

									<!-- <need-help
										title="Provide ratings. This field is required."
									></need-help> -->
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="10">
                  <a-rate
                    v-model="preferenceData.pre_education_rate"
                    @change="onChangeEducation"
                    :tooltips="desc"
                  />
                </a-col>
                <a-col :span="12">
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
                  <div class="collapse" id="collapsePartnerEducationRating">
                    <div class="card card-body bubble">
                      Provide ratings. This field is required.
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>

            <a-button
              shape="round"
              type="primary"
              style="float: right"
              class="mt-3"
              :loading="loadingButton"
              @click="saveRatingInfo"
            >
              Save & Continue
            </a-button>
          </a-row>
        </form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import vSelect from "vue-select";
import NeedHelp from "@/components/candidate-registration/NeedHelp.vue";
import ethnicities from "@/common/ethnicities.js";
import Vue from "vue";
export default {
  name: "Preference",
  components: { vSelect, NeedHelp },
  props: ["activePanel"],
  data() {
    return {
      preferenceData: this.getPreferenceDefaultData(),
      ageValue: [60, 90],
      prefData: null,
      cities: [],
      prefReligions: [],
      loadingButton: false,
      ethnicityList: ethnicities,
      heightUnit: false,
      minHeightFt: undefined,
      maxHeightFt: undefined,
	  allowSwitch:false,
      desc: [
        "Not Important",
        "Quite Important",
        "Important",
        "Very Important",
        "Extremely Important",
      ],
      arr: [
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
      ],
    };
  },
  created() {
    console.log("Created");
    this.getPreferenceData();
    this.$store.state.candidateInfo.activePanel = 1;
  },

  methods: {
	  onChange(ev){
		  console.log('ev',ev)

	  },
    getPreferenceDefaultData() {
      return {
        updateApiStatus: false,
        pre_partner_age_min: "",
        pre_partner_age_max: "",
        pre_height_min: "",
        pre_height_max: "",
        pre_has_country_allow_prefference: "",
        pre_countries: [],
        pre_cities: [],
        preferred_countries: [],
        preferred_cities: [],
        pre_strength_of_character_rate: "",
        pre_look_and_appearance_rate: "",
        pre_religiosity_or_faith_rate: "",
        pre_manners_socialskill_ethics_rate: "",
        pre_emotional_maturity_rate: "",
        pre_good_listener_rate: "",
        pre_good_talker_rate: "",
        pre_wiling_to_learn_rate: "",
        pre_family_social_status_rate: "",
        pre_employment_wealth_rate: "",
        pre_education_rate: "",
        pre_religions: "1, 2, 3",
      };
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    showError(errorMessage) {
      this.$error({
        title: "Validation Error",
        content: errorMessage,
        centered: true,
      });
    },
    openNotification() {
      this.$notification.open({
        message: this.$store.state.candidateInfo.successMessageTitle,
        description: this.$store.state.candidateInfo.successMessage,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    },
    //Fetch Data from API
    async getPreferenceData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getPreference");

        this.prefData = this.$store.getters["preference"];
        this.minHeightFt = (this.prefData.pre_height_min / 30.48).toFixed(2);
        this.maxHeightFt = (this.prefData.pre_height_max / 30.48).toFixed(2);
        this.ageValue[0] = this.prefData.pre_partner_age_min;
        this.ageValue[1] = this.prefData.pre_partner_age_max;
        this.prefReligions = this.prefData.pre_partner_religion_id.map(
          function (v) {
            return parseInt(v, 10);
          }
        );
      } catch (error) {
        alert(this.error);
      }
      this.isLoading = false;
    },
    //About Info
    handleReligionChange(value) {
      this.preferenceData.pre_religions = value;
      console.log(this.preferenceData.pre_religions);
    },
    handleEthinicitiesChange(value) {
      console.log(value);
      this.$store.state.candidateInfo.preference.pre_ethnicities = value;
    },
    onChangeCountry(value) {
      console.log(value.name);
      this.$store.state.candidateInfo.countries.map((c) => {
        if (c.name === value.name) {
          this.cities = c.cities;
        }
      });
    },
    //POST data -> Preference About
    async saveAboutInfo() {
      this.loadingButton = true;
      console.log("save button clicked");
      //religions
      const preferredReligions = this.prefReligions.join(",");
      console.log(preferredReligions);
      const preferred_countries = this.preferenceData.preferred_countries.map(
        (a) => a.id
      );
      const preferred_cities = this.preferenceData.preferred_cities.map(
        (a) => a.id
      );
      const blocked_countries = this.preferenceData.bloked_countries.map(
        (a) => a.id
      );
      const blocked_cities = this.preferenceData.blocked_cities.map(
        (a) => a.id
      );

      if (preferred_cities.length != preferred_countries.length) {
        alert(
          "Please select cities for every countries in allow country preference!"
        );
        return;
      }
      if (blocked_countries.length != blocked_cities.length) {
        alert(
          "Please select cities for every countries in disallow country preference!"
        );
        return;
      }
      const allowSwitchValue =
        this.$store.state.candidateInfo.preference
          .pre_has_country_allow_preference;
      const disallowSwitchValue =
        this.$store.state.candidateInfo.preference
          .pre_has_country_disallow_preference;
      var allowedCountries = [];
      var disallowedCountries = [];

      for (let i = 0; i < preferred_countries.length; i++) {
        var newObj1 = {};
        newObj1.country = preferred_countries[i];
        newObj1.city = preferred_cities[i];
        //console.log(newObj1);
        allowedCountries.push(newObj1);
        //console.log(allowedCountries);
      }
      for (let i = 0; i < blocked_countries.length; i++) {
        var newObj2 = {};
        newObj2.country = blocked_countries[i];
        newObj2.city = blocked_cities[i];
        //console.log(newObj2);
        disallowedCountries.push(newObj2);
      }
      console.log(allowedCountries);
      console.log(disallowedCountries);
      // return;

      const preferred_nationality =
        this.preferenceData.preferred_nationality.map((a) => a.id);
      //Validation
      if (
        this.preferenceData.pre_height_min > this.preferenceData.pre_height_max
      ) {
        this.showError("Minimum height can't be greater than maximum height");
        this.loadingButton = false;
        return;
      }

      if (this.prefReligions.length == 0 || !this.prefReligions) {
        this.showError("At least one religion needs to be selected!");
        this.loadingButton = false;
        return;
      }

      if (preferred_nationality.length == 0 || !preferred_nationality) {
        this.showError("At least one nationality needs to be selected!");

        this.loadingButton = false;
        return;
      }
      if (!this.preferenceData.pre_ethnicities) {
        this.showError("Preferred Ethnicity needs to be selected!");
        this.loadingButton = false;
        return;
      }
      if (!this.preferenceData.pre_study_level_id) {
        this.showError(
          "Preferred minimum education level needs to be selected!"
        );
        this.loadingButton = false;
        return;
      }
      if (!this.preferenceData.pre_employment_status) {
        this.showError("Preferred employement status needs to be selected!");
        this.loadingButton = false;
        return;
      }
      if (!this.preferenceData.pre_occupation) {
        this.showError("Preferred occupation needs to be selected!");
        this.loadingButton = false;
        return;
      }
      if (!this.preferenceData.pre_other_preference) {
        this.showError("Other Preference requirement field is empty!");
        this.loadingButton = false;
        return;
      }
      if (!this.preferenceData.pre_description) {
        this.showError("Preferred requirement for partner field is empty!");
        this.loadingButton = false;
        return;
      }
      const h1 = this.minHeightFt;
      const h2 = this.maxHeightFt;
      let preHeightMin, preHeightMax;
      if (this.heightUnit == 1) {
        preHeightMin = Math.round(this.minHeightFt * 30.48);
        preHeightMax = Math.round(this.maxHeightFt * 30.48);
      } else {
        preHeightMin = this.preferenceData.pre_height_min;
        preHeightMax = this.preferenceData.pre_height_max;
      }
      console.log(preHeightMin);
      console.log(preHeightMax);

      let _payload = {
        pre_partner_age_min: this.preferenceData.pre_partner_age_min,
        pre_partner_age_max: this.preferenceData.pre_partner_age_max,
        // pre_height_min: this.preferenceData.pre_height_min,
        // pre_height_max: this.preferenceData.pre_height_max,
        pre_height_min: preHeightMin,
        pre_height_max: preHeightMax,
        pre_has_country_allow_preference: allowSwitchValue,
        pre_partner_comes_from: allowedCountries,
        pre_has_country_disallow_preference: disallowSwitchValue,
        pre_disallow_preference: disallowedCountries,
        pre_nationality: preferred_nationality,
        pre_partner_religions: preferredReligions,
        pre_ethnicities: this.preferenceData.pre_ethnicities,
        pre_study_level_id: this.preferenceData.pre_study_level_id,
        pre_employment_status: this.preferenceData.pre_employment_status,
        pre_occupation: this.preferenceData.pre_occupation,
        pre_preferred_divorcee: this.preferenceData.pre_preferred_divorcee,
        pre_preferred_divorcee_child:
          this.preferenceData.pre_preferred_divorcee_child,
        pre_other_preference: this.preferenceData.pre_other_preference,
        pre_description: this.preferenceData.pre_description,
      };
      console.log(_payload);
      const response = this.$store.dispatch(
        "savePreferenceInfoAbout",
        _payload
      );
      response
        .then((data) => {
          console.log(data);
          this.$success({
            title: "Success!",
            content: data.data.message,
            center: true,
          });
          this.loadingButton = false;
          this.$store.state.candidateInfo.activePanel++;
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.showError(error.response.data.message);
          this.loadingButton = false;
        });

      // try {
      // 	await this.$store.dispatch("savePreferenceInfoAbout", _payload);

      // 	this.openNotification();
      // 	this.$store.state.candidateInfo.activePanel++;
      // } catch (error) {
      // 	this.$store.state.candidateInfo.successMessageTitle = "Failed!";
      // 	this.$store.state.candidateInfo.successMessage =
      // 		"Error: " + error.message;
      // }
    },

    //Ratings
    // 		onChange({name,value}){
    // 			this.preferenceData['pre_strength_of_character_rate']
    // =value;		},
    onChangeCharacter(value) {
      this.preferenceData.pre_strength_of_character_rate = value;
    },
    onChangeLook(value) {
      this.preferenceData.pre_look_and_appearance_rate = value;
    },
    onChangeFaith(value) {
      this.preferenceData.pre_religiosity_or_faith_rate = value;
    },
    onChangeManner(value) {
      this.preferenceData.pre_manners_socialskill_ethics_rate = value;
    },
    onChangeMaturity(value) {
      this.preferenceData.pre_emotional_maturity_rate = value;
    },
    onChangeListener(value) {
      this.preferenceData.pre_good_listener_rate = value;
    },
    onChangeTalker(value) {
      this.preferenceData.pre_good_talker_rate = value;
    },
    onChangeSocialStatus(value) {
      this.preferenceData.pre_family_social_status_rate = value;
    },
    onChangeWillToLearn(value) {
      this.preferenceData.pre_wiling_to_learn_rate = value;
    },
    onChangeWealth(value) {
      this.preferenceData.pre_employment_wealth_rate = value;
    },
    onChangeEducation(value) {
      this.preferenceData.pre_education_rate = value;
    },
    onChangeSlider(value) {
      console.log("change: ", value);
      this.$store.state.candidateInfo.preference.pre_partner_age_min = value[0];
      this.$store.state.candidateInfo.preference.pre_partner_age_max = value[1];
    },
    onAfterChangeSlider(value) {
      console.log("afterChange: ", value);
      this.$store.state.candidateInfo.preference.pre_partner_age_min = value[0];
      this.$store.state.candidateInfo.preference.pre_partner_age_max = value[1];
    },
    handleChangeNumber(event) {
      const { name, value } = event.target;
      let form = this.preferenceData;
      form[name] = value;
      this.preferenceData = form;
    },
    // POST data -> Rating Info
    async saveRatingInfo() {
      this.loadingButton = true;

      const _payload = {
        pre_strength_of_character_rate:
          this.preferenceData.pre_strength_of_character_rate,
        pre_look_and_appearance_rate:
          this.preferenceData.pre_look_and_appearance_rate,
        pre_religiosity_or_faith_rate:
          this.preferenceData.pre_religiosity_or_faith_rate,
        pre_manners_socialskill_ethics_rate:
          this.preferenceData.pre_manners_socialskill_ethics_rate,
        pre_emotional_maturity_rate:
          this.preferenceData.pre_emotional_maturity_rate,
        pre_good_listener_rate: this.preferenceData.pre_good_listener_rate,
        pre_good_talker_rate: this.preferenceData.pre_good_talker_rate,
        pre_wiling_to_learn_rate: this.preferenceData.pre_wiling_to_learn_rate,
        pre_family_social_status_rate:
          this.preferenceData.pre_family_social_status_rate,
        pre_employment_wealth_rate:
          this.preferenceData.pre_employment_wealth_rate,
        pre_education_rate: this.preferenceData.pre_education_rate,
      };
      console.log(_payload);
      const response = this.$store.dispatch(
        "savePreferenceRatingInfo",
        _payload
      );
      response
        .then((data) => {
          console.log(data);
          this.$success({
            title: "Success!",
            content: data.data.message,
            center: true,
          });
          this.loadingButton = false;
          this.$store.state.candidateInfo.activePanel++;
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.showError(error.response.data.message);
        });
    },

    // Next button to the next form
    async handleSubmit() {
      console.log(this.preferenceData);
      const data = {
        pre_partner_age_min:
          this.$store.state.candidateInfo.preference.pre_partner_age_min,
        pre_partner_age_max:
          this.$store.state.candidateInfo.preference.pre_partner_age_max,
        pre_height_min:
          this.$store.state.candidateInfo.preference.pre_height_min,
        pre_height_max:
          this.$store.state.candidateInfo.preference.pre_height_max,
        pre_strength_of_character_rate:
          this.$store.state.candidateInfo.preference
            .pre_strength_of_character_rate,
        pre_look_and_appearance_rate:
          this.$store.state.candidateInfo.preference
            .pre_look_and_appearance_rate,
        pre_religiosity_or_faith_rate:
          this.$store.state.candidateInfo.preference
            .pre_religiosity_or_faith_rate,
        pre_manners_socialskill_ethics_rate:
          this.$store.state.candidateInfo.preference
            .pre_manners_socialskill_ethics_rate,
        pre_emitional_maturity_rate:
          this.$store.state.candidateInfo.preference
            .pre_emotional_maturity_rate,
        pre_good_listener_rate:
          this.$store.state.candidateInfo.preference.pre_good_listener_rate,
        pre_good_talker_rate:
          this.$store.state.candidateInfo.preference.pre_good_talker_rate,
        pre_wiling_to_learn_rate:
          this.$store.state.candidateInfo.preference.pre_wiling_to_learn_rate,
        pre_family_social_status_rate:
          this.$store.state.candidateInfo.preference
            .pre_family_social_status_rate,
        pre_employment_wealth_rate:
          this.$store.state.candidateInfo.preference.pre_employment_wealth_rate,
        pre_education_rate:
          this.$store.state.candidateInfo.preference.pre_education_rate,
        pre_has_country_allow_preference:
          this.$store.state.candidateInfo.preference
            .pre_has_country_allow_preference,
        pre_has_country_disallow_preference:
          this.$store.state.candidateInfo.preference
            .pre_has_country_disallow_preference,
        // pre_partner_religion_id: this.$store.state.candidateInfo.preference
        // 	.pre_partner_religion_id,
        pre_ethnicities:
          this.$store.state.candidateInfo.preference.pre_ethnicities,
        pre_study_level_id:
          this.$store.state.candidateInfo.preference.pre_study_level_id,
        pre_employment_status:
          this.$store.state.candidateInfo.preference.pre_employment_status,
        pre_preferred_divorcee:
          this.$store.state.candidateInfo.preference.pre_preferred_divorcee,
        pre_preferred_divorcee_child:
          this.$store.state.candidateInfo.preference
            .pre_preferred_divorcee_child,
        pre_other_preference:
          this.$store.state.candidateInfo.preference.pre_other_preference,
        pre_description:
          this.$store.state.candidateInfo.preference.pre_description,
      };
      const payload = {
        token: this.$store.state.auth.token,
        userId: this.$store.state.user.user.id,
        data: data,
      };
      await this.$store.dispatch("updatePreference", payload);
      if (this.$store.state.candidateInfo.preference.updateApiStatus) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    // preferenceData() {
    //   const preference = this.$store.getters["preference"];
    //   return preference;
    // },
    pref_countries: {
      get() {
        return this.preferenceData.c_id;
      },
      set(value) {
        console.log(value);
        var index = value.length - 1;
        if (value.length < this.preferenceData.c_id.length) {
          this.preferenceData.c_id.splice(index + 1);
        } else {
          Vue.set(this.preferenceData.c_id, index, value[index]);
          console.log(this.preferenceData.c_id);
        }
      },
    },
    preReligions: {
      get() {
        // let religionsString = this.preferenceData.pre_relions; // Have to get from the getters
        // let religions = religionsString.split(",").map(function (item) {
        // 	return parseInt(item, 10);
        // });
        // return religions;
        return this.preferenceData.pre_religions;
      },
      set(value) {
        this.preferenceData.pre_religions.push(value);
      },
    },
    religions: {
      get() {
        return this.$store.state.candidateInfo.preference.pre_religions;
      },
      set(value) {
        console.log(value);
        //this.preferenceData.pre_religions = value;
      },
    },
    maxHeight: {
      get() {
        // if (this.heightUnit == 0) {
        // 	return this.$store.state.candidateInfo.preference.pre_height_max;
        // } else {
        // 	return (
        // 		this.$store.state.candidateInfo.preference.pre_height_max / 30.48
        // 	).toFixed(2);
        // }
        return this.$store.state.candidateInfo.preference.pre_height_max;
      },
      set(newValue) {
        this.$store.state.candidateInfo.preference.pre_height_max = newValue;
      },
    },
    minHeight: {
      get() {
        // if (this.heightUnit == 0) {
        // 	return this.$store.state.candidateInfo.preference.pre_height_min;
        // } else {
        // 	return (
        // 		this.$store.state.candidateInfo.preference.pre_height_min / 30.48
        // 	).toFixed(2);
        // }
        return this.$store.state.candidateInfo.preference.pre_height_min;
      },
      set(newValue) {
        this.$store.state.candidateInfo.preference.pre_height_min = newValue;
      },
    },
    // ageValue() {
    // 	return [
    // 		this.preferenceData.pre_partner_age_min,
    // 		this.preferenceData.pre_partner_age_max,
    // 	];
    // },

    // allowSwitch: {
    //   get() {
    //     return this.$store.state.candidateInfo.preference
    //       .pre_has_country_allow_preference
    //       ? true
    //       : false;
    //   },
    //   set(newValue) {
    //     console.log(newValue);
    //     this.$store.state.candidateInfo.preference.pre_has_country_allow_preference =
    //       newValue;
    //     if (newValue) {
    //       this.$store.state.candidateInfo.preference.pre_has_country_allow_preference =
    //         newValue;
    //     } else {
    //       this.$store.state.candidateInfo.preference.pre_has_country_allow_preference =
    //         newValue;
    //     }
    //   },
    // },
    // disallowSwitch: {
    //   get() {
    //     return this.$store.state.candidateInfo.preference
    //       .pre_has_country_disallow_preference
    //       ? true
    //       : false;
    //   },
    //   set(newValue) {
    //     console.log(newValue);
    //     this.$store.state.candidateInfo.preference.pre_has_country_disallow_preference =
    //       newValue;
    //     if (newValue) {
    //       this.$store.state.candidateInfo.preference.pre_has_country_disallow_preference =
    //         newValue;
    //     } else {
    //       this.$store.state.candidateInfo.preference.pre_has_country_disallow_preference =
    //         newValue;
    //     }
    //   },
    // },
    // divorceeSwitch: {
    //   get() {
    //     return this.preferenceData.pre_preferred_divorcee ? true : false;
    //   },
    //   set(newValue) {
    //     console.log(newValue);
    //     if (newValue) {
    //       this.preferenceData.pre_preferred_divorcee = newValue;
    //     } else {
    //       this.preferenceData.pre_preferred_divorcee = newValue;
    //     }
    //   },
    // },
    // divorceeChildSwitch: {
    //   get() {
    //     return this.$store.state.candidateInfo.preference
    //       .pre_preferred_divorcee_child
    //       ? true
    //       : false;
    //   },
    //   set(newValue) {
    //     console.log(newValue);
    //     if (newValue) {
    //       this.preferenceData.pre_preferred_divorcee_child = newValue;
    //     } else {
    //       this.preferenceData.pre_preferred_divorcee_child = newValue;
    //     }
    //   },
    // },
  },
  watch: {
    allowSwitch(newValue) {
      if (newValue) {
        this.$store.state.candidateInfo.preference.pre_has_country_allow_preference = 1;
      } else {
        this.$store.state.candidateInfo.preference.pre_has_country_allow_preference = 0;
      }
    },
    disallowSwitch(newValue) {
      if (newValue) {
        this.$store.state.candidateInfo.preference.pre_has_country_disallow_preference = 1;
      } else {
        this.$store.state.candidateInfo.preference.pre_has_country_disallow_preference = 0;
      }
    },
    divorceeSwitch(newValue) {
      if (newValue) {
        this.preferenceData.pre_preferred_divorcee = 1;
      } else {
        this.preferenceData.pre_preferred_divorcee = 0;
      }
    },
    divorceeChildSwitch(newValue) {
      if (newValue) {
        this.preferenceData.pre_preferred_divorcee_child = 1;
      } else {
        this.preferenceData.pre_preferred_divorcee_child = 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
//Vue Select CSS is declared globally
@import "@/styles/base/_variables.scss";

.preference {
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
</style>
