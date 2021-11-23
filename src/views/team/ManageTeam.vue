<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<Layout >
				<div class="container">
          <!--teams.length == 0 && !joinTeamShow && !createTeamShow-->
          <a-modal v-model="welcomeModal" @ok="hideWelcomeModal">
            <div class="d-flex justify-content-center align-items-center welcome-text mt-2">
              <h1 class="text-1">Welcome to</h1>
              <img
                  src="@/assets/Icons/MT ma large logo.svg"
                  class="matrimony-logo"
                  alt="logo"
                  width="200px"
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
            <template slot="footer">
              <a-button key="back" @click="hideWelcomeModal">
                Close
              </a-button>
            </template>
          </a-modal>
          <Banner />
					<a-row :gutter="16">
						<div class="row justify-content-md-center">
							<TeamDetailsCard
								v-for="(team, teamIndex) in teams"
								:key="team.id"
								:teamData="team"
								:index="teamIndex"
								@teamListUpdated="loadTeams"
							/>
              <JoinCreateTeam
                  v-if="joinCreateTeamShow"
                  class="d-flex"
                  style="margin-top: 20px"
                  @joinATeam="
										joinCreateTeamShow = false;
										joinTeamShow = true;
									"
                  @createATeam="
										joinCreateTeamShow = false;
										createTeamShow = true;
									"
              />
              <JoinTeam
                  v-if="joinTeamShow"
                  @cancel_button="
										joinCreateTeamShow = true;
										joinTeamShow = false;
									"
                  @toggleToTeamPassword="toggleToTeamPassword" />
              <JoinTeamPassword
                  v-if="joinTeamPassword" />
              <CreateTeamPage1
                  v-if="createTeamShow"
                  @cancel_button="
										joinCreateTeamShow = true;
										createTeamShow = false;
									"
              />
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
import JoinTeamPassword from "@/components/team/JoinTeamPassword.vue";
import Layout from '@/views/design/Layout';
import Banner from "@/components/team/Banner.vue";

export default {
	name: "ManageTeam",
	components: {
    Banner,
		Layout,
		JoinTeam,
		JoinCreateTeam,
		CreateTeamPage1,
		TeamDetailsCard,
    JoinTeamPassword
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			joinTeamShow: false,
			createTeamShow: false,
			joinCreateTeamShow: true,
      welcomeModal: true,
      joinTeamPassword: false
		};
	},
	created() {
		//console.log(this.$store.state.team);
		this.loadUser();
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
    hideWelcomeModal() {
      this.welcomeModal = false;
    },
    toggleToTeamPassword() {
      this.joinTeamPassword = true;
      this.joinCreateTeamShow = false;
      this.joinTeamShow = false;
    }
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
	}
}
.welcome-text {
  margin-top: 20px;
  justify-content: center;
  .text-1 {
    margin-right: 20px;
    font-weight: 900;
    color: #666;
    font-size: 20px;
  }
  .matrimony-logo {
    width: 200px;
  }
  .text-2 {
    margin-left: 20px;
    font-weight: bold;
    color: #666;
    font-size: 20px;
  }
}
.description-text {
  p {
    font-size: 18px;
    word-spacing: 0.1em;
    font-weight: 400;
    color: #aaa;
  }
}
</style>
