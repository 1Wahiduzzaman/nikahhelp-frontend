<template>
	<div>
		<div>
			<div v-if="isLoading">Loading</div>
			<div v-else>
				<Header :user="user" @change-team="changeTeam" />
				<div class="main-content-wrapper">
					<Sidebar />
					<div class="main-content-1">
						<div class="d-flex mb-3">
							<h5 class="mt-2">
								Recent all connection activity <span class="mr-2"></span>
							</h5>
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

						<candidate
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
						<!-- <pre>
							{{ connectionReports.result }}
						</pre
						> -->
					</div>

					<!-- Connection Status -->
					<div class="main-content-2">
						<!-- <div class="shadow-default connection-history">
							<h6>Connection History</h6>
						</div> -->
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
								<div>
									<h6>This Profile Connection Overview</h6>
									<hr />

									<div class="connection-overview">
										<p>
											Connection Status:
											<!-- {{ connectionStatus }} -->
											{{ connectionOverview.connection }}
										</p>
										<p>
											Connected date:
											<!-- {{ connectedDate }} -->
											{{ dateFromDateTime(connectionOverview.responded_at) }}
										</p>
										<p>
											Connection requested by:
											{{ connectionOverview.requested_by.full_name }}
										</p>

										<p>
											Request Date:
											{{ dateFromDateTime(connectionOverview.requested_at) }}
										</p>
									</div>
								</div>
								<div>
									<h6>This Profile Team Overview</h6>
									<hr />
									<div class="profile-team-overview">
										<p>
											Team name:
											<!-- {{ teamName }} -->
											{{ connectionOverview.team_name }}
										</p>
										<p>
											Team members:
											<!-- {{ memberCount }} -->
											{{ connectionOverview.total_teamMember }}
										</p>
										<p>
											Team creation date:
											<!-- {{ teamCreationDate }} -->
											{{
												dateFromTimeStamp(connectionOverview.team_created_date)
											}}
										</p>

										<p>
											Team created by:
											<!-- {{ teamCreatedBy }} -->
											{{ connectionOverview.team_created_by }}
										</p>
									</div>
								</div>
								<!-- {{ connectionOverview }} -->
								<button
									class="mt-2 btn btn-primary btn-block"
									@click="gotoConnectionStatus"
								>
									Go Back to Connection Status
								</button>
							</div>
						</div>
					</div>
				</div>
				<Footer />
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
export default {
	name: "Connections",
	components: {
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
		this.loadUser();
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
			console.log("Load Connect Reports");
			const teamId = JwtService.getTeamIDAppWide();
			console.log(teamId);
			try {
				const response = this.$store.dispatch("loadConnectionReports", teamId);
				response
					.then((data) => {
						this.connectionReports = data.data.data;
						console.log(this.connectionReports);
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
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
	min-height: 88vh;
	//margin-right: 0px;
	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}
	.main-content-1 {
		width: calc(100% - 550px);
		margin: 20px 10px;
		//margin-left: 260px;
		@media (max-width: 1024px) {
			width: calc(100% - 270px);
		}
	}
	.main-content-2 {
		margin: 15px;
		width: 300px;
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
					font-size: 12px;
				}
			}
			.profile-team-overview {
				p {
					font-size: 12px;
				}
			}
		}
	}
}
.footer {
	height: 20px;
}
</style>
