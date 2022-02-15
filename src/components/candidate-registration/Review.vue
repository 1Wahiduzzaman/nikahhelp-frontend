<template>
  <div class="review-publish px-2">
    <fieldset v-if="candidateDetails && candidateData.personal" class="review">
      <h4 class="fw-700 px-2">Review and Publish Profile</h4>
      <p class="mb-5 px-2">
        Please check the information and details that you have provided, if you
        are happy with it please submit for approval by MatrimonyAssist Team. If
        anything needs to be changed, then you can access relavant sections by
        pressing previous button.
      </p>
      <div class="text-start">
        <!-- Preference -->
        <div class="review-edit">
          <div class="review-edit-label">
            My partner preference
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 0)"
            />
          </div>
          <div class="row">
            <div class="col-md-8 mb-3">
              <div class="card-custom h-100 shadow-default card-personal">
                <ul class="personal-ul">
                  <!-- Age -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Age</span
                    ><span class="flex-50 px-2"
                      >:
                      <span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.preference.pre_partner_age_min }}
                        to
                        {{ candidateData.preference.pre_partner_age_max }}
                        years</span
                      ></span
                    >
                  </li>
                  <!-- Height -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Height</span
                    ><span class="flex-50 px-2 text--secondary text-subtitle-1"
                      >:

                      <span
                        v-html="
                          `${
                            heightTV.find(
                              (x) =>
                                x.value ===
                                candidateData.preference.pre_height_min
                            )
                              ? heightTV.find(
                                  (x) =>
                                    x.value ===
                                    candidateData.preference.pre_height_min
                                ).label
                              : ''
                          } to ${
                            heightTV.find(
                              (x) =>
                                x.value ===
                                candidateData.preference.pre_height_max
                            )
                              ? heightTV.find(
                                  (x) =>
                                    x.value ===
                                    candidateData.preference.pre_height_max
                                ).label
                              : ''
                          }`
                        "
                        class="ml-3"
                      >
                      </span
                    ></span>
                  </li>

                  <!-- Preferred countries and cities -->
                  <li class="flex-between-start">
                    <a-tooltip title="Country and city preferred">
                      <span class="flex-50 px-2 text--disabled text-subtitle-1">
                      Preferred Country
                    </span>
                    </a-tooltip>
                    <span class="flex-50 px-2 d-inherit">
                      :
                      <span class="ml-3 text--secondary text-subtitle-1">
                        <div
                          v-for="country in candidateData.preference
                            .preferred_countries"
                          :key="country.id"
                        >
                          {{ country.name }}
                          <!-- {{ candidateDetails.preferred_countries[index].name }} -->
                        </div>
                      </span>
                    </span>
                  </li>

                  <!-- Religion -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Religion</span
                    ><span class="flex-50 px-2 d-inherit "
                      >:<span class="ml-3 text--secondary text-subtitle-1">Islam</span></span
                    >
                  </li>

                  <!-- Ethnicities -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Ethnicities</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_ethnicities
                      }}</span></span
                    >
                  </li>

                  <!-- Nationality -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Nationality</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        <div
                          v-for="nationality in candidateData.preference
                            .preferred_nationality"
                          :key="nationality.id"
                        >
                          {{ nationality.name }}
                        </div>
                      </span></span
                    >
                  </li>

                  <!-- Employment Status -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Employment Status</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_employment_status
                      }}</span></span
                    >
                  </li>
                  
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Accept a divorcee</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_preferred_divorcee == 1 ? 'Yes' : 'NO'
                      }}</span></span
                    >
                  </li>
                  <li v-if="candidateData.preference.pre_preferred_divorcee == 1" class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Accept a divorcee with children?</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_preferred_divorcee_child == 1 ? 'Yes' : 'NO'
                      }}</span></span
                    >
                  </li>

                  <li v-if="candidateData.preference.pre_preferred_divorcee == 1" class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Education</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.preference.pre_study_level
                      }}</span></span
                    >
                  </li>

                  <!-- Occupation -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Ocupation</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        <div
                          v-for="occupuation in candidateData.preference
                            .pre_occupation"
                          :key="occupuation.id"
                        >
                          {{ occupuation }}
                        </div></span
                      ></span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <!-- Other Requirments -->
            <div class="col-md-4 mb-3">
              <div class="card-custom h-100 shadow-default text--disabled">
                <h4 class="text--disabled text-subtitle-1">What I'm looking for</h4>
                <p class="text--secondary text-subtitle-1">{{candidateData.preference.pre_description}}</p>
                <!-- <a-textarea
                  style="overflow: hidden; height: 150px"
                  id="per_about"
                  :rows="5"
                  :maxLength="200"
                  v-model="candidateData.preference.pre_description"
                /> -->
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="card-custom text-start shadow-default">
                <h4 class="text--disabled text-subtitle-1">Other requirements</h4>
                <p class="text--secondary text-subtitle-1">{{candidateData.preference.pre_other_preference}}</p>
              </div>
            </div>
            <!-- Rating unit -->
            <div class="col-md-12 mb-3">
              <div class="card-custom h-100 shadow-default">
                <h5>More about preferred partner</h5>
                <p>How Important following characters are to me</p>
                <hr />
                <!-- Character -->
                <!-- <rating-component
                  title="Strength of character from a moral point of view"
                  :valueString="
                    candidateData.preference.pre_strength_of_character_rate
                  "
                  
                ></rating-component> -->
                <!-- Looks and Apperance -->
                <rating-component
                  title="Looks, appearance & attractiveness"
                  :value="candidateData.preference.pre_look_and_appearance_rate"
                ></rating-component>
                <!-- Religiosity/Faith -->
                <rating-component
                  title="Religiosity/ Faith"
                  :value="
                    candidateData.preference.pre_religiosity_or_faith_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_religiosity_or_faith_rate_string
                  "
                ></rating-component>
                <!-- Manners, Social skills and ethics -->
                <rating-component
                  title="Manners, social skills and ethics"
                  :value="
                    candidateData.preference.pre_manners_socialskill_ethics_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_manners_socialskill_ethics_rate_string
                  "
                ></rating-component>
                <!-- Emotional Maturity and compatibility -->
                <rating-component
                  title="Emotional Maturity and general intelligence"
                  :value="candidateData.preference.pre_emotional_maturity_rate"
                  :valueString="
                    candidateData.preference.pre_emotional_maturity_rate_string
                  "
                ></rating-component>
                <!-- Good Listener -->
                <rating-component
                  title="Good listener"
                  :value="candidateData.preference.pre_good_listener_rate"
                  :valueString="
                    candidateData.preference.pre_good_listener_rate_string
                  "
                ></rating-component>
                <!-- Good talker -->
                <rating-component
                  title="Good communicator"
                  :value="candidateData.preference.pre_good_talker_rate"
                  :valueString="
                    candidateData.preference.pre_good_talker_rate_string
                  "
                ></rating-component>
                <!-- Willing to learn -->
                <rating-component
                  title="Willing to learn"
                  :value="candidateData.preference.pre_wiling_to_learn_rate"
                  :valueString="
                    candidateData.preference.pre_wiling_to_learn_rate_string
                  "
                ></rating-component>
                <!-- Family or Social Status-->
                <rating-component
                  title="Family or Social Status"
                  :value="
                    candidateData.preference.pre_family_social_status_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_family_social_status_rate_string
                  "
                ></rating-component>
                <!-- Employment or Wealth-->
                <rating-component
                  title="Employment and financial stability"
                  :value="candidateData.preference.pre_employment_wealth_rate"
                  :valueString="
                    candidateData.preference.pre_employment_wealth_rate_string
                  "
                ></rating-component>
                <!-- Education -->
                <rating-component
                  title="Education and academic accomplishments"
                  :value="candidateData.preference.pre_education_rate"
                  :valueString="
                    candidateData.preference.pre_education_rate_string
                  "
                ></rating-component>
              </div>
            </div>
          </div>
        </div>
        <!-- Rating section  -->

        <!-- Personal Information -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            Personal Information
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 1)"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-8 mb-3">
              <div class="card-custom shadow-default card-personal h-100">
                <ul class="personal-ul">
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Name</span
                    ><span class="flex-50 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.first_name }}
                        {{ candidateData.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Screen Name</span
                    ><span class="flex-50 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Gender</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span
                        class="ml-3 text--secondary text-subtitle-1"
                        v-if="candidateData.personal.per_gender == 1"
                      >
                        Male
                      </span>
                      <span
                        class="ml-3 text--secondary text-subtitle-1"
                        v-if="candidateData.personal.per_gender == 2"
                      >
                        Female
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Date of Birth</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.personal.dob }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Height</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        <span
                        v-html="
                          `${
                            heightTV.find(
                              (x) =>
                                x.value ===
                                candidateData.personal.per_height
                            )
                              ? heightTV.find(
                                  (x) =>
                                    x.value ===
                                    candidateData.personal.per_height
                                ).label
                              : ''
                          }`">
                          </span>
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Employment Status</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ candidateData.personal.per_employment_status }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Religion</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        <!-- {{
													$store.state.candidateInfo.religion_options[
														candidateData.personal.per_religion_id
													].name
												}} -->
                        {{
                          candidateDetails.religions.find(
                            (x) =>
                              x.id === candidateData.personal.per_religion_id
                          )
                            ? candidateDetails.religions.find(
                                (x) =>
                                  x.id ===
                                  candidateData.personal.per_religion_id
                              ).name
                            : ""
                        }}
                      </span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Ethnicity</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.personal.per_ethnicity
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Mother Tongue</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.personal.per_mother_tongue
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Nationality</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateDetails.countries[
                          candidateData.personal.per_nationality
                        ]
                          ? candidateDetails.countries[
                              candidateData.personal.per_nationality
                            ].name
                          : ""
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Country of Birth</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.personal.per_country_of_birth
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Current Residance</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                          candidateData.personal.per_current_residence
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Address</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.per_permanent_address
                      }}</span></span
                    >
                  </li>
                  <!-- <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Telephone NO</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.personal.per_telephone_no
                      }}</span></span
                    >
                  </li> -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Mobile No</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.personal.mobile_number
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Email</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.per_email
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1">Permanent city & country</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        candidateData.contact.per_permanent_city + ', ' + candidateData.contact.per_permanent_country_name
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
              
            </div>
            <div class="col-md-4 mb-3 mobile-margin-top">
              <div class="card-custom shadow-default h-100">
                <FieldsetCard
                  title="Marital Status"
                  :info="candidateData.personal.per_marital_status"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Currently living with"
                  :info="candidateData.personal.per_currently_living_with"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Willing to relocate"
                  :info="candidateData.personal.per_willing_to_relocate == 1 ? 'Yes' : candidateData.personal.per_willing_to_relocate == 2 ? 'No' : 'Lets Discuss'"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Smoker"
                  :info="candidateData.personal.per_smoker == true ? 'Yes' : 'No'"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Language"
                  :info="candidateData.personal.per_language_speak"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Language"
                  :info="candidateData.personal.per_language_speak"
                />
                <FieldsetCard
                  class="mt-3"
                  title="My Hobbies & Interests"
                  :info="candidateData.personal.per_hobbies_interests"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Food & Cuisine I like"
                  :info="candidateData.personal.per_food_cuisine_like"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Things I Enjoy"
                  :info="candidateData.personal.per_things_enjoy"
                />
                <FieldsetCard
                  class="mt-3"
                  title="Things I Enjoy"
                  :info="candidateData.personal.per_things_enjoy"
                />
                <FieldsetCard
                  class="mt-3"
                  title="I am Thankfull for"
                  :info="candidateData.personal.per_thankfull_for"
                />
              </div>
            </div>
            <!-- <div class="col-md-12 mb-3">
							<div class="card-custom shadow-default">
								<h4>A little bit about me</h4>
								<p class="mb-0">
									{{ candidateData.personal.per_about }}
								</p>
							</div>
						</div> -->
            
            <div class="col-md-12 mb-3">
              <div class="card-custom shadow-default">
                <h4 class="text--disabled text-subtitle-1">A little bit about me</h4>
                <p class="mb-0 text--secondary text-subtitle-1"> {{candidateData.personal.per_about }}</p>
              </div>
            </div>
            
            <div class="col-md-12 mb-3">
              <div class="card-custom shadow-default">
                <h4 class="text--disabled text-subtitle-1">Additional Information</h4>
                <p class="mb-0 text--secondary text-subtitle-1"> {{ candidateData.more_about.per_additional_info_text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Family Information -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            Family Information
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 2)"
            />
          </div>
          <div class="row">
            <div class="col-md-8 mb-3">
              <div class="card-custom h-100 shadow-default">
                <table>
                  <TableRow
                    title="Father's Profession"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.father_profession"
                  />
                  <TableRow
                    title="Mother's Profession"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.mother_profession"
                  />
                  <TableRow
                    title="Siblings"
                    textClass="text-subtitle-1"
                    :value="candidateData.family.siblings_desc"
                  />
                  <a-tooltip title="Ancestral home same as country of birth?">
                    <TableRow
                        title="Ancestral home"
                        textClass="text-subtitle-1"
                        :value="candidateData.family.country_of_origin"
                    />
                  </a-tooltip>
                </table>
                <!-- <ul style="line-height: 160%">
                  

                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Father's Profession</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.father_profession
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Mother's Profession</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.mother_profession
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
          
                    <TableRow
                      title="Siblings"
                      textClass="text-subtitle-1"
                      :value="candidateData.family.siblings_desc"
                    />
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 text--disabled text-subtitle-1"
                      >Country Of origin</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.country_of_origin
                      }}</span></span
                    >
                  </li>
                </ul> -->
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card-custom h-100 shadow-default">
                <h4 class="text--disabled text-subtitle-1">About My Family</h4>
                <p class="text--secondary text-subtitle-1">{{ candidateData.family.family_info }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Uploaded Image -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            My Uploaded Image
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 3)"
            />
          </div>
          <div class="row">
            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.personal.per_avatar_url"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Avatar</p>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.personal.per_main_image_url"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Main image</p>
              </div>
            </div>

            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="candidateData.personal.per_main_image_url"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Additional image</p>
              </div>
            </div>

            <div class="col-12">
              <div class="card-custom shadow-default">
                <h4>Image setting</h4>
                <div class="d-flex">
                  <a-icon
                    v-if="candidateData.personal.anybody_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16">
                    I don't want to share my images with anyone at this
                    moment</span
                  >
                </div>
                <div class="d-flex">
                  <a-icon
                    v-if="candidateData.personal.only_team_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16">
                    I would like to share all my images with my team</span
                  >
                </div>
                <div class="d-flex">
                  <a-icon
                    v-if="candidateData.personal.team_connection_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16">
                    I would like to share all my images with connected team(s)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
