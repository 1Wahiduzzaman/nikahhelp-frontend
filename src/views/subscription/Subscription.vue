<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<Layout>
				<!-- Heading -->
				<div class="section-header text-center mt-4">
					<h4 class="heading">
						Choose a Subscription Plan that Works for You
					</h4>
					<p class="fs-14">
						Matrimony Assist Subscription is Team Based. Only
						<b>ONE</b> member pays
						<br />
						the rest of the members use the platform for <b>FREE</b> of
						charge.
					</p>
				</div>
				<!-- Subscription details -->
				<div class="subscription-details container">
					<div class="row">
						<div class="col-4">
							<!-- Card 1 -->
							<div
								class="
									custom-card
									card-1
									shadow-default
									background-design-cardfooter
								"
								style="height: 400px"
							>
								<div class="div-1 background-design">
									<h3>Choose Plan</h3>
								</div>
								<div class="div-2">
									<h4
										class="duration"
										:class="{ selected: isSelected1 }"
										@click="firstOption"
									>
										1 month
									</h4>
									<h4
										class="duration"
										:class="{ selected: isSelected2 }"
										@click="secondOption"
									>
										3 month
									</h4>
									<h4
										class="duration"
										:class="{ selected: isSelected3 }"
										@click="thirdOption"
									>
										6 month
									</h4>
									<h4
										class="duration"
										:class="{ selected: isSelected4 }"
										@click="fourthOption"
									>
										Free 1 Day
									</h4>
								</div>
								<div class="div-3">
									<p
										style="text-align: center; padding: 5px; font-size: 12px"
									>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Magni eius at expedita? Explicabo laboriosam ipsa commod
									</p>
								</div>
							</div>
						</div>
						<div class="col-4">
							<!-- Card 2 -->
							<div
								class="
									custom-card
									card-2
									shadow-default
									background-design-middle
								"
								style="height: 400px"
							>
								<div class="div-1 text-center">
									<img
										src="@/assets/icon/Pound.svg"
										alt=""
										width="180"
										height="180"
										class="mt-3"
									/>
								</div>
								<div class="div-2">
									<h3 class="price">£ {{ amount }}</h3>
									<p class="price-text">Saved {{ savedAmount }} £</p>
								</div>
								<div class="div-3">
									<p style="text-align: center">
										In Matrimony Assist, ALl subscribing teams have full
										access to platform and features. The only difference is
										time limit
									</p>
								</div>
							</div>
						</div>
						<div class="col-4">
							<!-- Card 3 -->
							<div
								class="
									custom-card
									card-3
									shadow-default
									background-design-rightcard
								"
								style="height: 360px"
							>
								<h1>Select Team</h1>

								<div class="form-group">
									<select class="w-100 custom-select" v-model="teamSelected">
										<option
											v-for="team in teams"
											:value="team"
											:key="team.id"
										>
											{{ team.name }}
										</option>
									</select>
								</div>
								<p class="team-details-heading">This team details</p>
								<div class="team-details">
									<li class="flex-between-start">
										<span class="flex-45 px-2">Team Name </span>
										<span class="flex-55 px-2" v-if="teamSelected">
											:<span class="ml-2">{{ teamSelected.name }}</span></span
										>
									</li>
									<li class="flex-between-start">
										<span class="flex-45 px-2">Team ID</span>
										<span class="flex-55 px-2" v-if="teamSelected">
											:<span class="ml-2">{{ teamSelected.id }}</span></span
										>
									</li>
									<li class="flex-between-start">
										<span class="flex-45 px-2">Team Status </span>
										<span class="flex-55 px-2" v-if="teamSelected">
											:<span class="ml-2">Active, Valid, Verified</span></span
										>
									</li>
									<li class="flex-between-start">
										<span class="flex-45 px-2">Team Creation Date </span>
										<span class="flex-55 px-2" v-if="teamSelected">
											:<span class="ml-2">{{ teamCreationDate }}</span></span
										>
									</li>
									<li class="flex-between-start">
										<span class="flex-45 px-2">Team Created By </span>
										<span class="flex-55 px-2" v-if="teamSelected">
											:<span class="ml-2">{{ teamCreatedBy }}</span></span
										>
									</li>
								</div>
								<p class="team-sub-details-heading">
									This team's last subscription details
								</p>
								<!--
								<div class="sub-details">
									Today, 6m ago Subscribed 6 month Plan by - Shirin Malik Team
									Expire period extended to the date of - Dec 31, 2022
								</div>
								-->
							</div>
							<button
								@click="handleContinue"
								class="btn btn-primary btn-payment mt-2 w-100"
							>
								<img
									src="@/assets/icon/arrow-right-square-fill-purple.svg"
									alt="Icon"
									height="10"
								/>
								Continue to payment
							</button>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";

