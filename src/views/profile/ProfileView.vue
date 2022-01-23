<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <v-container fluid v-else>
      <v-row no-gutters>
        <v-col cols="12">
            <div v-if="user.account_type == 1">
              <!-- Opposite Candidate Profile Component goes here -->
              <candidate-profile
                :candidateData="candidateProfileInfo"
              ></candidate-profile>
            </div>
            <div v-else>
              <!-- Opposite Representative profile component goes here -->
              <representative-profile
                :representativeData="representativeProfileInfo"
              ></representative-profile>
            </div>
        </v-col>
      </v-row>
    </v-container>
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

export default {
  name: "ProfileView",
  components: {
    Header,
    Sidebar,
    // Footer,
    CandidateProfile,
    RepresentativeProfile,
  },
  data() {
    return {
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
    this.loadUserProfile();
    this.$store.dispatch("getCountries");
    this.$store.dispatch("getStudyLevelOptions");
    this.$store.dispatch("getReligionOptions");
    this.$store.dispatch("getOccupations");
  },
  methods: {
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