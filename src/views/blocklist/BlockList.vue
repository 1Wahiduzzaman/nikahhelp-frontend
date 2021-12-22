<template>
  <div>
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <div class="main-content-wrapper">
        <div class="main-content">
          <BlockedCandidate
            :blockedCandidates="blockedCandidates"
            @unblock-candidate="unblockCandidate"
          />
          <BlockedTeam
            :blockedTeams="blockedTeams"
            @unblock-candidate="unblockCandidate"
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
export default {
  name: "BlockList",
  components: {
    Header,
    Sidebar,
    Footer,
    BlockedCandidate,
    BlockedTeam,
  },
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 1,
    };
  },
  created() {
    this.getActiveTeamId();
    this.loadBlockedCandidates();
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
    
    async getActiveTeamId() {
      const response = this.$store.dispatch("getTeams");
      response
        .then((data) => {
          let teamId = JwtService.getTeamIDAppWide();
          console.log(data.data.data);
          if (data.data.data.length == 0) {
            this.$warning({
              title: "You don't have a team",
              content: "Please create or join a team!",
            });
            //this.$router.push("/manageteam");
          } else if (!teamId) {
            this.$warning({
              title: "You don't have an active team",
              content: "Please select an active team to continue!",
            });
            //this.$router.push("/manageteam");
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
  margin-top: 80px;
  .main-content {
    width: 100%;
    //margin-left: 250px;
  }
}
</style>
