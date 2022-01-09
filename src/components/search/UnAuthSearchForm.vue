<template>
  <div :class="cardBorder">
    <div class="advanced-search font-poppins" :class="{ 'p-3': useFor == 'home' }">
      <div class="title-wrapper">
        <h3 class="heading-title font-elsie">Find Your Match</h3>
        <p class="sub-title">I am looking for</p>
      </div>
      <div class="gender-wrapper flex justify-content-between align-items-center">
        <button
          :class="{ selected: searchModel.gender == 1 }"
          @click="onSelectedGender(1)"
          class="btn gender-outline-primary btn-round focus-design mr-2"
        >
          <img src="@/assets/icon/male_colorized.svg" alt="male" class="male-icon" :class="{'img-selected': searchModel.gender == 1}" />
          Male
        </button>
        <span class="color-primary fs-16">or</span>
        <button
          :class="{ selected: searchModel.gender == 2 }"
          @click="onSelectedGender(2)"
          class="btn gender-outline-primary btn-round focus-design ml-2"
        >
          <img src="@/assets/icon/female_colorized.svg" alt="female" class="female-icon" :class="{'img-selected': searchModel.gender == 2}" />
          Female
        </button>
      </div>
      <div class="my-4">
        <SelectGroup
          @selected="onDropdownChange"
          :uniqueNames="['min_age', 'max_age']"
          :size="'large'"
          :options="ageTV"
          :placeholder="'Age'"
          :width="'120'"
          :suffixIcon="true"
          :min="[18, 24]"
          :values="[searchModel.min_age, searchModel.max_age]"
        />
        <h6 v-if="(!searchModel.min_age || !searchModel.max_age) && trying" class="text-danger fs-12 text-left pt-2 pl-2">Minimum and maximum age is required</h6>
      </div>

      <div class="my-4" v-if="useFor != 'home'">
        <SelectGroup
          @selected="onDropdownChange"
          :values="[searchModel.heightMin, searchModel.heightMax]"
          :uniqueNames="['heightMin', 'heightMax']"
          :options="getHeights"
          :placeholder="'Height'"
          :size="'large'"
          :width="'120'"
          :suffixIcon="true"
        />
        <h6 v-if="(!searchModel.heightMin || !searchModel.heightMax) && trying" class="text-danger fs-12 text-left pt-2 pl-2">Minimum and maximum height is required</h6>
      </div>

      <div class="my-4">
        <a-select
          id="country"
          v-model="searchModel.country"
          show-search
          size="large"
          :placeholder="'Select a country'"
          option-filter-prop="children"
          style="width: 100%"
          notFoundContent="Country not found"
        >
          <a-select-option
            v-for="c in countriesTV"
            :value="c.id"
            :key="c.id"
          >
            {{ c.name }}
          </a-select-option>
          <template #suffixIcon>
            <img src="@/assets/select-arrow-big.png" alt="icon" />
          </template>
        </a-select>
        <h6 v-if="!searchModel.country && trying" class="text-danger fs-12 text-left pt-2 pl-2">Country is required</h6>
      </div>

      <div class="my-4">
        <a-select
          id="religion"
          v-model="searchModel.religion"
          show-search
          size="large"
          :placeholder="'Select a religion'"
          option-filter-prop="children"
          style="width: 100%"
          notFoundContent="Religion not found"
        >
          <a-select-option
            v-for="r in religionTV"
            :value="r.id"
            :key="r.id"
          >
            {{ r.name }}
          </a-select-option>
          <template #suffixIcon>
            <img src="@/assets/select-arrow-big.png" alt="icon" />
          </template>
        </a-select>
        <h6 v-if="!searchModel.religion && trying" class="text-danger fs-12 text-left pt-2 pl-2">Religion is required</h6>
      </div>
      <div>
        <button
          @click="handleSearch"
          size="large"
          class="btn btn-block btn-round color-outline-primary h-40btn br-40"
        >
<!--          <svg-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            viewBox="0 0 42.02 40.76"-->
<!--            style="width: 25px; height: 25px"-->
<!--          >-->
<!--            <g id="Layer_2" data-name="Layer 2">-->
<!--              <g id="draw_boxes" data-name="draw boxes">-->
<!--                <path-->
<!--                  fill="#fff"-->
<!--                  class="cls-1"-->
<!--                  d="M41.67,35.89A1.33,1.33,0,0,0,41.58,34L30.34,23.79a1.34,1.34,0,0,0-1.88.09l-4,4.44a1.34,1.34,0,0,0,.09,1.88L35.78,40.41a1.32,1.32,0,0,0,1.88-.09Z"-->
<!--                />-->
<!--                <path-->
<!--                  fill="#fff"-->
<!--                  class="cls-1"-->
<!--                  d="M14.72,0A14.72,14.72,0,1,1,9.91.81,14.73,14.73,0,0,1,14.72,0m0,4a10.82,10.82,0,0,0-3.51.59h0A10.73,10.73,0,1,0,14.72,4Z"-->
<!--                />-->
<!--                <path-->
<!--                  fill="#fff"-->
<!--                  class="cls-1"-->
<!--                  d="M14.72,21.39c7.68-4,7.4-8.47,5.22-10.65s-5.22-.71-5.22,1c0-1.73-3-3.2-5.21-1S7,17.43,14.72,21.39Z"-->
<!--                />-->
<!--              </g>-->
<!--            </g>-->
<!--          </svg>-->
          <img src="@/assets/icon/search-love-secondary.svg" alt="search" class="search-icon" />
          <span class="ml-3 fs-20"> Search </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectGroup from "@/components/ui/selects/SelectGroup";
