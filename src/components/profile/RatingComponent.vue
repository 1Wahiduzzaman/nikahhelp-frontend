<template>
  <div style="margin-right: 0px" class="row mb-2">
    <div class="col-6 mt-2">
      {{ title }}
    </div>
    <div class="col-4 text-center">
      <a-rate disabled :value="value" />
    </div>
    <div class="col-2 mt-2 text-center value-string">{{ valueString }}</div>
  </div>
</template>

<script>
export default {
  name: "RatingComponent",
  props: ["title", "value", "valueString"],
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
</style>