<template>
  <div class="banner">
    <div class="container">
      <div class="signup-wrapper">
        <UnAuthSearchForm @handleSearch="handleSearch" />
      </div>
    </div>
    <div class="banner-content font-poppins">
      <div class="container">
        <div class="flex flex-direction justify-content-center align-items-center">
          <div>
            <h2 class="color-white" style="margin-bottom: 12px">
              Someone must be searching for you
            </h2>
            <p id="p-tag font-poppins">
              The first friends and family based matromonial introduction service
            </p>
          </div>
          <div class="ml-5">
            <button class="btn btn-round btn-parter-search" id="startBtn" onclick="location.href = '/signup';"><span>Start here</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import UnAuthSearchForm from "@/components/search/UnAuthSearchForm";
export default {
  name: "Banner",
  components: {UnAuthSearchForm },
  data() {
    return {
      countries: [],
      religions: []
    };
  },
  methods: {
    handleSearch(_payload) {
      this.$router
          .push({
            name: "UnAuthSearch",
            params: { url: _payload },
          });
      // await ApiService.get(_payload).then(response => {
      //   if(response && response.data && response.data.status != 'FAIL') {
      //     this.$router
      //         .push({
      //           name: "UnAuthSearch",
      //           params: { url: response.data.data.data },
      //         });
      //   } else {
      //     this.$error({
      //       title: "No candidate found",
      //       center: true,
      //     });
      //   }
      // }).catch(e => {
      //   this.$error({
      //     title: "Something went wrong!",
      //     center: true,
      //   });
      // });
    },
  },
};
</script>
<style lang="scss">
@import "~@vueform/slider/themes/default.css";
@import "@/styles/base/_variables.scss";
.banner {
  background: url("~@/assets/Top image.jpg") no-repeat center center / cover;
  color: $color-white;
  text-align: center;
  position: relative;
  padding: 150px 0 200px;
  z-index: 9;

  @media (min-height: 720px) {
    height: 800px;
  }
  @media (min-height: 800px) {
    height: 1000px;
  }

  @media (min-height: 1000px) {
    height: 1050px;
  }

  @media (min-height: 1050px) {
    height: 1200px;
  }
  @media (min-height: 1200px) {
    height: 1300px;
  }

  @media (min-height: 1366px) {
    height: 1400px;
  }

  @media (max-width: 575px) {
    padding: 120px 0 200px;
  }
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .select-custom {
    border-radius: 18px;
    border: 1px solid $border-primary;
    color: $color-primary;
  }
  .slideFocus {
    background: red !important;
  }
  .signup-wrapper {
    position: relative;
    width: 300px;
    margin-left: auto;
    margin-right: 30px;
    @media (max-width: 991px) {
      margin: auto;
    }
    .card-signup-border {
      position: absolute;
      content: "";
      background: transparent;
      left: 15px;
      top: -22px;
      bottom: -25px;
      right: -20px;
      border: 1px solid $border-primary;
      border-radius: 10px;
      transform: rotate(5deg);
      @media (max-width: 991px) {
        display: none;
      }
    }
    .card-signup {
      position: relative;
      z-index: 1;
      background: $color-white;
      color: $color-primary;
      padding: 30px;
      border-radius: 15px;
      .selected {
        border: 1px solid rgb(138, 135, 155);
        // box-shadow: 2px 2px 2px rgb(63, 63, 63);
        background-color: #a8a5cc;
      }
    }
  }
  .banner-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    padding: 15px 0;
  }
  .slider-handle {
    width: 15px !important;
    height: 23px !important;
    border-radius: 10%;
    background: $color-primary;
    border: 0;
    right: -8px;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
    cursor: grab;
  }
  .slider:focus {
    outline: none;
  }
  .slider-tooltip {
    display: none;
  }
  .slider-connect {
    background: $color-primary;
    cursor: pointer;
  }
  .slider-base {
    background-color: #fff;
    border: 1px solid $color-primary;
    border-radius: 5px;
    height: 13px !important;
  }

  @media (max-width: 575px) {
    padding: 120px 0 200px;
  }
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .select-custom {
    border-radius: 18px;
    border: 1px solid $border-primary;
    color: $color-primary;
  }
  .slideFocus {
    background: red !important;
  }
  .signup-wrapper {
    position: relative;
    width: 300px;
    margin-left: auto;
    margin-right: 40px;
    @media (max-width: 991px) {
      margin: auto;
    }
    // .card-signup-border {
    // 	position: absolute;
    // 	content: "";
    // 	background: transparent;
    // 	left: 15px;
    // 	top: -22px;
    // 	bottom: -25px;
    // 	right: -20px;
    // 	border: 1px solid $border-primary;
    // 	border-radius: 10px;
    // 	transform: rotate(5deg);
    // 	z-index: 1;
    // 	@media (max-width: 991px) {
    // 		display: none;
    // 	}
    // }
    .card-signup {
      position: relative;
      z-index: 1;
      background: $color-white;
      color: $color-primary;
      padding: 30px;
      border-radius: 15px;
      .selected {
        border: 1px solid rgb(138, 135, 155);
        // box-shadow: 2px 2px 2px rgb(63, 63, 63);
        background-color: #a8a5cc;
      }
    }
  }
  .banner-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    padding: 15px 0;
  }
  .slider-handle {
    width: 15px !important;
    height: 23px !important;
    border-radius: 10%;
    background: $color-primary;
    border: 0;
    right: -8px;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
    cursor: grab;
  }
  .slider:focus {
    outline: none;
  }
  .slider-tooltip {
    display: none;
  }
  .slider-connect {
    background: $color-primary;
    cursor: pointer;
  }
  .slider-base {
    background-color: #fff;
    border: 1px solid $color-primary;
    border-radius: 5px;
    height: 13px !important;
  }

  .prev {
    position: absolute;
    left: -4px;
    top: -9px;
  }
  .next {
    position: absolute;
    right: -5px;
    top: -9px;
  }
}

#countryReligionDesign {
  text-align: center;
  align-items: center;
  padding-left: 50px;
}

#searchIcon {
  padding: 0%;
  font-weight: bold;
}

#p-tag {
  font-family: "Rochester", cursive;
  text-align: center;
  font-style: italic;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: normal;
}
#startBtn {
  font-family: "Rochester", cursive;
  font-size: 25px ;
  padding: 0px 30px 0px 30px;
  text-align: center;
  font-weight: bold;
  box-sizing: border-box;
  letter-spacing: 2px;
  border-color: #FFFFFF;
  color:  #FFFFFF;
  background: transparent;
  border-width: 2px;
  border-radius: 20px;
}
.btn-parter-search {
  border: none;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
}

.btn-parter-search span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn-parter-search span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.btn-parter-search:hover {
  border-radius: 40px;
}
.btn-parter-search:hover span {
  padding-right: 20px;
}

.btn-parter-search:hover span:after {
  opacity: 1;
  right: 0;
}
.flex-direction {
  flex-direction: column;
  @media (min-width: 992px) {
    flex-direction: row;
  }
}
</style>