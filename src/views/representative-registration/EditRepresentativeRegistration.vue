
<template>
  <div class="r-registration-container">
    <Header />
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else class="steps ma-steps">
      <div class="steper-header text-center heading-text px-3">
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
            class="desktop-block"
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
          <div class="mobile-header">
            <h4 class="mobile-step-text color-primary text-center fw-bold">
              {{ mobileSteps[current] }}
            </h4>
            <div class="mobile-block px-3">
              <div
                class="mobile-step"
                :class="{ 'bg-primary': current >= 0 }"
              ></div>
              <div
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 1 }"
              ></div>
              <!-- <div
                class="mobile-step ml-2"
                :class="{ 'bg-primary': current >= 2 }"
              ></div> -->
            </div>
          </div>
        </div>
      </VueFixedHeader>

      <div class="text-center mt-5" v-if="current == 0">
        <h5 class="color-brand fs-20">Personal Information</h5>
        <p class="color-brand fs-18">Details about you</p>
      </div>

      <!-- <div class="text-center mt-5" v-if="current == 1">
        <h5 class="color-brand fs-20">Verification Information</h5>
        <p class="color-brand fs-18">Details about you</p>
      </div> -->

      <div class="text-center mt-5" v-if="current == 1">
        <h5 class="color-brand fs-20">Image Upload</h5>
        <p class="color-brand fs-18">Details about you</p>
      </div>

      <div class="steps-content px-2" v-if="current == 0">
        <PersonalInfoTwo
          :representativeDetails="representativeDetails"
          :personalInformation="representativeDetails.personalInformation"
          ref="personInfoRefTwo"
        />
      </div>
      <!-- <div class="steps-content px-2" v-if="current == 1">
        <Verification
          :representativeDetails="representativeDetails"
          :verification="representativeDetails.verification"
          ref="VerificationRef"
        />
      </div> -->
      <div class="steps-content px-2" v-if="current == 1">
        <ImageUpload
          :imageModel="representativeDetails.imageModel"
          ref="imageUploadRef"
        />
      </div>

      <div class="steps-action text-right pb-5 clearfix bottom-padding">
        <a-button
          v-if="current < steps.length - 1"
          shape="round"
          type="primary"
          :style="{ marginRight: current == 0 ? '-15px' : '-5px' }"
          class="mt-3"
          @click="next"
        >
          Next
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
       
          shape="round"
          type="primary"
          style="float: left; margin-left: -15px"
          class="mt-3"
          @click="saveExit"
        >
          Save & Back
        </a-button>
      </div>
      <br><br><br><br><br>
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

import PersonalInfoTwo from "@/components/representative-registration/personal-info-two.vue";
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
    PersonalInfoTwo,
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
      isLoading: false,
      propsData: { ...createData() },
      current: 0,
      representativeDetails: {
        images: {},
      },
      steps: [
        {
          title: "Personal Info",
        },
        // {
        //   title: "Verification",
        // },
        {
          title: "Image Upload",
        },
      ],
      mobileSteps: ["Personal Info", "Verification", "Image Upload"],

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
      this.isLoading = true;
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user", user);
      const response = await this.$store.dispatch("getRepresentativeData");
      if (response.status === 200) {
        this.isLoading = false;
        const details = {
          countries: response.data.data.countries,
          occupations: response.data.data.occupations,
          id: user.id,
          imageModel: {
            ...response.data.data.image_upload,
            only_team_can_see:
              response.data.data.image_upload.only_team_can_see == 0
                ? true
                : false,
            team_connection_can_see:
              response.data.data.image_upload.team_connection_can_seee == 0
                ? true
                : false,
            anybody_can_see:
              response.data.data.image_upload.anybody_can_seee == 0
                ? true
                : false,
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
        // if (
        //   this.representativeDetails.personalInformation &&
        //   this.representativeDetails.personalInformation.personal
        //     .per_current_residence_country > 0
        // ) {
        //   this.onChangeCountry(
        //     {
        //       id: this.representativeDetails.personalInformation.personal
        //         .per_current_residence_country,
        //     },
        //     "residence"
        //   );
        // }
        // if (
        //   this.representativeDetails.personalInformation &&
        //   this.representativeDetails.personalInformation.personal
        //     .per_permanent_country > 0
        // ) {
        //   this.onChangeCountry(
        //     {
        //       id: this.representativeDetails.personalInformation.personal
        //         .per_permanent_country,
        //     },
        //     "permanat"
        //   );
        // }
        // if (
        //   this.representativeDetails.verification &&
        //   this.representativeDetails.verification.ver_country > 0
        // ) {
        //   this.onChangeCountry(
        //     { id: this.representativeDetails.verification.ver_country },
        //     "verification"
        //   );
        // }
        // this.current = response.data.data.user.data_input_status;
      } else {
        this.isLoading = false;
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
      this.$router.push("/profile");
    },
    doneBtn() {
      this.$router.push("/manageteam");
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
        // case 3: {
        //   this.current++;
        //   break;
        // }

        default: {
          this.current = 0;
        }
      }
      //   this.saveDataInputStatus(this.current);
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
          this.$router.push("/manageteam");
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
  justify-content: center;
  align-items: center;
  .steps-content {
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
    margin-top: 30px;
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
  position: fixed;
  top: 10px;
  z-index: 1000;
  width: 100%;
  padding: 0;
  background: #d4e0eb;
  border-radius: 14px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 8px !important;
  @media (min-width: 992px) {
    width: 800px;
  }
}
.bottom-padding {
  padding: 0 2rem;
}
.mobile-step {
  background-color: #b7b7b7;
  border-radius: 20px;
  width: 25%;
  height: 20px;
}
.desktop-block {
  display: none;
}
.mobile-block {
  display: flex;
  //justify-content: center;
}
.mobile-header {
  display: block;
  padding: 10px 0;
}
.mobile-step-text {
  font-size: 18px;
}
.bottom-padding {
  padding: 0 1.5rem;
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
    top: 15px;
    padding-top: 20px !important;
  }
}
@media (min-width: 992px) {
  .step-bar.vue-fixed-header--isFixed {
    width: 800px;
  }
}
</style>
