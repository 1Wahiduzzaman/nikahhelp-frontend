<template>
  <div class="review-publish px-2">
    <Loader v-if="loading" :isLoading="loading" />
    <fieldset
      v-if="representativeDetails && representativeDetails.essential"
      class="review"
    >
      <h4 class="fw-700 px-2">Review and Publish Profile</h4>
      <p class="mb-5 px-2">
        Please check the information and details that you have provided, if you
        are happy with it please submit for approval by MatrimonyAssist Team. If
        anything needs to be changed, then you can access relavant sections by
        pressing previous button.
      </p>
      <div class="text-start">
        <!-- Personal Information -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            Personal Information
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 0)"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-12 mb-3">
              <div class="card-custom shadow-default personal-height">
                <ul style="line-height: 160%">
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">
                        {{ representativeDetails.first_name }}
                        {{ representativeDetails.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Screen Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Gender</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.essential.per_gender_text
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Date of Birth</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span
                        class="
                          ml-3
                          text--secondary
                          text-subtitle-1
                          text--secondary
                          text-subtitle-1
                        "
                      >
                        {{ representativeDetails.essential.dob }}
                      </span>
                    </span>
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Occupation</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.essential.per_occupation
                      }}</span></span
                    >
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Current Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >{{
                          representativeDetails.personal
                            .per_current_residence_country_text
                        }},
                        {{
                          representativeDetails.personal
                            .per_current_residence_city
                        }}</span
                      >
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Post Code</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.per_permanent_post_code
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Permanant Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >{{
                          representativeDetails.personal
                            .per_permanent_country_text
                        }},
                        {{
                          representativeDetails.personal.per_permanent_city
                        }}</span
                      >
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Address</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.per_permanent_address
                      }}</span></span
                    >
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Mobile No</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1"
                        >{{
                          representativeDetails.personal.mobile_country_code
                        }}
                        {{ representativeDetails.personal.mobile_number }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 text--disabled text-subtitle-1"
                      >Email</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3 text--secondary text-subtitle-1">{{
                        representativeDetails.personal.per_email
                      }}</span></span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showAgreement" class="review-edit mt-5">
          <div class="review-edit-label">
            Verification & Reference
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 2)"
            />
          </div>
          <div class="row">
            <div class="col-md-12 mb-3">
              <div class="card-custom h-100 shadow-default">
                <table>
                  <TableRow
                    title="ID document issuing country & city"
                    textClass="text-subtitle-1"
                    :value="representativeDetails.verification.ver_city"
                  />
                  <TableRow
                    title="Document type"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification.ver_document_type
                    "
                  />
                  <TableRow
                    title="Title"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_title
                    "
                  />
                  <TableRow
                    title="First Name"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_first_name
                    "
                  />
                  
                  <TableRow
                    title="Last Name"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_last_name
                    "
                  />
                  <TableRow
                    title="Occupation"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_occupation
                    "
                  />
                  
                  <TableRow
                    title="Address"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_address
                    "
                  />
                  <TableRow
                    title="Mobile No"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_mobile_no
                    "
                  />
                   <TableRow
                    title="Email"
                    textClass="text-subtitle-1"
                    :value="
                      representativeDetails.verification
                        .ver_recommender_email
                    "
                  />
                  
                </table>
              </div>
            </div>
             <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.verification.ver_document_frontside"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Front Side</p>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.verification.ver_document_backside"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Back Side</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Uploaded Image -->
        <div class="review-edit mt-5">
          <div class="review-edit-label">
            My Uploaded Image
            <img
              class="ms-2 edit-step"
              src="@/assets/icon/edit_step.svg"
              alt="icon"
              @click="$emit('toggleStep', 1)"
            />
          </div>
          <div class="row">
            <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.image_upload.per_avatar_url"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Avatar</p>
              </div>
            </div>
            <div class="col-12 col-md-6 mb-4">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.image_upload.per_main_image_url"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Main image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>
<script>
import RatingComponent from "@/components/profile/RatingComponent.vue";
import ApiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";
import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
import TableRow from "@/components/atom/TableRow";
export default {
  name: "Review",
  components: {
    RatingComponent,
    TableRow,
  },
  props: ['showAgreement'],
  data() {
    return { 
        representativeDetails: null,
        loading: false
    };
  },
  mounted() {
    this.getRepresentativeInfo();
  },
  methods: {
    async getRepresentativeInfo() {
        try {
            this.loading = true
            const data = await ApiService.get(`/v1/admin/representative-info/${this.user_id}`);
            this.representativeDetails = {
            ...data.data.data,
            personal: {
                ...data.data.data.personal,
                per_email: 'user.email',
                },
            };
        } catch(er) {
            console.log(er, '>err<')
        } finally {
            this.loading = false
        }
    },
  },
  computed: {
    user_id: function () {
      return this.$route.params.user_id;
    } 
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.review-publish {
  .review {
    font-size: 14px;
    h4 {
      font-size: 16px;
      opacity: 0.8;
    }
    p {
      font-size: 14px;
    }
    .review-edit {
      position: relative;
      padding: 15px;
      border: 1px solid $border-secondary;
      border-radius: 5px;
      .review-edit-label {
        position: absolute;
        color: $color-secondary;
        left: 50px;
        top: -12px;
        background: $bg-white;
        cursor: pointer;
      }
    }
    ul {
      .text--disabled text-subtitle-1 {
        //opacity: 0.8;
      }
    }
    .profile-img {
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .ant-input {
    border: none;
    pointer-events: none;
  }
  textarea {
    resize: none;
  }
}
.h-100 {
  height: 100%;
}
.h-67 {
  height: 66%;
  margin-bottom: 2%;
}
.h-33 {
  height: 32%;
  margin-top: 1%;
}
.anticon {
  max-width: 15px;
}
.badge-info {
  background: $bg-white !important;
  color: black;
  position: relative;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid $border-gray;
  margin-bottom: 15px;
  text-align: center;
  .badge-info-label {
    position: absolute;
    top: -12px;
    opacity: 0.7;
    left: 0;
    right: 0;
    .inner {
      background: $bg-white;
    }
  }
}

.card-height-design {
  height: 360px;
}

.mobile-margin-top {
  margin-top: 54px;
}
.text--disabled text-subtitle-1 {
  //font-size: 14px;
  font-weight: 600;
}
.flex-70 > .ml-3 text--secondary text-subtitle-1 {
  //font-size: 14px;
  font-weight: 900;
}
.inner {
  font-weight: 600;
}
.value-text {
  font-weight: bold;
}
.mt-16px {
  margin-top: 16px;
}
.personal-height {
  height: auto;
}
.user-image {
  width: 100%;
  height: 300px;
}
.edit-step {
  width: 20px;
  height: 20px;
}
@media (min-width: 992px) {
  .mobile-margin-top {
    margin-top: 0;
  }
  .personal-height {
    height: 360px;
  }
}
</style>
