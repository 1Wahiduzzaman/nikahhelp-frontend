
<template>
  <div class="r-registration-container">
    <Header />
    <div class="r-registration my-4">
      <div class="steps ma-steps">
        <div class="steper-header text-center heading-text">
          <h4>REPRESENTATIVE PROFILE FORM</h4>
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
            <a-steps
              :current="current"
              style="max-width: 100%"
              labelPlacement="vertical"
            >
              <a-step
                v-for="item in steps"
                :key="item.title"
                :title="item.title"
              />
            </a-steps>
          </div>
        </VueFixedHeader>

        <div class="text-center" v-if="current == 0">
          <h5 style="color: #e34184">Personal Information</h5>
          <p style="color: #e34184; font-size: 14px">Details about you</p>
        </div>

        <div class="text-center" v-if="current == 1">
          <h5 style="color: #e34184">Verification Information</h5>
          <p style="color: #e34184; font-size: 14px">Details about you</p>
        </div>

        <div class="text-center" v-if="current == 2">
          <h5 style="color: #e34184">Image Upload</h5>
          <p style="color: #e34184; font-size: 14px">Details about you</p>
        </div>

        <div class="text-center" v-if="current == 3">
          <h5 style="color: #e34184">Agree & Submit</h5>
          <p style="color: #e34184; font-size: 14px">Details about you</p>
        </div>

        <div class="steps-content" v-if="current == 0">
          <PersonalInfoTwo
            :representativeDetails="representativeDetails"
            :personalInformation="representativeDetails.personalInformation"
            ref="personInfoRefTwo"
          />
        </div>
        <div class="steps-content" v-if="current == 1">
          <!-- <VerificationInfo
           
            ref="verificationInfoRef"
            :handleChangeFromProp="handleChangeFromProp"
            :imageUrlFront="imageUrlFront"
            :imageUrlBack="imageUrlBack"
          /> -->
          <Verification
            :representativeDetails="representativeDetails"
            :verification="representativeDetails.verification"
            ref="VerificationRef"
          />
        </div>
        <div class="steps-content" v-if="current == 2">
          <!-- <ImageUpload
            v-on:images-uploaded="next"
            ref="imageUploadRef"
            :repData="repData"
          /> -->
          <ImageUpload
            :imageModel="representativeDetails.imageModel"
            ref="imageUploadRef"
          />
        </div>
        <div class="steps-content" v-if="current == 3">
          <!-- <AgreementSubmit
            v-on:checked="agreementChecked = $event"
            :repData="repData"
          /> -->
          <AgreementSubmit />
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
            Save & Exit
          </a-button>
        </div>
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
import PersonalInfo from "@/components/representative-registration/PersonalInfo.vue";
import PersonalInfoTwo from "@/components/representative-registration/personal-info-two.vue";
import VerificationInfo from "@/components/representative-registration/VerificationInfo.vue";
import Verification from "@/components/representative-registration/verification.vue";
import ImageUpload from "@/components/representative-registration/ImageUpload.vue";
import AgreementSubmit from "@/components/representative-registration/AgreementSubmit.vue";
import ApiService from "../../services/api.service";
import Header from "../../components/header/header";

