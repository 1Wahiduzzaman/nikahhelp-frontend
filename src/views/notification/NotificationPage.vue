<template>
	<div>
		<div>
			<div v-if="isLoading">Loading</div>
			<div v-else>
				<Header :user="user" @change-team="changeTeam" />
				<div class="main-content-wrapper">
					<div class="side-bar">
						<Sidebar />
					</div>
					<div class="main-content-1">
						<h4>All Notifications</h4>
						<div>
							<notification
								v-for="notification in notifications"
								:key="notification.id"
								:notification="notification"
							></notification>
						</div>
					</div>
					<!-- <div class="main-content-2">
						<div class="shadow-default notifications-sidebar">
							<div class="filter-notification">
								<h6>Filter Notification By</h6>
								<button class="btn btn-primary btn-block mt-5 mb-5">
									Show Unseen Only
								</button>
								<button class="btn btn-primary btn-block mt-5 mb-5">
									Show Seen Only
								</button>
							</div>
							<div class="manage-notification">
								<h6>Manage Noification</h6>
								<button class="btn btn-primary btn-block">
									Mark all as Seen
								</button>
								<button class="btn btn-primary btn-block">
									Mark all as Unseen
								</button>
								<button class="btn btn-primary btn-block">
									Manage Mute Notification
								</button>
								<button class="btn btn-primary btn-block">
									Mute all Notification
								</button>
							</div>
						</div>
					</div> -->
				</div>
				<div class="footer-portion">
					<Footer />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import Notification from "@/components/notification/Notification.vue";
import JwtService from "@/services/jwt.service";
export default {
	name: "NotificationPage",
	components: {
		Header,
		Sidebar,
		Footer,
		Notification,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			teamId: null,
			notifications: null,
		};
	},
	created() {
		//this.loadUser();
		this.getActiveTeamId();
		this.loadNotifications();
	},
	methods: {
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
				//alert(this.error);
				this.$error({
					title: "Error",
					content: this.error,
				});
				console.log(this.error);
				this.$router.push("/notifications");
			}
			this.isLoading = false;
		},
		async getActiveTeamId() {
			console.log("Function Called, Get Active  Team Id");
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
		async loadNotifications() {
			this.isLoading = true;
			try {
				const response = this.$store.dispatch("loadNotifications");
				response
					.then((data) => {
						this.notifications = data.data.data;
						console.log(this.notifications);
					})
					.catch((error) => {
						console.log(error);
						//alert(error);
					});
			} catch (error) {
				this.error = errror.message || "Something went wrong! Try again!";
				console.log(this.error);
			}
		},
		changeTeam(data) {
			console.log(data);
			this.teamId = data;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
	.side-bar {
		max-width: 250px;
	}
	@media (max-width: 1024px) {
		flex-wrap: wrap;
		.side-bar {
			width: 30%;
			flex: 0 0 30%;
		}
	}

	@media (max-width: 767px) {
		max-width: 100%;
		.side-bar {
			width: 30%;
			flex: 0 0 30%;
		}
	}

	@media (max-width: 541px) {
		.side-bar {
			width: 120px;
			flex: 0 0 10%;
		}
	}

	@media (max-width: 415px) {
		.side-bar {
			// max-width: 128px;
			width: auto;
			flex: 0 0 10%;
		}
	}

	.main-content-1 {
		// width: calc(100% - 550px);
		//width: 100%;
		//margin: 8px 10px 20px 10px;
		//margin-left: 265px;
		flex: 0 0 80%;
		@media (max-width: 1080px) {
			// width: calc(100% - 270px);
			flex: 0 0 64%;
			padding-left: 1%;
		}

		@media (max-width: 767px) {
			width: 50%;
			flex: 0 0 66%;
			padding-left: 4%;
			margin: 0%;
			.footer-portion {
				// display: none;
				display: inline;
			}
		}

		@media (max-width: 541px) {
			flex: 0 0 50%;
			padding-left: 0%;
			margin-left: 24%;
			margin-right: 0%;
			.footer-portion {
				// display: none;
				display: inline;
			}
		}

		@media (max-width: 421px) {
			flex: 1 0 121%;
			padding-left: 58%;
			padding-right: -288%;
			margin-left: -59%;
			font-size: 4px;
			margin-right: -56%;
			.footer-portion {
				//
				display: inline;
			}
		}

		h4 {
			padding-top: 10px;
			padding-left: 8px;
			// @media (max-width: 321px) {
			// 	padding-left: 5px;
			// }
		}
	}
	// .main-content-2 {
	// 	margin: 15px;
	// 	width: 300px;
	// 	height: 80vh;
	// 	.notifications-sidebar {
	// 		padding: 10px;
	// 		height: 80vh;
	// 		.filter-notification {
	// 			height: 50%;
	// 			padding: 15px;
	// 			h6 {
	// 				text-align: center;
	// 			}
	// 		}
	// 		.manage-notification {
	// 			height: 50%;
	// 			padding: 15px;
	// 			h6 {
	// 				text-align: center;
	// 			}
	// 		}
	// 	}
	// 	@media (max-width: 1025px) {
	// 		display: none;
	// 	}
	// }

	// @media (max-width: 767px) {
	// 	.footer-portion{
	// 		display: none;
	// 	}
	// }
}
</style>
