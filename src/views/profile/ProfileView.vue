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
          :profile="fullProfileInfo"
        ></candidate-profile>
      </div>
      <div v-else>
        <!-- Opposite Representative profile component goes here -->
        <representative-profile
          v-if="isRepresentativeInTeam"
          :representativeData="representativeProfileInfo"
        ></representative-profile>
        <div v-else class="text-center mt-8 my-auto">
          <svg viewBox="64 64 896 896" data-icon="close-circle" width="150px" height="150px" fill="red" aria-hidden="true" focusable="false" class=""><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
          <h3 class="mt-3" style="opacity: .3;">Sorry, you cannot view this profile.</h3>
        </div>
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
    },
    isRepresentativeInTeam() {
      if(this.representativeProfileInfo.user_id) {
        if(this.getAllTeamMembers().includes(this.representativeProfileInfo.user_id)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
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
      fullProfileInfo: {},
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
    // this.checkRepresentativeInTeam();
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
      // let payload = {
      //   from_team_id: from_team
      // };
      // await ApiService.post("v1/site-visit", payload).then(res => res.data);
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
        this.fullProfileInfo = response.data;
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
    getAllTeamMembers() {
			let allMembers = [];
			this.teams.forEach(team => {
				team.team_members.forEach(member => {
					allMembers.push(member.user_id);
				})
			})
			return allMembers
		}
  },
};
</script>

<style>
</style>