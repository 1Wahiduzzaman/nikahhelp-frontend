<template>
	<div>
		<Header :user="user" />

		<div class="main-content-wrapper">
			<div class="col-md-3">
				<Sidebar />
			</div>
			<div class="col-md-9 main-content">
				<router-view></router-view>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from "@/components/admin/layout/AdminHeader.vue";
import Sidebar from "@/components/admin/layout/AdminSidebar.vue";
import Footer from "@/components/admin/layout/Footer.vue";

export default {
	data() {
		return {
			user: {},
		};
	},
	components: {
		Header,
		Sidebar,
		Footer,
	},
	created() {
		//this.loadUser();
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
				alert(this.error);
			}
			this.isLoading = false;
		},
	},
};
</script>

<style scoped>
</style>