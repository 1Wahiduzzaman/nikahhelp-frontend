<template>
  <div id="accordion" class="verificationInfo p-3 rounded">
    <div class="verification-content" style="margin-top: 40px">
      <div class="section-heading heading-text">
        <h5>Verification Information</h5>
        <p>Your Verification Information</p>
      </div>
      <a-collapse
        default-active-key="1"
        @change="changeActivekey"
        :activeKey="activeKey"
        :bordered="false"
        expand-icon-position="right"
      >
        <template #expandIcon="props">
          <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
        </template>
        <a-collapse-panel key="1" header="1. Essential Information">
          <a-form-model
            v-if="verification"
            ref="verification"
            :model="verification"
            :rules="rules"
            class="form-ma"
          >
            <div class="row">
              <div class="col-12 border-bottom pb-3">
                <div class="verification-header mt-2">
                  <p class="instruction-title">
                    To keep your account safe, we need to verify your identity.
                    This is a legal requirement that help us to keep your
                    account secure.
                  </p>
                  <p class="instruction-title">
                    We accept photo/scans of a driving license, passport,
                    national ID card or residence permit issued in European
                    Economic Are (EEA)
                  </p>

                  <p class="instruction-title">
                    Follow these tips to make sure your document is accepted:
                  </p>
                  <ul>
                    <li class="flex-start-center">
                      <img
                        src="@/assets/Icons/tick 2.svg"
                        alt="icon"
                        id="checkIcon"
                      />
                      Submit a valid, current photo ID with an expiry date
                    </li>
                    <li class="flex-start-center mt-2">
                      <img
                        src="@/assets/Icons/tick 2.svg"
                        alt="icon"
                        id="checkIcon"
                      />
                      Show the full document (all four corners should be
                      visible)
                    </li>
                    <li class="flex-start-center mt-2">
                      <img
                        src="@/assets/Icons/tick 2.svg"
                        alt="icon"
                        id="checkIcon"
                      />
                      Use a colour image that a is clear and easy to read
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!--Country-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_country_id"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Country
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <a-form-model-item
                      ref="ver_country_id"
                      prop="ver_country_id"
                    >
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        @input="onChangeCountry"
                        id="ver_country_id"
                        placeholder="Country"
                        v-model="verification.ver_country_id"
                        label="name"
                        :reduce="(option) => option.id"
                        :options="candidateDetails.countries"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select>
                      <!-- <a-select
                        id="ver_country"
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="verification.ver_country"
                        class="select-ma w-100"
                        placeholder="Country"
                        ref="select"
                        @change="onChangeCountry"
                      >
                        <a-select-option
                          v-for="(
                            _country, key
                          ) in candidateDetails.countries"
                          :value="_country.id"
                          :key="key"
                        >
                          {{ _country.name }}
                        </a-select-option>
                      </a-select> -->
                    </a-form-model-item>
                  </div>
                  <div class="col-12 col-md-6 mobile-margin">
                    <a-form-model-item ref="ver_city_id" prop="ver_city_id">
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        id="ver_city_id"
                        placeholder="City"
                        :reduce="(option) => option.id"
                        v-model="verification.ver_city_id"
                        label="name"
                        :options="verification.cities"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select>
                      <!-- <a-select
                        id="ver_city"
                        :showSearch="true"
                        option-filter-prop="children"
                        :filter-option="filterOption"
                        :showArrow="true"
                        v-model="verification.ver_city"
                        class="select-ma w-100"
                        placeholder="City"
                        @change="onValueChange"
                      >
                        <a-select-option
                          v-for="(_city, key) in verification.cities"
                          :value="_city.id"
                          :key="key"
                        >
                          {{ _city.name }}
                        </a-select-option>
                      </a-select> -->
                    </a-form-model-item>
                  </div>
                </div>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_country_id"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span
                      v-if="arr[0].first"
                      @click="arr[0].first = !arr[0].first"
                    >
                      Need Help?
                    </span>
                    <span v-else @click="arr[0].first = !arr[0].first">
                      Hide Help?
                    </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_country_id"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!--Document type-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_document_type"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Document type?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <v-select
                  :clearable="false"
                  class="style-chooser"
                  id="ver_document_type"
                  placeholder="Document type"
                  :reduce="(option) => option.value"
                  v-model="verification.ver_document_type"
                  label="name"
                  :options="[
                    { name: 'Passport', value: 'Passport' },
                    { name: 'Nation ID', value: 'Nation ID' },
                  ]"
                  ><template #open-indicator> <a-icon type="down" /> </template
                ></v-select>
              </div>
              <div class="col-12 none-padding mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_document_type"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span
                      v-if="arr[1].first"
                      @click="arr[1].first = !arr[1].first"
                    >
                      Need Help?
                    </span>
                    <span v-else @click="arr[1].first = !arr[1].first">
                      Hide Help?
                    </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_document_type"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!--Document front side-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_image_front"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Upload front side?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2"
                    >The format supported are JPEG, PNG, PDF. Maximum file size
                    2 mb</span
                  >

                  <div class="img-preview mb-2">
                    <span
                      @click="clearImg('font')"
                      class="close-icon"
                      v-if="verification.ver_image_front"
                      ><img src="@/assets/icon/close.svg" alt="img"
                    /></span>
                    <img
                      v-viewer
                      :src="
                        imageFont ? imageFont : verification.ver_image_front
                      "
                      width="180"
                      height="200"
                      v-if="verification.ver_image_front"
                    />
                    <div class="mt-3">Front Page</div>
                    <div class="mt-4" v-if="!verification.ver_image_front">
                      <a-icon
                        type="plus-circle"
                        :style="{ fontSize: '80px', color: '#aaa' }"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    class="input-image"
                    name="avatar"
                    @change="getFrontPage"
                  />
                </div>
              </div>
              <div
                class="col-12 col-md-6 none-padding mobile-margin mobile-help"
              >
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_image_front"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span
                      v-if="arr[2].first"
                      @click="arr[2].first = !arr[2].first"
                    >
                      Need Help?
                    </span>
                    <span v-else @click="arr[2].first = !arr[2].first">
                      Hide Help?
                    </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_image_front"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!--Document back side-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="verification.ver_image_back"
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Upload back side?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2"
                    >The format supported are JPEG, PNG, PDF. Maximum file size
                    2 mb</span
                  >

                  <div class="img-preview mb-2">
                    <span
                      @click="clearImg('back')"
                      class="close-icon"
                      v-if="verification.ver_image_back"
                      ><img src="@/assets/icon/close.svg" alt="img"
                    /></span>
                    <img
                      v-viewer
                      :src="imageBack ? imageBack : verification.ver_image_back"
                      width="180"
                      height="200"
                      v-if="verification.ver_image_back"
                    />

                    <div class="mt-3">Back Page</div>
                    <div class="mt-4" v-if="!verification.ver_image_back">
                      <a-icon
                        type="plus-circle"
                        :style="{ fontSize: '80px', color: '#aaa' }"
                      />
                    </div>
                  </div>
                  <input
                    type="file"
                    class="input-image"
                    name="avatar"
                    @change="getBackPage"
                  />
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin mobile-help">
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_image_back"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span
                      v-if="arr[3].first"
                      @click="arr[3].first = !arr[3].first"
                    >
                      Need Help?
                    </span>
                    <span v-else @click="arr[3].first = !arr[3].first">
                      Hide Help?
                    </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_image_back"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>

            <!--Community standing-->
            <div class="row pt-3 border-bottom">
              <div class="col-12 col-md-6 none-padding">
                <div class="mb-2 font-weight-bold">
                  <a-icon
                    v-if="
                      verification.ver_recommences_title &&
                      verification.ver_recommences_first_name &&
                      verification.ver_recommences_last_name &&
                      verification.ver_recommences_occupation &&
                      verification.ver_recommences_address &&
                      verification.ver_recommences_mobile_no
                    "
                    class="color-success mr-2 fs-18 fw-500"
                    type="check"
                  />Person of community standing who know you?
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <a-form-model-item
                  ref="ver_recommences_title"
                  prop="ver_recommences_title"
                >
                  <a-input
                    :maxLength="10"
                    v-model="verification.ver_recommences_title"
                    class="w-100"
                    placeholder="Title"
                  />
                </a-form-model-item>

                <div class="row mt-2">
                  <div class="col-6">
                    <a-form-model-item
                      ref="ver_recommences_first_name"
                      prop="ver_recommences_first_name"
                    >
                      <a-input
                        :maxLength="10"
                        v-model="verification.ver_recommences_first_name"
                        class="w-100 rounded-right"
                        placeholder="First Name"
                      />
                    </a-form-model-item>
                  </div>
                  <div class="col-6">
                    <a-form-model-item
                      ref="ver_recommences_last_name"
                      prop="ver_recommences_last_name"
                    >
                      <a-input
                        v-model="verification.ver_recommences_last_name"
                        class="w-100 rounded-left"
                        :maxLength="10"
                        placeholder="Last Name"
                      />
                    </a-form-model-item>
                  </div>
                </div>

                <a-form-model-item
                  ref="ver_recommences_occupation"
                  prop="ver_recommences_occupation"
                  class="mt-2"
                >
                  <v-select
                    :clearable="false"
                    class="style-chooser"
                    id="ver_recommences_occupation"
                    placeholder="Occupation"
                    v-model="verification.ver_recommences_occupation"
                    label="name"
                    :reduce="(option) => option.name"
                    :options="candidateDetails.occupations"
                    ><template #open-indicator>
                      <a-icon type="down" /> </template
                  ></v-select>
                </a-form-model-item>
                <a-form-model-item
                  ref="ver_recommences_address"
                  prop="ver_recommences_address"
                  class="mt-2"
                >
                  <a-textarea
                    :rows="3"
                    :maxLength="200"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    id="ver_recommences_address"
                    v-model.lazy="verification.ver_recommences_address"
                    placeholder="Address"
                    class="w-full form-right-content"
                  />
                </a-form-model-item>
                <a-form-model-item
                  ref="ver_recommences_mobile_no"
                  prop="ver_recommences_mobile_no"
                  class="mt-2"
                >
                  <a-input
                    class="w-100"
                    id="inputNumber"
                    :maxLength="10"
                    placeholder="Mobile number"
                    v-model="verification.ver_recommences_mobile_no"
                  />
                </a-form-model-item>
              </div>
              <div
                class="col-12 col-md-6 none-padding mobile-margin mobile-help"
              >
                <p>
                  <a
                    class="color-blue fw-700 fs-14"
                    data-toggle="collapse"
                    href="#Needver_recommences_title"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    <span
                      v-if="arr[4].first"
                      @click="arr[4].first = !arr[4].first"
                    >
                      Need Help?
                    </span>
                    <span v-else @click="arr[4].first = !arr[4].first">
                      Hide Help?
                    </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_recommences_title"
                >
                  <div class="card card-body bubble">
                    Please provide tooltip texts so we can place it here
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <a-button
                shape="round"
                type="primary"
                style="float: right; margin-right: 10px"
                class="mt-5"
                @click="cancel"
              >
                Cancel
              </a-button>
              <a-button
                shape="round"
                type="primary"
                style="float: right; margin-bottom: 0.5rem; margin-right: -15px"
                class="mt-5"
                @click="handleSubmitFormOne"
              >
                Submit
              </a-button>
            </div>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/base/_variables.scss";
