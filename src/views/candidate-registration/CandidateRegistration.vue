<template>
  <div class="candidate-registration">
    <header>
      <a href="/"><img src="@/assets/logo.png" alt="" /></a>
    </header>
    <div class="steps ma-steps">
      <div class="steper-header text-center heading-text">
        <h4>CANDIDATE PROFILE AND REQUIREMENT FORM</h4>
        <p>Please answer all question accurately and in full</p>
      </div>
      <a-steps :current="current" labelPlacement="vertical">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content" v-show="current == 0">
        <PreferenceTwo
          :candidateDetails="candidateDetails"
          :preferenceData="candidateDetails.preferenceData"
          @valueChange="onDataChange($event)"
          ref="PreferenceTwo"
        />
      </div>
      <div class="steps-content" v-show="current == 1">
        <PersonalInfoTwo
          :personalInformation="candidateDetails.personalInformation"
          :candidateDetails="candidateDetails"
          ref="personalInfoTwo"
        />
      </div>
      <div class="steps-content" v-show="current == 2">
        <Verification :candidateDetails="candidateDetails" ref="Verification" />
      </div>
      <div class="steps-content" v-show="current == 3">
        <FamilyInfoTwo
          :familyInformation="candidateDetails.familyInformation"
          :candidateDetails="candidateDetails"
          ref="familyInfoTwo"
        />
      </div>
      <div class="steps-content" v-show="current == 4">
        <UploadProfile />
      </div>
      <div class="steps-content" v-if="current == 5">
        <Review :candidateDetails="candidateDetails" />
      </div>

      <div class="steps-action text-right pb-5 clearfix">
        <a-button
          :class="{ disabled: !enabledNextBtn }"
          v-if="current < steps.length - 1"
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3"
          @click="next"
        >
          Next
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          shape="round"
          style="float: right; margin-top: 15px"
          @click="doneBtn"
        >
          Review and Publish
        </a-button>
        <a-button
          v-if="current > 0"
          shape="round"
          style="float: right; margin-right: 10px"
          class="mt-3"
          @click="prev"
        >
          Previous
        </a-button>

        <a-button
          v-if="current < steps.length - 1"
          shape="round"
          type="primary"
          style="float: left"
          class="mt-3"
          @click="saveExit"
        >
          Exit
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import Preference from "@/components/candidate-registration/Preference.vue";
import PreferenceTwo from "@/components/candidate-registration/preference-two.vue";
import Verification from "@/components/candidate-registration/verification.vue";
import PersonalInfo from "@/components/candidate-registration/PersonalInfo.vue";
import PersonalInfoTwo from "@/components/candidate-registration/personalinfo-two.vue";
import FamilyInfoTwo from "@/components/candidate-registration/familyinfo-two.vue";
import FamilyInfo from "@/components/candidate-registration/FamilyInfo.vue";
import UploadProfile from "@/components/candidate-registration/UploadProfile.vue";
import Review from "@/components/candidate-registration/Review.vue";
import ApiService from "@/services/api.service";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";
export default {
  components: {
    Preference,
    PreferenceTwo,
    PersonalInfo,
    PersonalInfoTwo,
    FamilyInfo,
    FamilyInfoTwo,
    UploadProfile,
    Review,
    Verification,
  },
  mounted() {
    this.getCandidateInitialInfo();
  },
  data() {
    return {
      current: 5,
      enabledNextBtn: false,
      candidateDetails: {
        preferenceData: null,
      },
      steps: [
        {
          title: "Your Preferences",
          content: "First-content",
        },
        {
          title: "Personal Information",
          content: "Second-content",
        },
        {
          title: "Verification",
          content: "Last-content",
        },
        {
          title: "Family Information",
          content: "Last-content",
        },
        {
          title: "Image Upload",
          content: "Last-content",
        },
        {
          title: "Review & Publish",
          content: "Last-content",
        },
      ],
    };
  },
  methods: {
    onDataChange(e) {
      switch (e.current) {
        case 1:
          this.candidateDetails.preferenceData = {
            ...e.value,
          };
          break;
      }
      this.checkExistData();
    },
    getCandidateInitialInfo: async function () {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await ApiService.get("v1/candidate/initial-info");
      if (response.status === 200) {
        const details = {
          countries: response.data.data.countries,
          occupations: response.data.data.occupations,
          religions: response.data.data.religions,
          ethnicities: ethnicities,
          languages: languages,
          hobbies: hobbies,
          foods: foods,
          thankfulThings: thankfulThings,
          personalInformation: {
            contact: {
              ...this.nullToUndefined(response.data.data.personal_info.contact),
              per_current_residence_country: parseInt(
                response.data.data.personal_info.contact
                  .per_current_residence_country
              ),
              per_permanent_country: parseInt(
                response.data.data.personal_info.contact.per_permanent_country
              ),
              per_email: userInfo.email,
            },
            essential: {
              ...this.nullToUndefined(
                response.data.data.personal_info.essential
              ),
              default_date: response.data.data.personal_info.essential.dob,
              per_telephone_no: 1,
            },
            general: {
              ...this.nullToUndefined(response.data.data.personal_info.general),
            },
            more_about: {
              ...this.nullToUndefined(
                response.data.data.personal_info.more_about
              ),
              per_smoker:
                response.data.data.personal_info.more_about.per_smoker == 0
                  ? undefined
                  : response.data.data.personal_info.more_about.per_smoker,
            },
          },
          preferenceData: {
            ...this.nullToUndefined(response.data.data.user.preference),
            preferred_nationality:
              response.data.data.user.preference.preferred_nationality.map(
                (a) => a.id
              ),
            preferred_countries:
              response.data.data.user.preference.preferred_countries.map(
                (a) => a.id
              ),
            bloked_countries:
              response.data.data.user.preference.bloked_countries.map(
                (a) => a.id
              ),
            pre_partner_religion_id:
              response.data.data.user.preference.pre_partner_religion_id.map(
                function (v) {
                  return parseInt(v, 10);
                }
              ),
            pre_preferred_divorcee:
              response.data.data.user.preference.pre_preferred_divorcee == 0
                ? false
                : true,
            pre_preferred_divorcee_child:
              response.data.data.user.preference.pre_preferred_divorcee_child ==
              0
                ? false
                : true,
            pre_partner_comes_from: [],
            pre_disallow_preference: [],
            // pre_partner_age_max: 1,
            // pre_partner_age_min: 1,
            disAllowedCity: {
              listOne: [],
              listTwo: [],
              listThree: [],
            },
            allowedCity: {
              listOne: [],
              listTwo: [],
              listThree: [],
            },
          },
          personal: response.data.data.user.personal,
          screen_name: response.data.data.user.screen_name,
          user_id: response.data.data.user.user_id,
          familyInformation: {
            ...this.nullToUndefined(response.data.data.user.family),
          },
          first_name: response.data.data.user.first_name,
          id: response.data.data.user.id,
          last_name: response.data.data.user.last_name,
          studylevels: response.data.data.studylevels,
          review: {
            personal: {},
          },
        };
        console.log("details", details);
        this.candidateDetails = {
          ...details,
        };
        this.checkExistData();
      }
    },
    checkExistData() {
      let isEnabled = false;
      switch (this.current) {
        case 0:
          isEnabled = Object.values(this.candidateDetails.preferenceData).every(
            (x) => x !== undefined && x !== null && x !== ""
          );
          break;
        case 1:
          Object.values(this.candidateDetails.personalInformation).forEach(
            (ob) => {
              isEnabled = Object.values(ob).every(
                (x) => x !== undefined && x !== null && x !== ""
              );
              if (!isEnabled) return;
            }
          );

          break;
        case 3:
          isEnabled = Object.values(
            this.candidateDetails.familyInformation
          ).every((x) => x !== undefined && x !== null && x !== "");
          break;
      }

      this.enabledNextBtn = isEnabled;
    },

    nullToUndefined(object) {
      Object.keys(object).forEach(function (k) {
        if (object[k] === null) {
          object[k] = undefined;
        }
      });
      return object;
    },
    saveExit() {
      this.$router.push("/");
    },
    doneBtn() {
      this.$router.push("/dashboard");
    },
    async next() {
      switch (this.current) {
        case 0: {
          this.current++;
          break;
        }
        case 1: {
          this.current++;
          break;
        }
        case 2: {
          this.current++;
          break;
        }
        case 3: {
          this.current++;
          break;
        }
        case 4: {
          this.current++;
          break;
        }
        default: {
          this.current = 0;
        }
      }
      this.checkExistData();
    },
    prev() {
      this.current--;
      this.checkExistData();
    },
    getDefaultPersonalInfo() {
      return {
        essential: {
          per_gender: undefined,
          dob: "",
          per_employment_status: undefined,
          per_occupation: undefined,
          per_education_level_id: undefined,
          per_religion_id: undefined,
        },
        general: {
          per_ethnicity: undefined,
          per_mother_tongue: undefined,
          per_nationality: undefined,
          per_country_of_birth: undefined,
          per_health_condition: undefined,
        },
        contact: {
          per_current_residence_city: undefined,
          postCode: "",
          per_permanent_country: undefined,
          per_permanent_city: "",
          per_permanent_address: "",
          mobile_number: undefined,
          mobile_country_code: undefined,
          email: userInfo.email,
        },
        more_about: {
          per_marital_status: undefined,
          per_currently_living_with: undefined,
          per_willing_to_relocate: undefined,
          per_smoker: undefined,
          per_language_speak: undefined,
          per_hobbies_interests: undefined,
          per_food_cuisine_like: undefined,
          per_things_enjoy: undefined,
          per_thankfull_for: undefined,
          per_about: "",
        },
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.candidate-registration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh);
  overflow: hidden;
  header {
    text-align: center;
    height: 100px;
    width: 100%;
    background-color: $bg-secondary;

    @media (max-width: 768px) {
      width: 105%;
    }

    @media (max-width: 700px) {
      width: 120%;
    }
    @media (max-width: 620px) {
      width: 130%;
    }
    @media (max-width: 540px) {
      width: 148%;
    }
    @media (max-width: 414px) {
      width: 195%;
    }

    @media (max-width: 375px) {
      width: 214%;
    }
    @media (max-width: 360px) {
      width: 223%;
    }
    @media (max-width: 320px) {
      width: 250%;
    }
    @media (max-width: 280px) {
      width: 286%;
    }

    img {
      margin-top: 10px;
      height: 80px;
    }
  }
  .heading-text {
    margin-top: 20px;
    color: $color-brand;
    h4,
    h6 {
      font-weight: bold;
      color: $color-brand;
    }
  }
}
</style>