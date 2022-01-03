<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <div class="main-content-wrapper">
        <div class="block-main-content">
          <v-tabs color="indigo accent-4" class="w-full d-flex justify-content-between support-tab">
            <v-tab href="#tab-1" @click="tab = 'tab-1'" class="font-weight-bold">All</v-tab>
            <v-tab href="#tab-2" @click="tab = 'tab-2'" class="font-weight-bold">My block list</v-tab>
            <v-tab href="#tab-3" @click="tab = 'tab-3'" class="font-weight-bold">Blocked by team members</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <div class="row mb-4">
                <div class="col-12 col-md-6 col-lg-3 mt-4">
                  <blocked-candidate-grid />
                </div>
              </div>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <div class="row mb-4">
                <div class="col-12 col-md-6 col-lg-3 mt-4">
                  <blocked-candidate-grid />
                </div>
              </div>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <div class="row mb-4">
                <div class="col-12 col-md-6 col-lg-3 mt-4">
                  <blocked-candidate-grid />
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>

          <BlockedCandidate
            :blockedCandidates="blockedCandidates"
            @unblock-candidate="unblockCandidate"
            class="d-none"
          />
          <BlockedTeam
            :blockedTeams="blockedTeams"
            @unblock-candidate="unblockCandidate"
            class="d-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer";
import BlockedCandidate from "@/components/blocklist/BlockedCandidate.vue";
import BlockedTeam from "@/components/blocklist/BlockedTeam.vue";
import JwtService from "@/services/jwt.service";
import { openModalRoute } from "@/plugins/modal/modal.mixin";
import BlockedCandidateGrid from "../../components/blocklist/BlockedCandidateGrid";

export default {
  name: "BlockList",
  components: {
    BlockedCandidateGrid,
    Header,
    Sidebar,
    Footer,
    BlockedCandidate,
    BlockedTeam,
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    ping: function (data) {
      console.log(
          'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 1,
      tab: 'tab-1',
    };
  },
  created() {
    this.getActiveTeamId();
  },
  computed: {
    blockedCandidates() {
      const candidates = this.$store.getters["blockedCandidates"];
      return candidates.filter((candidate) => {
        if (candidate.type === "single") {
          return true;
        }
        return false;
      });
    },
    blockedTeams() {
      const candiates = this.$store.getters["blockedCandidates"];
      return candiates.filter((candidate) => {
        if (candidate.type == "team") {
          return true;
        }
        return false;
      });
    },
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
    getActiveTeamId() {
      if (!JwtService.getTeamIDAppWide()) {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          openModalRoute(this, "manage_team_redirect");
        }, 2000);
      } else {
        this.loadBlockedCandidates();
      }
    },
    async loadBlockedCandidates() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadBlockedCandidates");
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async unblockCandidate(id) {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to unblock this candidate?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await vm.$store.dispatch("unblockCandidate", id);
          vm.$router.go();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.main-content-wrapper {
  margin-top: 0;
  width: 100%;
  .block-main-content {
    width: 100%;
    margin: 20px 10px;
  }
}
</style>
