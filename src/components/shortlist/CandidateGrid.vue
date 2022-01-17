<template>
  <v-card
      class="mx-auto shadow-default shortlist-card"
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
      <v-chip
          class="ma-2"
          :color="item.from_short_list ? 'green' : 'orange'"
          text-color="white"
          small
      >
        {{ item.from_short_list ? 'Shortlisted' : 'Teamlisted' }}
      </v-chip>
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

    <div class="flex flex-wrap justify-space-between px-4">
      <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
          @click="actionShortlist"
      >
        <div class="flex justify-center align-center">
          <img
              style="height: 13px; margin-right: 4px;"
              src="@/assets/icon/star-fill-white.svg"
              alt=""
          >
          {{ shortlisted ? 'Unlist' : 'Shortlist' }}
        </div>
      </v-btn>
      <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
          @click="actionConnection"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/connect.svg" alt="">
          {{ item.is_connect ? 'Connected' : 'Connect' }}
        </div>
      </v-btn>
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
          @click="actionTeamlist"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/teamlist.svg" alt="">
          {{ teamlisted ? 'Unlist team' : 'Teamlist' }}
        </div>
      </v-btn>
      <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="pink darken-1"
          dark
          @click="actionBlock"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block.svg" alt="">
          Block
        </div>
      </v-btn>
    </div>
    <div class="px-4 pb-4 mt-4">
      <v-btn
          class="mt-1 text-capitalize"
          block
          rounded
          color="deep-purple darken-1"
          dark
          @click="viewProfile"
      >
        view profile
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import ApiService from '@/services/api.service';
import JwtService from "@/services/jwt.service";

export default {
  name: "CandidateGrid",
  props: ['item', 'shortListedIds', 'teamListedIds'],
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
    }
  },
  computed: {
    loggedUser() {
      return JSON.parse(localStorage.getItem('user'));
    },
    shortlisted() {
      return this.shortListedIds.includes(parseInt(this.item.user_id));
    },
    teamlisted() {
      return this.teamListedIds.includes(parseInt(this.item.user_id));
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
    actionShortlist() {
      if(this.shortListedIds.includes(parseInt(this.item.user_id))) {
        ApiService.delete(`/v1/delete-short-listed-by-candidates?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");
        }).catch(e => {
          console.log(e);
        });
      } else {
        ApiService.post(`/v1/short-listed-candidates/store`, { user_id: this.item.user_id, shortlisted_by: this.loggedUser.id }).then(res => {
          this.$emit("loadList");
        }).catch(e => {
          console.log(e);
        });
      }
    },
    actionTeamlist() {
      if(this.teamListedIds.includes(this.item.user_id)) {
        ApiService.delete(`/v1/delete-team-short-listed-by-candidates?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");
        }).catch(e => {
          console.log(e);
        })
      } else {
        ApiService.post(`/v1/team-short-listed-candidates/store`, { user_id: this.item.user_id, team_listed_by: this.loggedUser.id }).then(res => {
          this.$emit("loadList");
        }).catch(e => {
          console.log(e);
        });
      }
    },
    actionBlock() {
      ApiService.post(`/v1/store-block-list`, { user_id: this.item.user_id })
          .then(res => {
            this.$emit("loadList");
          }).catch(e => {
        console.log(e);
      });
    },
    actionConnection() {
      let myTeamId = JwtService.getTeamIDAppWide();
      if(!this.item.is_connect) {
        if(!myTeamId) {
          this.showError("You don't have an active team")
          return;
        }
        if(!this.item.team_id) {
          this.showError("This candidate has no active team")
          return;
        }

        let payload = {
          from_team_id: myTeamId,
          to_team_id: this.item.team_id
        }
        ApiService.post(`/v1/send-connection-request`, payload)
            .then(res => {
              this.$success({
                title: "Connection Request Sent Successfully!",
                centered: true,
              });
              let payload = {
                receivers: [this.item.user_id],
                title: `sent you a new team connection request`,
                team_temp_name: null,
                team_id: this.item.team_id
              };
              this.$emit("socketNotification", payload);
            }).catch(e => {
          console.log(e);
        });
      } else {
        //
      }
    },
    showError(message) {
      this.$error({
        title: message,
        center: true,
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.shortlist-card {
  max-width: 300px;
  @media (min-width: 1200px) {
    max-width: 374px;
  }
}
</style>