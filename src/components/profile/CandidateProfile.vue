<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <div
        v-if="candidateData"
        class="candidate-profile"
        style="margin-top: 15px"
      >
        <div class="profile-heading">
          <!-- Avatar and cover images -->
          <div class="text-center">
            <img
              src="@/assets/Icons/profile cover.jpg"
              alt=""
              class="cover-img"
            />
            <img
              :src="
                candidateData.personal.per_avatar_url
                  ? candidateData.personal.per_avatar_url
                  : avatarSrc
              "
              alt=""
              class="avatar-img"
            />

            <h3 class="mt-5">
              {{ candidateData.first_name }} {{ candidateData.last_name }}
            </h3>
          </div>
          <!-- Buttons -->
          <div class="row mt-3 mb-3 text-center">
            <div class="col">
              <button disabled class="btn btn-primary px-4">Gallery</button>
            </div>
            <div class="col">
              <router-link to="/edit_candidate" class="btn btn-primary px-4">
                <img src="@/assets/icon/pencil-square.svg" />Edit Profile
              </router-link>
            </div>
            <div class="col">
              <button class="btn btn-primary px-4" @click="startConversation">
                <!-- <img src="@/assets/email.svg" alt=""> -->
                <img src="@/assets/icon/chat-dots-fill-white.svg" alt="" />
                Message
              </button>
            </div>
          </div>
          <!-- Team name and profile link -->
          <div class="row mt-3 mb-3">
            <div class="col">
              <div class="team-name-div">
                <span class="team-name-title">Representated by</span>
                <span class="team-name ml-3">Team name</span>
              </div>
            </div>
            <div class="col">
              <div class="team-name-div">
                <span class="team-name-title">Profile Link</span>
                <span class="team-name ml-1"
                  >54.254.41.18/user/profile/{{ candidateData.user_id }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Candidate Info -->
        <fieldset class="review">
          <div class="text-start">
            <!-- Personal Information -->
            <div class="review-edit">
              <div class="review-edit-label">
                Personal Information
                <!-- <img
									class="ms-2"
									alt="icon"
								/> -->
              </div>

              <div class="row h-100">
                <div class="col-md-8 mb-3">
                  <div class="card-custom h-67 shadow-default">
                    <ul>
                      <li class="flex-between-start">
                        <span class="flex-50 px-2 label-text">Name</span
                        ><span class="flex-50 px-2"
                          >:<span class="ml-3">
                            {{ candidateData.first_name }}
                            {{ candidateData.last_name }}
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
                        <span class="flex-50 px-2 label-text"
                          >Date of Birth</span
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
                            {{
                              candidateData.personal.per_employment_status
                            }}</span
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
                              $store.state.candidateInfo.religion_options.find(
                                (x) =>
                                  x.id ===
                                  candidateData.personal.per_religion_id
                              )
                                ? $store.state.candidateInfo.religion_options.find(
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
                        <span class="flex-50 px-2 label-text">Ethnicity</span
                        ><span class="flex-50 px-2 d-inherit"
                          >:<span class="ml-3">{{
                            candidateData.personal.per_ethnicity
                          }}</span></span
                        >
                      </li>
                      <li class="flex-between-start">
                        <span class="flex-50 px-2 label-text"
                          >Mother Tongue</span
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
                            $store.state.candidateInfo.countries[
                              candidateData.personal.per_nationality
                            ]
                              ? $store.state.candidateInfo.countries[
                                  candidateData.personal.per_nationality
                                ].name
                              : ""
                          }}</span></span
                        >
                      </li>
                      <li class="flex-between-start">
                        <span class="flex-50 px-2 label-text"
                          >Country of Birth</span
                        ><span class="flex-50 px-2 d-inherit"
                          >:<span class="ml-3">{{
                            $store.state.candidateInfo.countries[
                              candidateData.personal.per_country_of_birth
                            ]
                              ? $store.state.candidateInfo.countries[
                                  candidateData.personal.per_country_of_birth
                                ].name
                              : ""
                          }}</span></span
                        >
                      </li>
                      <li class="flex-between-start">
                        <span class="flex-50 px-2 label-text"
                          >Current Residance</span
                        ><span class="flex-50 px-2 d-inherit"
                          >:<span class="ml-3">{{
                            $store.state.candidateInfo.countries[
                              candidateData.personal.per_current_residence
                            ]
                              ? $store.state.candidateInfo.countries[
                                  candidateData.personal.per_current_residence
                                ].name
                              : ""
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
                      <a-textarea
                        id="per_about"
                        :rows="4"
                        :maxLength="200"
                        v-model="candidateData.personal.per_about"
                      />
                    </p>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="card-custom h-100 shadow-default">
                    <div class="badge-info">
                      <span class="badge-info-label"
                        ><span class="inner">Marital Status</span></span
                      >
                      <span>{{
                        candidateData.personal.per_marital_status
                      }}</span>
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
                        v-if="
                          candidateData.personal.per_willing_to_relocate == 1
                        "
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
                        v-if="
                          candidateData.personal.per_willing_to_relocate == 3
                        "
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
                      <span>{{
                        candidateData.personal.per_language_speak
                      }}</span>
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
                      <span>{{
                        candidateData.personal.per_thankfull_for
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div class="card-custom shadow-default">
                    <h4>Additional Information</h4>
                    <p class="mb-0">
                      <a-textarea
                        id="per_about"
                        :rows="4"
                        :maxLength="200"
                        v-model="
                          candidateData.personal.per_additional_info_text
                        "
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Family Information -->
            <div class="review-edit">
              <div class="review-edit-label">
                Family Information
                <!-- <img
									class="ms-2"
									src="@/assets/icon/pencil-square.svg"
									alt="icon"
								/> -->
              </div>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <div class="card-custom h-100 shadow-default">
                    <ul>
                      <!-- <li class="flex-between-start">
												<span class="flex-50 px-2 label-text"
													>Father's Name</span
												><span class="flex-50 px-2"
													>:<span class="ml-3">
														{{ candidateData.family.father_name }}</span
													></span
												>
											</li>
											<li class="flex-between-start">
												<span class="flex-50 px-2 label-text"
													>Mother's Name</span
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
                          >:<span
                            style="
                              white-space: nowrap;
                              overflow: hidden;
                              text-overflow: ellipsis;
                            "
                            class="ml-3"
                            >{{ candidateData.family.siblings_desc }}</span
                          ></span
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
                      <a-textarea
                        style="overflow: hidden; height: 70px"
                        id="per_about"
                        :rows="5"
                        :maxLength="200"
                        v-model="candidateData.family.family_info"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Preference -->
            <div class="review-edit">
              <div class="review-edit-label">
                My partner preference
                <!-- <img
									class="ms-2"
									src="@/assets/icon/pencil-square.svg"
									alt="icon"
								/> -->
              </div>
              <div class="row">
                <div class="col-md-7 mb-3">
                  <div class="card-custom h-100 shadow-default">
                    <ul>
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
                            >{{ candidateData.preference.pre_height_min }} inch
                            to
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
                              v-for="(country, index) in candidateData
                                .preference.preferred_countries || []"
                              :key="country.id"
                            >
                              {{ country.name }},
                              {{
                                candidateData.preference.preferred_cities[index]
                                  .name
                              }}
                            </div>
                          </span>
                        </span>
                      </li>

                      <!-- Religion -->
                      <li class="flex-between-start">
                        <span class="flex-50 px-2 label-text">Religion</span
                        ><span class="flex-50 px-2 d-inherit"
                          >:<span class="ml-3"
                            >Islam, Judaism, Christan</span
                          ></span
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
                              v-for="nationality in candidateData.preference
                                .preferred_nationality || []"
                              :key="nationality.id"
                            >
                              {{ nationality.name }}
                            </div>
                          </span></span
                        >
                      </li>

                      <!-- Education -->
                      <li
                        class="flex-between-start"
                        v-if="candidateData.preference.pre_study_level_id"
                      >
                        <span class="flex-50 px-2 label-text">Education</span
                        ><span class="flex-50 px-2 d-inherit"
                          >:<span class="ml-3">
                            {{ studyLevel }}
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
                          >:<span class="ml-3">
                            <div
                              v-for="occupuation in candidateData.preference
                                .pre_occupation"
                              :key="occupuation.id"
                            >
                              {{ occupuation.name }}
                            </div></span
                          ></span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- Other Requirments -->
                <div class="col-md-5 mb-3">
                  <div class="card-custom h-100 shadow-default">
                    <h4>What I'm looking for</h4>
                    <p class="mb-0">
                      <a-textarea
                        style="overflow: hidden; height: 150px"
                        id="per_about"
                        :rows="5"
                        :maxLength="200"
                        v-model="candidateData.preference.pre_description"
                      />
                    </p>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div class="card-custom text-start shadow-default">
                    <h4>Other requirements</h4>
                    <p class="text-start mb-0">
                      <a-textarea
                        id="per_about"
                        :rows="3"
                        :maxLength="200"
                        v-model="candidateData.preference.pre_other_preference"
                      />
                    </p>
                  </div>
                </div>
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
                      :value="
                        candidateData.preference.pre_look_and_appearance_rate
                      "
                      :valueString="
                        candidateData.preference
                          .pre_look_and_appearance_rate_string
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
                        candidateData.preference
                          .pre_manners_socialskill_ethics_rate
                      "
                      :valueString="
                        candidateData.preference
                          .pre_manners_socialskill_ethics_rate_string
                      "
                    ></rating-component>
                    <!-- Emotional Maturity and compatibility -->
                    <rating-component
                      title="Emotional Maturity and compatibility"
                      :value="
                        candidateData.preference.pre_emotional_maturity_rate
                      "
                      :valueString="
                        candidateData.preference
                          .pre_emotional_maturity_rate_string
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
                      :value="
                        candidateData.preference.pre_employment_wealth_rate
                      "
                      :valueString="
                        candidateData.preference
                          .pre_employment_wealth_rate_string
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
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import RatingComponent from "./RatingComponent.vue";
import firebase from "../../configs/firebase";
import Footer from "@/components/auth/Footer.vue";
import ApiService from "@/services/api.service";
export default {
  name: "CandidateProfile",
  components: { RatingComponent, Footer },
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      conversations: [],
      candidateData: null,
      isLoading: false,
    };
  },
  created() {
    this.getCandidateData();
  },
  computed: {
    studyLevel() {
      if (this.candidateData.preference.pre_study_level_id) {
        var results =
          this.$store.state.candidateInfo.study_level_options.filter(
            (level) => {
              return (
                level.id == this.candidateData.preference.pre_study_level_id
              );
            }
          );
        return results[0].name;
      } else {
        return null;
      }
    },
  },
  methods: {
    async getCandidateData() {
      try {
        this.isLoading = true;
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await ApiService.get(`v1/candidate/info/${user.id}`);
        if (response.status === 200) {
          this.isLoading = false;
          this.candidateData = {
            ...response.data.data,
            preference: {
              ...response.data.data.preference,
              pre_occupation: JSON.parse(
                response.data.data.preference.pre_occupation
              ),
            },
          };
        }
      } catch (error) {
        this.isLoading = false;
        alert(this.error);
      }
    },
    startConversation() {
      var res_userid = this.candidateData.user_id;
      var my_user_id = this.$store.state.user.user.id;
      var chat_category = this.returnCategoryId(
        "one2one",
        res_userid,
        my_user_id
      );
      var checkConvId = this.checkChatCategory(chat_category);
      // check if same chat exists
      if (checkConvId) {
        console.log("chat found");
        this.$store.dispatch("setCurrentConversation", checkConvId);
      } else {
        console.log("chat not found");
        // else create chat
        var res_fname = this.candidateData.first_name;
        var my_fname = "";
        if (this.$store.state.user.user.account_type == 1) {
          my_fname = this.$store.state.user.candidate_information.first_name;
        } else {
          my_fname =
            this.$store.state.user.representative_information.first_name;
        }
        var chatTitle = this.returnChatTitle(
          res_userid,
          my_user_id,
          res_fname,
          my_fname
        );

        var members = [res_userid, my_user_id];
        var newConv = {
          title: chatTitle,
          type: "connected",
          members: members,
          last_msg: "",
          category_id: chat_category,
        };
        var self = this;
        var convCollection = firebase.collection("conversations");
        convCollection
          .add(newConv)
          .then(function (docRef) {
            self.$store.dispatch("setCurrentConversation", docRef.id);
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
        alert("conv createed:" + chatTitle);
        // console.log('conversation start clicked');
        // console.log(res_userid);
        // console.log(my_user_id);
        // console.log(chat_category);
        // console.log(res_fname);
        // console.log(my_fname);
        // console.log(chatTitle);
      }
      this.$router.push("/chat-window");
    },
    returnCategoryId(type, id1, id2) {
      var category_id = "";
      if (id1 > id2) {
        category_id = type + "_" + id2.toString() + "_" + id1.toString();
      } else {
        category_id = type + "_" + id1.toString() + "_" + id2.toString();
      }
      return category_id;
    },
    returnChatTitle(id1, id2, name1, name2) {
      var title = "";
      if (id1 > id2) {
        title = name1 + " & " + name2;
      } else {
        title = name1 + " & " + name2;
      }
      return title;
    },
    checkChatCategory(categoryId) {
      console.log("inside");
      console.log(this.conversations.length);
      console.log(this.conversations);
      for (var i = 0; i < this.conversations.length; i++) {
        console.log("category given:", categoryId);
        console.log("category item:", this.conversations[i].category_id);
        if (this.conversations[i].category_id == categoryId) {
          console.log(this.conversations[i].id);
          return this.conversations[i].id;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.candidate-profile {
  margin: 25px;
  width: 100%;
  margin-left: 10px;
  .profile-heading {
    margin-left: 10px;
    margin-bottom: 20px;
    .cover-img {
      width: 100%;
      height: 300px;
      position: relative;
      border: 1px solid white;
      box-shadow: 2px 5px 5px #aaa;
      border-radius: 5px;
      top: 0;
      left: 0;
    }
    .avatar-img {
      width: 150px;
      height: 150px;
      border: 1px solid white;
      box-shadow: 2px 5px 5px #aaa;
      position: absolute;
      top: 192px;
      left: 480px;
      border-radius: 5px;
    }
    .team-name-div {
      border: 1px solid $color-primary;
      border-radius: 20px;
      .team-name-title {
        background-color: $color-primary;
        color: white;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 0 15px;
      }
    }
    @media (max-width: 1024px) {
      max-width: calc(100% - 15px);
      border-radius: 10px;
    }
    @media (max-width: 767px) {
      max-width: none;
      padding-right: 15px;
      padding-left: 15px;
      border-top-right-radius: 15px;
    }
  }
  @media (min-width: 1024px) {
    margin: 0 auto;
  }
  .h-100 {
    height: 100%;
  }
  .h-67 {
    height: 66%;
    margin-bottom: 2%;
    @media (max-width: 1024px) {
      height: 80%;
    }
    @media (max-width: 767px) {
      height: 80%;
    }
  }
  .h-33 {
    height: 32%;
    margin-top: 1%;
    @media (max-width: 1024px) {
      height: 20%;
      margin-bottom: 2%;
    }
    @media (max-width: 767px) {
      // margin-top: auto;
      height: 20%;
      // margin-bottom: 16px;
    }
  }

  .review {
    margin-left: 10px;
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
  .ant-input {
    border: none;
    pointer-events: none;
  }
  textarea {
    resize: none;
  }
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
.profile-footer {
  width: 100%;
  @media (max-width: 767px) {
    display: none;
  }
}
</style>