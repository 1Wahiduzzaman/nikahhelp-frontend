<template>
  <div v-if="imageModel" class="upload-profile-image px-3">
    <div class="section-heading heading-text text-center">
      <h5 class="text-center">Image Upload</h5>
      <p class="text-center">Your Profile and Avatar Images</p>
    </div>

    <Loader :isLoading="loading"/>
    <a-collapse
      accordion
      :activeKey="activeKey"
      :bordered="false"
      expand-icon-position="right"
    >
      <template #expandIcon="props">
        <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
      </template>
      <!-- 1. Required Information -->
      <a-collapse-panel key="1" header="4.1 Image Required">
        <!-- Image Upload Input -->
        <div class="image-and-settings">
          <fieldset class="mb-10 mt-2">
            <legend class="ml-8 px-1"><span>Upload your image</span></legend>
            <div class="row">
              <div class="col-12">
                <div class="px-4">
                  <p>
                    You are required to upload at least one avatar and a main
                    image. All together you can upload up to 3 images.
                  </p>
                  <p>
                    Select images from your devices. Supported file formats are
                    JPG, JPEG, PNG. Maximum file size 4 MB.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>

          <form class="form-ma">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="text-center">
                  <!-- <span
                    @click="clearImg('avatar')"
                    class="close-icon"
                    v-if="imageModel.avatar_image_url"
                    ><img src="@/assets/icon/close.svg" alt="img"
                  /></span> -->
                  <div class="img-preview mb-2">
                    <img
                      v-viewer="{toolbar: false, title: false}"
                      :src="avatarSrc ? avatarSrc : imageModel.avatar_image_url"
                      class="contain"
                      v-if="imageModel.avatar_image_url"
                    />
                    <div class="mt-3" v-if="!imageModel.avatar_image_url">Avatar Image</div>
                    <div
                      class="mt-4 add-icon"
                      v-if="!imageModel.avatar_image_url"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16.69 16.69"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="mid_bottom" data-name="mid bottom">
                            <circle
                              class="cls-1"
                              cx="8.34"
                              cy="8.34"
                              r="8.34"
                              fill="#e1e1e1"
                            />
                            <path
                              class="cls-2"
                              fill="#ffffff"
                              d="M13.1,7.51H9.18V3.58a.8.8,0,0,0-1.6,0V7.51H3.65a.8.8,0,1,0,0,1.6H7.58V13a.8.8,0,1,0,1.6,0V9.11H13.1a.8.8,0,1,0,0-1.6Z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <label for="input-avatar-image" class="upload-label" v-if="!imageModel.avatar_image_url">
                    Upload
                    <input v-if="!imageModel.avatar_image_url" type="file" class="input-image" id="input-avatar-image" name="mainImage"
                    @change="getAvatar" />
                  </label>
                  <a-button type="primary" style="width: 200px; border-radius: 5px;" v-if="imageModel.avatar_image_url"
                    @click="clearImg('avatar')"
                  >
                    Remove
                  </a-button>
                </div>
              </div>
              <div class="col-12 col-md-4 mobile-margin">
                <div class="text-center">
                  <!-- <span
                    @click="clearImg('main')"
                    class="close-icon"
                    v-if="imageModel.main_image_url"
                    ><img src="@/assets/icon/close.svg" alt="img"
                  /></span> -->
                  <div class="img-preview mb-2">
                    <img
                      v-viewer="{toolbar: false, title: false}"
                      :src="
                        mainImageSrc ? mainImageSrc : imageModel.main_image_url
                      "
                      class="contain"
                      v-if="imageModel.main_image_url"
                    />
                    <div class="mt-3" v-if="!imageModel.main_image_url">Main Profile Image</div>
                    <div
                      class="mt-4 add-icon"
                      v-if="!imageModel.main_image_url"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16.69 16.69"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="mid_bottom" data-name="mid bottom">
                            <circle
                              class="cls-1"
                              cx="8.34"
                              cy="8.34"
                              r="8.34"
                              fill="#e1e1e1"
                            />
                            <path
                              class="cls-2"
                              fill="#ffffff"
                              d="M13.1,7.51H9.18V3.58a.8.8,0,0,0-1.6,0V7.51H3.65a.8.8,0,1,0,0,1.6H7.58V13a.8.8,0,1,0,1.6,0V9.11H13.1a.8.8,0,1,0,0-1.6Z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <label for="input-main-image" class="upload-label" v-if="!imageModel.main_image_url">
                    Upload
                    <input v-if="!imageModel.main_image_url" type="file" class="input-image" id="input-main-image" name="mainImage"
                    @change="getMainImage" />
                  </label>
                  <a-button type="primary" style="width: 200px; border-radius: 5px;" v-if="imageModel.main_image_url"
                    @click="clearImg('main')">
                    Remove
                  </a-button>
                </div>
              </div>
              <div class="col-12 col-md-4 mobile-margin">
                <div class="text-center">
                  <!-- <span
                    @click="clearImg('additional')"
                    class="close-icon"
                    v-if="imageModel.additionalImageSrc"
                    ><img src="@/assets/icon/close.svg" alt="img"
                  /></span> -->
                  <div class="img-preview mb-2">
                    <img
                      v-viewer="{toolbar: false, title: false}"
                      :src="
                        additionalImageSrc
                          ? additionalImageSrc
                          : imageModel.additionalImageSrc
                      "
                      class="contain"
                      v-if="imageModel.additionalImageSrc"
                    />
                    <div class="mt-3" v-if="!imageModel.additionalImageSrc">Additional Image</div>
                    <div
                      class="mt-4 add-icon"
                      v-if="!imageModel.additionalImageSrc"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16.69 16.69"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="mid_bottom" data-name="mid bottom">
                            <circle
                              class="cls-1"
                              cx="8.34"
                              cy="8.34"
                              r="8.34"
                              fill="#e1e1e1"
                            />
                            <path
                              class="cls-2"
                              fill="#ffffff"
                              d="M13.1,7.51H9.18V3.58a.8.8,0,0,0-1.6,0V7.51H3.65a.8.8,0,1,0,0,1.6H7.58V13a.8.8,0,1,0,1.6,0V9.11H13.1a.8.8,0,1,0,0-1.6Z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <label for="input-aditional-image" class="upload-label" v-if="!imageModel.additionalImageSrc">
                    Upload
                    <input v-if="!imageModel.additionalImageSrc" type="file" class="input-image" id="input-aditional-image" name="mainImage"
                    @change="getAdditionalImage" />
                  </label>
                  <a-button type="primary" style="width: 200px; border-radius: 5px;" v-if="imageModel.additionalImageSrc"
                    @click="clearImg('additional')">
                    Remove
                  </a-button>
                </div>
              </div>
            </div>
          </form>

          <div class="share-settings">
            <h3 class="image-instruction-position">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="#3a3091"
                class="bi bi-gear-fill image-instruction"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
                />
              </svg>
              <span class="share-settings-text">Image Sharing Settings</span>
            </h3>
            <div class="d-flex align-items-baseline">
              <a-switch
                v-model="anybody_can_see"
                @change="onConfirmationSwitchChnaged1"
              >
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <span class="ml-3 switch-text">
                Share my images with anyone who searches on MatrimonyAssist
              </span>
            </div>
            <div class="d-flex align-items-baseline mt-4">
              <a-switch
                @change="onConfirmationSwitchChnaged2"
                v-model="only_team_can_see"
              >
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <span class="ml-3 switch-text">
                Do not share my images with anybody at the moment (my own team
                can see still)
              </span>
            </div>
            <div class="d-flex align-items-baseline mt-4">
              <a-switch
                @change="onConfirmationSwitchChnaged3"
                v-model="team_connection_can_see"
              >
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <span class="ml-3 switch-text">
                Share my images with the connected teams (only if I or they
                accept connect request)
              </span>
            </div>
            <br />
            <p>
              * please note in all these settings your own team members will be
              able to see the images that you upload.
            </p>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import Vue from "vue";
