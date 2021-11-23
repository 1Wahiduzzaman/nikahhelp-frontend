<template>
	<div>
		<div>
			<div v-if="isLoading">Loading</div>
			<div v-else>
				<Header :user="user" />
				<div class="main-content-wrapper">
					<Sidebar />
					<div class="main-content-1">
						<div class="d-flex">
							<h4 class="flex-70">Search Results</h4>
						</div>
						<search-form></search-form>
					</div>
					<div class="main-content-2">
						<div class="shadow-default profile-overview"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import SearchForm from "@/components/search/SearchForm.vue";
export default {
	name: "AdvanceSearch",
	components: {
		Header,
		Sidebar,
		Footer,
		SearchForm,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
		};
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
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}
	.main-content-1 {
		width: calc(100% - 550px);
		margin: 15px 10px;
		@media (max-width: 1024px) {
			width: calc(100% - 270px);
		}
	}
	.main-content-2 {
		margin: 15px;
		width: 300px;
		height: 70vh;
		.profile-overview {
			padding: 10px;
			height: 100%;
		}
	}
}
</style>