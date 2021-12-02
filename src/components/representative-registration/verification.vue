<template>
  <div id="accordion" class="verificationInfo p-3 rounded" style="background: #f4f4f9">
    <div class="verification-content" style="margin-top: 40px">
      <a-collapse
        default-active-key="1"
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
            <div
              class="verification-header"
              style="color: rgba(0, 0, 0, 0.65); margin: 10px 0px"
            >
              <p>
                To keep your account safe, we need to verify your identity. This
                is a legal requirement that help us to keep your account secure.
              </p>
              <p>
                We accept photo/scans of a driving lecense, passport, national
                ID card or residense permit issued in European Economic Are
                (EEA)
              </p>

              <p>Follow these tips to make sure your document is accepted:</p>
              <ul>
                <li class="flex-start-center">
                  <img
                    src="@/assets/Icons/tick 2.svg"
                    alt="icon"
                    id="checkIcon"
                  />
                  Submit a valid, current photo ID with an expiry date
                </li>
                <li class="flex-start-center">
                  <img
                    src="@/assets/Icons/tick 2.svg"
                    alt="icon"
                    id="checkIcon"
                  />
                  Show the full document (all four corners should be visible)
                </li>
                <li class="flex-start-center">
                  <img
                    src="@/assets/Icons/tick 2.svg"
                    alt="icon"
                    id="checkIcon"
                  />
                  Use a colour image that a is clear and easy to read
                </li>
              </ul>
            </div>
            <hr />

            <a-row>
              <div>
                <a-col :span="24">
                  <a-row
                    class="form-item py-3"
                    :gutter="[16]"
                    type="flex"
                    align="top"
                  >
                    <a-col :span="10">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_country"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Country
                      </div>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="12">
                      <a-row :gutter="[8]">
                        <a-col :span="12">
                          <a-form-model-item
                            ref="ver_country"
                            prop="ver_country"
                          >
                            <v-select
                              :clearable="false"
                              class="style-chooser"
                              @input="onChangeCountry"
                              id="ver_country"
                              placeholder="Country"
                              v-model="verification.ver_country"
                              label="name"
                              :reduce="(option) => option.id"
                              :options="representativeDetails.countries"
                              ><template #open-indicator>
                                <a-icon type="down" /> </template
                            ></v-select>
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item ref="ver_city" prop="ver_city">
                            <v-select
                              :clearable="false"
                              class="style-chooser"
                              @input="onValueChange"
                              id="ver_city"
                              placeholder="City"
                              :reduce="(option) => option.name"
                              v-model="verification.ver_city"
                              label="name"
                              :options="verification.cities"
                              ><template #open-indicator>
                                <a-icon type="down" /> </template
                            ></v-select>
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-col :span="12">
                      <p>
                        <a
                          class="color-blue fw-700 fs-14"
                          data-toggle="collapse"
                          href="#Needver_country"
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
                        id="Needver_country"
                      >
                        <div class="card card-body bubble">
                          Please provide tooltip texts so we can place it here
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <a-row type="flex" align="top">
                    <a-col :span="10">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_document_type"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Document type?
                      </div>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="12">
                      <v-select
                        :clearable="false"
                        class="style-chooser"
                        @input="onValueChange"
                        id="ver_document_type"
                        placeholder="Document type"
                        :reduce="(option) => option.value"
                        v-model="verification.ver_document_type"
                        label="name"
                        :options="[
                          { name: 'Passport', value: 'Passport' },
                          { name: 'Nation ID', value: 'Nation ID' },
                        ]"
                        ><template #open-indicator>
                          <a-icon type="down" /> </template
                      ></v-select>
                    </a-col>
                    <a-col :span="12">
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
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <a-row type="flex" align="top">
                    <a-col :span="10">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_document_frontside"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Upload front side?
                      </div>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="12">
                      <div class="image-container text-center">
                        <span class="mb-2"
                          >The format supported are JPEG, PNG, PDF. Maximum file
                          size 2 mb</span
                        >
                        <span
                          @click="clearImg('font')"
                          class="close-icon"
                          v-if="verification.ver_document_frontside"
                          ><img src="@/assets/icon/close.svg" alt="img"
                        /></span>
                        <div class="img-preview mb-2">
                          <img
                            :src="
                              imageFont
                                ? imageFont
                                : verification.ver_document_frontside
                            "
                            width="180"
                            height="200"
                            v-if="verification.ver_document_frontside"
                          />
                          <div class="mt-3">Front Page</div>
                          <div
                            class="mt-4"
                            v-if="!verification.ver_document_frontside"
                          >
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
                    </a-col>
                    <a-col :span="12">
                      <p>
                        <a
                          class="color-blue fw-700 fs-14"
                          data-toggle="collapse"
                          href="#Needver_document_frontside"
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
                        id="Needver_document_frontside"
                      >
                        <div class="card card-body bubble">
                          Please provide tooltip texts so we can place it here
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <a-row type="flex" align="top">
                    <a-col :span="10">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_document_backside"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Upload back side?
                      </div>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="12">
                      <div class="image-container text-center">
                        <span class="mb-2"
                          >The format supported are JPEG, PNG, PDF. Maximum file
                          size 2 mb</span
                        >
                        <span
                          @click="clearImg('back')"
                          class="close-icon"
                          v-if="verification.ver_document_backside"
                          ><img src="@/assets/icon/close.svg" alt="img"
                        /></span>
                        <div class="img-preview mb-2">
                          <img
                            :src="
                              imageBack
                                ? imageBack
                                : verification.ver_document_backside
                            "
                            width="180"
                            height="200"
                            v-if="verification.ver_document_backside"
                          />

                          <div class="mt-3">Back Page</div>
                          <div
                            class="mt-4"
                            v-if="!verification.ver_document_backside"
                          >
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
                    </a-col>
                    <a-col :span="12">
                      <p>
                        <a
                          class="color-blue fw-700 fs-14"
                          data-toggle="collapse"
                          href="#Needver_document_backside"
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
                        id="Needver_document_backside"
                      >
                        <div class="card card-body bubble">
                          Please provide tooltip texts so we can place it here
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <a-row type="flex" align="top">
                    <a-col :span="10">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_recommender_title"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Person of community standing who know you?
                      </div>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="12">
                      <a-row :gutter="[8, 8]">
                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommender_title"
                            prop="ver_recommender_title"
                          >
                            <a-input
                              v-model="verification.ver_recommender_title"
                              class="w-100"
                              placeholder="Title"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item
                            ref="ver_recommender_first_name"
                            prop="ver_recommender_first_name"
                          >
                            <a-input
                              v-model="verification.ver_recommender_first_name"
                              class="w-100 rounded-right"
                              placeholder="First Name"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item
                            ref="ver_recommender_last_name"
                            prop="ver_recommender_last_name"
                          >
                            <a-input
                              v-model="verification.ver_recommender_last_name"
                              class="w-100 rounded-left"
                              placeholder="Last Name"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommender_occupation"
                            prop="ver_recommender_occupation"
                          >
                            <v-select
                              :clearable="false"
                              class="style-chooser"
                              @input="onValueChange"
                              id="ver_recommender_occupation"
                              placeholder="Occupation"
                              v-model="verification.ver_recommender_occupation"
                              label="name"
                               :reduce="(option) => option.name"
                              :options="representativeDetails.occupations"
                              ><template #open-indicator>
                                <a-icon type="down" /> </template
                            ></v-select>
                          </a-form-model-item>
                        </a-col>

                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommender_address"
                            prop="ver_recommender_address"
                          >
                            <a-textarea
                              placeholder="Address"
                              :rows="4"
                              v-model="verification.ver_recommender_address"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommender_mobile_no"
                            prop="ver_recommender_mobile_no"
                          >
                            <a-input
                              class="w-100"
                              id="inputNumber"
                              placeholder="Mobile number"
                              v-model="verification.ver_recommender_mobile_no"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                    </a-col>
                    <a-col :span="12">
                      <p>
                        <a
                          class="color-blue fw-700 fs-14"
                          data-toggle="collapse"
                          href="#Needver_recommender_title"
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
                        id="Needver_recommender_title"
                      >
                        <div class="card card-body bubble">
                          Please provide tooltip texts so we can place it here
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
              </div>
            </a-row>
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
import ApiService from "../../services/api.service";
import vSelect from "vue-select";
export default {
  name: "VerificationRef",
  props: {
    representativeDetails: {
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
        { first: true },
        { first: true },
        { first: true },
        { first: true },
        { first: true },

        { first: true },
        { first: true },
        { first: true },

        { first: true },
        { first: true },
        { first: true },
      ],
      rules: {},
      cities: [],
      imageBack: null,
      imageFont: null,
    };
  },

  methods: {
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
        ver_city,
        ver_country,
        ver_document_type,
        ver_recommender_address,
        ver_recommender_first_name,
        ver_recommender_last_name,
        ver_recommender_occupation,
        ver_recommender_title,
        ver_recommender_mobile_no,
      } = this.verification;
      this.$store
        .dispatch("saveRepresentativeVerificationInfo", {
          ver_city,
          ver_country,
          ver_document_type,
          ver_recommender_address,
          ver_recommender_first_name,
          ver_recommender_last_name,
          ver_recommender_occupation,
          ver_recommender_title,
          ver_recommender_mobile_no,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 2,
          });
        })
        .catch((error) => {});
    },
    saveImageVerificationInfo(image) {
      this.$store
        .dispatch("saveRepresentativeImageVerificationInfo", image)
        .then((data) => {
          this.verification.ver_document_backside =
            data.data.data.verification.ver_document_backside;
          this.verification.ver_document_frontside =
            data.data.data.verification.ver_document_frontside;
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

      this.verification.ver_document_frontside = e.target.files[0];
      this.saveImageVerificationInfo({
        ver_document_frontside: this.verification.ver_document_frontside,
      });

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
      this.verification.ver_document_backside = e.target.files[0];
      this.saveImageVerificationInfo({
        ver_document_backside: this.verification.ver_document_backside,
      });

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
      this.saveVerificationInfo();
    },
    clearImg(action) {
      switch (action) {
        case "back":
          this.backPageSrc = "";
          break;
        case "font":
          this.frontPageSrc = "";
          break;
      }
    },
  },
};
</script>


<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
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
  right: 4.5rem;
  top: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: white;
  z-index: 1;
}
</style>
