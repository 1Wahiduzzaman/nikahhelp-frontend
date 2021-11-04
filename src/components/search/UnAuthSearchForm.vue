<template>
  <div :class="cardBorder">
    <div class="advanced-search" :class="{ 'p-3': useFor == 'home' }">
      <div class="title-wrapper">
        <h3 class="title">Find Your Match</h3>
        <p class="sub-title">I am looking for</p>
      </div>
      <div class="text-center gender-wrapper">
        <button
          :class="{ selected: searchModel.gender == 1 }"
          @click="onSelectedGender(1)"
          class="btn btn-primary btn-round focus-design mr-2"
        >
          <img src="@/assets/icon/male.svg" alt="male" /> Male
        </button>
        <button
          :class="{ selected: searchModel.gender == 2 }"
          @click="onSelectedGender(2)"
          class="btn btn-primary btn-round focus-design ml-2"
        >
          <img src="@/assets/icon/female.svg" alt="female" /> Female
        </button>
      </div>
      <div class="my-4">
        <SelectGroup
          @selected="onDropdownChange"
          :uniqueNames="['min_age', 'max_age']"
          :options="ageTV"
          :placeholder="'Age'"
          :width="'120'"
        />
      </div>

      <div class="my-4" v-if="useFor != 'home'">
        <SelectGroup
          @selected="onDropdownChange"
          :uniqueNames="['heightMin', 'heightMax']"
          :options="heightTV"
          :placeholder="'Height'"
          :width="'220'"
        />
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
            :value="c.value"
            :key="c.text"
          >
            {{ c.text }}
          </a-select-option>
          <template #suffixIcon>
            <img src="@/assets/select-arrow-big.png" alt="" />
          </template>
        </a-select>
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
            :value="r.value"
            :key="r.text"
          >
            {{ r.text }}
          </a-select-option>
          <template #suffixIcon>
            <img src="@/assets/select-arrow-big.png" alt="" />
          </template>
        </a-select>
      </div>
      <div>
        <a-button
          :disabled="!filterExists"
          @click="handleSearch"
          type="primary"
          size="large"
          block
          shape="round"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42.02 40.76"
            style="width: 25px; height: 25px"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="draw_boxes" data-name="draw boxes">
                <path
                  fill="#fff"
                  class="cls-1"
                  d="M41.67,35.89A1.33,1.33,0,0,0,41.58,34L30.34,23.79a1.34,1.34,0,0,0-1.88.09l-4,4.44a1.34,1.34,0,0,0,.09,1.88L35.78,40.41a1.32,1.32,0,0,0,1.88-.09Z"
                />
                <path
                  fill="#fff"
                  class="cls-1"
                  d="M14.72,0A14.72,14.72,0,1,1,9.91.81,14.73,14.73,0,0,1,14.72,0m0,4a10.82,10.82,0,0,0-3.51.59h0A10.73,10.73,0,1,0,14.72,4Z"
                />
                <path
                  fill="#fff"
                  class="cls-1"
                  d="M14.72,21.39c7.68-4,7.4-8.47,5.22-10.65s-5.22-.71-5.22,1c0-1.73-3-3.2-5.21-1S7,17.43,14.72,21.39Z"
                />
              </g>
            </g>
          </svg>
          <span class="ml-3 fs-20"> Search </span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectGroup from "@/components/ui/selects/SelectGroup";
import { ReligionTV } from "../../models/religion";
import { CountriesTV } from "../../models/country";
import { AGES, HEIGHTS } from "../../models/data";
export default {
  name: "UnAuthSearchForm",
  data() {
    return {
      searchModel: {
        gender: 0,
        country: undefined,
        religion: undefined,
        min_age: 0,
        max_age: 0,
        heightMin: null,
        heightMax: null,
      },
      religionTV: ReligionTV,
      countriesTV: CountriesTV,
      ageTV: AGES,
      heightTv: HEIGHTS,

      showActiveTeamModal: false,
      candidateActiveTeam: null,
      activeTeamId: null,
      heightUnit: false,
      minHeightFt: null,
      maxHeightFt: null,
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
    filterExists() {
      return (
        this.searchModel.gender &&
        this.searchModel.country &&
        this.searchModel.religion
      );
    },
  },
  methods: {
    onDropdownChange({ name, value }) {
      console.log({ name, value });
      this.searchModel[name] = value;
    },
    onSelectedGender(gender) {
      this.searchModel.gender = gender;
    },
    handleSearch() {
      let _payload = `v1/home-searches?page=0&parpage=10&min_age=${this.searchModel.min_age}&max_age=${this.searchModel.max_age}`;
      if (this.searchModel.gender > 0) {
        _payload += `&gender=${this.searchModel.gender}`;
      }
      if (this.searchModel.country != "") {
        _payload += `&country=${this.searchModel.country}`;
      }
      if (this.searchModel.religion != "") {
        _payload += `&religion=${this.searchModel.religion}`;
      }
      console.log("_payload", _payload);

      this.$emit("handleSearch", _payload);
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
  border: 1px solid rgb(138, 135, 155);
  background-color: #372ac4;
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
      font-family: "Elsie Swash Caps";
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
</style>