<template>
  <div class="d-flex align-items-center justify-content-center select-group">
    <a-select
      :style="{ maxWidth: width + 'px',width: width + 'px' }"
      :id="uniqueNames[0]"
      @select="onSelect"
      show-search
      size="large"
      dropdownClassName="first_one"
      :placeholder="placeholder"
      :dropdownMatchSelectWidth="false"
      option-filter-prop="children"
      :data-unique="uniqueNames[0]"
    >
      <a-select-option
        :value="option.value"
        v-for="option in options"
        :key="`${uniqueNames[0]}=${option.label}`"
      >
        <div v-html="option.label"></div>
      </a-select-option>
      <template #suffixIcon>
        <img src="@/assets/select-arrow-big.png" alt="" />
      </template>
    </a-select>
    <div class="mx-2" style="color: #7e7e7e">TO</div>
    <a-select
      :style="{ maxWidth: width + 'px',width: width + 'px' }"
      @select="onSelect"
      size="large"
      show-search
      dropdownClassName="second_one"
      :dropdownMatchSelectWidth="false"
      :placeholder="placeholder"
      option-filter-prop="children"
      :data-unique="uniqueNames[1]"
      :id="uniqueNames[1]"
    >
      <a-select-option
        :value="option.value"
        v-for="option in options"
        :key="`${uniqueNames[1]}=${option.label}`"
      >
        <div v-html="option.label"></div>
      </a-select-option>
      <template #suffixIcon>
        <img src="@/assets/select-arrow-big.png" alt="" />
      </template>
    </a-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  props: ["placeholder", "options", "uniqueNames", "width"],
  watch: {
    value(val) {
      console.log("value", val);
    },
  },
  methods: {
    onSearch(searchText) {
      this.dataSource = !searchText
        ? []
        : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelect(value, option) {
      this.$emit("selected", {
        value: value,
        name: option.key.substring(0, option.key.indexOf("=")),
      });
      console.log("selected", {
        value: value,
        name: option.key.substring(0, option.key.indexOf("=")),
      });
    },
  },
};
</script>

<style  lang="scss">
@import "@/styles/base/_variables.scss";
.select_group_wrapper {
  position: relative;
}
.dropdown_area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dropdown {
    padding: 4px 6px;
    border: 1px solid $color-primary;
    border-radius: 4px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 19px;
    
  }

  .dropdown__left {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .dropdown__right {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.options_wrapper {
  position: absolute;
  left: -130px;
  bottom: -40px;
  background: #fff;
  
}
p {
  //width: 140px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
</style>