import RatingComponent from "../profile/RatingComponent.vue";
import ApiService from "@/services/api.service";
import TableRow from "@/components/atom/TableRow";
import FieldsetCard from "@/components/atom/FieldsetCard"
import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
export default {
  name: "Review",
  components: {
    RatingComponent,
    TableRow,
    FieldsetCard
  },
  props: {
    candidateDetails: {
      type: Object,
    },
  },
  data() {
    return {
      candidateData: {},
      heightTV: HEIGHTS,
    };
  },
  mounted() {
    this.getCandidateData();
  },
  methods: {
    async getCandidateData() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await ApiService.get(`v1/candidate/info/${user.id}`);
        this.candidateData = {
          ...response.data.data,
          preference: {
            ...response.data.data.preference,
            pre_occupation: JSON.parse(
              response.data.data.preference.pre_occupation
            ),
          },
          // personal: {
          //   ...response.data.data.personal,
          //   per_about: response.data.data.personal.per_about.replace(
          //     /(?:\r\n|\r|\n)/g,
          //     "<br />"
          //   ),
          // },
        };
      } catch (error) {
        alert(this.error);
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.review-publish {
  .review {
    font-size: 14px;
    h4 {
      font-size: 16px;
      opacity: 0.8;
    }
    p {
      font-size: 14px;
    }
    .review-edit {
      position: relative;
      padding: 15px;
      border: 1px solid $border-secondary;
      border-radius: 5px;
      .review-edit-label {
        position: absolute;
        color: $color-secondary;
        left: 50px;
        top: -12px;
        background: $bg-white;
        cursor: pointer;
      }
    }
    ul {
      .label-text {
        //opacity: 0.8;
      }
    }
    .profile-img {
      border-radius: 5px;
      overflow: hidden;
      p {
        font-size: 16px;
        margin-top: 10px;
        font-weight: bolder;
      }
    }
  }
  .ant-input {
    border: none;
    pointer-events: none;
  }
  textarea {
    resize: none;
  }
}
.h-100 {
  height: 100%;
}
.h-67 {
  height: 66%;
  margin-bottom: 2%;
}
.h-33 {
  height: 32%;
  margin-top: 1%;
}
.anticon {
  max-width: 15px;
}
.badge-info {
  background: $bg-white !important;
  color: black;
  position: relative;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid $border-gray;
  margin-bottom: 15px;
  text-align: center;
  .badge-info-label {
    position: absolute;
    top: -12px;
    opacity: 0.7;
    left: 0;
    right: 0;
    .inner {
      background: $bg-white;
    }
  }
}

.card-height-design {
  height: 360px;
}

.mobile-margin-top {
  margin-top: 54px;
}
.text--disabled text-subtitle-1 {
  //font-size: 14px;
  font-weight: 500;
}
.flex-50 > .ml-3 {
  //font-size: 14px;
  font-weight: 500;
}
.inner {
 // font-weight: 600;
}
.value-text {
  font-weight: bold;
}
.mt-16px {
  margin-top: 16px;
}
.personal-height {
  height: auto;
}
.user-image {
  //width: 100%;
  //height: 300px;
  display: block;
  max-width: 260px;
  max-height: 170px;
  width: auto;
  height: auto;
  border-radius: 6px;
}
.edit-step {
  width: 20px;
  height: 20px;
}
@media (min-width: 992px) {
  .mobile-margin-top {
    margin-top: 0;
  }
  .personal-height {
    height: 360px;
  }
}
.card-personal {
  padding: 15px 8px;
}
.personal-ul {
  line-height: 160%;
  padding-left: 0;
}
</style>
