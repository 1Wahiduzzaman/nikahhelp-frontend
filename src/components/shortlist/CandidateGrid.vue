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
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
          @click="actionShortlist"
      >
        <div class="flex justify-center align-center">
          <img
              style="height: 13px; margin-right: 4px;"
              src="@/assets/icon/star-fill-secondary.svg"
              alt=""
          >
          {{ shortlisted ? 'Unlist' : 'Shortlist' }}
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
          @click="actionConnection"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/connection-secondary.svg" alt="">
          {{ item.is_connect ? 'Connected' : 'Connect' }}
        </div>
      </v-btn>
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <v-btn
          class="text-capitalize btn-connection color-primary"
          style="width:47%"
          rounded
          outlined
          small
          color=""
          dark
          @click="actionTeamlist"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/group-fill-secondary.svg" alt="">
          {{ teamlisted ? 'Unlist team' : 'Teamlist' }}
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
          @click="actionBlock"
      >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block-secondary.svg" alt="">
          Block
        </div>
      </v-btn>
    </div>
    <div class="px-4 pb-4 mt-4">
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
import Notification from "@/common/notification.js";

export default {
  name: "CandidateGrid",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    ping: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
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
    socketNotification(payload) {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if(payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map(item => {
          return item.toString();
        });
        this.$socket.emit('notification', payload);
      }
    },
    prepareNotifyData(teamMembers) {
      const teamId = JwtService.getTeamID();
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      teamMembers = teamMembers.filter(item => item !== loggedUser.id);
      let notifyObj = {
        receivers: teamMembers,
        team_id: teamId,
        // team_temp_name: my_team
      };
      return notifyObj;
    },
    viewProfile() {
      this.$router.push(
          `/user/profile/${this.item.user_id}`
      );
    },
    actionShortlist() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if(parseInt(loggedUser.status) !== 3) {
        this.showError("Your account is not verified");
        return;
      }

      if(parseInt(this.item.verification_status) !== 3) {
        this.showError("Opposite candidate account is not verified");
        return;
      }

      if(this.shortListedIds.includes(parseInt(this.item.user_id))) {
        ApiService.delete(`/v1/delete-short-listed-by-candidates?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");
          this.loadShortListedCandidates();
        }).catch(e => {
          console.log(e);
        });
      } else {
        ApiService.post(`/v1/short-listed-candidates/store`, { user_id: this.item.user_id, shortlisted_by: this.loggedUser.id }).then(res => {
          this.$emit("loadList");
          this.loadShortListedCandidates();
        }).catch(e => {
          console.log(e);
        });
      }
    },
    actionTeamlist() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if(parseInt(loggedUser.status) !== 3) {
        this.showError("Your account is not verified");
        return;
      }

      if(parseInt(this.item.verification_status) !== 3) {
        this.showError("Opposite candidate account is not verified");
        return;
      }

      if(this.teamListedIds.includes(this.item.user_id)) {
        ApiService.delete(`/v1/delete-team-short-listed-by-candidates?user_id=${this.item.user_id}`).then(res => {
          this.$emit("loadList");

          let notifyObject = this.prepareNotifyData(this.item.team_members_id);
          notifyObject.title = "deleted a candidate from teamlist";
          this.socketNotification(notifyObject);
        }).catch(e => {
          console.log(e);
        })
      } else {
        ApiService.post(`/v1/team-short-listed-candidates/store`, { user_id: this.item.user_id, team_listed_by: this.loggedUser.id }).then(res => {
          this.$emit("loadList");

          let notifyObject = this.prepareNotifyData(this.item.team_members_id);
          notifyObject.title = "add a candidate to teamlist";
          this.socketNotification(notifyObject);
        }).catch(e => {
          console.log(e);
        });
      }
    },
    actionBlock() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if(parseInt(loggedUser.status) !== 3) {
        this.showError("Your account is not verified");
        return;
      }

      if(parseInt(this.item.verification_status) !== 3) {
        this.showError("Opposite candidate account is not verified");
        return;
      }

      ApiService.post(`/v1/store-block-list`, { user_id: this.item.user_id })
          .then(res => {
            this.$emit("loadList");

            let notifyObject = this.prepareNotifyData(this.item.team_members_id);
            notifyObject.title = "blocked a candidate";
            this.socketNotification(notifyObject);
          }).catch(e => {
        console.log(e);
      });
    },
    actionConnection() {
      let myTeamId = JwtService.getTeamIDAppWide();
      if(!this.item.is_connect) {
        let loggedUser = JSON.parse(localStorage.getItem("user"));
        if(parseInt(loggedUser.status) !== 3) {
          this.showError("Your account is not verified");
          return;
        }

        if(parseInt(this.item.verification_status) !== 3) {
          this.showError("Opposite candidate account is not verified");
          return;
        }

        if(!myTeamId) {
          this.showError("You don't have an active team");
          return;
        }
        if(!this.item.team_id) {
          this.showError("This candidate has no active team");
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
    async loadShortListedCandidates() {
      let {data} = await ApiService.get('/v1/short-listed-candidates').then(res => res.data);
      this.$store.state.shortList.shortlistedItems = data;
    }
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