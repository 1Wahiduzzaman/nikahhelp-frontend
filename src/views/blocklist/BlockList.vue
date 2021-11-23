<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<Header :user="user" />
			<div class="main-content-wrapper">
				<Sidebar />

				<div class="main-content">
					<BlockedCandidate
						:blockedCandidates="blockedCandidates"
						@unblock-candidate="unblockCandidate"
					/>
					<BlockedTeam
						:blockedTeams="blockedTeams"
						@unblock-candidate="unblockCandidate"
					/>
				</div>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer";

import BlockedCandidate from "@/components/blocklist/BlockedCandidate.vue";
import BlockedTeam from "@/components/blocklist/BlockedTeam.vue";
import JwtService from "@/services/jwt.service";
export default {
	name: "BlockList",
	components: {
		Header,
		Sidebar,
		Footer,
		BlockedCandidate,
		BlockedTeam,
	},
	data() {
		return {
			isLoading: true,
			user: {},
			is_verified: 1,
		};
	},
	created() {
		//this.loadUser();
		this.getActiveTeamId();
		this.loadBlockedCandidates();
	},
	computed: {
		blockedCandidates() {
			const candidates = this.$store.getters["blockedCandidates"];
			return candidates.filter((candidate) => {
				if (candidate.type === "single") {
					return true;
				}
				return false;
			});
		},
		blockedTeams() {
			const candiates = this.$store.getters["blockedCandidates"];
			return candiates.filter((candidate) => {
				if (candidate.type == "team") {
					return true;
				}
				return false;
			});
		},
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
				console.log(this.error);
				//this.$router.push("/blocklist");
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
		async loadBlockedCandidates() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("loadBlockedCandidates");
			} catch (error) {
				this.error = error.message || "Something went wrong";
				console.log(this.error);
			}
			this.isLoading = false;
		},
		async unblockCandidate(id) {
			const vm = this;
			this.$confirm({
				title: "Are you sure?",
				content: "Do you want to unblock this candidate?",
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				async onOk() {
					await vm.$store.dispatch("unblockCandidate", id);
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
.main-content-wrapper {
	margin-top: 80px;
	.main-content {
		width: 100%;
		//margin-left: 250px;
	}
}
</style>
