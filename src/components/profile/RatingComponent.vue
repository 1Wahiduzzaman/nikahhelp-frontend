<template>
  <div style="margin-right: 0px" class="row mb-2">
    <div class="col-6 mt-2 label-text">
      {{ title }}
    </div>
    <div class="col-6 text-right review none-r-padding">
      <a-rate disabled :value="value" />
      <v-chip
        class="ml-5"
        style="background: #6159a7; width: 115px; text-align:center"
        text-color="white"
        small
        >{{ rate[value] }}</v-chip
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "RatingComponent",
  props: ["title", "value", "valueString"],
  data() {
    return {
      rate: {
        0: "----",
        1: "Not Important",
        2: "Quite Important",
        3: "Important",
        4: "Very Important",
        5: "Extremly Important",
      },
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.ant-rate {
  color: $color-primary;
}
.value-string {
  background-color: $color-primary;
  color: white;
  border-radius: 20px;
}
.none-r-padding {
  padding-right: 0;
}
.label-text {
  font-weight: 600;
}
</style>
