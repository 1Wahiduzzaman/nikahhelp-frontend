<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
<!--    Short list candidate-->
<!--    team listed candidate-->
    <div v-else>
      <div class="shortlist-content-wrapper">
        <div class="main-content-1">
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
              Shortlisted Candidate
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
              Team listed Candidate
            </v-chip>
          </div>
          <div class="row mt-2">
            <div class="col-12 col-md-6 col-lg-3">
              <candidate-grid />
            </div>
          </div>

          <!-- Shortlisted Section Header -->
          <div class="d-none">
            <div class="item" style="text-align: left; width: 100%">
              <span
                class="item-number flex-center-center"
                style="float: left"
                >{{ shortListedCandidates.length }}</span
              >
              <span class="m-2 fw-600 fs-18">Shortlisted Candidate</span>
              <a
                href="/shortlist/all"
                type="submit"
                class="btn btn-sm btn-primary btn-round btn-submit float-right"
              >
                See All
              </a>
            </div>
            <div class="shortlisted-candidate">
              <!-- Shortlisted component goes here -->
              <candidate
                v-for="candidate in shortListedCandidates"
                :key="candidate.id"
                :candidate="candidate"
                @selected-candidate="selectedCandidate"
                @get-candidate-id="getCandidateId"
                @get-shortlist-id="removeShortlist"
                @connect-request="getCandidateTeamId"
                @block-candidate="blockCandidate"
              ></candidate>
              <select-team-for-teamlist
                :selectTeamModal="selectTeamModal"
                @handle-cancel="selectTeamModal = false"
                @handle-team="storeTeamlist"
              ></select-team-for-teamlist>
              <select-team-modal
                :selectTeamModal="selectTeamForConnect"
                @handle-cancel="selectTeamForConnect = false"
                @handle-team="connectRequest"
              ></select-team-modal>
            </div>
          </div>
          <!-- Team Listed -->
          <div class="mt-4 d-none">
            <!-- Team Listed Section Header -->
            <hr />
            <div class="item" style="text-align: left; width: 100%">
              <span
                class="item-number flex-center-center"
                style="float: left"
                >{{ teamShortListedCandidates.length }}</span
              >
              <span class="m-2 fw-600 fs-18">Team Listed Candidate</span>
              <a
                href="/shortlist/all/team"
                type="submit"
                class="btn btn-sm btn-primary btn-round btn-submit float-right"
              >
                See All
              </a>
            </div>
            <div class="teamlisted-candidate">
              <!-- Team listed component goes here	 -->
              <candidate
                v-for="candidate in teamShortListedCandidates"
                :key="candidate.id"
                :candidate="candidate"
                @selected-candidate="selectedCandidate"
                @get-candidate-id="getCandidateId"
                @get-shortlist-id="removeShortlist"
                @store-shortlist="storeShortlist"
                @connect-request="getCandidateTeamId"
                @block-candidate="blockCandidate"
              ></candidate>
              <select-team-modal
                :selectTeamModal="selectTeamForConnect"
                @handle-cancel="selectTeamForConnect = false"
                @handle-team="connectRequest"
              ></select-team-modal>
            </div>
          </div>
        </div>
        <div class="main-content-2 d-none">
          <div v-if="loadingSpinner">
            <loading-spinner></loading-spinner>
          </div>
          <div v-else>
            <div
              v-if="candidateProfileInfo"
              class="shadow-default profile-overview"
            >
              <h6>This Profile overview</h6>
              <hr />
              <div>
                <!-- Name -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Name</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3"
                      >{{ candidateProfileInfo.first_name }}
                      {{ candidateProfileInfo.last_name }}</span
                    ></span
                  >
                </li>
                <!-- Age -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Age</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">{{
                      candidateProfileInfo.personal.dob
                    }}</span></span
                  >
                </li>
                <!-- height -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Height</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">{{
                      candidateProfileInfo.personal.per_height
                    }}</span></span
                  >
                </li>
                <!-- Nationality -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Nationality</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">{{
                      $store.state.candidateInfo.countries[
                        candidateProfileInfo.personal.per_nationality
                      ].name
                    }}</span></span
                  >
                </li>
                <!-- Ethnicity -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Ethnicity</span
                  ><span class="flex-50 d-inherit"
                    >:
                    <span class="ml-3">
                      {{ candidateProfileInfo.personal.per_ethnicity }}</span
                    ></span
                  >
                </li>
                <!-- Country Of Birth -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Country of Birth</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">{{
                      $store.state.candidateInfo.countries[
                        candidateProfileInfo.personal.per_country_of_birth
                      ].name
                    }}</span></span
                  >
                </li>
                <!-- Current Residence -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Current Residance</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">{{
                      $store.state.candidateInfo.countries[
                        candidateProfileInfo.personal.per_current_residence
                      ].name
                    }}</span></span
                  >
                </li>
                <!-- Education -->
                <li
                  class="flex-between-start"
                  v-if="candidateProfileInfo.personal.per_education_level_id"
                >
                  <span class="flex-50 label-text">Education</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">
                      <!-- {{
											$store.state.candidateInfo.study_level_options[
												candidateProfileInfo.personal.per_education_level_id
											].name
										}} -->
                      {{ personalStudyLevel }}
                    </span></span
                  >
                </li>
              </div>

              <h6 class="mt-3">This Profile Partner Preferences</h6>
              <hr />
              <div>
                <!-- Age -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Age</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">
                      {{ candidateProfileInfo.preference.pre_partner_age_min }}
                      to
                      {{ candidateProfileInfo.preference.pre_partner_age_max }}
                      years</span
                    ></span
                  >
                </li>
                <!-- Height -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Height</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3"
                      >{{ candidateProfileInfo.preference.pre_height_min }} inch
                      to
                      {{ candidateProfileInfo.preference.pre_height_max }}
                      inch</span
                    ></span
                  >
                </li>
                <!-- Religion -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Religion</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3"> Islam </span>
                  </span>
                </li>
                <!-- Nationality -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Nationality</span
                  ><span class="flex-50 d-inherit"
                    >:
                    <span class="ml-3">
                      <div
                        v-for="nationality in candidateProfileInfo.preference
                          .preferred_nationality"
                        :key="nationality.id"
                      >
                        {{ nationality.name }}
                      </div>
                    </span></span
                  >
                </li>
                <!-- Ethnicity -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Ethnicity</span
                  ><span class="flex-50 d-inherit"
                    >:
                    <span class="ml-3">
                      {{
                        candidateProfileInfo.preference.pre_ethnicities
                      }}</span
                    ></span
                  >
                </li>
                <!-- Country Of Birth -->
                <!-- Current Residence -->
                <!-- Education -->
                <li
                  class="flex-between-start"
                  v-if="candidateProfileInfo.preference.pre_study_level_id"
                >
                  <span class="flex-50 label-text">Education</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">
                      {{ studyLevel }}
                    </span></span
                  >
                </li>
                <!-- Profession -->
                <!-- Occupation -->
                <li class="flex-between-start">
                  <span class="flex-50 label-text">Ocupation</span
                  ><span class="flex-50"
                    >:
                    <span class="ml-3">{{
                      candidateProfileInfo.preference.pre_occupation
                    }}</span></span
                  >
                </li>
              </div>
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
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import Footer from "@/components/dashboard/layout/Footer.vue";
import SelectTeamModal from "@/components/team/Modals/SelectTeamModal.vue";
import SelectTeamForTeamlist from "@/components/team/Modals/SelectTeamForTeamlist";
import JwtService from "@/services/jwt.service";
import { openModalRoute } from "@/plugins/modal/modal.mixin";
import Candidate from "@/components/shortlist/Candidate.vue";
import CandidateGrid from "../../components/shortlist/CandidateGrid";
export default {
  name: "Shortlist",
  components: {
    CandidateGrid,
    Header,
    Sidebar,
    Footer,
    LoadingSpinner,
    Candidate,
    SelectTeamModal,
    SelectTeamForTeamlist,
    // ShortlistedCandidate
  },
  data() {
    return {
      isLoading: false,
      loadingSpinner: false,
      user: {},
      is_verified: 1,
      error: null,
      candidateInfo: null,
      partnerInfo: null,
      userProfile: null,
      candidateProfileInfo: null,
      representativeProfileInfo: null,
      selectTeamModal: false,
      selectTeamForConnect: false,
      candidateId: null,
      candidateTeamId: null,
      type: 'self'
    };
  },
  created() {
    this.getActiveTeamId();
  },
  computed: {
    shortListedCandidates() {
      const candidates = this.$store.getters["shortListedCandidates"];
      return candidates.filter((candidate) => {
        if (candidate.team_id == null) {
          return true;
        }
        return false;
      });
    },
    teamShortListedCandidates() {
      const candidates = this.$store.getters["teamShortListedCandidates"];
      return candidates;
    },
    personalStudyLevel() {
      if (this.candidateProfileInfo.personal.per_education_level_id) {
        var results =
          this.$store.state.candidateInfo.study_level_options.filter(
            (level) => {
              return (
                level.id ==
                this.candidateProfileInfo.personal.per_education_level_id
              );
            }
          );
        return results[0].name;
      } else {
        return null;
      }
    },
    studyLevel() {
      if (this.candidateProfileInfo.preference.pre_study_level_id) {
        var results =
          this.$store.state.candidateInfo.study_level_options.filter(
            (level) => {
              return (
                level.id ==
                this.candidateProfileInfo.preference.pre_study_level_id
              );
            }
          );
        return results[0].name;
      } else {
        return null;
      }
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
        this.loadShortListedCandidates();
        this.loadTeamShortListedCandidates();
        this.$store.dispatch("getCountries");
        this.$store.dispatch("getStudyLevelOptions");
        this.$store.dispatch("getReligionOptions");
        this.$store.dispatch("getOccupations");
      }
    },
    async loadShortListedCandidates() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadShortListedCandidates");
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async loadTeamShortListedCandidates() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("loadTeamShortListedCandidates");
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
    async loadUserProfile(id) {
      this.loadingSpinner = true;

      try {
        const payload = {
          id,
        };
        const response = await this.$store.dispatch("getUserProfile", payload);
        //console.log(response);
        this.userProfile = response.data.user;
        //console.log(this.userProfile);
        if (response.data.user.account_type == 1) {
          this.candidateProfileInfo = response.data.candidate_information;
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
        this.$error({
          title: "Error!",
          content: this.error,
        });
        //alert(this.error);
      }
      this.loadingSpinner = false;
    },
    async selectedCandidate(candidate) {
      await this.loadUserProfile(candidate.user_id);
      //this.candidateInfo = candidate.candidate;
      //this.partnerInfo = candidate.partner;
      //console.log(this.candidateInfo);
      console.log(this.candidateProfileInfo);
    },
    getCandidateId(candidateId) {
      //this.selectTeamModal = true;
      this.candidateId = candidateId;
      this.storeTeamlist();
    },
    storeShortlist(candidateId) {
      const vm = this;
      this.$confirm({
        title: "Do you want to shortlist this candidate?",
        content: "Are you sure?",
        okText: "Yes",
        okType: "primary",
        cancelText: "No",
        async onOk() {
          const payload = {
            user_id: candidateId,
            shortlisted_by: vm.user.id,
          };
          const response = vm.$store.dispatch("storeShortlist", payload); // Action in the shortlist module in action
          response.then((data) => {
            console.log(data);
            vm.$message.success("Candidate Shortlist Done");
            setTimeout(() => vm.$router.go(), 1000);
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
      // const payload = {
      // 	user_id: candidateId,
      // 	shortlisted_by: this.user.id,
      // };
      // const response = this.$store.dispatch("storeShortlist", payload); // Action in the shortlist module in action
      // response.then((data) => {
      // 	console.log(data);
      // 	this.$message.success("Candidate Shortlist Done");
      // });
    },
    removeShortlist(shortlistId) {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to remove this user from your shortlist?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          const response = vm.$store.dispatch("removeShortlist", shortlistId); // In Shorltist Module
          response
            .then((data) => {
              console.log(data);
              vm.$message.success(
                "Shortlisted candidate removed successfully!"
              );
              setTimeout(() => vm.$router.go(), 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    storeTeamlist() {
      let teamTableId = JwtService.getTeamID();
      const _payload = {
        user_id: this.candidateId,
        shortlisted_by: this.user.id,
        shortlisted_for: teamTableId,
      };
      console.log(_payload);
      const response = this.$store.dispatch("storeTeamlist", _payload); // Action in shortlist module
      response
        .then((data) => {
          console.log(data);
          this.selectTeamModal = false;
          this.$message.success("Team Listed candidate added successfully!");
          setTimeout(() => this.$router.go(), 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCandidateTeamId(candidateTeamId) {
      this.candidateTeamId = candidateTeamId;
      console.log(this.candidateTeamId);
      // if (!this.$store.state.team.teamInfo) {
      // 	this.selectTeamForConnect = true;
      // } else {
      // 	console.log(this.$store.state.team.teamInfo);

      // 	this.connectRequest(this.$store.state.team.teamInfo);
      // }
      let teamId = JwtService.getTeamIDAppWide();
      this.connectRequest(teamId);
    },

    connectRequest(teamId) {
      const payload = {
        from_team_id: teamId,
        to_team_id: this.candidateTeamId,
      };
      console.log(payload);

      const response = this.$store.dispatch("connectWithTeam", payload);
      response
        .then((data) => {
          console.log(data);
          this.$success({
            title: "Connection Request Sent Successfully!",
            content: data.message,
            centered: true,
          });
        })
        .catch((error) => {
          console.log(error);
          this.$error({
            title: "Connection Request send not successful!",
            content: error.response.data.message,
            centered: true,
          });
        });
      this.selectTeamForConnect = false;
    },
    blockCandidate(candidateId) {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to block this candidate?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          const payload = {
            user_id: candidateId,
            block_by: vm.user.id,
            type: "single",
          };
          await vm.$store.dispatch("blockCandidate", payload);
          vm.$message.success("Candidate block listed successfully");
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
@import "@/styles/base/_variables.scss";
.shortlist-content-wrapper {
  flex-wrap: wrap;
  margin-top: 20px;
  .main-content-1 {
    width: 100%;
    margin: 20px 10px;
    //margin-left: 260px;
    //margin-right: -800px;
    //@media (max-width: 1024px) {
    //  width: calc(100% - 270px);
    //}
    .item {
      display: inline-block;
      button {
        img {
          width: 20px;
        }
      }
      .item-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: $bg-secondary;
        color: $color-white;
        margin-left: 8px;
      }
    }
    .shortlisted-candidate {
      max-height: 350px;
      overflow-y: auto;
    }
    .teamlisted-candidate {
      max-height: 350px;
      overflow-y: auto;
    }
  }
  .main-content-2 {
    margin: 15px;
    width: 300px;
    height: 100%;
    .profile-overview {
      padding: 10px;
      height: 100%;
    }
  }
}
</style>
