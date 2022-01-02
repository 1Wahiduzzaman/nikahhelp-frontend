<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <div class="main-content-wrapper">
        <div class="block-main-content">
          <div class="flex">
            <v-chip
                class="ma-2 cursor-pointer"
                color="indigo"
                text-color="white"
                @click="type = 'self'"
            >
              <v-avatar left v-if="type == 'self'">
                <a-icon type="check" class="text-white" />
              </v-avatar>
              My block list
            </v-chip>

            <v-chip
                class="ma-2 cursor-pointer"
                color="error"
                text-color="white"
                @click="type = 'team'"
            >
              <v-avatar left v-if="type == 'team'">
                <a-icon type="check" class="text-white" />
              </v-avatar>
              Blocked by team members
            </v-chip>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
              <blocked-candidate-grid />
            </div>
          </div>

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
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 1,
      type: 'self'
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
