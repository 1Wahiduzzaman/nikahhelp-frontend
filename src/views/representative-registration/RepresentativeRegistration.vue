
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
      netCalling: true,
      loading: false,
      disabled: true,
      activeKey: 1,
      uploadInfoForFront: null,
      uploadInfoForBack: null,
      saveButtonOne: true,
      saveButtonTwo: true,
      saveButtonThree: false,
      saveButtonFour: false,
      activePanel: 1,
      imageUrlFront: "",
      imageUrlBack: "",
      agreementChecked: false,

      repData: undefined,
      dataLoading: false,
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
            ...response.data.data.representative_info.image_upload,
          },
          verification: {
            ...response.data.data.representative_info.verification,
          },
          personalInformation: {
            essential: {
              ...response.data.data.representative_info.essential,
              default_date:
                response.data.data.representative_info.essential.dob,
            },
            personal: {
              ...response.data.data.representative_info.personal,
              residenceCities:[],
              permanantCities:[],
              email: user.email,
              per_current_residence_country: response.data.data
                .representative_info.personal.per_current_residence_country
                ? parseInt(
                    response.data.data.representative_info.personal
                      .per_current_residence_country
                  )
                : response.data.data.representative_info.personal
                    .per_current_residence_country,
              per_permanent_country: response.data.data.representative_info
                .personal.per_permanent_country
                ? parseInt(
                    response.data.data.representative_info.personal
                      .per_permanent_country
                  )
                : response.data.data.representative_info.personal
                    .per_permanent_country,
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
      this.checkExistData();
    },
    prev() {
      this.current--;
      this.checkExistData();
    },
    async getPercentage() {
      this.netCalling = true;
      // console.log(this.netCalling);
      this.$store.dispatch("profilePercentage").then((data) => {
        this.netCalling = false;
        // console.log(this.netCalling);
      });
    },
    setActiveKey(e) {
      console.log(e);
      this.activeKey = e;
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    prevClick() {
      // if(this.current == 0){
      // 	this.disabled = true;
      // }
      if (this.current == 1) {
        this.saveButtonOne = true;
        this.saveButtonTwo = true;
        this.saveButtonThree = false;
        this.saveButtonFour = false;
        this.activePanel = 1;
        this.activeKey = 1;
        this.prev();
      }
      if (this.current == 2) {
        this.saveButtonOne = false;
        this.saveButtonTwo = false;
        this.saveButtonThree = true;
        this.saveButtonFour = false;
        this.prev();
      }
      if (this.current == 3) {
        this.saveButtonOne = false;
        this.saveButtonTwo = false;
        this.saveButtonThree = false;
        this.saveButtonFour = true;
        this.prev();
      }
      if (this.current > 3) {
        this.prev();
      }
    },
    handleChangeFromProp(info, name) {
      // console.log(info)
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   this.$message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   this.$message.error(`${info.file.name} file upload failed.`);
      // }
      if (info.file.status !== "uploading") {
        // console.log(name);
        // console.log(info.fileList[0]);
        if (name == "front") {
          this.uploadInfoForFront = info.fileList[0].originFileObj;
          this.getBase64(info.file.originFileObj, (imageUrl) => {
            this.imageUrlFront = imageUrl;
          });
        }
        if (name == "back") {
          this.uploadInfoForBack = info.fileList[0].originFileObj;
          this.getBase64(info.file.originFileObj, (imageUrl) => {
            this.imageUrlBack = imageUrl;
          });
        }
      }
    },
    validateOnclickSubmit1(payload) {
      let validations = [];

      // payload do not contains dob, so taking directly
      let representativeDataObjectRef = this.$refs.personInfoRef;
      let dob = representativeDataObjectRef["_data"].dobFromDatePicker;

      if (payload.gender != "Male" && payload.gender != "Female") {
        validations.push({
          message: "Gender not Selected",
        });
      }
      if (payload.occupation.length == 0) {
        validations.push({
          message: "Occupation not Selected",
        });
      }
      if (dob) {
        var q = new Date();
        var m = q.getMonth() + 1;
        var d = q.getDay();
        var y = q.getFullYear();

        var date = new Date(y, m, d);

        let mydate = new Date(dob);

        console.log(date);
        console.log(mydate);
        if (mydate > date) {
          validations.push({
            message: "Your given date is greater than today",
          });
        }
      }
      if (!dob) {
        validations.push({
          message: "No date of birth selected",
        });
      }

      return validations;
    },
    onClickSubmit1() {
      this.loading = true;
      let representativeDataObjectRef = this.$refs.personInfoRef;
      let formData = representativeDataObjectRef["_data"]["representativeInfo"];
      let validation = this.validateOnclickSubmit1(formData);
      if (validation.length > 0) {
        validation.forEach((v) => {
          this.$message.error(`${v.message}`);
        });
        this.loading = false;
        return;
      }
      let payload = {
        per_gender: formData.gender,
        // dob: formData.dob,
        dob: representativeDataObjectRef["_data"].dobFromDatePicker,
        per_occupation: formData.occupation,
        per_occupation_other: formData.occupationOther,
      };
      this.$store
        .dispatch("createPersonalInfoForRepresentative", payload)
        .then((data) => {
          if (data.data.status && data.data.status !== "FAIL") {
            console.log("Data saved to DB");
            // console.log(data);
            this.saveButtonOne = false;
            this.saveButtonTwo = true;
            this.activePanel++;
            this.activeKey++;
            this.loading = false;
            this.getPercentage();
            // window.scrollTo(0, 0);
          }
          if (data.data.status && data.data.status == "FAIL") {
            console.log(data);
            this.$message.error(data.data.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error(error.toString());
          this.loading = false;
        });
    },
    validateOnClickSubmit2(payload) {
      console.log(payload);
      let validations = [];
      // if (payload.per_email.length > 0) {
      //   if (!validator.isEmail(payload.per_email)) {
      //     validations.push({
      //       message: 'Please provide a Valid Email Address',
      //     });
      //   }
      // } else {
      //   validations.push({
      //     message: 'Email Field is empty',
      //   });
      // }

      if (!payload.per_current_residence_country) {
        validations.push({
          message: "Please provide a Country",
        });
      }

      if (!payload.per_current_residence_city) {
        validations.push({
          message: "Please provide a City",
        });
      }

      if (!payload.per_telephone_no || payload.per_telephone_no.length == 0) {
        validations.push({
          message: "Please provide a Phone Number",
        });
      }

      // if (payload.per_telephone_no.length == 14) {
      //   if (
      //     !validator.isMobilePhone(
      //       payload.per_telephone_no,
      //       "any",
      //       "strictMode"
      //     )
      //   ) {
      //     validations.push({
      //       message: "Please provide a Valid Phone Number",
      //     });
      //   }
      // } else if (payload.per_telephone_no.length == 0) {
      //   validations.push({
      //     message: "Please provide a Phone Number",
      //   });
      // } else {
      //   validations.push({
      //     message: "Please provide a complete Phone Number",
      //   });
      // }

      if (!payload.per_permanent_post_code) {
        validations.push({
          message: "Please provide a Post Code",
        });
      } else if (
        !validator.isPostalCode(payload.per_permanent_post_code, "any")
      ) {
        validations.push({
          message: "Please provide a Valid Post Code",
        });
      }

      if (payload.per_permanent_address.length == 0) {
        validations.push({
          message: "Please provide a Home Address",
        });
      } else if (payload.per_permanent_address.length < 10) {
        validations.push({
          message: `Address can't be that small`,
        });
      }

      return validations;
    },
    onClickSubmit2() {
      this.loading = true;
      let representativeDataObjectRef = this.$refs.personInfoRef;
      let formData = representativeDataObjectRef["_data"];
      let payload = {
        per_email: this.$store.state.user.user.email,
        per_current_residence_country: formData.representativeResidence.country,
        per_current_residence_city: formData.representativeResidence.city,
        per_permanent_country: formData.representativePermanentAddress.country,
        per_permanent_city: formData.representativePermanentAddress.city,
        per_county: "Bangladesh",
        per_telephone_no: formData.phoneNumber,
        mobile_number: "01700000001",
        mobile_country_code: "+88",
        per_permanent_post_code:
          formData.representativePermanentAddress.postCode,
        per_permanent_address:
          formData.representativePermanentAddress.homeAddress,
      };

      let validation = this.validateOnClickSubmit2(payload);
      if (validation.length > 0) {
        validation.forEach((v) => {
          this.$message.error(`${v.message}`);
        });
        this.loading = false;
        return;
      }
      // let payload = new FormData();
      // payload.append("per_email", formData.emailAddress);
      // payload.append("per_current_residence_country", formData.representativeResidence.country)
      // payload.append("per_current_residence_city", formData.representativeResidence.city)
      // payload.append("per_permanent_country", formData.representativePermanentAddress.country)
      // payload.append("per_permanent_city", formData.representativePermanentAddress.city)
      // payload.append("per_county", 'Bangladesh')
      // payload.append("per_telephone_no", formData.phoneNumber)
      // payload.append("mobile_number", '01700000001')
      // payload.append("mobile_country_code", '+88')
      // payload.append("per_permanent_post_code", formData.representativePermanentAddress.postCode)
      // payload.append("per_permanent_address", formData.representativePermanentAddress.homeAddress)

      this.$store
        .dispatch("creatContactInfoForRepresentative", payload)
        .then((data) => {
          if (data.data.status && data.data.status !== "FAIL") {
            console.log("Data saved to DB");
            this.saveButtonTwo = false;
            this.saveButtonThree = true;
            this.next();
            this.loading = false;
            this.activePanel--;
            window.scrollTo(0, 0);
            this.getPercentage();
          }
          if (data.data.status && data.data.status == "FAIL") {
            console.log(data.data.message);
            this.$message.error(data.data.message);
            console.log(data);
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.$message.error(error.response);
          this.loading = false;
        });
    },
    validateOnClickSubmit3(payload) {
      let validations = [];
      if (payload.ver_country.length == 0) {
        validations.push({
          message: "Please provide a Country",
        });
      }
      if (payload.ver_city.length == 0) {
        validations.push({
          message: "Please provide a City",
        });
      }

      if (payload.ver_document_frontside == null && this.imageUrlFront == "") {
        validations.push({
          message: "Please provide a Front Picture of Document",
        });
      }
      if (payload.ver_document_backside == null && this.imageUrlBack == "") {
        validations.push({
          message: "Please provide a Back Picture of Document",
        });
      }

      if (payload.ver_document_type == undefined) {
        validations.push({
          message: "Please provide a Document Type",
        });
      }

      if (payload.ver_recommender_title.length == 0) {
        validations.push({
          message: "Please provide a Recommender Title",
        });
      }
      if (payload.ver_recommender_first_name.length == 0) {
        validations.push({
          message: "Please provide a Recommender First Name",
        });
      }
      if (payload.ver_recommender_last_name.length == 0) {
        validations.push({
          message: "Please provide a Recommender Last Name",
        });
      }

      if (payload.ver_recommender_occupation.length == 0) {
        validations.push({
          message: "Please provide a Recommender Occupation",
        });
      }

      if (payload.ver_recommender_address.length == 0) {
        validations.push({
          message: "Please provide a Recommender Address",
        });
      }
      if (
        payload.ver_recommender_mobile_no == null ||
        payload.ver_recommender_mobile_no.length == 0
      ) {
        validations.push({
          message: "Please provide a Recommender Mobile Number",
        });
      }
      return validations;
    },
    onClickSubmit3() {
      this.loading = true;

      let formData = this.$refs.verificationInfoRef["_data"];
      // let representativeDataObjectRef = this.$refs.verificationInfoRef;
      // let formData = representativeDataObjectRef['_data'];
      if (!formData.is_document_upload) {
        this.saveButtonThree = false;
        this.saveButtonFour = true;
        this.loading = false;
        window.scrollTo(0, 0);

        this.next();
        return;
      }
      let payloadForValidation = {
        is_document_upload: formData.is_document_upload,
        ver_country: formData.ver_country,
        ver_city: formData.ver_city,
        ver_document_frontside: formData.frontPage,
        ver_document_backside: formData.backPage,
        ver_document_type: formData.ver_document_type,
        ver_recommender_title: formData.ver_recommender_title,
        ver_recommender_first_name: formData.ver_recommender_first_name,
        ver_recommender_last_name: formData.ver_recommender_last_name,
        ver_recommender_occupation: formData.ver_recommender_occupation,
        ver_recommender_address: formData.ver_recommender_address,
        ver_recommender_mobile_no: formData.ver_recommender_mobile_no,
      };

      let validation = this.validateOnClickSubmit3(payloadForValidation);
      if (validation.length > 0) {
        validation.forEach((v) => {
          this.$message.error(`${v.message}`);
        });
        this.loading = false;
        return;
      }

      let payload = new FormData();
      if (formData.frontPage && formData.backPage) {
        payload.append(
          "is_document_upload",
          formData.is_document_upload == true ? 1 : 0
        );
        payload.append("ver_country", formData.ver_country);
        payload.append("ver_city", formData.ver_city);
        payload.append("ver_document_type", formData.ver_document_type);
        payload.append("ver_document_frontside", formData.frontPage);
        payload.append("ver_document_backside", formData.backPage);
        payload.append("ver_recommender_title", formData.ver_recommender_title);
        payload.append(
          "ver_recommender_first_name",
          formData.ver_recommender_first_name
        );
        payload.append(
          "ver_recommender_last_name",
          formData.ver_recommender_last_name
        );
        payload.append(
          "ver_recommender_occupation",
          formData.ver_recommender_occupation
        );
        payload.append(
          "ver_recommender_address",
          formData.ver_recommender_address
        );
        payload.append(
          "ver_recommender_mobile_no",
          formData.ver_recommender_mobile_no
        );
      } else {
        payload.append(
          "is_document_upload",
          formData.is_document_upload == true ? 1 : 0
        );
        payload.append("ver_country", formData.ver_country);
        payload.append("ver_city", formData.ver_city);

        payload.append("ver_document_type", formData.ver_document_type);

        payload.append("ver_recommender_title", formData.ver_recommender_title);
        payload.append(
          "ver_recommender_first_name",
          formData.ver_recommender_first_name
        );
        payload.append(
          "ver_recommender_last_name",
          formData.ver_recommender_last_name
        );
        payload.append(
          "ver_recommender_occupation",
          formData.ver_recommender_occupation
        );
        payload.append(
          "ver_recommender_address",
          formData.ver_recommender_address
        );
        payload.append(
          "ver_recommender_mobile_no",
          formData.ver_recommender_mobile_no
        );
      }
      console.log(payload);

      this.$store
        .dispatch("createVerificationInformationRepresentative", payload)
        .then((data) => {
          if (data.data.status && data.data.status !== "FAIL") {
            console.log("Data saved to DB", data.data);
            this.saveButtonThree = false;
            this.saveButtonFour = true;
            this.loading = false;
            window.scrollTo(0, 0);

            this.next();
          }
          if (data.data.status && data.data.status == "FAIL") {
            this.$message.error("Something went Wrong");
            console.log(data);
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error.response.data.message);

          console.log(error);
        });
    },

    async onClickSubmit4() {
      this.loading = true;

      if (
        !this.$refs.imageUploadRef["_data"].avatarSrc.length ||
        !this.$refs.imageUploadRef["_data"].mainImageSrc.length
      ) {
        if (
          this.$refs.imageUploadRef["_data"].avatar.length == 0 ||
          this.$refs.imageUploadRef["_data"].mainImage.length == 0
        ) {
          this.$message.error("Please Upload Avatar and Profile Picture Both");
          this.loading = false;
          return;
        }
      }

      console.log("A click from Save Button 4");

      await this.$refs.imageUploadRef
        .saveImages()
        .then((response) => {
          console.log(response);
          if (response.data.status_code == 200) {
            this.loading = false;
            this.saveButtonFour = false;
            window.scrollTo(0, 0);

            this.getPercentage();
            this.next();
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.$message.error(error.toString());
        });
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
  .steps-content{
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
