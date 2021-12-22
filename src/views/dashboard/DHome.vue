<template>
		<DHomeContent />
</template>

<script>
import DHomeContent from "@/components/dashboard/DHomeContent.vue";
export default {
	name: "DHome",
	components: {
		DHomeContent
	},
	data() {
		return {
			// isLoading: true,
			user: {},
			is_verified: 1,
			teams: null,
			dataInputStatus: undefined,
		};
	},
	created() {
		//this.loadUser();
		//this.getDashboardstats();
		//this.getUserTeams();
		//window.scrollTo(0, 0);
	},
	methods: {
		// async loadUser() {
		// 	this.isLoading = true;
		// 	try {
		// 		await this.$store.dispatch("getUser");
		// 		this.user = this.$store.getters["userInfo"];
		// 		console.log(this.user);
		// 		this.is_verified = this.user.is_verified;
		// 		//For temporary use.
		// 		// if (this.is_verified == 0) {
		// 		// 	this.$router.push("/email-verification");
		// 		// }
		// 		if (this.user.account_type === 0) {
		// 			this.$router.push("/member-type");
		// 		}
		// 		if (this.user.account_type === 4) {
		// 			this.$router.push("/admin");
		// 		}

		// 		let data_input_status = this.$store.getters["userDataInputStatus"];
		// 		this.dataInputStatus = this.$store.getters["userDataInputStatus"];
		// 		console.log(this.dataInputStatus);
		// 		console.log("data input status", data_input_status);
		// 		if (data_input_status == 10) {
		// 			this.$router.push("/member-name/candidate");
		// 		}

		// 		if (data_input_status == 20) {
		// 			this.$router.push("/member-name/representative");
		// 		}

		// 		if (data_input_status == 11) {
		// 			this.$router.push("/candidate-registration");
		// 		}
		// 		if (data_input_status == 21) {
		// 			this.$router.push("/representative-registration");
		// 		}
		// 		if (data_input_status === 12 || data_input_status === 22) {
		// 			this.getUserTeams();
		// 		}

		// 		// Chat Mutations
		// 		this.$store.dispatch("getChatUserInfo");
		// 		var user_id = this.$store.state.user.user.id; //this.user_id;
		// 		console.log("inbox loaded for:", user_id);
		// 		this.$store.dispatch("getConversations", user_id);
		// 		this.$store.dispatch("getMsgs");
		// 		this.$store.dispatch("getUnreadRecords", user_id);
		// 		this.$store.dispatch("getConwiseInfo");

		// 		// this.$store.dispatch("getConwiseInfo");
		// 		// if (data_input_status == 12) {
		// 		// 	this.$router.push("/candidate-registration");
		// 		// }
		// 		// if (data_input_status == 22) {
		// 		// 	this.$router.push("/representative-registration");
		// 		// }
		// 	} catch (error) {
		// 		this.error = error.message || "Something went wrong";
		// 		//alert(this.error);
		// 		this.$error({
		// 			title: "Error!",
		// 			content: this.error,
		// 		});
		// 		console.log(this.error);
		// 	}
		// 	this.isLoading = false;
		// },
		async getUserTeams() {
			const response1 = this.$store.dispatch("getTeams");
			console.log("Getting User Teams");
			response1.then((data) => {
				this.teams = data.data.data;
				console.log(this.dataInputStatus);
				if (
					this.user.account_type != 0 &&
					this.user.account_type != undefined &&
					this.dataInputStatus != 10 &&
					this.dataInputStatus != 11 &&
					this.dataInputStatus != 20 &&
					this.dataInputStatus != 21 &&
					this.dataInputStatus != undefined
				) {
					if (this.teams.length == 0) {
						console.log("Teams count 0");
						const vm = this;
						// this.$warning({
						// 	title: "Reminder",
						// 	content: "You don't have a team. Please create or join a team",
						// 	onOk() {
						// 		vm.$router.push("/manageteam");
						// 	},
						// });
					}
				}
			});
		},
	},
};
</script>
