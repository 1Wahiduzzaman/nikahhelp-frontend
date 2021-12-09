<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<Layout>
				<div class="">
					<div style="margin: 0px auto">
						<div v-if="user.account_type == 1">
							<!-- Candidate Profile Component goes here -->
							<candidate-profile
								:candidateData="candidateInfo"
							></candidate-profile>
						</div>
						<div v-else>
							<!-- Representative profile component goes here -->
							<representative-profile
								:representativeData="representativeInfo"
							></representative-profile>
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
import CandidateProfile from "@/components/profile/CandidateProfile.vue";
import RepresentativeProfile from "@/components/profile/RepresentativeProfile.vue";

export default {
	name: "Profile",
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
		};
	},
	created() {
		this.loadUser();
		this.$store.dispatch("getCountries");
		this.$store.dispatch("getStudyLevelOptions");
		this.$store.dispatch("getReligionOptions");
		this.$store.dispatch("getOccupations");
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
.footer-design {
	width: 100%;
	margin-top: 50px;
	@media (max-width: 767px) {
		display: none;
	}
}
</style>