import { API_URL } from "../../configs/config";
import VueFixedHeader from "vue-fixed-header";
import validator from "validator";
export default {
  name: "RepresentativeRegistration",

  components: {
    PersonalInfo,
    PersonalInfoTwo,
    VerificationInfo,
    Verification,
    ImageUpload,
    AgreementSubmit,
    Header,
    VueFixedHeader,
  },

  data() {
    return {
      fixedStatus: {
        headerIsFixed: false,
      },
      propsData: { ...createData() },
      current: 0,
      representativeDetails: {
        images: {},
      },
      steps: [
        {
          title: "Personal Info",
        },
        {
          title: "Verification",
        },
        {
          title: "Image Upload",
        },
        {
          title: "Agree & Submit",
        },
      ],

      activeKey: 1,

      agreementChecked: false,
    };
  },
  created() {},
  mounted() {
    this.getRepresentativeInitialInfo();
  },
  methods: {
    updateFixedStatus(next) {
      this.fixedStatus.headerIsFixed = next;
    },
    getRepresentativeInitialInfo: async function () {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user", user);
      const response = await this.$store.dispatch("getRepresentativeData");
      if (response.status === 200) {
        const details = {
          countries: response.data.data.countries,
          occupations: response.data.data.occupations,
          id: user.id,
          imageModel: {
            ...response.data.data.image_upload,
          },
          verification: {
            ...response.data.data.verification,
            ver_country: response.data.data.verification.ver_country
              ? parseInt(response.data.data.verification.ver_country)
              : response.data.data.verification.ver_country,
          },
          personalInformation: {
            essential: {
              ...response.data.data.essential,
              default_date: response.data.data.essential.dob,
            },
            personal: {
              ...response.data.data.personal,
              residenceCities: [],
              permanantCities: [],
              email: user.email,
              per_current_residence_country: response.data.data.personal
                .per_current_residence_country
                ? parseInt(
                    response.data.data.personal.per_current_residence_country
                  )
                : response.data.data.personal.per_current_residence_country,
              per_permanent_country: response.data.data.personal
                .per_permanent_country
                ? parseInt(response.data.data.personal.per_permanent_country)
                : response.data.data.personal.per_permanent_country,
            },
          },
        };
        console.log("details", details);
        this.representativeDetails = {
          ...details,
        };
        if (
          this.representativeDetails.personalInformation &&
          this.representativeDetails.personalInformation.personal
            .per_current_residence_country > 0
        ) {
          this.onChangeCountry(
            {
              id: this.representativeDetails.personalInformation.personal
                .per_current_residence_country,
            },
            "residence"
          );
        }
        if (
          this.representativeDetails.personalInformation &&
          this.representativeDetails.personalInformation.personal
            .per_permanent_country > 0
        ) {
          this.onChangeCountry(
            {
              id: this.representativeDetails.personalInformation.personal
                .per_permanent_country,
            },
            "permanat"
          );
        }
        if (
          this.representativeDetails.verification &&
          this.representativeDetails.verification.ver_country > 0
        ) {
          this.onChangeCountry(
            { id: this.representativeDetails.verification.ver_country },
            "verification"
          );
        }
        // this.current = response.data.data.user.data_input_status;
      }
    },
    async onChangeCountry(e, name) {
      const res = await ApiService.get(`v1/utilities/cities/${e.id}`);

      if (res.status === 200) {
        switch (name) {
          case "residence":
            this.representativeDetails.personalInformation.personal.residenceCities.push(
              ...res.data.data
            );
            break;
          case "permanat":
            this.representativeDetails.personalInformation.personal.permanantCities.push(
              ...res.data.data
            );
            break;
          case "verification":
            this.representativeDetails.verification.cities.push(
              ...res.data.data
            );
            break;
        }
      }
    },
    saveExit() {
      jwtService.destroyTokenAndUser();
      this.$router.push("/login");
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

        default: {
          this.current = 0;
        }
      }
      this.saveDataInputStatus(this.current);
    },
    prev() {
      this.current--;
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

    onDoneClick() {
      this.loading = true;
      console.log(this.agreementChecked);
      if (this.agreementChecked == false) {
        this.loading = false;
        this.$message.error(
          "Terms and Conditions are not Checked, Please agree with them to proceed"
        );
        return;
      }
      ApiService.post("v1/representative/final/submit", {
        is_agree: this.agreementChecked,
      })
        .then((data) => {
          console.log(data);
          this.loading = false;
          this.getPercentage();
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error);
          console.log(error);
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.r-registration-container {
  display: flex;
  flex-direction: column;
  .steps-content {
    padding: 0px;
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
    width: 100%;
    h4,
    h6 {
      font-weight: bold;
      color: $color-brand;
    }
  }

  .r-registration {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .step-bar {
      margin: 0;
      padding: 0;
      z-index: 9;
    }
  }
}

.step-bar.vue-fixed-header--isFixed {
  height: 120px;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 800px;
  padding: 0;
  background: aliceblue;
}
</style>