// import { ReligionTV } from "../../models/religion";
// import { CountriesTV } from "../../models/country";
import { AGES, HEIGHTS } from "@/models/data";
import ApiService from "@/services/api.service";
export default {
  name: "UnAuthSearchForm",
  data() {
    return {
      searchModel: {
        gender: 1,
        country: undefined,
        religion: undefined,
        min_age: undefined,
        max_age: undefined,
        heightMin: undefined,
        heightMax: undefined,
      },
      religionTV: [],
      countriesTV: [],
      ageTV: AGES,
      heightTv: HEIGHTS,

      showActiveTeamModal: false,
      candidateActiveTeam: null,
      activeTeamId: null,
      heightUnit: false,
      minHeightFt: null,
      maxHeightFt: null,
      trying: false
    };
  },
  components: {
    SelectGroup,
  },
  props: {
    useFor: {
      type: String,
      default: "home",
      validator: (value) => ["home", "search"].includes(value),
    },
  },
  computed: {
    cardBorder() {
      return this.useFor == "home" ? "homeCardBorder" : "searchCardBorder";
    },
    getHeights() {
      return HEIGHTS;
    },
    filterExists() {
      return (
        this.searchModel.gender &&
        this.searchModel.country &&
        this.searchModel.religion
      );
    },
  },
  created() {
    this.getCandidateInitialInfo();
  },
  methods: {
    async getCandidateInitialInfo() {
      const response = await ApiService.get("v1/initial-dropdowns");
      if (response.status === 200) {
        this.countriesTV = response.data.data.countries;
        this.religionTV = response.data.data.religions;
      }
    },
    onDropdownChange({ name, value }) {
      this.searchModel[name] = value;
    },
    onSelectedGender(gender) {
      this.searchModel.gender = gender;
    },
    handleSearch() {
      this.trying = true;
      if(this.filterExists) {
        let _payload = `min_age=${this.searchModel.min_age}&max_age=${this.searchModel.max_age}`;
        if (this.searchModel.gender > 0) {
          _payload += `&gender=${this.searchModel.gender}`;
        }
        if (this.searchModel.country) {
          _payload += `&country=${this.searchModel.country}`;
        }
        if (this.searchModel.religion) {
          _payload += `&religion=${this.searchModel.religion}`;
        }
        if(this.searchModel.heightMin) {
          _payload += `&min_height=${this.searchModel.heightMin}`
        }
        if(this.searchModel.heightMax) {
          _payload += `&max_height=${this.searchModel.heightMax}`
        }
        this.$emit("handleSearch", _payload);
      }
    },
    onAfterChangeSlider(value) {
      this.age = value;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.selected {
  background-color: #411883;
  color: #FFFFFF !important;
}
.gender-wrapper {
  button {
    width: 115px;
    font-size: 15px;
    opacity: 0.8;
  }
}
.advanced-search {
  background-color: #fff;
  border-radius: 15px;
  position: relative;
  transform: rotate(-5deg);
  z-index: -2;
  .title-wrapper {
    text-align: center;
    .title {
      //font-family: "Elsie Swash Caps";
      font-size: 32px;
      margin-bottom: 5px;
      color: $color-primary;
    }
    .sub-title {
      color: $color-primary;
      font-family: "gabriola";
      font-size: 30px;
      margin-bottom: 5px;
      font-weight: 100;
    }
  }
  .select-box {
    margin-bottom: 15px;
  }
}

.homeCardBorder {
  background: transparent;
  border: 3px solid #411883;
  border-radius: 10px;
  transform: rotate(5deg);
}

.searchCardBorder {
  background: transparent;
  border-radius: 10px;
  transform: rotate(5deg);
}
.btn-outline-primary, .color-outline-primary, .gender-outline-primary {
  color: $color-primary;
  border-color: $border-primary;
  &:hover {
    background: $bg-secondary;
    color: $color-white;
    text-decoration: none;
    img {
      filter: brightness(0) invert(1);
    }
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.gender-outline-primary:hover {
  color: #FFFFFF;
  background: #411883;
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  &:hover {
    background: $bg-secondary;
    color: $color-white;
    text-decoration: none;
    img {
      filter: brightness(0) invert(1);
    }
  }
}
.male-icon {
  width: 14px;
}
.female-icon {
  width: 10px;
}
.br-40 {
  border-radius: 40px !important;
}
.h-40btn {
  height: 40px;
  padding-top: 3px;
}
.gender-outline-primary:focus, .gender-outline-primary:active {
  outline: none;
  box-shadow: none;
}
.img-selected {
  filter: brightness(0) invert(1);
}
.search-icon {
  width: 24px;
}
.heading-title {
  margin-bottom: 5px;
  color: #6159a7;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: .0125em;
  line-height: 2rem;
}
</style>