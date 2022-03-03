<template>
  <div class="candidate-registration font-poppins">
    <Header />
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else class="steps ma-steps">
      <div class="steper-header text-center heading-text px-3 d-mb-none">
        <h4>About you and the companion you are looking for</h4>
        <p>To get the best results please complete the questions fully</p>
      </div>

      <VueFixedHeader
        @change="updateFixedStatus"
        :threshold="propsData.threshold"
        :headerClass="propsData.headerClass"
        :fixedClass="propsData.fixedClass"
        :hideScrollUp="propsData.hideScrollUp"
      >
        <div class="step-bar">
          <a-steps
            class="desktop-block"
            :current="current"
            labelPlacement="vertical"
          >
            <a-step
              v-for="(item, index) in steps"
              @click="onStep(index)"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
          <div class="mobile-header">
            <h4 class="mobile-step-text color-primary text-center fw-bold">
              {{ mobileSteps[current] }}
            </h4>
            <div class="mobile-block px-3">
              <div
                @click="onStep(0)"
                class="mobile-step"
                :class="{ 'bg-primary': current >= 0 }"
              ></div>
              <div
                @click="onStep(1)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 1 }"
              ></div>
              <div
                @click="onStep(2)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 2 }"
              ></div>
              <div
                @click="onStep(3)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 3 }"
              ></div>
              <div
                @click="onStep(4)"
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 4 }"
              ></div>
            </div>
          </div>
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
        <FamilyInfoTwo
          @valueChange="onDataChange($event)"
          :familyInformation="candidateDetails.familyInformation"
          :candidateDetails="candidateDetails"
          ref="familyInfoTwo"
        />
      </div>
      <div class="steps-content" v-if="current == 3">
        <UploadProfile
          @valueChange="onDataChange($event)"
          :imageModel="candidateDetails.imageModel"
        />
      </div>
      <div class="steps-content" v-if="current == 4">
        <Verification
          v-if="showAgreement"
          @cancel="cancelVerification"
          @valueChange="onDataChange($event)"
          :verification="candidateDetails.verification"
          :candidateDetails="candidateDetails"
          ref="Verification"
        />
        <VerificationAgreement
          @agree="onAgree($event)"
          v-if="!showAgreement"
          ref="VerificationAgreement"
        />
      </div>
      <div class="steps-content" v-if="current == 5">
        <Review :candidateDetails="candidateDetails" @toggleStep="toggleStep" />
      </div>

      <div class="steps-action text-right pb-5 clearfix bottom-padding">
        <!-- :class="{ disabled: !enabledNextBtn }"
          :disabled="!enabledNextBtn" -->
        <a-button
          :class="{
            disabled: !enabledNextBtn,
            'next-btn-pos': current !== 0,
            'first-next-btn-pos': current === 0,
          }"
          :disabled="!enabledNextBtn"
          v-if="current < steps.length - 1"
          shape="round"
          type="primary"
          style="float: right"
          class="mt-3 next-btn-pos"
          @click="next"
        >
          <!--          :style="{'margin-right': current === 0 ? '-15px' : '0'}"-->
          Next
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          shape="round"
          style="float: right; margin-top: 12px; margin-right: -10px"
          @click="openDialog"
        >
          Review and Submit
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
          :class="{
            'first-save-btn': current === 0,
            'save-btn': current !== 0,
          }"
          @click="saveExit"
        >
          Save & Exit
        </a-button>
      </div>
      <br />
      <br /><br /><br /><br />
    </div>
    <ReviewAndPublishModal
      @continue="continueToDashboard"
      @submit="doneBtn"
      @cancel="cancel"
      :dialog="dialog"
    />
  </div>
