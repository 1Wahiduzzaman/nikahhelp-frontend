<template>
  <v-card
      class="mx-auto shadow-default blocked-card"
  >
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>
    <v-img
        height="250"
        :src="avatarSrc"
    ></v-img>

    <v-card-title>Candidate name</v-card-title>

    <div class="px-4">
      <ul class="desc-list">
        <!-- Location -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Location</span>
          <span class="flex-70">:
                    <span class="ml-1">Location
                    </span>
                </span>
        </li>
        <!-- Age -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Age</span>
          <span class="flex-70">:
                    <span class="ml-1">Age </span>
                </span>
        </li>

        <!-- Religion -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Religion</span>
          <span class="flex-70">:
                    <span class="ml-1">Religion</span>
                </span>
        </li>
        <template v-if="onceMore">
          <li class="flex-between-start">
            <span class="flex-30 label-text">Ethnicity</span>
            <span class="flex-70">:
                        <span class="ml-1">Ethnicity </span>
                    </span>
          </li>
          <li class="flex-between-start">
            <span class="flex-30 label-text">Hobby</span>
            <span class="flex-70">:
                        <span class="ml-1">  </span>
                    </span>
          </li>
        </template>
      </ul>
    </div>
    <v-divider class="mx-4"></v-divider>

    <div class="mt-3 px-4 flex flex-wrap justify-space-between pb-3">
      <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/teamlist.svg" alt="">
          Unblock
        </div>
      </v-btn>
      <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="pink darken-1"
          dark
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block.svg" alt="">
          Report
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "BlockedCandidateGrid",
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.blocked-card {
  max-width: 300px;
  @media (min-width: 1200px) {
    max-width: 374px;
  }
}
</style>