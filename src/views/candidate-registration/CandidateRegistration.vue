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
          @disabled="onDataChange($event)"
          ref="PreferenceTwo"
        />
      </div>
      <div class="steps-content" v-show="current == 1">
        <PersonalInfoTwo
          :candidateDetails="candidateDetails"
          @disabled="onDataChange($event)"
          ref="personalInfoTwo"
        />
      </div>
      <div class="steps-content" v-show="current == 2">
        <Verification
          :candidateDetails="candidateDetails"
          @disabled="onDataChange($event)"
          ref="Verification"
        />
      </div>
      <div class="steps-content" v-show="current == 3">
        <FamilyInfoTwo
          :candidateDetails="candidateDetails"
          @disabled="onDataChange($event)"
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
      current: 0,
      disabledNextBtn: false,
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
    onDataChange(event) {
      this.disabledNextBtn =
        event.current === this.current ? event.value : false;
    },
    getCandidateInitialInfo: async function () {
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
          preferenceData: {
            ...this.nullToUndefined(response.data.data.user.preference),
            prefReligions: [],
            pre_height_min: 0,
            pre_height_max: 0,
            disAllowedCountry: false,
            allowedCountry: false,
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
          family: response.data.data.user.family,
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
      }
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
          // code block
          this.current = 0;
        }
      }
    },
    prev() {
      this.current--;
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