</template>
<script>
const createData = () => ({
  threshold: 0,
  headerClass: "vue-fixed-header",
  fixedClass: "vue-fixed-header--isFixed",
  hideScrollUp: false,
});
import ReviewAndPublishModal from "@/views/candidate-registration/ReviewAndPublishModal.vue";
import PreferenceTwo from "@/components/candidate-registration/preference-two.vue";
import VerificationAgreement from "@/components/candidate-registration/verification-agreement.vue";
import Verification from "@/components/candidate-registration/verification.vue";
import PersonalInfoTwo from "@/components/candidate-registration/personalinfo-two.vue";
import FamilyInfoTwo from "@/components/candidate-registration/familyinfo-two.vue";
import UploadProfile from "@/components/candidate-registration/UploadProfile.vue";
import Review from "@/components/candidate-registration/Review.vue";
import ApiService from "@/services/api.service";
import ethnicities from "@/common/ethnicities.js";
import languages from "@/common/languages.js";
import hobbies from "@/common/hobbies.js";
import foods from "@/common/foods.js";
import thankfulThings from "@/common/thankfulThings.js";
import improveMyselfThings from "@/common/improveMyselfThings.js";
import VueFixedHeader from "vue-fixed-header";
import jwtService from "../../services/jwt.service";
import Header from "../../components/header/header";

