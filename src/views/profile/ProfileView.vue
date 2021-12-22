<template>
  <div class="row">
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <div class="main-content-wrapper">
        <div class="main-content col-10">
          <div class="col-11" style="margin: 0px auto">
            <!-- <div v-if="userProfile.account_type == 1"> -->
            <!-- Candidate Profile Component goes here -->
            <!-- {{ candidateProfileInfo }} -->
            <!-- <candidate-profile
							:candidateData="candidateProfileInfo"
						></candidate-profile>
					</div> -->
            <!-- <div v-else> -->
            <!-- Representative profile component goes here -->
            <!-- {{ representativeProfileInfo }} -->
            <!-- <representative-profile
							:representativeData="representativeProfileInfo"
						></representative-profile> -->
            <!-- </div> -->

            <!-- Upper portion of the code was written by Syed Shadman Bhaiya -->
            <div v-if="userProfile.account_type == 1">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/dashboard/layout/Footer.vue";
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
    Footer,
    CandidateProfile,
    RepresentativeProfile,
  },
  data() {
    return {
      isLoading: false,
      user: {},
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