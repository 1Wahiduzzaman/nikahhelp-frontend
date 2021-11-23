<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<Layout >
				<div class="container">
					<a-row v-if="teams.length == 0 && !joinTeamShow && !createTeamShow">
						<div class="d-flex justify-content-center align-items-center welcome-text mt-2">
							<h1 class="text-1">Welcome to</h1>
							<img
								src="@/assets/Icons/MT ma large logo.svg"
								height="180"
								width="320"
								alt=""
							/>
							<h1 class="text-2">on-board</h1>
						</div>
						<div class="description-text text-center">
							<p>
								Here you can create team, invite family and friends, shortlist
								potential <br />
								candidates and connect and chat with respective teams.
							</p>
						</div>
					</a-row>
					<a-row>
						<div class="row justify-content-md-center">
							<TeamDetailsCard
								v-for="(team, teamIndex) in teams"
								:key="team.id"
								:teamData="team"
								:index="teamIndex"
								@teamListUpdated="loadTeams"
							/>
							<a-col
								:span="8"
								v-if="joinCreateTeamShow"
								class="d-flex"
								style="margin-top: 20px"
							>
								<JoinCreateTeam
									@joinATeam="
										joinCreateTeamShow = false;
										joinTeamShow = true;
									"
									@createATeam="
										joinCreateTeamShow = false;
										createTeamShow = true;
									"
								/>
							</a-col>

							<a-col :span="8" v-if="joinTeamShow">
								<JoinTeam
									@cancel_button="
										joinCreateTeamShow = true;
										joinTeamShow = false;
									"
								/>
							</a-col>

							<a-col :span="8" v-if="createTeamShow">
								<CreateTeamPage1
									@cancel_button="
										joinCreateTeamShow = true;
										createTeamShow = false;
									"
								/>
							</a-col>
						</div>
					</a-row>
				</div>
			</Layout>
		</div>
	</div>
</template>

<script>
import JoinTeam from "@/components/team/JoinTeam.vue";
import CreateTeamPage1 from "@/components/team/CreateTeamPage1.vue";
import JoinCreateTeam from "@/components/team/JoinCreateTeam.vue";
import TeamDetailsCard from "@/components/team/TeamDetailsCard.vue";
import Layout from '@/views/design/Layout'

export default {
	name: "ManageTeam",
	components: {
		Layout,
		JoinTeam,
		JoinCreateTeam,
		CreateTeamPage1,
		TeamDetailsCard,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			joinTeamShow: false,
			createTeamShow: false,
			joinCreateTeamShow: true,
		};
	},
	created() {
		//console.log(this.$store.state.team);
		//this.loadUser();
		this.loadTeams();
	},
	computed: {
		teams() {
			return this.$store.state.team.team_list;
		},
	},
	methods: {
		/*
      cancel_button ()
      {
           
        this.joinTeamShow = false;
        this.joinCreateTeamShow = true; 

      },
*/
		async loadTeams() {
			this.loading = true;
			try {
				await this.$store
					.dispatch("getTeams")
					.then((data) => {
						this.teams = [...data.data.data];
					})
					.catch((error) => {
						console.log(error.response);
					});
			} catch (error) {
				this.error = error.message || "Something went wrong";
				console.log(this.error);
				this.$router.push("/manageteam");
			}
			this.isLoading = false;
		},
		async loadUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("getUser");
				this.user = this.$store.getters["userInfo"];
				this.is_verified = this.user.is_verified;
        // need to be removed later
				// if (this.is_verified == 0) {
				// 	this.$router.push("/email-verification");
				// }
				// if (this.user.account_type === 0) {
				// 	this.$router.push("/member-type");
				// }
        //
				// if (this.user.account_type === 4) {
				// 	this.$router.push("/admin");
				// }
        //
				// let data_input_status = this.$store.getters["userDataInputStatus"];
				// console.log("data input status", data_input_status);
				// if (data_input_status == 10) {
				// 	this.$router.push("/member-name/candidate");
				// }
        //
				// if (data_input_status == 20) {
				// 	this.$router.push("/member-name/representative");
				// }
        //
				// if (data_input_status == 11) {
				// 	this.$router.push("/candidate-registration");
				// }
				// if (data_input_status == 21) {
				// 	this.$router.push("/representative-registration");
				// }
        // need to be removed later

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
				console.log(this.error);
				//this.$router.push("/manageteam");
			}
			this.isLoading = false;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
	margin-bottom: 30px;
	//height: 570px;
	.container {
		text-align: center;
		//		margin-left: 260px;
		.welcome-text-container {
			margin: 10px;
			.welcome-title-text {
				font-weight: bold;
				font-size: 2.75rem;
				color: #666666;
			}
			.welcome-title-subtext {
				color: #666666;
				font-weight: 100;
				font-size: 1.25rem;
			}
			.logo-text {
				font-family: $header-font;
				color: #3a3091;
				font-weight: 100;
			}
		}
		.welcome-text {
			margin-top: 20px;
			justify-content: center;
			.text-1 {
				margin-top: 110px;
				margin-right: 20px;
				font-weight: 900;
				color: #666;
			}

			.text-2 {
				margin-top: 110px;
				margin-left: 20px;
				font-weight: bold;
				color: #666;
			}
		}
		.description-text {
			p {
				font-size: 20px;
				word-spacing: 0.1em;
				font-weight: 400;
				color: #aaa;
			}
		}
	}
}
</style>