export default {
  components: {
    PreferenceTwo,
    PersonalInfoTwo,
    FamilyInfoTwo,
    UploadProfile,
    Review,
    Verification,
    VueFixedHeader,
    Header,
    ReviewAndPublishModal,
    VerificationAgreement,
  },
  mounted() {
    this.getCandidateInitialInfo();
  },
  data() {
    return {
      dialog: false,
      isLoading: false,
      showAgreement: false,
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
          title: "Family Information",
          content: "Last-content",
        },
        {
          title: "Image Upload",
          content: "Last-content",
        },
        {
          title: "Verification & Reference",
          content: "Last-content",
        },
        {
          title: "Review & Submit",
          content: "Last-content",
        },
      ],
      mobileSteps: [
        "Preference",
        "Personal Information",
        "Family Information",
        "Image Upload",
        "Verification & Reference",
        "Review & Submit",
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.dialog = true;
      });
    },
    cancel(e) {
      this.dialog = false;
    },
    async updateUserVerifyOrReject() {
      const data = {
        id: this.userData.id,
        status: "completed",
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          this.userData.status = "2";
          localStorage.setItem("user", JSON.stringify(this.userData));
        })
        .catch((error) => {});
    },
    updateFixedStatus(next) {
      this.fixedStatus.headerIsFixed = next;
    },
    cancelVerification(e) {
      this.showAgreement = false;
    },
    onStep(index) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (index <= user.data_input_status) {
        this.current = index;
        this.checkExistData();
      }
    },
    onAgree(value) {
      this.showAgreement = value;
      if (!this.showAgreement) {
        this.current++;
      } else {
        this.checkExistData();
      }
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
        case 2:
          this.candidateDetails.familyInformation = {
            ...e.value,
          };
        case 3:
          this.candidateDetails.imageModel = {
            ...e.value,
          };
          break;
        case 4:
          this.candidateDetails.verification = {
            ...this.representativeDetails.verification,
            ...e.value,
          };
          break;
      }
      this.checkExistData();
    },
    getCandidateInitialInfo: async function () {
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await ApiService.get("v1/candidate/initial-info");
      if (response.status === 200) {
        this.isLoading = false;
        const details = {
          countries: response.data.data.countries,
          imageModel: {
            ...response.data.data.candidate_image,
            additionalImageSrc:
              response.data.data.candidate_image.other_images.length > 0
                ? response.data.data.candidate_image.other_images[0].image_path
                : null,
          },
          occupations: response.data.data.occupations,
          religions: response.data.data.religions,
          ethnicities: ethnicities,
          languages: languages,
          improveMyselfThings: improveMyselfThings,
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
              per_have_children: false,
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
            pre_occupation:
              typeof response.data.data.user.preference.pre_occupation ==
              "string"
                ? JSON.parse(response.data.data.user.preference.pre_occupation)
                : "",
            pre_height_min:
              response.data.data.user.preference.pre_height_min == 0 ||
              !response.data.data.user.preference.pre_height_min
                ? undefined
                : response.data.data.user.preference.pre_height_min,
            pre_height_max:
              response.data.data.user.preference.pre_height_max == 0 ||
              !response.data.data.user.preference.pre_height_max
                ? undefined
                : response.data.data.user.preference.pre_height_max,

            pre_partner_age_max:
              response.data.data.user.preference.pre_partner_age_max == 0 ||
              !response.data.data.user.preference.pre_partner_age_max
                ? undefined
                : response.data.data.user.preference.pre_partner_age_max,
            pre_partner_age_min:
              response.data.data.user.preference.pre_partner_age_min == 0 ||
              !response.data.data.user.preference.pre_partner_age_min
                ? undefined
                : response.data.data.user.preference.pre_partner_age_min,

            pre_partner_religion_id:
              response.data.data.user.preference.pre_partner_religion_id.map(
                function (v) {
                  return parseInt(v, 10);
                }
              ),
            pre_ethnicities: !response.data.data.user.preference.pre_ethnicities
              ? undefined
              : response.data.data.user.preference.pre_ethnicities.split(","),
            pre_preferred_divorcee:
              response.data.data.user.preference.pre_preferred_divorcee == 0 ||
              !response.data.data.user.preference.pre_preferred_divorcee
                ? false
                : true,
            pre_preferred_divorcee_child:
              response.data.data.user.preference.pre_preferred_divorcee_child ==
                0 ||
              !response.data.data.user.preference.pre_preferred_divorcee_child
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
        this.showAgreement =
          user.status == "2" || user.status == "3" ? true : false;
        const {
          ver_country_id,
          ver_document_type,
          ver_image_back,
          ver_image_front,
        } = this.candidateDetails.verification;
        this.showAgreement = Object.values({
          ver_country_id,
          ver_document_type,
          ver_image_back,
          ver_image_front,
        }).every((x) => x !== undefined && x !== null && x !== "");
        if (!this.showAgreement && user.status == "1") {
          this.candidateDetails.verification = {
            ...this.candidateDetails.verification,
            ver_document_frontside: "",
            ver_document_backside: "",
          };
        }
        this.checkExistData();
      } else {
        this.isLoading = false;
      }
    },
    async saveDataInputStatus(satge) {
      const res = await ApiService.post(
        "v1/candidate/personal-info-status?_method=PATCH",
        {
          data_input_status: satge,
        }
      );
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.data_input_status = satge;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
      }
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
            pre_preferred_divorcee,
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
            pre_preferred_divorcee,
          }).every((x) => x !== undefined && x !== null && x !== "");
          break;
        case 1:
          let {
            per_about,
            per_currently_living_with,
            per_food_cuisine_like,
            per_have_children,
            per_hobbies_interests,
            per_language_speak,
            per_marital_status,
            per_smoker,
            per_thankfull_for,
            per_things_enjoy,
            per_willing_to_relocate,
          } = this.candidateDetails.personalInformation.more_about;
          let more_about = {
            per_about,
            per_currently_living_with,
            per_food_cuisine_like,
            per_have_children,
            per_hobbies_interests,
            per_language_speak,
            per_marital_status,
            per_smoker,
            per_thankfull_for,
            per_things_enjoy,
            per_willing_to_relocate,
          };

          let { essential, general, contact } =
            this.candidateDetails.personalInformation;

          Object.values({
            essential,
            general,
            contact,
            more_about,
          }).forEach((ob) => {
            isEnabled = Object.values(ob).every(
              (x) => x !== undefined && x !== null && x !== ""
            );
            if (!isEnabled) return;
          });

          break;

        case 2:
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
        case 3:
          const { avatar_image_url, main_image_url } =
            this.candidateDetails.imageModel;
          isEnabled = Object.values({ avatar_image_url, main_image_url }).every(
            (x) => x !== undefined && x !== null && x !== ""
          );
          break;
        case 4:
          const {
            ver_country_id,
            ver_document_type,
            ver_image_back,
            ver_image_front,
            // ver_recommences_address,
            // ver_recommences_first_name,
            // ver_recommences_last_name,
            // ver_recommences_mobile_no,
            // ver_recommences_occupation,
            // ver_recommences_title,
          } = this.candidateDetails.verification;
          isEnabled = this.showAgreement
            ? Object.values({
                ver_country_id,
                ver_document_type,
                ver_image_back,
                ver_image_front,
                // ver_recommences_address,
                // ver_recommences_first_name,
                // ver_recommences_last_name,
                // ver_recommences_mobile_no,
                // ver_recommences_occupation,
                // ver_recommences_title,
              }).every((x) => x !== undefined && x !== null && x !== "")
            : true;
          break;
      }

      this.enabledNextBtn = isEnabled;
    },

    nullToUndefined(object) {
      Object.keys(object).forEach(function (k) {
        if (object[k] === null || object[k] === 0) {
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
      this.updateUserVerifyOrReject();
    },
    continueToDashboard() {
      this.dialog = false;
      this.$router.push("/manageteam");
    },
    toggleStep(step) {
      this.current = step;
      this.checkExistData();
    },
    async updateUserVerifyOrReject() {
      let user = JSON.parse(localStorage.getItem("user"));
      const data = {
        id: user.id,
        status: "completed",
      };
      await this.$store
        .dispatch("updateUserVerifyOrReject", data)
        .then((data) => {
          user.status = "2";
          localStorage.setItem("user", JSON.stringify(user));
          this.$emit("valueChange", true);
        })
        .catch((error) => {});
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
      let user = JSON.parse(localStorage.getItem("user"));
      if (stage > user.data_input_status) {
        this.saveDataInputStatus(this.current);
      }
    },
    prev() {
      this.current--;
      this.checkExistData();
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
    h4 {
      font-size: 18px;
      @media (min-width: 992px) {
        font-size: 24px;
      }
    }
    h6 {
      font-size: 14px;
      @media (min-width: 992px) {
        font-size: 20px;
      }
    }
  }
}

.step-bar.vue-fixed-header--isFixed {
  position: fixed;
  top: 0px;
  z-index: 1000;
  width: 100%;
  padding: 0;
  background: #d4e0eb;
  border-radius: 14px;
  padding-bottom: 8px !important;
  margin-top: 20px;
}
.bottom-padding {
  padding: 0 2rem;
}
.mobile-step {
  background-color: #b7b7b7;
  border-radius: 20px;
  width: 20%;
  height: 20px;
}
.desktop-block {
  display: none;
}
.mobile-block {
  display: flex;
}
.mobile-header {
  display: block;
  padding: 10px 0;
}
.mobile-step-text {
  font-size: 18px;
}
@media (min-width: 768px) {
  .bottom-padding {
    padding: 1rem;
  }
  .desktop-block {
    display: flex;
  }
  .mobile-block {
    display: none;
  }
  .mobile-header {
    display: none;
  }
  .step-bar.vue-fixed-header--isFixed {
    // top: 15px;
    padding-top: 20px !important;
  }
}
@media (min-width: 992px) {
  .step-bar.vue-fixed-header--isFixed {
    width: 800px;
  }
}
.ma-steps {
  margin-top: 30px;
  @media (min-width: 992px) {
    margin-top: 0;
  }
}
.d-mb-none {
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
}
.next-btn-pos {
  margin-right: -16px;
  @media (min-width: 992px) {
    margin-right: 0;
  }
}
.first-next-btn-pos {
  margin-right: -16px;
}
.first-save-btn {
  margin-left: -15px;
}
.save-btn {
  margin-left: -16px;
  @media (min-width: 992px) {
    margin-left: 0;
  }
}
</style>
