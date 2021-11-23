<template>
  <div class="review-publish">
    <!-- <pre>{{ candidateData }}</pre> -->
    <fieldset v-if="candidateDetails && candidateData.personal" class="review">
      <h4 class="fw-700">Review and Publish Profile</h4>
      <p class="mb-5">
        If anything needs to be editted, then go back to previous page by
        pressing previous button
      </p>
      <div class="text-start">
        <!-- Preference -->
        <div class="review-edit">
          <div class="review-edit-label">
            My partner preference
            <img
              class="ms-2"
              src="@/assets/icon/pencil-square.svg"
              alt="icon"
            />
          </div>
          <div class="row">
            <div class="col-md-8 mb-3">
              <div class="card-custom h-100 shadow-default">
                <ul style="line-height: 160%">
                  <!-- Age -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Age</span
                    ><span class="flex-50 px-2"
                      >:
                      <span class="ml-3">
                        {{ candidateData.preference.pre_partner_age_min }}
                        to
                        {{ candidateData.preference.pre_partner_age_max }}
                        years</span
                      ></span
                    >
                  </li>
                  <!-- Height -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Height</span
                    ><span class="flex-50 px-2"
                      >:
                      <span class="ml-3"
                        >{{ candidateData.preference.pre_height_min }}
                        inch to
                        {{ candidateData.preference.pre_height_max }}
                        inch</span
                      ></span
                    >
                  </li>

                  <!-- Preferred countries and cities -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">
                      Country and cities preferred
                    </span>
                    <span class="flex-50 px-2 d-inherit">
                      :
                      <span class="ml-3">
                        <div
                          v-for="(country) in candidateData.preference.preferred_countries"
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
                    <span class="flex-50 px-2 label-text">Religion</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">Islam</span></span
                    >
                  </li>

                  <!-- Ethnicities -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Ethnicities</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.preference.pre_ethnicities
                      }}</span></span
                    >
                  </li>

                  <!-- Nationality -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Nationality</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">
                        <div
                          v-for="nationality in candidateData.preference.preferred_nationality"
                          :key="nationality.id"
                        >
                          {{ nationality.name }}
                        </div>
                      </span></span
                    >
                  </li>

                  <!-- Employment Status -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text"
                      >Employment Status</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.preference.pre_employment_status
                      }}</span></span
                    >
                  </li>

                  <!-- Occupation -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Ocupation</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.preference.pre_occupation
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <!-- Other Requirments -->
            <div class="col-md-4 mb-3">
              <div class="card-custom h-100 shadow-default">
                <h4>What I'm looking for</h4>
                <p class="mb-0">
                  {{ candidateData.preference.pre_description }}
                </p>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="card-custom text-start shadow-default">
                <h4>Other requirements</h4>
                <p class="text-start mb-0">
                  {{ candidateData.preference.pre_other_preference }}
                </p>
              </div>
            </div>
            <!-- Rating unit -->
            <div class="col-md-12 mb-3">
              <div class="card-custom h-100 shadow-default">
                <h5>More about preferred partner</h5>
                <p>How Important following characters are to me</p>
                <hr />
                <!-- Character -->
                <rating-component
                  title="Strength of character from a moral point of view"
                  :value="
                    candidateData.preference.pre_strength_of_character_rate
                  "
                  :valueString="
                    candidateData.preference
                      .pre_strength_of_character_rate_string
                  "
                ></rating-component>
                <!-- Looks and Apperance -->
                <rating-component
                  title="Looks and apperance"
                  :value="candidateData.preference.pre_look_and_appearance_rate"
                  :valueString="
                    candidateData.preference.pre_look_and_appearance_rate_string
                  "
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
                  title="Manners, Social skills and ethics"
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
                  title="Emotional Maturity and compatibility"
                  :value="candidateData.preference.pre_emotional_maturity_rate"
                  :valueString="
                    candidateData.preference.pre_emotional_maturity_rate_string
                  "
                ></rating-component>
                <!-- Good Listener -->
                <rating-component
                  title="Good Listener"
                  :value="candidateData.preference.pre_good_listener_rate"
                  :valueString="
                    candidateData.preference.pre_good_listener_rate_string
                  "
                ></rating-component>
                <!-- Good talker -->
                <rating-component
                  title="Good talker"
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
                  title="Employment or Wealth"
                  :value="candidateData.preference.pre_employment_wealth_rate"
                  :valueString="
                    candidateData.preference.pre_employment_wealth_rate_string
                  "
                ></rating-component>
                <!-- Education -->
                <rating-component
                  title="Education"
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
        <div class="review-edit">
          <div class="review-edit-label">
            Personal Information
            <img
              class="ms-2"
              src="@/assets/icon/pencil-square.svg"
              alt="icon"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-8 mb-3">
              <div class="card-custom h-67 shadow-default card-height-design">
                <ul style="line-height: 160%">
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Name</span
                    ><span class="flex-50 px-2"
                      >:<span class="ml-3">
                        {{ candidateData.first_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Screen Name</span
                    ><span class="flex-50 px-2"
                      >:<span class="ml-3">{{
                        candidateData.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Gender</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span
                        class="ml-3"
                        v-if="candidateData.personal.per_gender == 1"
                      >
                        Male
                      </span>
                      <span
                        class="ml-3"
                        v-if="candidateData.personal.per_gender == 2"
                      >
                        Female
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Date of Birth</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">
                        {{ candidateData.personal.dob }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text"
                      >Employment Status</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">
                        {{ candidateData.personal.per_employment_status }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Religion</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">
                        <!-- {{
													$store.state.candidateInfo.religion_options[
														candidateData.personal.per_religion_id
													].name
												}} -->
                        {{
                          candidateDetails.religions.find(
                            (x) =>
                              x.id === candidateData.personal.per_religion_id
                          ).name
                        }}
                      </span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Ethnicity</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.personal.per_ethnicity
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Mother Tongue</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.personal.per_mother_tongue
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Nationality</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateDetails.countries[
                          candidateData.personal.per_nationality
                        ].name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Country of Birth</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateDetails.countries[
                          candidateData.personal.per_country_of_birth
                        ].name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text"
                      >Current Residance</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateDetails.countries[
                          candidateData.personal.per_current_residence
                        ].name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Address</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.personal.per_address
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Telephone NO</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.personal.per_telephone_no
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Mobile No</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.personal.mobile_number
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
              <div class="card-custom h-33 shadow-default">
                <h4>A little bit about me</h4>
                <p class="mb-0">
                  {{ candidateData.personal.per_about }}
                </p>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card-custom shadow-default">
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Marital Status</span></span
                  >
                  <span>{{ candidateData.personal.per_marital_status }}</span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Currently living with</span></span
                  >
                  <span>{{
                    candidateData.personal.per_currently_living_with
                  }}</span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Willing to relocate</span></span
                  >
                  <span
                    v-if="candidateData.personal.per_willing_to_relocate == 1"
                  >
                    Yes
                  </span>
                  <span
                    v-else-if="
                      candidateData.personal.per_willing_to_relocate == 2
                    "
                  >
                    No
                  </span>
                  <span
                    v-if="candidateData.personal.per_willing_to_relocate == 3"
                  >
                    Let's Discuss
                  </span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Smoker</span></span
                  >
                  <span v-if="candidateData.personal.per_smoker == true">
                    Yes
                  </span>
                  <span v-if="candidateData.personal.per_smoker == false">
                    No
                  </span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Language</span></span
                  >
                  <span>{{ candidateData.personal.per_language_speak }}</span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">My Hobbies & Interests</span></span
                  >
                  <span>{{
                    candidateData.personal.per_hobbies_interests
                  }}</span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Food & Cuisine I like</span></span
                  >
                  <span>{{
                    candidateData.personal.per_food_cuisine_like
                  }}</span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label"
                    ><span class="inner">Things I Enjoy</span>
                  </span>
                  <span>{{ candidateData.personal.per_things_enjoy }}</span>
                </div>
                <div class="badge-info">
                  <span class="badge-info-label">
                    <span class="inner">I am Thankfull for</span>
                  </span>
                  <span>{{ candidateData.personal.per_thankfull_for }}</span>
                </div>
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
                <h4>Additional Information</h4>
                <p class="mb-0">
                  {{ candidateData.personal.per_about }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Family Information -->
        <div class="review-edit">
          <div class="review-edit-label">
            Family Information
            <img
              class="ms-2"
              src="@/assets/icon/pencil-square.svg"
              alt="icon"
            />
          </div>
          <div class="row">
            <div class="col-md-8 mb-3">
              <div class="card-custom h-100 shadow-default">
                <ul style="line-height: 160%">
                  <!-- <li class="flex-between-start">
										<span class="flex-50 px-2 label-text">Father's Name</span
										><span class="flex-50 px-2"
											>:<span class="ml-3">
												{{ candidateData.family.father_name }}</span
											></span
										>
									</li>
									<li class="flex-between-start">
										<span class="flex-50 px-2 label-text">Mother's Name</span
										><span class="flex-50 px-2"
											>:<span class="ml-3">{{
												candidateData.family.mother_name
											}}</span></span
										>
									</li> -->
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text"
                      >Father's Profession</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.father_profession
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text"
                      >Mother's Profession</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.mother_profession
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text">Siblings</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.siblings_desc
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-50 px-2 label-text"
                      >Country Of origin</span
                    ><span class="flex-50 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        candidateData.family.country_of_origin
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card-custom h-100 shadow-default">
                <h4>About My Family</h4>
                <p class="mb-0">
                  {{ candidateData.family.family_info }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- UPloaded Image -->
        <div class="review-edit">
          <div class="review-edit-label">
            My Uploaded Image
            <img
              class="ms-2"
              src="@/assets/icon/pencil-square.svg"
              alt="icon"
            />
          </div>
          <div class="row">
            <!-- <div class="card-custom shadow-default"></div> -->
            <div class="col-md-6 col-6 mb-3">
              <div class="profile-img text-center">
                <img
                  :src="candidateData.review.personal.per_avatar_url"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Avatar</p>
              </div>
            </div>
            <div class="col-md-6 col-6 mb-3">
              <div class="profile-img text-center">
                <img
                  :src="candidateData.review.personal.per_main_image_url"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Main image</p>
              </div>
            </div>

            <div class="col-md-12 col-6">
              <div class="card-custom shadow-default">
                <h4>Image setting</h4>
                <p class="mb-1">
                  <a-icon
                    v-if="candidateData.review.personal.anybody_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16"
                    >I would like to share my all picture with anyone on this
                    plarform</span
                  >
                </p>
                <p class="mb-1">
                  <a-icon
                    v-if="candidateData.review.personal.only_team_can_see == 0"
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span class="fs-16"
                    >I would like to share all my images with my team</span
                  >
                </p>
                <p class="mb-1">
                  <a-icon
                    v-if="
                      candidateData.review.personal.team_connection_can_see == 0
                    "
                    class="color-danger mt-2 mr-2 fs-16 fw-500"
                    type="stop"
                  />
                  <a-icon
                    v-else
                    class="color-success mt-2 mr-2 fs-16 fw-500"
                    type="check"
                  />
                  <span>
                    I would like to share all my images with connected team(s)
                  </span>
                </p>
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
import JwtService from "@/services/jwt.service";
export default {
  name: "Review",
  components: {
    RatingComponent,
  },
  props: {
    candidateDetails: {
      type: Object,
    },
  },
  data() {
    return {
      candidateData: {},
    };
  },
  created() {
    this.getCandidateData();
  },
  methods: {
   
    async getCandidateData() {
      try {
         const user=JSON.parse(localStorage.getItem('user'))
        const response = await ApiService.get(
          `v1/candidate/info/${user.id}`
        );
        this.candidateData = {
          ...response.data.data,
          review: {
            personal: {},
          },
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
        opacity: 0.8;
      }
    }
    .profile-img {
      border-radius: 5px;
      overflow: hidden;
    }
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
</style>