export default {
	name: "Subscription",
	components: {
		Header,
		Sidebar,
		Footer,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			isSelected1: false,
			isSelected2: false,
			isSelected3: false,
			isSelected4: false,
			amount: 0.0,
			savedAmount: 0.0,
			teams: [],
			teamSelected: null,
		};
	},
	created() {
		//this.loadUser();
		this.loadTeams();
		this.getSelectedTeam();
	},
	computed: {
		teamCreationDate() {
			if (this.teamSelected.created_at) {
				const date = this.teamSelected.created_at.split("T");
				return date[0];
			} else return "N/A";
		},
		teamCreatedBy() {
			// const teamMembers = this.teamSelected.team_members;

			// var member = teamMembers.find((member) => {
			// 	return member.user_id == this.teamSelected.created_by;
			// });
			// return member.user.full_name;
			return this.teamSelected.created_by.full_name;
		},
	},
	methods: {
		async loadUser() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("getUser");
				this.user = this.$store.getters["userInfo"];
				this.candidateInfo = this.$store.getters["candidateInfo"];
				this.representativeInfo = this.$store.getters["representativeInfo"];
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
					title: "Error!",
					content: this.error,
				});
			}
			this.isLoading = false;
		},
		async loadTeams() {
			await this.$store.dispatch("getTeams");
			this.teams = this.$store.getters["userTeamList"];
			console.log(this.teams);
		},
		async getSelectedTeam() {
			if (this.$route.params.id == null) {
				console.log("Null");
				return;
			} else {
				console.log(this.$route.params.id);
				await this.$store.dispatch("getTeams");
				this.teams = this.$store.getters["userTeamList"];
				var team = this.teams.find((team) => {
					return team.team_id == this.$route.params.id;
				});
				this.teamSelected = team;
			}
		},
		firstOption() {
			this.isSelected1 = !this.isSelected1;
			this.isSelected2 = false;
			this.isSelected3 = false;
			this.isSelected4 = false;
			this.amount = 10.0;
			this.savedAmount = 0.0;
			console.log(this.isSelected1);
		},
		secondOption() {
			this.isSelected2 = !this.isSelected2;
			this.isSelected1 = false;
			this.isSelected3 = false;
			this.isSelected4 = false;
			this.amount = 24.0;
			this.savedAmount = 6.0;
			console.log(this.isSelected2);
		},
		thirdOption() {
			this.isSelected3 = !this.isSelected3;
			this.isSelected2 = false;
			this.isSelected1 = false;
			this.isSelected4 = false;
			this.amount = 42.0;
			this.savedAmount = 18.0;
			console.log(this.isSelected3);
		},
		fourthOption() {
			this.isSelected4 = !this.isSelected4;
			this.isSelected2 = false;
			this.isSelected1 = false;
			this.isSelected3 = false;
			this.amount = 0.0;
			this.savedAmount = 0.0;
			console.log(this.isSelected3);
		},
		handleContinue() {
			var subId;
			if (this.isSelected1) {
				subId = 1;
			} else if (this.isSelected2) {
				subId = 2;
			} else if (this.isSelected3) {
				subId = 3;
			} else if (this.isSelected4) {
				subId = 0;
			} else {
				//alert("You have to select a subscription plan");
				this.$error({
					title: "No Subscription Plan is Selected!",
					content: "You have to select a subscription plan",
					centered: true,
				});
				return;
			}
			if (this.teamSelected == null) {
				//alert("You have to select a team");
				this.$error({
					title: "No Team is Selected!",
					content: "You have to select a team",
					centered: true,
				});
				return;
			}
			console.log(subId);
			console.log(this.teamSelected);
			this.$router.push(
				`/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${subId}`
			);
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
	.main-content {
		width: 100%;
		margin-top: 15px;
		//		margin-left: 250px;
		.section-header {
			.heading {
				font-weight: 800;
				color: $color-primary;
			}
		}
		.subscription-details {
			margin: 15px;
			.custom-card {
				height: 370px;
				background-color: $color-primary;
				border-radius: 5px;
			}
			.card-1 {
				.div-1 {
					background-color: $color-brand;
					height: 70px;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					display: flex;
					align-items: center;
					justify-content: center;

					h3 {
						color: white;
						font-weight: 800;
					}
				}
				.div-2 {
					background-color: white;
					height: 220px;
					padding-top: 10px;
					.duration {
						border: 1px solid white;
						background-color: white;
						color: black;
						font-weight: 400;
						padding: 5px;
						text-align: center;
						cursor: pointer;
					}
					.selected {
						background-color: rgb(180, 61, 151);
						color: white;
					}
				}
				.div-3 {
					color: white;
					padding: 10px;
					p {
						font-size: 10px;
						font-weight: 400;
					}
				}
			}

			.card-2 {
				.div-2 {
					height: 120px;
					text-align: center;
					h3 {
						font-size: 50px;
						color: white;
					}
					p {
						margin-top: -20px;
						color: white;
					}
				}
				.div-3 {
					padding: 10px;
					p {
						font-size: 12px;
						color: white;
						text-align: justify;
					}
				}
			}

			.card-3 {
				height: 330px;

				h1 {
					text-align: center;
					font-size: 30px;
					color: white;
				}

				.form-group {
					.custom-select {
						font-size: 18px;
						width: auto;
						height: 40px;
						border-radius: 20px !important;
						background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
						background-position: right 2px center;
						background-color: rgb(219, 213, 248);
					}
				}

				.team-details-heading {
					margin-top: 10px;
					font-size: 14px;
					background-color: white;
				}
				.team-details {
					span {
						color: white;
					}
				}
				.team-sub-details-heading {
					margin-top: 10px;
					font-size: 14px;
					background-color: white;
				}
				.sub-details {
					font-size: 12px;
					color: white;
					margin-top: -5px;
					padding-left: 10px;
					padding-right: 10px;
				}
				.btn-payment {
					margin-top: 3px;
				}
			}
		}
	}
}
.background-design {
	background-image: linear-gradient(
		to right,
		#eb5e94,
		#eb5e94,
		#bf47a1,
		#962a7b
	);
	padding-top: 10px;
	height: 100px;
}
.background-design-cardfooter {
	background-image: linear-gradient(to right, #8859a7, #6159a7);
	margin-top: 18px;
}

.background-design-middle {
	background-image: linear-gradient(
		to top right,
		#6159a7,
		#a459a7,
		#ca56ad,
		#eb5e94
	);
	margin-top: 18px;
}

.background-design-rightcard {
	background-image: linear-gradient(to bottom, #6159a7, #ca56ad, #eb5e94);
	margin-top: 18px;
}
</style>
