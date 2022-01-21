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
        :src="item.image ? item.image : avatarSrc"
    ></v-img>

    <v-card-title>
      {{ getName }}
<!--      <v-chip-->
<!--          class="ma-2"-->
<!--          :color="item.candidate_list ? 'green' : 'orange'"-->
<!--          text-color="white"-->
<!--          small-->
<!--      >-->
<!--        {{ item.candidate_list ? 'Self' : 'Teamlisted' }}-->
<!--      </v-chip>-->
    </v-card-title>

    <div class="px-4">
      <ul class="desc-list">
        <!-- Location -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Location</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ item.per_ethnicity }}
                    </span>
                </span>
        </li>
        <!-- Age -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Age</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ item.per_age }} </span>
                </span>
        </li>

        <!-- Religion -->
        <li class="flex-between-start">
          <span class="flex-30 label-text">Religion</span>
          <span class="flex-70">:
                    <span class="ml-1">{{ item.per_religion }}</span>
                </span>
        </li>
<!--        <template v-if="onceMore">-->
<!--          <li class="flex-between-start">-->
<!--            <span class="flex-30 label-text">Ethnicity</span>-->
<!--            <span class="flex-70">:-->
<!--                        <span class="ml-1">Ethnicity </span>-->
<!--                    </span>-->
<!--          </li>-->
<!--          <li class="flex-between-start">-->
<!--            <span class="flex-30 label-text">Hobby</span>-->
<!--            <span class="flex-70">:-->
<!--                        <span class="ml-1">  </span>-->
<!--                    </span>-->
<!--          </li>-->
<!--        </template>-->
      </ul>
    </div>
    <v-divider class="mx-4"></v-divider>

    <div class="mt-3 px-4 flex flex-wrap justify-space-between pb-3">
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          small
          outlined
          color=""
          dark
          @click="unblockAction"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block-secondary.svg" alt="">
          Unblock
        </div>
      </v-btn>
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block-secondary.svg" alt="">
          Report
        </div>
      </v-btn>
    </div>
    <div class="px-4 pb-4">
      <v-btn
          class="mt-1 text-capitalize btn-connection color-primary"
          block
          rounded
          outlined
          color=""
          dark
          @click="viewProfile"
      >
        <div class="flex justify-center align-center">
          <a-icon type="user" class="mr-2" />
          View Profile
        </div>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import ApiService from '@/services/api.service';
import JwtService from "@/services/jwt.service";
export default {
  name: "BlockedCandidateGrid",
  props: ['item', 'candidateBlockIds', 'teamBlockedIds'],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
  },
  computed: {
    loggedUser() {
      return JSON.parse(localStorage.getItem('user'));
    },
    getName() {
      return this.item.first_name + ' ' + this.item.last_name;
    }
  },
  methods: {
    viewProfile() {
      this.$router.push(
          `/user/profile/${this.item.user_id}`
      );
    },
    unblockAction() {
      if(this.item.candidate_list) {
        ApiService.delete(`/v1/unblock-by-candidate?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");
        }).catch(e => {
          console.log(e);
        });
      }
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
.btn-connection:hover {
  box-shadow: 0 1px 6px #787474;
  border: 1px solid white !important;
  background: $bg-primary;
  color: $color-white !important;
  div {
    img {
      filter: brightness(0) invert(1);
    }
  }
}
</style>