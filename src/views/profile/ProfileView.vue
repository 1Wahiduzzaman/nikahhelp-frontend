<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div fluid v-else>
      <!-- <div v-if="user.account_type == 1"> -->
      <div v-if="(userProfile.account_type == 1)">
        <!-- Opposite Candidate Profile Component goes here -->
        <candidate-profile
          :role="teamRole"
          @onFetchUserInfo="loadUserProfile"
          :candidateData="candidateProfileInfo"
          :teams="teams"
        ></candidate-profile>
      </div>
      <div v-else>
        <!-- Opposite Representative profile component goes here -->
        <representative-profile
          :representativeData="representativeProfileInfo"
        ></representative-profile>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
// import Footer from "@/components/dashboard/layout/Footer.vue";
// import CandidateProfile from "@/components/profile/CandidateProfile.vue";
// import RepresentativeProfile from "@/components/profile/RepresentativeProfile.vue";
// import OtherCandidate from "@/components/profile/OppositeTeamCandidateProfile.vue";
import CandidateProfile from "@/components/profile/OppositeTeamCandidateProfile.vue";
import RepresentativeProfile from "@/components/profile/OppositeTeamRepresentativeProfile.vue";
import ApiService from "@/services/api.service";
import JwtService from "../../services/jwt.service";

export default {
  name: "ProfileView",
  components: {
    Header,
    Sidebar,
    // Footer,
    CandidateProfile,
    RepresentativeProfile,
  },
  computed: {
    loggedUser() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },
    activeTeamInfo() {
      return this.teams.find((item) => item.team_id == this.activeTeamId);
    },
    teamRole() {
      let team = this.activeTeamInfo;
      let loggedUser = this.loggedUser;
      if (team && loggedUser && team.team_members) {
        let member = team.team_members.find(
          (item) => item.user_id == loggedUser.id
        );
        if (member) {
          return member.role.replace("+", " & ");
        }
      }
      return "N/A";
    }
  },
  data() {
    return {
      activeTeamId: null,
      teams: [],
      isLoading: false,
      user: null,
      candidateInfo: {},
      representativeInfo: {},
      is_verified: 1,
      error: null,
      userProfile: {},
      profileId: null,
      candidateProfileInfo: {},
      representativeProfileInfo: {},
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  created() {
    this.loadTeams();
    this.loadUserProfile();
    this.$store.dispatch("getCountries");
    this.$store.dispatch("getStudyLevelOptions");
    this.$store.dispatch("getReligionOptions");
    this.$store.dispatch("getOccupations");
    this.checkTurnedOnSwitch();
  },
  methods: {
    checkTurnedOnSwitch() {
      this.activeTeamId = JwtService.getTeamIDAppWide();
    },
    async loadTeams() {
      let {data} = await ApiService.get("v1/team-list").then(res => res.data);
      this.teams = data;
      console.log('this.teams', this.teams)

      let activeTeamId = JwtService.getTeamIDAppWide();
      let from_team = null;
      if(activeTeamId) {
        let activeTeam = this.teams.find((item) => item.team_id == activeTeamId);
        if(activeTeam) {
          from_team = activeTeam.id;
        }
      }
      let payload = {
        from_team_id: from_team
      };
      await ApiService.post("v1/site-visit", payload).then(res => res.data);
    },
    async loadUserProfile() {
      this.isLoading = true;

      try {
        const id = this.$route.params.id;
        this.profileId = id;
        const payload = {
          id,
        };
        const response = await this.$store.dispatch("getUserProfile", payload);
        console.log(response);
        this.userProfile = response.data.user;
        if (response.data.user.account_type == 1) {
          this.candidateProfileInfo = response.data.candidate_information;
          //console.log(this.candidateProfileInfo);
        } else {
          this.representativeProfileInfo =
            response.data.representative_information[0];
        }
        // this.user = this.$store.getters["userProfileInfo"];
        // this.candidateProfileInfo = this.$store.getters["candidateProfileInfo"];
        // this.representativeProfileInfo = this.$store.getters[
        // 	"representativeProfileInfo"
        // ];

        // if (data_input_status == 12) {
        // 	this.$router.push("/candidate-registration");
        // }
        // if (data_input_status == 22) {
        // 	this.$router.push("/representative-registration");
        // }
      } catch (error) {
        this.error = error.message || "Something went wrong";
        //alert(this.error);
        this.$error({
          title: "Error!",
          content: this.error,
        });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>