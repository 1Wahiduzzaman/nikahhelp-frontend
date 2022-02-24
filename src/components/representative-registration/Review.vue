<template>
  <div class="review-publish px-2">
    <fieldset v-if="representativeDetails" class="review">
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
              @click="$emit('toggleStep', 1)"
            />
          </div>
          <div class="row h-100">
            <div class="col-md-12 mb-3">
              <div class="card-custom shadow-default personal-height">
                <ul style="line-height: 160%">
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3">
                        {{ representativeDetails.first_name }}
                        {{ representativeDetails.last_name }}
                      </span>
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Screen Name</span
                    ><span class="flex-70 px-2"
                      >:<span class="ml-3">{{
                        representativeDetails.screen_name
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Gender</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        representativeDetails.essential.per_gender
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Date of Birth</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3">
                        {{ representativeDetails.personal.dob }}
                      </span>
                    </span>
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Occupation</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        representativeDetails.essential.per_occupation
                      }}</span></span
                    >
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text"
                      >Current Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3"
                        >{{
                          representativeDetails.contact
                            .per_current_residence_country_name
                        }},{{
                          representativeDetails.contact
                            .per_current_residence_city
                        }}</span
                      >
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Post Code</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        representativeDetails.contact.per_permanent_post_code
                      }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text"
                      >Permanant Residance</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3"
                        >{{
                          representativeDetails.contact
                            .per_permanent_country_name
                        }},{{
                          representativeDetails.contact.per_permanent_city
                        }}</span
                      >
                    </span>
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Address</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        representativeDetails.contact.per_permanent_address
                      }}</span></span
                    >
                  </li>

                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Mobile No</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3"
                        >{{
                          representativeDetails.contact.mobile_country_code
                        }}
                        {{ representativeDetails.contact.mobile_number }}</span
                      ></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-30 px-2 label-text">Email</span
                    ><span class="flex-70 px-2 d-inherit"
                      >:<span class="ml-3">{{
                        representativeDetails.contact.per_email
                      }}</span></span
                    >
                  </li>
                </ul>
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
              @click="$emit('toggleStep', 5)"
            />
          </div>
          <div class="row">
            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.imageModel.per_avatar_url"
                  class="user-image"
                  alt="img"
                  height="250"
                  width="200"
                />
                <p class="text-center">Avatar</p>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div class="profile-img text-center">
                <img
                  v-viewer
                  :src="representativeDetails.imageModel.per_main_image_url"
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
import RatingComponent from "../profile/RatingComponent.vue";
import ApiService from "@/services/api.service";
import JwtService from "@/services/jwt.service";
import { AGES, HEIGHTS, Employment_Statuses } from "@/models/data";
export default {
  name: "Review",
  components: {
    RatingComponent,
  },
  props: {
    representativeDetails: {
      type: Object,
    },
  },
  data() {
    return {  };
  },
  mounted() {},
  methods: {
    async getDocumentInfo() {
      const user = JSON.parse(localStorage.getItem("user"));
      await this.$store
        .dispatch("getDocumentInfo", user.id)
        .then((data) => {
          this.representativeDetails = {
            ...data,
            ...data.representaive_info,
          };
          this.isLoading = false;
        })
        .catch((error) => {});
    },
  },
  computed: {},
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
      .label-text {
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
.label-text {
  //font-size: 14px;
  font-weight: 600;
}
.flex-70 > .ml-3 {
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
