<template>
  <div class="class">
    <div v-if="imageModel && !loading" class="upload-profile-image">
      <Loader :isLoading="loading" />

      <a-collapse :default-active-key="1" :bordered="false" expand-icon-position="right" v-if="!loading">
        <template #expandIcon="props">
          <a-icon type="caret-down" :rotate="props.isActive ? 180 : 0" />
        </template>
        <a-collapse-panel key="1" header="1. Upload Images">
          <h5 class="text-left mt-2">Upload your Image</h5>
          <div class="instruction text-black-70">
            <p>
              * Please upload 2 images.. The first is for your avatar. The second
              image is for identification purpose as necessary in line with
              MatrimonyAsssit terms and conditions. The pictures need to be your
              own current image and in colour.
            </p>
            <p>* The maximum size of each image is 4MB.</p>
          </div>

          <!-- Image Upload Input -->
          <div class="image-and-settings">
            <form class="form-ma">
              <a-row type="flex" align="top">
                <a-col class="form-item py-3" :span="24">
                  <a-row type="flex" align="top" class="justify-content-around">
                    <a-col>
                      <!-- Avatar Image -->
                      <div class="col-md-4 flex text-center">
                        <div>
                          <div class="img-preview mb-2">
                            <img 
                              v-viewer="{toolbar: false, title: false, navbar: false}"
                              :src=" avatarSrc ? avatarSrc : imageModel.per_avatar_url" 
                              class="contain" 
                              v-if="imageModel.per_avatar_url" 
                            />
                            <div class="mt-3" v-if="!imageModel.per_avatar_url">Avatar Image</div>
                            <div class="mt-4" v-if="!imageModel.per_avatar_url">
                              <a-icon type="plus-circle" :style="{ fontSize: '80px', color: '#aaa' }" />
                            </div>
                          </div>
                          <!-- <input
                            v-if="!imageModel.per_avatar_url"
                            type="file"
                            class="input-image"
                            name="avatar"
                            @change="getAvatar"
                          /> -->
                          <label for="input-avatar-image" class="upload-label" v-if="!imageModel.per_avatar_url">
                            Upload
                            <input v-if="!imageModel.per_avatar_url" type="file" class="input-image" id="input-avatar-image" name="avatar"
                            @change="getAvatar" />
                          </label>
                          <a-button type="primary" style="width: 200px; border-radius: 5px;" v-if="imageModel.per_avatar_url"
                            @click="clearImg('avatar')"
                          >
                            Remove
                          </a-button>
                        </div>
                      </div>
                    </a-col>
                    <a-col>
                      <!-- Main Image -->
                      <div class="col-md-4 flex text-center">
                        <div>
                          <div class="img-preview mb-2">
                            <img v-viewer="{toolbar: false, title: false, navbar: false}"
                              :src="mainImageSrc ? mainImageSrc : imageModel.per_main_image_url" 
                              class="contain" 
                              v-if="imageModel.per_main_image_url" 
                            />
                            <div class="mt-3" v-if="!imageModel.per_main_image_url">Main Profile Image</div>
                            <div class="mt-4" v-if="!imageModel.per_main_image_url">
                              <a-icon type="plus-circle" :style="{ fontSize: '80px', color: '#aaa' }" />
                            </div>
                          </div>
                          
                          <label for="input-main-image" class="upload-label" v-if="!imageModel.per_main_image_url">
                            Upload
                            <input v-if="!imageModel.per_main_image_url" type="file" class="input-image" id="input-main-image" name="mainImage"
                            @change="getMainImage" />
                          </label>
                          <a-button type="primary" style="width: 200px; border-radius: 5px;" v-if="imageModel.per_main_image_url"
                            @click="clearImg('main')">
                            Remove
                          </a-button>
                        </div>
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </form>
          </div>
          <!-- <button class="btn btn-info" @click="saveImages">Save</button> -->

          <!-- Previous Image sharing setting starts here -->
          <!-- <div class="share-settings mt-5">
      <div class="share-settings">
        <h5 class="text-center share-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#3a3091"
            class="bi bi-gear-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
            />
          </svg>
          Image Sharing Settings
        </h5>
        <div class="flex permission mt-5">
          <a-switch
              v-model="imageModel.anybody_can_see"
              @change="onConfirmationSwitchChnaged1"
          >
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          <span class="ml-4">
            I don't want to share my images with anyone at this moment
          </span>
        </div>
        <div class="flex permission mt-3">
          <a-switch
              v-model="imageModel.only_team_can_see"
              :disabled="imageModel.anybody_can_see"
              @change="onConfirmationSwitchChnaged2"
          >
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          <span class="ml-4">
            I would like to share all my images with my team
          </span>
        </div>
        <div class="flex permission mt-3">
          <a-switch
              v-model="imageModel.team_connection_can_see"
              :disabled="imageModel.anybody_can_see"
              @change="onConfirmationSwitchChnaged3"
          >
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
          <span class="ml-4">
            I would like to share all my images with connected team(s)
          </span>
        </div>
      </div>
     
    </div> -->
          <!-- <a-button
      shape="round"
      type="primary"
      style="float: right"
      class="mt-3 btn btn-primary"
      @click="saveImages"
    >
      Save &#38; Continue
    </a-button> -->
        </a-collapse-panel>
      </a-collapse>

    </div>
  </div>

