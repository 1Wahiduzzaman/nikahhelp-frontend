<template>
  <div class="overlay-container">
    <v-overlay :opacity="1" :value="isLoading">
      <v-progress-circular :size="100" :width="7" color="purple" indeterminate>
        Loading...
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  props: ["isLoading"],
};
</script>
<style lang="scss">
.overlay-container {
  .v-overlay {
    z-index: 0 !important;
    .v-overlay__scrim {
      background: none !important;
    }
  }
  .v-overlay__content {
    background: #fff !important;
    padding: 10px !important;
    border-radius: 10px !important;
  }
}
</style>