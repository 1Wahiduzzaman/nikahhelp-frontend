<template>
  <div class="mt-10">
      <v-divider class="d-md-none"></v-divider>
    <v-row>
      <v-col class="pt-1" cols="12" md="6">
          {{ title }}
      </v-col>
      <v-col class="pt-1" cols="12" md="6">
        <div class="d-sm-none flex justify-space-between align-center">
          <a-rate disabled class="pl-0" :value="value" />
          <span style="color: gray; font-size:9px">{{ rate[value] }}</span>
        </div>
        <div class="d-none d-sm-flex d-md-block justify-space-between text-right">
          <a-rate disabled class="pl-0" :value="value" />
          <v-chip
          class="ml-5"
          style="background: #6159a7; width: 115px; text-align:center"
          text-color="white"
          small
          >{{ rate[value] }}</v-chip
        >
        </div>
      </v-col>
    </v-row>
    <div style="margin-right: 0px" class="row mb-2 d-none">
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