</style>
<script>
import FileUploadOne from "@/components/shared/FileUploadOne.vue";
import ApiService from "@/services/api.service";
import vSelect from "vue-select";
import { VERIFICATION } from "./models/candidate";
export default {
  name: "Verification",
  props: {
    candidateDetails: {
      type: Object,
    },
    verification: {
      type: Object,
    },
  },
  components: {
    FileUploadOne,
    vSelect,
  },

  created() {
    // console.log(this.handleChangeFromProp)
    console.log(this.repData);
  },
  mounted() {
    // this.setPersonalInfoRepData();
    // this.getCountries();
    // this.getOccupations();
  },
  data() {
    return {
      arr: [
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
        {
          first: true,
        },
      ],
      rules: VERIFICATION,
      cities: [],
      imageBack: null,
      imageFont: null,
      activeKey: 1,
    };
  },

  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
    changeActivekey(key) {
      this.activeKey = key;
    },
    handleSubmitFormOne() {
      this.$refs.verification.validate((valid) => {
        if (valid) {
          this.activeKey = null;
          this.saveImageVerificationInfo();
          this.saveVerificationInfo();
        } else {
          setTimeout(() => {
            const el = document.querySelector(".has-error:first-of-type");
            el.scrollIntoView();
          }, 100);
          return false;
        }
      });
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .trim()
        .toLowerCase()
        .startsWith(input.toLowerCase());
    },
    onValueChange(e) {
      this.saveVerificationInfo();
    },
    saveVerificationInfo() {
      const {
        ver_city_id,
        ver_country,
        ver_country_id,
        ver_document_type,
        ver_recommences_address,
        ver_recommences_first_name,
        ver_recommences_last_name,
        ver_recommences_occupation,
        ver_recommences_title,
        ver_status,
        ver_recommences_mobile_no,
      } = this.verification;
      this.$store
        .dispatch("saveVerificationInfo", {
          ver_city_id,
          ver_country,
          ver_country_id,
          ver_document_type,
          ver_recommences_address,
          ver_recommences_first_name,
          ver_recommences_last_name,
          ver_recommences_occupation,
          ver_recommences_title,
          ver_status,
          ver_recommences_mobile_no,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 2,
          });
        })
        .catch((error) => {});
    },
    saveImageVerificationInfo() {
      const image = {
        ver_image_front: this.verification.ver_image_front,
        ver_image_back: this.verification.ver_image_back,
      };
      this.$store
        .dispatch("saveImageVerificationInfo", image)
        .then((data) => {
          this.verification.ver_image_back =
            data.data.data.verification.ver_image_back;
          this.verification.ver_image_front =
            data.data.data.verification.ver_image_front;
          this.$emit("valueChange", {
            value: this.verification,
            current: 2,
          });
        })
        .catch((error) => {});
    },
    imageSizeCheck(file) {
      if (file["size"] > 2111775) {
        this.$error({
          title: "Validation Error",
          content: "Image size can't be more than 2 mb",
          center: true,
        });
        return false;
      }
      return true;
    },
    getFrontPage(e) {
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }

      this.verification.ver_image_front = e.target.files[0];
      // this.saveImageVerificationInfo({
      //   ver_image_front: this.verification.ver_image_front,
      // });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageFont = e.target.result;
      };
    },
    getBackPage(e) {
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.verification.ver_image_back = e.target.files[0];
      // this.saveImageVerificationInfo({
      //   ver_image_back: this.verification.ver_image_back,
      // });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageBack = e.target.result;
      };
    },

    async onChangeCountry(e) {
      const res = await ApiService.get(`v1/utilities/cities/${e}`);
      if (res.status === 200) {
        this.verification.cities = [];
        this.verification.cities.push(...res.data.data);
      }
      //this.saveVerificationInfo();
    },
    clearImg(action) {
      switch (action) {
        case "back":
          this.imageBack = "";
          this.verification.ver_image_back = "";
          break;
        case "font":
          this.imageFont = "";
          this.verification.ver_image_front = "";
          break;
      }
    },
  },
};
</script>


