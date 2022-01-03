<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <ProfileBanner
        class="px-2 mt-2"
        :name="candidateData.first_name + ' ' + candidateData.last_name"
        :image="
          candidateData.personal.per_main_image_url
            ? candidateData.personal.per_main_image_url
            : avatarSrc
        "
      />
      <div
        v-if="candidateData"
        class="candidate-profile"
        style="margin-top: 15px"
      >
        <div class="profile-heading">
          <!-- Avatar and cover images -->
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

        <div class="mt-10 pb-5 px-3">
          <Scroller />
          <fieldset class="">
              <legend class="ml-8 px-1"><span>Personal Information</span></legend>
              <v-container fluid class="pt-0 px-5">
                  <v-row dense>
                      <v-col class="pt-1" cols="12" md="8">
                        <PersonalInformationTable :data="candidateData"/>
                        <CardInfo :detail="candidateData.personal.per_about" height="269px" class="mt-2"/>
                      </v-col>
                      <v-col ref="family-information" class="pt-1" cols="12" md="4">
                          <MoreAbout 
                            :data="candidateData"
                          />
                      </v-col>
                      <v-col class="pt-1 mb-5" cols="12">
                        <CardInfo
                          title="Additional Information"
                          class="mt-2"
                        />
                      </v-col>
                  </v-row>
              </v-container>
          </fieldset>
          <fieldset id="family-information" class="-mt-15">
          <legend class="ml-8 bg-white px-1"><span>Family Information</span></legend>
          <v-container fluid class="pt-0 px-5">
              <v-row dense>
                  <v-col class="pt-1 mb-5" cols="12" md="7">
                      <FamilyInfoTable :data="candidateData"/>
                  </v-col>
                  <v-col class="pt-1 mb-5" cols="12" md="5">
                      <CardInfo />
                  </v-col>
              </v-row>
          </v-container>
          </fieldset>
          <fieldset class="-mt-15">
            <legend id="my-partner-pref" class="ml-8 bg-white px-1"><span>My partner preference</span></legend>
            <v-container fluid class="pt-0 px-5">
                  <v-row dense>
                      <v-col class="pt-1" cols="12" md="7">
                          <MyPrefTable
                            :preference="candidateData.preference"
                            :countries="candidateData.preference.preferred_countries"
                          />
                      </v-col>
                      <v-col class="pt-1" cols="12" md="5">
                          <CardInfo
                              title="What I'm Looking for"
                              :detail="candidateData.preference.pre_description"
                          />
                      </v-col>
                      <v-col class="pt-1" cols="12">
                          <CardInfo
                              title="Other requirements"
                              :detail="candidateData.preference.pre_other_preference"
                          />
                      </v-col>
                      <v-col class="pt-1" cols="12">
                        <v-card class="px-3 py-5">
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
                        </v-card>
                      </v-col>
                  </v-row>
              </v-container>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInformationTable from '@/components/search/personal-information/PersonalInformationTable.vue'
import FamilyInfoTable from '@/components/search/personal-information/FamilyInfoTable.vue'
import MyPrefTable from '@/components/search/personal-information/MyPrefTable.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from '@/components/search/personal-information/MoreAbout.vue'
import Scroller from  '@/components/atom/Scroller'

import RatingComponent from "./RatingComponent.vue";
import ProfileBanner from "@/components/atom/ProfileBanner";
import firebase from "../../configs/firebase";
import Footer from "@/components/auth/Footer.vue";
import ApiService from "@/services/api.service";
export default {
  name: "CandidateProfile",
  components: { 
    PersonalInformationTable,
    FamilyInfoTable,
    MyPrefTable,
    MoreAbout,
    CardInfo,
    Scroller,

    RatingComponent, 
    Footer,
    ProfileBanner,
  },
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
.container--fluid {
    max-width: 100% !important;
}
fieldset {
    border: 1px solid #d3d0e4;
    border-radius: 10px;
}
legend {
    display: inline;
    width: inherit;
    color: #6259a8;
    font-size: 18px;
    font-weight: 600;
}
.-mt-15 {
    margin-top: -13px;
}
.bg-white {
    background: white;
}
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