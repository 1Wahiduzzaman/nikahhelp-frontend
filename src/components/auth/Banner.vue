<template>
  <div class="banner">
    <div class="container">
      <div class="signup-wrapper">
        <UnAuthSearchForm @handleSearch="handleSearch" />
      </div>
    </div>
    <div class="banner-content">
      <div class="container">
        <h2 class="color-white" style="margin-bottom: 12px">
          Someone must be searching for you
        </h2>
        <p id="p-tag">
          The first friends and family based matromonial introduction service
        </p>
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
    return {};
  },
  methods: {
    handleSearch(_payload) {
      const response = this.$store.dispatch("searchUser", _payload);
      response.then((data) => {
        console.log(data);
        this.$router
          .push({
            name: "UnAuthSearch",
            params: { result: data.result },
          })
          .catch((err) => {
            console.log("err", err);
          });
      });
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
</style>