</template>

<script>
import Loader from '../../plugins/loader/loader.vue';
export default {
  name: "ImageUpload",

  components: { Loader },

  props: {
    imageModel: {
      type: Object,
    },
  },

  data() {
    return {
      src: "",
      avatar: "",
      avatarSrc: "",
      mainImage: "",
      mainImageSrc: "",
      additionalImage: "",
      additionalImageSrc: "",
      loading: false
    };
  },

  async mounted() { },

  methods: {
    clearImg(action) {
      switch (action) {
        case "main":
          this.mainImageSrc = "";
          this.imageModel.per_main_image_url = "";
          this.deleteImage(1);
          break;
        case "avatar":
          this.avatarSrc = "";
          this.imageModel.per_avatar_url = "";
          this.deleteImage(0);
          break;
      }
    },
    async deleteImage(data) {
      this.$emit('disableNextBtn');
      await this.$store.dispatch("deleteRepImage", data);
      this.$emit("valueChange", {
        value: {
          ...this.imageModel,
        },
        current: 1,
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

    getAvatar(e) {
      this.loading = true;
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }

      this.imageModel.per_avatar_url = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.imageModel.per_avatar_url);
      this.saveImages(formData, '_per_avatar_url');
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.avatarSrc = e.target.result;
        this.loading = false
      };
    },
    getMainImage(e) {
      this.loading = true;
      let file = e.target.files[0];
      if (!this.imageSizeCheck(file)) {
        file = "";
        return;
      }
      this.imageModel.per_main_image_url = e.target.files[0];
      let formData = new FormData();
      formData.append("image", this.imageModel.per_main_image_url);
      this.saveImages(formData, '_per_main_image_url');
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.mainImageSrc = e.target.result;
        this.loading = false
      };
      console.log(this.mainImageSrc);
    },
    onConfirmationSwitchChnaged1(checked) {
      console.log(checked);
      if (checked) {
        this.imageModel.only_team_can_see = false;
        this.imageModel.team_connection_can_see = false;
      }
      checked == true
        ? (this.imageModel.anybody_can_see = 1)
        : (this.imageModel.anybody_can_see = 0);
      this.saveRepresentativeImageCondition({
        anybody_can_see: this.imageModel.anybody_can_see,
      });
    },
    onConfirmationSwitchChnaged2(checked) {
      console.log(checked);
      checked == true
        ? (this.imageModel.only_team_can_see = 1)
        : (this.imageModel.only_team_can_see = 0);
      this.saveRepresentativeImageCondition({
        only_team_can_see: this.imageModel.only_team_can_see,
      });
    },
    onConfirmationSwitchChnaged3(checked) {
      console.log(checked);
      checked == true
        ? (this.imageModel.team_connection_can_see = 1)
        : (this.imageModel.team_connection_can_see = 0);

      this.saveRepresentativeImageCondition({
        team_connection_can_see: this.imageModel.team_connection_can_see,
      });
    },

    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },

    async saveRepresentativeImageCondition(data) {
      await this.$store
        .dispatch("saveRepresentativeImageCondition", data)
        .then((data) => { })
        .catch((error) => { });
    },
    async saveImages(data, filename) {
      this.$emit('turnOnBtnLoader');
      const imageData = {
        image: data,
        fileName: filename
      };
      await this.$store
        .dispatch("saveRepresentativeImage", {folder: filename, image: data})
        .then((data) => {
          console.log(data);

            let user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              user.per_main_image_url = filename === '_per_main_image_url' ? process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0] : '';
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(user));
            }

              
      

            this.$emit("valueChange", {
              value: {
                per_avatar_url: filename === '_per_avatar_url' ? process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0] : '',
                per_main_image_url: filename === '_per_main_image_url' ? process.env.VUE_APP_IMAGE + '/' + Object.values(data)[0] : ''
              },
              current: 1,
            });
          
          // if (data.status && data.status == "FAIL") {
          //   const errorMessage = JSON.stringify(data.data.data);
          //   this.showError(errorMessage);
          //   this.loadingButton = false;
          // }
        }).catch((error) => {
          this.loadingButton = false;
          console.log(error);
        });
      this.$emit('turnOffBtnLoader');
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";

.contain {
  height: 123px;
  width: 220px;
  object-fit: cover;
}

.upload-profile-image {
  .section-heading {
    text-align: center;
    color: $color-brand;

    h5 {
      color: $color-brand;
      margin-left: 35px;
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
    //width: 90%;
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

      .share-text {
        color: #3b3194;
        font-size: 14px;
        font-weight: bold;
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translate(-50%, 0);
        background: #f6f5fb;
        padding: 0 20px;

        @media (min-width: 768px) {
          font-size: 18px;
        }

        @media (min-width: 1400px) {
          font-size: 22px;
        }

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
}

.permission {
  span {
    font-size: 14px;

    @media (min-width: 768px) {
      font-size: 16px;
    }

    @media (min-width: 1400px) {
      font-size: 18px;
    }
  }
}

.ant-tooltip-inner {
  border-radius: 0px;
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
}
</style>
