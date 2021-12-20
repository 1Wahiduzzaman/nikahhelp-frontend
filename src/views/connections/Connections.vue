<template>
	<div>
		<div>
			<div v-if="isLoading">Loading</div>
			<div v-else>
				<Layout>
          <div class="row">
            <div class="col-12">
              <div class="main-content-1">
                <div class="d-flex justify-content-between mb-3 align-items-center mr-4">
                  <h5 class="mt-2 px-4 connect-heading-text">
                    Recent all connection activity <span class="mr-2"></span>
                  </h5>
                  <div class="d-flex align-items-center">
<!--                    <div class="cursor-pointer" @click="displayMode = 'grid'">-->
<!--                      <img src="@/assets/icon/grid_icon.svg" alt="icon" width="30" class="opacity-60" :class="{'opacity-100': displayMode === 'grid'}" />-->
<!--                    </div>-->
<!--                    <div class="cursor-pointer ml-4" @click="displayMode = 'list'">-->
<!--                      <img src="@/assets/icon/list_icon.svg" alt="icon" width="25" class="opacity-60" :class="{'opacity-100': displayMode === 'list'}" />-->
<!--                    </div>-->
                    <select
                        v-if="user.account_type === 3"
                        v-model="teamId"
                        class="custom-select w-50"
                    >
                      <option
                          v-for="team in teams"
                          :key="team.id"
                          :value="team.team_id"
                      >
                        {{ team.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- <div v-for="(connectionDetails, type) in connections" :key="type">
                  <candidate
                    v-for="connection in connectionDetails"
                    :key="connection.connection_id"
                    :connection="connection"
                    :type="type"
                    @selected-connection="selectedConnection"
                    @accept-request="acceptRequest"
                    @disconnect-team="disconnectTeam"
                    @decline-request="declineRequest"
                    @connect-request="connectRequest"
                  ></candidate>
                </div> -->

                <div class="shortlist-wrapper">
                  <div class="row px-3">
                    <div class="col-12 col-lg-3 mobile-margin" v-for="(connection, connecIndex) in connectionReports.result" :key="connecIndex">
                      <candidate-grid-view v-if="displayMode === 'grid' && connectionReports.result && connectionReports.result.length > 0"
                                           :connection="connection"
                                           @selected-connection="selectedConnection"
                                           @accept-request="acceptRequest"
                                           @disconnect-team="disconnectTeam"
                                           @decline-request="declineRequest"
                                           @connect-request="connectRequest"
                                           @block-candidate="blockCandidate" />
                    </div>
                  </div>
                </div>
                <candidate
                    v-if="displayMode === 'list' && connectionReports.result && connectionReports.result.length > 0"
                    v-for="connection in connectionReports.result"
                    :key="connection.connection_id"
                    :connection="connection"
                    @selected-connection="selectedConnection"
                    @accept-request="acceptRequest"
                    @disconnect-team="disconnectTeam"
                    @decline-request="declineRequest"
                    @connect-request="connectRequest"
                    @block-candidate="blockCandidate"
                ></candidate>
              </div>
            </div>
            <div class="col-12 col-xl-3 d-none">
              <!-- Connection Status -->
              <div class="main-content-2">
                <div class="shadow-default connection-status p-3">
                  <p class="fs-18 text-center">Connection Status</p>
                  <hr />
                  <!-- Connection stats -->
                  <div v-if="!connectionOverview">
                    <!-- Teams Connected -->
                    <div class="row mt-3">
                      <div class="col-3">
                        <div class="item connected">
											<span class="item-number flex-center-center fs-22">{{
                          connectionReports.connected_teams
                        }}</span>
                        </div>
                      </div>
                      <div class="col-9 mt-2 fs-18">Teams connected</div>
                    </div>
                    <!-- Teams Request Received -->
                    <div class="row mt-3">
                      <div class="col-3">
                        <div class="item received">
											<span class="item-number flex-center-center fs-22">{{
                          connectionReports.request_received
                        }}</span>
                        </div>
                      </div>
                      <div class="col-9 fs-18">Teams Request Received</div>
                    </div>
                    <!-- Teams Request Sent -->
                    <div class="row mt-3">
                      <div class="col-3">
                        <div class="item request-sent">
											<span class="item-number flex-center-center fs-22">{{
                          connectionReports.request_sent
                        }}</span>
                        </div>
                      </div>
                      <div class="col-9 mt-2 fs-18">Teams Request Sent</div>
                    </div>
                    <!-- We declined team request -->
                    <div class="row mt-3">
                      <div class="col-3">
                        <div class="item we-declined">
											<span class="item-number flex-center-center fs-22">{{
                          connectionReports.we_declined
                        }}</span>
                        </div>
                      </div>
                      <div class="col-9 fs-18">We declined Team request</div>
                    </div>
                    <!-- They declined Our team request -->
                    <div class="row mt-3">
                      <div class="col-3">
                        <div class="item they-declined">
											<span class="item-number flex-center-center fs-22">{{
                          connectionReports.they_declined
                        }}</span>
                        </div>
                      </div>
                      <div class="col-9 fs-18">They declined Our team request</div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="pt-5">
                      <h6 class="pb-2">This Profile Connection Overview</h6>
                      <hr />

                      <div class="connection-overview">
                        <table class="table table-borderless overview-table">
                          <tr>
                            <td class="td-60">Connection Status</td>
                            <td class="text-end">:</td>
                            <td>{{ connectionOverview.connection }}</td>
                          </tr>
                          <tr>
                            <td class="td-60">Connected date</td>
                            <td class="text-end">:</td>
                            <td>{{ dateFromDateTime(connectionOverview.responded_at) }}</td>
                          </tr>
                          <tr>
                            <td class="td-60">Connection requested by</td>
                            <td class="text-end">:</td>
                            <td>{{ connectionOverview.requested_by.full_name }}</td>
                          </tr>
                          <tr>
                            <td class="td-60">Request Date</td>
                            <td class="text-end">:</td>
                            <td>{{ dateFromDateTime(connectionOverview.requested_at) }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div class="pt-5 mt-5">
                      <h6 class="pb-2">This Profile Team Overview</h6>
                      <hr />
                      <div class="profile-team-overview">
                        <table class="table table-borderless overview-table">
                          <tr>
                            <td class="td-60">Team name</td>
                            <td class="text-end">:</td>
                            <td>{{ connectionOverview.team_name }}</td>
                          </tr>
                          <tr>
                            <td class="td-60">Team members</td>
                            <td class="text-end">:</td>
                            <td>{{ connectionOverview.total_teamMember }}</td>
                          </tr>
                          <tr>
                            <td class="td-60">Team creation date</td>
                            <td class="text-end">:</td>
                            <td>{{ dateFromTimeStamp(connectionOverview.team_created_date) }}</td>
                          </tr>
                          <tr>
                            <td class="td-60">Team created by</td>
                            <td class="text-end">:</td>
                            <td>{{ connectionOverview.team_created_by }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <!-- {{ connectionOverview }} -->
                    <hr class="pb-2">
                    <div class="flex justify-content-center">
                      <button
                          class="mt-2 btn btn-primary outline-border px-5"
                          @click="profileOverview()"
                      >
                        This Profile overview
                      </button>
                    </div>
                    <div class="flex justify-content-center mt-2">
                      <button
                          class="mt-2 btn btn-primary outline-border px-5"
                      >
                        Profile completion status
                      </button>
                    </div>
<!--                    <div class="flex justify-content-center">-->
<!--                      <button-->
<!--                          class="mt-2 btn btn-primary outline-border"-->
<!--                          @click="gotoConnectionStatus"-->
<!--                      >-->
<!--                        Go Back to Connection Status-->
<!--                      </button>-->
<!--                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import Candidate from "@/components/connections/Candidate.vue";
import JwtService from "@/services/jwt.service";
import { dateFromDateTime, dateFromTimeStamp } from "@/common/helpers.js";
import CandidateGridView from "../../components/connections/CandidateGridView";
export default {
	name: "Connections",
	components: {
    CandidateGridView,
		Header,
		Sidebar,
		Footer,
		Candidate,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			connections: {},
			connectionReports: null,
			teams: null,
			teamId: null,
			connectionOverview: null,
      displayMode: 'grid'
		};
	},
	// computed: {
	// 	connectionStatus() {
	// 		return this.connectionOverview.connection_overview.connection_status;
	// 	},
	// 	connectedDate() {
	// 		if (this.connectionOverview.connection_overview.responded_at) {
	// 			const date =
	// 				this.connectionOverview.connection_overview.responded_at.split(" ");
	// 			return date[0];
	// 		} else return "N/A";
	// 	},
	// 	connectionRequestedBy() {
	// 		return this.connectionOverview.connection_overview.requested_by.full_name;
	// 	},
	// 	requestedDate() {
	// 		if (this.connectionOverview.connection_overview.requested_at) {
	// 			const date =
	// 				this.connectionOverview.connection_overview.requested_at.split(" ");
	// 			return date[0];
	// 		} else return "N/A";
	// 	},
	// 	teamName() {
	// 		return this.connectionOverview.profile_team_overview.team_name;
	// 	},
	// 	memberCount() {
	// 		return this.connectionOverview.profile_team_overview.member_count;
	// 	},
	// 	teamCreationDate() {
	// 		const date =
	// 			this.connectionOverview.profile_team_overview.team_creation_date.split(
	// 				"T"
	// 			);
	// 		return date[0];
	// 	},
	// 	teamCreatedBy() {
	// 		return this.connectionOverview.profile_team_overview.team_created_by
	// 			.full_name;
	// 	},
	// },
	created() {
		//this.loadUser();
		this.getActiveTeamId();
		//this.loadConnections();
		this.loadConnectionReports();
	},
	watch: {
		teamId: function (newQuestion, oldQuestion) {
			this.loadConnections();
		},
	},
	methods: {
		dateFromDateTime, //From helpers.js
		dateFromTimeStamp, //From helpers.js
		async loadUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("getUser");
				this.user = this.$store.getters["userInfo"];
				this.is_verified = this.user.is_verified;
				if (this.is_verified == 0) {
					this.$router.push("/email-verification");
				}
				if (this.user.account_type === 0) {
					this.$router.push("/member-type");
				}

				if (this.user.account_type === 4) {
					this.$router.push("/admin");
					return;
				}

				let data_input_status = this.$store.getters["userDataInputStatus"];
				console.log("data input status", data_input_status);
				if (data_input_status == 10) {
					this.$router.push("/member-name/candidate");
				}

				if (data_input_status == 20) {
					this.$router.push("/member-name/representative");
				}

				if (data_input_status == 11) {
					this.$router.push("/candidate-registration");
				}
				if (data_input_status == 21) {
					this.$router.push("/representative-registration");
				}

				// if (data_input_status == 12) {
				// 	this.$router.push("/candidate-registration");
				// }
				// if (data_input_status == 22) {
				// 	this.$router.push("/representative-registration");
				// }
			} catch (error) {
				this.error = error.message || "Something went wrong";
				console.log(this.error);
				this.$error({
					title: "Error!",
					content: this.error,
				});
				//this.$router.push("/connections");
			}
			this.isLoading = false;
		},
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
						this.$router.push("/manageteam");
					} else if (!teamId) {
						this.$warning({
							title: "You don't have an active team",
							content: "Please select an active team to continue!",
						});
						this.$router.push("/manageteam");
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		loadConnections() {
			this.isLoading = true;
			try {
				//const teamId = "94e5e52b-c47f-4cc3-83fa-1e4b034e5650";
				const response1 = this.$store.dispatch("getTeams");
				response1.then((data) => {
					this.teams = data.data.data;
					if (JwtService.getTeamIDAppWide()) {
						this.teamId = JwtService.getTeamIDAppWide();
						console.log(this.teamId);
					} else if (localStorage.teamId && !this.teamId) {
						this.teamId = localStorage.teamId;
					} else {
						if (!this.teamId) {
							this.teamId = data.data.data[0].team_id;
						}
					}
					console.log(this.teamId);
					const teamId = this.teamId;
					console.log(teamId);
					const payload = {
						team_id: teamId,
					};
					const response = this.$store.dispatch("loadConnections", payload);
					response.then((data) => {
						this.connections = data.data;
						console.log(data.data);
					});
				});
			} catch (error) {
				this.error = error.message || "Something went wrong";
				console.log(this.error);
			}
			this.isLoading = false;
		},
		loadConnectionReports() {
			const teamId = JwtService.getTeamIDAppWide();
			try {
				const response = this.$store.dispatch("loadConnectionReports", teamId);
				response
					.then((data) => {
						this.connectionReports = data.data.data;
					})
					.catch((error) => {
						console.log(error.response.data.message);
					});
			} catch (error) {
				console.log(error.message);
			}
		},
		selectedConnection(data) {
			//this.connectionDetails = data;
			this.isLoading = true;
			console.log(data);
			this.connectionOverview = data;
			// try {
			// 	const teamId = data.team_id;
			// 	const connectionId = data.connection_id;
			// 	const payload = {
			// 		team_id: teamId,
			// 		connection_id: connectionId,
			// 	};
			// 	const response = this.$store.dispatch("getConnectionOverview", payload);
			// 	response.then((data) => {
			// 		this.connectionOverview = data.data;
			// 		console.log(data.data);
			// 	});
			// } catch (error) {
			// 	this.error = error.message || "Something went wrong";
			// 	console.log(this.error);
			// }
			this.isLoading = false;
		},
		gotoConnectionStatus() {
			this.connectionOverview = null;
		},
		changeTeam(data) {
			console.log(data);
			this.teamId = data;
		},
		acceptRequest(connectionId) {
			const payload = {
				request_id: connectionId,
				connection_status: "1",
			};
			console.log(payload);
			//return;
			const response = this.$store.dispatch("respondToRequest", payload);
			response
				.then((data) => {
					console.log(data);
					const vm = this;
					this.$success({
						title: "Success",
						content: data.message,
						onOk() {
							setTimeout(() => {
								vm.$router.go();
							}, 500);
						},
					});
					// this.$message.success("Request Accepeted successfully!");

					// setTimeout(() => {
					// 	this.$router.go();
					// }, 1500);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		disconnectTeam(connectionId) {
			const payload = {
				connection_id: connectionId,
			};
			console.log(payload);
			//return;
			const response = this.$store.dispatch("disconnectTeam", payload);
			response
				.then((data) => {
					console.log(data);
					const vm = this;
					this.$success({
						title: "Success",
						content: data.message,
						onOk() {
							setTimeout(() => {
								vm.$router.go();
							}, 1500);
						},
					});
					//this.$message.success("Team Disconnected successfully!");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		declineRequest(connectionId) {
			const payload = {
				request_id: connectionId,
				connection_status: "2",
			};
			const response = this.$store.dispatch("respondToRequest", payload);
			response
				.then((data) => {
					console.log(data);
					const vm = this;
					this.$success({
						title: "Success",
						content: data.message,
						onOk() {
							setTimeout(() => {
								vm.$router.go();
							}, 500);
						},
					});
					// this.$message.success("Request declined successfully!");

					// setTimeout(() => {
					// 	this.$router.go();
					// }, 1500);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		connectRequest(to_team_id) {
			let teamId = JwtService.getTeamIDAppWide();
			const payload = {
				to_team_id: to_team_id,
				from_team_id: teamId,
			};
			console.log(payload);
			const response = this.$store.dispatch("connectWithTeam", payload);
			response
				.then((data) => {
					console.log(data);
					const vm = this;
					this.$success({
						title: "Success",
						content: data.message,
						onOk() {
							setTimeout(() => {
								vm.$router.go();
							}, 500);
						},
					});
					// this.$message.success("Connection Request Sent successfully!");

					// setTimeout(() => {
					// 	this.$router.go();
					// }, 1500);
				})
				.catch((error) => {
					console.log(error);
				});
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
					//vm.$message.success("Candidate block listed successfully");
					vm.$success({
						title: "Success",
						content: "Candidate block listed successfully",
						onOk() {
							vm.$router.go();
						},
					});
					//vm.$router.go();
				},
				onCancel() {
					console.log("Cancel");
				},
			});
		},
    profileOverview() {
      if(this.connectionOverview && this.connectionOverview.candidateInfo && this.connectionOverview.candidateInfo.candidate_userid) {
        this.$router.push({ name: 'profile', query: {user_id: this.connectionOverview.candidateInfo.candidate_userid} });
      }
    }
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-1 {
  margin: 20px 0;
  width: 100%;
  //margin-left: 260px;
  //@media (max-width: 1024px) {
  //  width: calc(100% - 270px);
  //}
}
.main-content-2 {
  margin: 15px;
  //width: 300px;
  .connection-history {
    padding: 10px;
  }
  .connection-status {
    padding: 10px;
    .row {
      padding: 10px;
      .item {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        transform: rotate(45deg);
        .item-text {
          font-size: 22px;
          font-weight: 700;
        }
        .item-number {
          color: white;
          font-size: 22px;
          transform: rotate(-45deg);
        }
      }

      .connected {
        background-color: $bg-success !important;
      }
      .received {
        background-color: $bg-warning;
      }
      .request-sent {
        background-color: $bg-info;
      }
      .we-declined {
        background-color: $bg-danger;
      }
      .they-declined {
        background-color: $bg-secondary;
      }
    }
    .connection-overview {
      p {
        font-size: 14px;
        font-weight: 600;
        color: #656565;
      }
    }
    .profile-team-overview {
      p {
        font-size: 14px;
        font-weight: 600;
        color: #656565;
      }
    }
  }
}
.opacity-60 {
  opacity: 0.6;
}
.opacity-100 {
  opacity: 1;
}
.footer {
	height: 20px;
}
.td-60 {
  width: 60%;
}
.overview-table td, .overview-table th {
  padding: 0.25rem 0.75rem;
}
.outline-border {
  border: 1px solid $color-white;
  outline-style: solid;
  outline-color: $bg-primary;
}
.connect-heading-text {
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
}
</style>
