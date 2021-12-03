<template>
  <div class="candidate-registration">
    <Header />

    <div class="steps ma-steps">
      <div class="steper-header text-center heading-text">
        <h4>CANDIDATE PROFILE AND REQUIREMENT FORM</h4>
        <p>Please answer all question accurately and in full</p>
      </div>

      <VueFixedHeader
        @change="updateFixedStatus"
        :threshold="propsData.threshold"
        :headerClass="propsData.headerClass"
        :fixedClass="propsData.fixedClass"
        :hideScrollUp="propsData.hideScrollUp"
      >
        <div class="step-bar">
          <a-steps :current="current" labelPlacement="vertical">
            <a-step
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
        </div>
      </VueFixedHeader>
      <div class="steps-content" v-if="current == 0">
        <PreferenceTwo
          :candidateDetails="candidateDetails"
          :preferenceData="candidateDetails.preferenceData"
          @valueChange="onDataChange($event)"
          ref="PreferenceTwo"
        />
      </div>
      <div class="steps-content" v-if="current == 1">
        <PersonalInfoTwo
          :personalInformation="candidateDetails.personalInformation"
          :candidateDetails="candidateDetails"
          @valueChange="onDataChange($event)"
          ref="personalInfoTwo"
        />
      </div>
      <div class="steps-content" v-if="current == 2">
        <Verification
          @valueChange="onDataChange($event)"
          :verification="candidateDetails.verification"
          :candidateDetails="candidateDetails"
          ref="Verification"
        />
      </div>
      <div class="steps-content" v-if="current == 3">
        <FamilyInfoTwo
          @valueChange="onDataChange($event)"
          :familyInformation="candidateDetails.familyInformation"
          :candidateDetails="candidateDetails"
          ref="familyInfoTwo"
        />
      </div>
      <div class="steps-content" v-if="current == 4">
        <UploadProfile :imageModel="candidateDetails.imageModel" />
      </div>
      <div class="steps-content" v-if="current == 5">
        <Review :candidateDetails="candidateDetails" />
      </div>

      <div class="steps-action text-right pb-5 clearfix">
        <!-- :class="{ disabled: !enabledNextBtn }"
          :disabled="!enabledNextBtn" -->
        <a-button
          :class="{ disabled: !enabledNextBtn }"
          :disabled="!enabledNextBtn"
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
          Save & Exit
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
const createData = () => ({
  threshold: 0,
  headerClass: "vue-fixed-header",
  fixedClass: "vue-fixed-header--isFixed",
  hideScrollUp: false,
});
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
import VueFixedHeader from "vue-fixed-header";
import jwtService from "../../services/jwt.service";
import Header from "../../components/header/header";
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
    VueFixedHeader,
    Header,
  },
  mounted() {
    this.getCandidateInitialInfo();
  },
  data() {
    return {
      fixedStatus: {
        headerIsFixed: false,
      },
      propsData: { ...createData() },
      current: 0,
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
    updateFixedStatus(next) {
      this.fixedStatus.headerIsFixed = next;
    },
    onDataChange(e) {
      switch (e.current) {
        case 0:
          this.candidateDetails.preferenceData = {
            ...e.value,
          };
          break;
        case 1:
          this.candidateDetails.personalInformation = {
            ...e.value,
          };
          break;
        case 3:
          this.candidateDetails.familyInformation = {
            ...e.value,
          };
        case 4:
          this.candidateDetails.imageModel = {
            ...e.value,
          };
          break;
      }
      this.checkExistData();
    },
    getCandidateInitialInfo: async function () {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await ApiService.get("v1/candidate/initial-info");
      if (response.status === 200) {
        const details = {
          countries: response.data.data.countries,
          imageModel: {
            ...response.data.data.candidate_image,
            additionalImageSrc:
              response.data.data.candidate_image.other_images.length > 0 ? response.data.data.candidate_image.other_images[0].image_path : null,
          },
          occupations: response.data.data.occupations,
          religions: response.data.data.religions,
          ethnicities: ethnicities,
          languages: languages,
          hobbies: hobbies,
          foods: foods,
          thankfulThings: thankfulThings,
          verification: {
            ...response.data.data.validation_info.verification,
            cities: [],
          },
          personalInformation: {
            contact: {
              ...this.nullToUndefined(response.data.data.personal_info.contact),
              per_current_residence_country: response.data.data.personal_info
                .contact.per_current_residence_country
                ? parseInt(
                    response.data.data.personal_info.contact
                      .per_current_residence_country
                  )
                : response.data.data.personal_info.contact
                    .per_current_residence_country,
              per_permanent_country: response.data.data.personal_info.contact
                .per_permanent_country
                ? parseInt(
                    response.data.data.personal_info.contact
                      .per_permanent_country
                  )
                : response.data.data.personal_info.contact
                    .per_permanent_country,
              per_email: user.email,
              per_county: "None",
              permanantCities: [],
              residenceCities: [],
            },
            essential: {
              ...this.nullToUndefined(
                response.data.data.personal_info.essential
              ),
              default_date: response.data.data.personal_info.essential.dob,
              per_telephone_no: 111,
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
              per_language_speak: !response.data.data.personal_info.more_about
                .per_language_speak
                ? undefined
                : response.data.data.personal_info.more_about.per_language_speak.split(
                    ","
                  ),
              per_thankfull_for: !response.data.data.personal_info.more_about
                .per_thankfull_for
                ? undefined
                : response.data.data.personal_info.more_about.per_thankfull_for.split(
                    ","
                  ),
              per_things_enjoy: !response.data.data.personal_info.more_about
                .per_things_enjoy
                ? undefined
                : response.data.data.personal_info.more_about.per_things_enjoy.split(
                    ","
                  ),
              per_hobbies_interests: !response.data.data.personal_info
                .more_about.per_hobbies_interests
                ? undefined
                : response.data.data.personal_info.more_about.per_hobbies_interests.split(
                    ","
                  ),
              per_food_cuisine_like: !response.data.data.personal_info
                .more_about.per_food_cuisine_like
                ? undefined
                : response.data.data.personal_info.more_about.per_food_cuisine_like.split(
                    ","
                  ),
              per_children: [
                {
                  type: 1,
                  count: 1,
                  age: 10,
                },
              ],
            },
          },
          preferenceData: {
            ...this.nullToUndefined(response.data.data.user.preference),
            pre_height_min:
              response.data.data.user.preference.pre_height_min == 0
                ? undefined
                : response.data.data.user.preference.pre_height_min,
            pre_height_max:
              response.data.data.user.preference.pre_height_max == 0
                ? undefined
                : response.data.data.user.preference.pre_height_max,

            pre_partner_age_max:
              response.data.data.user.preference.pre_partner_age_max == 0
                ? undefined
                : response.data.data.user.preference.pre_partner_age_max,
            pre_partner_age_min:
              response.data.data.user.preference.pre_partner_age_min == 0
                ? undefined
                : response.data.data.user.preference.pre_partner_age_min,

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
          ...this.candidateDetails,
          ...details,
        };
        if (
          this.candidateDetails.preferenceData &&
          this.candidateDetails.preferenceData.preferred_countries.length > 0
        ) {
          this.onChangeCountry(
            this.candidateDetails.preferenceData.preferred_countries[0],
            "listOne",
            "allowed"
          );
        }
        if (
          this.candidateDetails.preferenceData &&
          this.candidateDetails.preferenceData.bloked_countries.length > 0
        ) {
          this.onChangeCountry(
            this.candidateDetails.preferenceData.bloked_countries[0],
            "listOne",
            "disAllowed"
          );
        }
        if (
          this.candidateDetails.personalInformation &&
          this.candidateDetails.personalInformation.contact
            .per_current_residence_country > 0
        ) {
          this.onChangeCountry(
            {
              id: this.candidateDetails.personalInformation.contact
                .per_current_residence_country,
            },
            "residence",
            ""
          );
        }
        if (
          this.candidateDetails.personalInformation &&
          this.candidateDetails.personalInformation.contact
            .per_permanent_country > 0
        ) {
          this.onChangeCountry(
            {
              id: this.candidateDetails.personalInformation.contact
                .per_permanent_country,
            },
            "permanat",
            ""
          );
        }
        if (
          this.candidateDetails.verification &&
          this.candidateDetails.verification.ver_country_id > 0
        ) {
          this.onChangeCountry(
            { id: this.candidateDetails.verification.ver_country_id },
            "verification",
            ""
          );
        }
        this.current = response.data.data.user.data_input_status;
        this.checkExistData();
      }
    },
    async saveDataInputStatus(satge) {
      const res = await ApiService.post(
        "v1/candidate/personal-info-status?_method=PATCH",
        {
          data_input_status: satge,
        }
      );
      const user = JSON.parse(localStorage.getItem("user"));
      user.data_input_status = satge;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
    },
    async onChangeCountry(e, name, action, isDefault = false) {
      const res = await ApiService.get(`v1/utilities/cities/${e.id}`);

      if (res.status === 200) {
        switch (name) {
          case "listOne":
            action == "allowed"
              ? (this.candidateDetails.preferenceData.allowedCity.listOne = [])
              : (this.candidateDetails.preferenceData.disAllowedCity.listOne =
                  []);
            action == "allowed"
              ? this.candidateDetails.preferenceData.allowedCity.listOne.push(
                  ...res.data.data
                )
              : this.candidateDetails.preferenceData.disAllowedCity.listOne.push(
                  ...res.data.data
                );
            break;
          case "listTwo":
            action == "allowed"
              ? this.candidateDetails.preferenceData.allowedCity.listTwo.push(
                  ...res.data.data
                )
              : this.candidateDetails.preferenceData.disAllowedCity.listTwo.push(
                  ...res.data.data
                );
            break;
          case "listThree":
            action == "allowed"
              ? this.candidateDetails.preferenceData.allowedCity.listThree.push(
                  ...res.data.data
                )
              : this.candidateDetails.preferenceData.disAllowedCity.listThree.push(
                  ...res.data.data
                );
            break;
          case "residence":
            this.candidateDetails.personalInformation.contact.residenceCities.push(
              ...res.data.data
            );
            break;
          case "permanat":
            this.candidateDetails.personalInformation.contact.permanantCities.push(
              ...res.data.data
            );
            break;
          case "verification":
            this.candidateDetails.verification.cities.push(...res.data.data);
            break;
        }
      }
    },
    checkExistData() {
      let isEnabled = false;
      switch (this.current) {
        case 0:
          const {
            pre_partner_age_max,
            pre_partner_age_min,
            pre_height_max,
            pre_height_min,
            pre_partner_religion_id,
            pre_ethnicities,
            preferred_nationality,
            pre_study_level_id,
            pre_employment_status,
            pre_occupation,
          } = this.candidateDetails.preferenceData;
          isEnabled = Object.values({
            pre_partner_age_max,
            pre_partner_age_min,
            pre_height_max,
            pre_height_min,
            pre_partner_religion_id,
            pre_ethnicities,
            preferred_nationality,
            pre_study_level_id,
            pre_employment_status,
            pre_occupation,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
        case 1:
          const { essential, general, contact } =
            this.candidateDetails.personalInformation;
          Object.values({ essential, general, contact }).forEach((ob) => {
            isEnabled = Object.values(ob).every(
              (x) => x !== undefined && x !== null && x !== ""
            );
            if (!isEnabled) return;
          });

          break;
        case 2:
          const {
            ver_country_id,
            ver_document_type,
            ver_image_back,
            ver_image_front,
            ver_recommences_address,
            ver_recommences_first_name,
            ver_recommences_last_name,
            ver_recommences_mobile_no,
            ver_recommences_occupation,
            ver_recommences_title,
          } = this.candidateDetails.verification;
          isEnabled = Object.values({
            ver_country_id,
            ver_document_type,
            ver_image_back,
            ver_image_front,
            ver_recommences_address,
            ver_recommences_first_name,
            ver_recommences_last_name,
            ver_recommences_mobile_no,
            ver_recommences_occupation,
            ver_recommences_title,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
          break;
        case 3:
          const {
            country_of_origin,
            family_info,
            father_profession,
            mother_profession,
            siblings_desc,
          } = this.candidateDetails.familyInformation;
          isEnabled = Object.values({
            country_of_origin,
            family_info,
            father_profession,
            mother_profession,
            siblings_desc,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
        case 4:
          isEnabled = this.candidateDetails.imageModel
            ? Object.values(this.candidateDetails.imageModel).every(
                (x) => x !== undefined && x !== null && x !== ""
              )
            : false;
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
      jwtService.destroyTokenAndUser();
      this.$router.push("/login");
    },
    doneBtn() {
       this.saveDataInputStatus(6);
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
      this.saveDataInputStatus(this.current);
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
  .step-bar {
    margin: 0;
    padding: 0;
    z-index: 9;
  }
  header {
    text-align: center;
    height: 100px;
    width: 100%;
    margin: 0;
    padding: 0;
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
  .header-text {
    width: 100%;
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

.step-bar.vue-fixed-header--isFixed {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 800px;
  padding: 0;
  background: aliceblue;
}
</style>