import Loader from "../../plugins/loader/loader.vue";

export default {
  name: "UploadProfile",

  components: { Loader },

  props: {
    imageModel: {
      type: Object,
    },
  },

  data() {
    return {
      activeKey: ["1"],
      avatarSrc: "",
      mainImageSrc: "",
      additionalImageSrc: "",
      anyoneFlag: false,
      onlyTeamFlag: false,
      onlyTeamConnectionsFlag: false,
      loadingButton: false,
      anybody_can_see: false,
      only_team_can_see: false,
      team_connection_can_see: false,
      loading: false
    };
  },

  created() {
    this.getImageSharingSettings();
  },

  methods: {
    clearImg(action) {
      switch (action) {
        case "main":
          this.$emit('disableNextBtn');
          this.mainImageSrc = "";
          this.imageModel.main_image_url = "";
          this.deleteImage(1);
          break;
        case "avatar":
          this.$emit('disableNextBtn');
          this.avatarSrc = "";
          this.imageModel.avatar_image_url = "";
          this.deleteImage(0);
          break;
        case "additional":
          this.additionalImageSrc = "";
          this.imageModel.additionalImageSrc = "";
          this.deleteImage(9);
          break;
      }
    },
    async deleteImage(data) {
      await this.$store.dispatch("deleteImage", data);
      this.$emit("valueChange", {
        value: {
          ...this.imageModel,
        },
        current: 3,
      });
    },
    showError(errorMessage) {
      this.$error({
        title: "Validation Error",
        content: errorMessage,
        centered: true,
      });
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
    openNotification() {
      this.$notification.open({
        message: this.$store.state.candidateInfo.successMessageTitle,
        description: this.$store.state.candidateInfo.successMessage,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    },

    getImageSharingSettings() {
      const response = this.$store.dispatch("getImageSharingSettings");
      response
        .then((data) => {
          this.anybody_can_see =
            data.data.data.personal.anybody_can_see == 1 ? true : false;
          this.only_team_can_see =
            data.data.data.personal.only_team_can_see == 1 ? true : false;
          this.team_connection_can_see =
            data.data.data.personal.team_connection_can_see == 1 ? true : false;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    getAvatar(e) {
      this.loading = true;
      let file = e.target.files[0];
      console.log(file);
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.imageModel.avatar_image_url = e.target.files[0];
      let formData = new FormData();
      formData.append("per_avatar_url", this.imageModel.avatar_image_url);
      this.saveImage(formData);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.avatarSrc = e.target.result;
        this.loading = false;
      };
    },
    getMainImage(e) {
      this.loading = true;
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.imageModel.main_image_url = e.target.files[0];
      let formData = new FormData();
      formData.append("per_main_image_url", this.imageModel.main_image_url);
      this.saveImage(formData);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.mainImageSrc = e.target.result;
        this.loading = false;
      };
    },
    getAdditionalImage(e) {
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.imageModel.additionalImageSrc = e.target.files[0];
      let formData = new FormData();
      formData.append("other_images", e.target.files[0]);


      this.saveImage(formData);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.additionalImageSrc = e.target.result;
      };
    },
    onConfirmationSwitchChnaged1(checked) {
      if (this.anybody_can_see) {
        this.only_team_can_see = false;
        this.team_connection_can_see = false;
      } else {
        this.only_team_can_see = true;
        this.team_connection_can_see = false;
      }

      this.onChangeCheckBox();
    },
    onConfirmationSwitchChnaged2(checked) {
      if (this.only_team_can_see) {
        this.anybody_can_see = false;
        this.team_connection_can_see = false;
      } else {
        this.anybody_can_see = true;
        this.team_connection_can_see = false;
      }
      this.onChangeCheckBox();
    },
    onConfirmationSwitchChnaged3(checked) {
      if (this.team_connection_can_see) {
        this.anybody_can_see = false;
        this.only_team_can_see = false;
      } else {
        this.only_team_can_see = false;
        this.anybody_can_see = true;
      }
      this.onChangeCheckBox();
    },
    onChangeCheckBox() {
      let formData = new FormData();
      formData.append("anybody_can_see", this.anybody_can_see ? 1 : 0);
      formData.append("only_team_can_see", this.only_team_can_see ? 1 : 0);
      formData.append(
        "team_connection_can_see",
        this.team_connection_can_see ? 1 : 0
      );
      this.saveImage(formData);
    },
    async saveImage(data) {
      this.$emit('turnOnBtnLoader');
      await this.$store.dispatch("uploadImages", data).then((data) => {
        if (data.data.status && data.data.status !== "FAIL") {
          let user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            user.per_main_image_url = data.data.data.main_image_url;
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(user));
          }
          this.$emit("valueChange", {
            value: {
              avatar_image_url: data.data.data.avatar_image_url,
              main_image_url: data.data.data.main_image_url,
              additionalImageSrc:
                data.data.data.other_images.length > 0
                  ? data.data.data.other_images
                  : this.additionalImageSrc,
            },
            current: 3,
          });
        }
      });
      this.$emit('turnOffBtnLoader');
    },
  },
};
</script>

<style scoped lang="scss">
fieldset {
  border: 1px solid #522e8e;
  border-radius: 10px;
}
legend {
  display: inline;
  width: inherit;
  color: #3b3194;
  font-size: 18px;
  font-weight: 600;
}
.-mt-15 {
  margin-top: -13px;
}
.contain {
  height: 123px;
  width: 220px;
  object-fit: cover;
}
@import "@/styles/base/_variables.scss";
.upload-profile-image {
  .section-heading {
    text-align: center;
    color: $color-brand;
    h5 {
      color: $color-brand;
      margin-top: 10px;
    }
    p {
      font-size: 14px;
    }
  }
  .instruction {
    text-align: left;
    border: 1px solid $color-secondary;
    padding: 10px;
    border-radius: 5px;
    width: 90%;
    margin: 0 auto 10px;
  }
  .image-and-settings {
    padding: 15px;
    background: #f6f5fb;
    .form-ma {
      .add-icon {
        svg {
          width: 60px;
          margin-top: 10px;
        }
      }
    }
    .share-settings {
      border: 1px solid $color-secondary;
      padding: 50px 15px;
      border-radius: 5px;
      position: relative;
      margin-top: 50px;
      h3 {
        color: #3b3194;
        font-size: 23px;
        font-weight: bold;
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translate(-50%, 0);
        background: #f6f5fb;
        padding: 0 20px;
        svg {
          margin-right: 9px;
        }
      }
    }
  }

  img {
    border-radius: 5px;
    height: 100%;
  }
  .img-preview {
    width: 200px;
    height: 200px;
    border: 1px solid $color-secondary;
    border-radius: 5px;
    margin: 0px auto;
  }
  input[type="file"] {
    cursor: pointer;
    width: 200px;
    height: 34px;
    overflow: hidden;
    border-radius: 5px !important;
    display: none;
  }

  .upload-label {
    width: 200px;
    height: 32px;
    font-size: 16px;
    line-height: 32px;
    display: inline-block;
    color: white;
    background: #8781bd;
    border: 1px solid #98a0e2;
    border-radius: 5px;
    padding: 0 10px;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    cursor: pointer;
  }


  //input[type="file"]::-webkit-file-upload-button {
  //  visibility: hidden;
  //}
  .btn-primary {
    margin-bottom: 5px;
  }
  .close-icon {
    display: grid;
    place-content: center;
    position: absolute;
    right: 0.5rem;
    top: -0.7rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: white;
    z-index: 1;
  }
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
.image-instruction-position {
  text-align: left;
  margin-top: 4px;
}
.image-instruction {
  display: none;
}
.share-settings-text {
  font-size: 8px;
}
.switch-text {
  font-size: 14px;
}
.ant-switch {
  max-width: 20px;
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
  .image-instruction-position {
    text-align: center;
  }
  .image-instruction-position {
    text-align: center;
    margin-top: 0;
  }
  .image-instruction {
    display: initial;
  }
  .share-settings-text {
    font-size: 18px;
  }
  .switch-text {
    font-size: 18px;
  }
}
</style>