<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.section-heading {
  text-align: center;
  color: $color-brand;
  h5 {
    color: $color-brand;
  }
  p {
    font-size: 14px;
  }
}
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ant-tooltip-inner {
  border-radius: 0px;
}

img {
  border-radius: 5px;
}
.img-preview {
  width: 180px;
  border: 1px solid $color-secondary;
  border-radius: 5px;
  margin: 0px auto;
  height: 200px;
}
input[type="file"] {
  cursor: pointer;
  width: 180px;
  height: 34px;
  overflow: hidden;
  border-radius: 5px !important;
}

input[type="file"]:before {
  width: 180px;
  height: 32px;
  font-size: 16px;
  line-height: 32px;
  content: "Upload";
  display: inline-block;
  color: white;
  background: #8781bd;
  border: 1px solid #98a0e2;
  padding: 0 10px;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

#checkIcon {
  height: 18px;
  margin-right: 5px;
}

input[type="file"]::-webkit-file-upload-button {
  visibility: hidden;
}
.close-icon {
  display: grid;
  place-content: center;
  position: absolute;
  right: 5rem;
  top: 2.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: white;
  z-index: 1;
}

.mobile-margin {
  margin-top: 0.5rem;
}
.mobile-center {
  text-align: center;
}
.mobile-switch {
  margin-top: 12px;
}
.instruction-title {
  font-size: 14px;
}
@media (min-width: 768px) {
  .form-right-content {
    float: right;
    padding-right: 0;
  }
  .mobile-margin {
    margin-top: 0;
  }
  .non-padding-mobile-margin {
    margin-top: 0;
  }
  .mobile-center {
    text-align: left;
  }
  .mobile-switch {
    margin-top: 0;
  }
  .instruction-title {
    font-size: 18px;
  }
}
</style>
