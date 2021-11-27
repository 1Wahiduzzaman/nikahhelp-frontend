<template>
  <div class="verificationInfo p-3 rounded" style="background: #f4f4f9">
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
              <!-- <a-col class="form-item py-3 border-bottom" :span="24">
							
								<a-row type="flex" align="top">
									<a-col :span="12">
										<div class="mb-2">
											<a-icon
												v-if="onConfirmationSwitchChnaged"
												class="color-success mr-2 fs-18 fw-500"
												type="check"
											/>Do you want to upload your document now?
										</div>
										<a-tooltip placement="bottom">
											<template slot="title">
												Please provide tooltip texts so we can place it
												here</template
											>
											<span class="color-info fw-500">Need help?</span>
										</a-tooltip>
									</a-col>
									<a-col :span="12">
										<a-switch
											v-model="is_document_upload"
											default-checked
											@change="onConfirmationSwitchChnaged"
										>
											<a-icon slot="checkedChildren" type="check" />
											<a-icon slot="unCheckedChildren" type="close" />
										</a-switch>
									</a-col>
								</a-row>
							</a-col> -->

              <div>
                <a-col :span="24">
                  <!-- <a-row class="form-item py-3" :gutter="[16]" type="flex" justify="between" align="top"> -->
                  <a-row
                    class="form-item py-3"
                    :gutter="[16]"
                    type="flex"
                    align="top"
                  >
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_country_id"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Country
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <a-row :gutter="[8]">
                        <a-col :span="12">
                          <a-form-model-item
                            ref="ver_country_id"
                            prop="ver_country_id"
                          >
                            <a-select
                              id="ver_country_id"
                              :showSearch="true"
                              option-filter-prop="children"
                              :filter-option="filterOption"
                              :showArrow="true"
                              v-model="verification.ver_country_id"
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
                            </a-select>
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item ref="ver_city" prop="ver_city">
                            <a-select
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
                            </a-select>
                          </a-form-model-item>
                        </a-col>
                      </a-row>
                      <!-- <a-input
                        class="w-100 mt-2"
                        placeholder="Please specify"
                        v-if="ver_city == 'Other'"
                      /> -->
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <!-- <a-row  type="flex" justify="between" align="top"> -->
                  <a-row type="flex" align="top">
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_document_type"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Document type?
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <a-select
                        v-model="verification.ver_document_type"
                        class="select-ma w-100"
                        placeholder="Document type"
                        @change="onValueChange"
                      >
                        <a-select-option value="Passport">
                          Passport
                        </a-select-option>
                        <a-select-option value="Nation ID">
                          Nation ID
                        </a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <!-- <a-row type="flex" justify="between" align="top"> -->
                  <a-row type="flex" align="top">
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_image_front"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Upload front side?
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <div class="image-container text-center">
                        <span class="mb-2"
                          >The format supported are JPEG, PNG, PDF. Maximum file
                          size 2 mb</span
                        >
                        <span
                          @click="clearImg('font')"
                          class="close-icon"
                          v-if="verification.ver_image_front"
                          ><img src="@/assets/icon/close.svg" alt="img"
                        /></span>
                        <div class="img-preview mb-2">
                          <img
                            :src="verification.ver_image_front"
                            width="180"
                            height="200"
                            v-if="verification.ver_image_front"
                          />
                          <div class="mt-3">Front Page</div>
                          <div
                            class="mt-4"
                            v-if="!verification.ver_image_front"
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
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <!-- <a-row type="flex" justify="between" align="top"> -->
                  <a-row type="flex" align="top">
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_image_back"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Upload back side?
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <div class="image-container text-center">
                        <span class="mb-2"
                          >The format supported are JPEG, PNG, PDF. Maximum file
                          size 2 mb</span
                        >
                        <span
                          @click="clearImg('back')"
                          class="close-icon"
                          v-if="verification.ver_image_back"
                          ><img src="@/assets/icon/close.svg" alt="img"
                        /></span>
                        <div class="img-preview mb-2">
                          <img
                            :src="verification.ver_image_back"
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
                    </a-col>
                  </a-row>
                </a-col>
                <a-col class="form-item py-3 border-bottom" :span="24">
                  <!-- <a-row type="flex" justify="between" align="top"> -->
                  <a-row type="flex" align="top">
                    <a-col :span="12">
                      <div class="mb-2">
                        <a-icon
                          v-if="verification.ver_recommender_title"
                          class="color-success mr-2 fs-18 fw-500"
                          type="check"
                        />Person of community standing who know you?
                      </div>
                      <a-tooltip placement="bottom">
                        <template slot="title">
                          Please provide tooltip texts so we can place it
                          here</template
                        >
                        <span class="color-info fw-500">Need help?</span>
                      </a-tooltip>
                    </a-col>
                    <a-col :span="12">
                      <a-row :gutter="[8, 8]">
                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommences_title"
                            prop="ver_recommences_title"
                          >
                            <a-input
                              v-model="verification.ver_recommences_title"
                              class="w-100"
                              placeholder="Title"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item
                            ref="ver_recommences_first_name"
                            prop="ver_recommences_first_name"
                          >
                            <a-input
                              v-model="verification.ver_recommences_first_name"
                              class="w-100 rounded-right"
                              placeholder="First Name"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-model-item
                            ref="ver_recommences_last_name"
                            prop="ver_recommences_last_name"
                          >
                            <a-input
                              v-model="verification.ver_recommences_last_name"
                              class="w-100 rounded-left"
                              placeholder="Last Name"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommences_occupation"
                            prop="ver_recommences_occupation"
                          >
                            <a-select
                              id="ver_recommences_occupation"
                              :showSearch="true"
                              option-filter-prop="children"
                              :filter-option="filterOption"
                              :showArrow="true"
                              v-model="verification.ver_recommences_occupation"
                              class="select-ma w-100"
                              placeholder="Occupation"
                              @change="onValueChange"
                            >
                              <a-select-option
                                v-for="(
                                  _occupation, key
                                ) in candidateDetails.occupations"
                                :value="_occupation"
                                :key="key"
                              >
                                {{ _occupation }}
                              </a-select-option>
                            </a-select>
                          </a-form-model-item>
                        </a-col>

                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommences_address"
                            prop="ver_recommences_address"
                          >
                            <a-textarea
                              placeholder="Address"
                              :rows="4"
                              v-model="verification.ver_recommences_address"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                        <a-col :span="24">
                          <a-form-model-item
                            ref="ver_recommences_mobile_no"
                            prop="ver_recommences_mobile_no"
                          >
                            <a-input-number
                              class="w-100"
                              id="inputNumber"
                              placeholder="Mobile number"
                              v-model="verification.ver_recommences_mobile_no"
                              @blur="onValueChange"
                            />
                          </a-form-model-item>
                        </a-col>
                      </a-row>
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
      rules: {},
      cities: [],
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
      this.$store
        .dispatch("saveVerificationInfo", {
          ...this.verification,
        })
        .then((data) => {
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
      this.frontPage = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.verification.ver_image_front = e.target.result;
        this.saveVerificationInfo();
      };
    },
    getBackPage(e) {
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.backPage = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.verification.ver_image_back = e.target.result;
        this.saveVerificationInfo();
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