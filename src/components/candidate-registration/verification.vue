<template>
  <div id="accordion" class="verificationInfo p-3 rounded">
    <div
      v-if="userData && userData.status == '1'"
      class="verification-content"
      style="margin-top: 40px"
    >
      <div class="section-heading heading-text">
        <h5>Verification Information</h5>
        <!-- <p>Your Verification Information</p> -->
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
        <a-collapse-panel key="1" header="6. ID Verification Information">
          <a-form-model
            v-if="verification"
            ref="verification"
            :model="verification"
            :rules="rules"
            class="form-ma"
          >
            <div class="row">
              <div class="col-12 border-bottom pb-3">
                <div class="verification-header my-2 text-black-70">
                  <p>
                    To provide you with an authentic experience we verify all
                    candidates (bride/groom) IDs as well as the ID of at least
                    one representative in each team.
                  </p>
                  <p>
                    If you do not wish to upload your ID documents now, that's
                    fine. You can go back to the previous step by tapping the
                    previous button at the bottom of this section and select
                    'No'. You can upload your ID documents later through your
                    personal settings screen.
                  </p>
                  <p>
                    We accept photos/scans of a driving license, passport,
                    national ID card or residence permit issued by governments.
                  </p>
                  <p>
                    Copies of your ID document will be deleted once your ID is
                    verified in the interest of security.
                  </p>
                  <p>
                    Our main goal is that real people connect with other real
                    people.
                  </p>

                  <p>
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
                    <li class="flex-start-center py-2">
                      <img
                        src="@/assets/Icons/tick 2.svg"
                        alt="icon"
                        id="checkIcon"
                      />
                      Show the full document (all four corners should be
                      visible)
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
                  />Document issuing country & city
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
                        @input="onChangeCountry($event, 'ver_country_id')"
                        id="ver_country_id"
                        placeholder="please select"
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
                        placeholder="please select"
                        @input="onValueChange($event, 'ver_city_id')"
                        :loading="loading"
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
                    <span v-if="arr[3].first" @click="toggle(3)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(3)"> Hide Help? </span>
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
                  />Type of document
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <a-form-model-item
                  ref="ver_document_type"
                  prop="ver_document_type"
                >
                  <v-select
                    :clearable="false"
                    class="style-chooser"
                    id="ver_document_type"
                    placeholder="Document type"
                    @input="onValueChange($event, 'ver_document_type')"
                    :reduce="(option) => option.value"
                    v-model="verification.ver_document_type"
                    label="name"
                    :options="[
                      { name: 'Passport', value: 'Passport' },
                      { name: 'National ID', value: 'National ID' },
                      { name: 'Driving licence ', value: 'Driving licence ' },
                    ]"
                    ><template #open-indicator>
                      <a-icon type="down" /> </template
                  ></v-select>
                </a-form-model-item>
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
                    <span v-if="arr[2].first" @click="toggle(2)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(2)"> Hide Help? </span>
                  </a>
                </p>
                <div
                  data-parent="#accordion"
                  class="collapse"
                  id="Needver_document_type"
                >
                  <div class="card card-body bubble">
                    Unfortunately, if you do not have one of the required IDs,
                    you will not be able to continue your full registration. You
                    do have the option to skip ID upload now and this can be
                    done later through account settings. Please select cancel to
                    return to the previous section to select skip ID upload.
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
                    4 mb</span
                  >

                  <div class="img-preview mb-2">
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
                    v-if="!verification.ver_image_front"
                    @change="getFrontPage"
                  />
                  <a-button
                    type="primary"
                    style="width: 185px"
                    v-if="verification.ver_image_front"
                    @click="clearImg('font')"
                  >
                    Remove
                  </a-button>
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
                    <span v-if="arr[1].first" @click="toggle(1)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(1)"> Hide Help? </span>
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
                  />Upload reverse side
                </div>
              </div>
              <div class="col-12 col-md-6 mobile-margin">
                <div class="image-container text-center">
                  <span class="mb-2"
                    >The format supported are JPEG, PNG, PDF. Maximum file size
                    4 mb</span
                  >

                  <div class="img-preview mb-2">
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
                    v-if="!verification.ver_image_back"
                    name="avatar"
                    @change="getBackPage"
                  />
                  <a-button
                    type="primary"
                    style="width: 185px"
                    v-if="verification.ver_image_back"
                    @click="clearImg('back')"
                  >
                    Remove
                  </a-button>
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
                    <span v-if="arr[0].first" @click="toggle(0)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(0)"> Hide Help? </span>
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
            <!-- <div class="row pt-3 border-bottom">
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
                  />Person of community standing or professional who knows you
                  well (this is an <b>optional</b> question - just leave blank,
                  required for enhanced ID checks)?
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
                    @blur="onValueChange($event, 'ver_recommences_title')"
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
                        @blur="
                          onValueChange($event, 'ver_recommences_first_name')
                        "
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
                        @blur="
                          onValueChange($event, 'ver_recommences_last_name')
                        "
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
                    @input="onValueChange($event, 'ver_recommences_occupation')"
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
                    @blur="onValueChange($event, 'ver_recommences_address')"
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
                    @blur="onValueChange($event, 'ver_recommences_mobile_no')"
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
                    <span v-if="arr[4].first" @click="toggle(27)">
                      Need Help?
                    </span>
                    <span v-else @click="toggle(27)"> Hide Help? </span>
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
            </div> -->

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
                Save
              </a-button>
            </div>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="verification-msg" v-if="userData && userData.status == '2'">
      <div class="identity">
        <img
          src="@/assets/icon/dots-horizontal-circle.svg"
          alt="icon"
          style="width: 200px; height: 230px"
        />
        <span>In Review</span>
      </div>
      <div class="identity-footer">
        <span
          >To keep your account safe, we need to verify your identity. This is a
          legal requirement that help us to keep your account secure.
        </span>
        <span
          >We accept photo/scans of a driving license, passport, national ID
          card or residence permit issued in European Economic Are (EEA).</span
        >
      </div>
    </div>
    <div class="verification-msg" v-if="userData && userData.status == '3'">
      <div class="identity">
        <img
          src="@/assets/icon/varified.svg"
          alt="icon"
          style="width: 200px; height: 230px"
        />
        &nbsp;
        <span>Verified</span>
      </div>
      <div class="identity-footer">
        <span
          >To keep your account safe, we need to verify your identity. This is a
          legal requirement that help us to keep your account secure.
        </span>
        <span
          >We accept photo/scans of a driving license, passport, national ID
          card or residence permit issued in European Economic Are (EEA).</span
        >
      </div>
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
  data() {
    return {
      userData: null,
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
      loading: false,
    };
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {},

  methods: {
    toggle(index) {
      this.arr = this.arr.map((a, ind) => {
        if (ind === index) {
          a.first = !a.first;
        } else {
          a.first = true;
        }
        return a;
      });
    },

    cancel() {
      this.verification = {
        ver_city_id: "",
        ver_country: "",
        ver_country_id: "",
        ver_document_type: "",
        // ver_recommences_address: "",
        // ver_recommences_first_name: "",
        // ver_recommences_last_name: "",
        // ver_recommences_occupation: "",
        // ver_recommences_title: "",
        // ver_status: "",
        // ver_recommences_mobile_no: "",
        ver_image_back: "",
        ver_image_front: "",
      };
      this.$store
        .dispatch("saveVerificationInfo", {
          ver_city_id: "",
          ver_country: "",
          ver_country_id: "",
          ver_document_type: "",
          // ver_recommences_address: "",
          // ver_recommences_first_name: "",
          // ver_recommences_last_name: "",
          // ver_recommences_occupation: "",
          // ver_recommences_title: "",
          // ver_status: "",
          // ver_recommences_mobile_no: "",
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 4,
          });
          this.$emit("cancel", false);
        })
        .catch((error) => {});
    },
    changeActivekey(key) {
      this.activeKey = key;
    },
    handleSubmitFormOne() {
      this.$refs.verification.validate((valid) => {
        if (valid) {
          this.activeKey = null;
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
    onValueChange(e, name) {
      this.checkValidation(name);
      this.saveVerificationInfo();
    },
    checkValidation(name) {
      this.$refs.verification.fields.forEach((f) => {
        if (f.prop == name) {
          f.onFieldBlur();
        }
      });
    },
    saveVerificationInfo() {
      const {
        ver_city_id,
        ver_country,
        ver_country_id,
        ver_document_type,
        // ver_recommences_address,
        // ver_recommences_first_name,
        // ver_recommences_last_name,
        // ver_recommences_occupation,
        // ver_recommences_title,
        // ver_status,
        // ver_recommences_mobile_no,
      } = this.verification;
      this.$store
        .dispatch("saveVerificationInfo", {
          ver_city_id,
          ver_country,
          ver_country_id,
          ver_document_type,
          // ver_recommences_address,
          // ver_recommences_first_name,
          // ver_recommences_last_name,
          // ver_recommences_occupation,
          // ver_recommences_title,
          // ver_status,
          // ver_recommences_mobile_no,
        })
        .then((data) => {
          this.$emit("valueChange", {
            value: this.verification,
            current: 4,
          });
        })
        .catch((error) => {});
    },
    saveImageVerificationInfo(image) {
      this.$store
        .dispatch("saveImageVerificationInfo", image)
        .then((data) => {
          this.verification.ver_image_back =
            data.data.data.verification.ver_image_back;
          this.verification.ver_image_front =
            data.data.data.verification.ver_image_front;
          this.$emit("valueChange", {
            value: this.verification,
            current: 4,
          });
        })
        .catch((error) => {});
    },
    imageSizeCheck(file) {
      if (file["size"] > 4223550) {
        this.$error({
          title: "Error!",
          content: `The image you tried to upload is more than 4MB.
          Please try uploading an image that is less than 4MB.`,
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
      this.saveImageVerificationInfo({
        ver_image_front: this.verification.ver_image_front,
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
      this.verification.ver_image_back = e.target.files[0];
      this.saveImageVerificationInfo({
        ver_image_back: this.verification.ver_image_back,
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.imageBack = e.target.result;
      };
    },

    async onChangeCountry(e, name) {
      this.loading = true;
      this.checkValidation(name);
      const res = await ApiService.get(`v1/utilities/cities/${e}`);
      if (res.status === 200) {
        this.verification.cities = [];
        this.verification.cities.push(...res.data.data);
        this.loading = false;
      }
      this.saveVerificationInfo();
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
.verification-msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
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
