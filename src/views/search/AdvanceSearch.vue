<template>
	<div>
		<div>
			<div v-if="isLoading">Loading</div>
			<div v-else>
			<div style="height:80px;">	
				<Header :user="user"> 
					<template  v-slot:toggler>
						<!-- dropdoen menu start -->
						<div class="d-sm-none w-2">
							<a-dropdown :trigger="['click']">
								<svg  @click="e => e.preventDefault()" xmlns="http://www.w3.org/2000/svg" class="menu-icon-alt" fill="#fff" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
								<a-menu slot="overlay" style="min-width: 250px">
									<a-menu-item @click="collapsed = !collapsed">
										<img width="22" src="@/assets/Icons/form.svg" alt="icon" />
										<span class="ml-2">{{ collapsed ? 'Open' : 'Close' }} left sidebar</span>
									</a-menu-item>
									<a-divider class="m-0" />
									<a-menu-item class="d-flex align-items-center">
										<img width="22" src="@/assets/icon/group-fill-secondary.svg" alt="icon" />
										<span class="ml-2">Manage Team</span>
									</a-menu-item>
									
									<a-menu-item class="d-flex align-items-center">
										<img width="22" src="@/assets/icon/star-fill-secondary.svg" alt="icon" />
										<span class="ml-2">Shortlist</span>
									</a-menu-item>

									<a-menu-item>
										<img width="22" src="@/assets/icon/bell-fill-secondary.svg" alt="icon" />
										<span class="ml-2">Notification</span>
										<a-badge
											class="ml-auto"
											:number-style="{ backgroundColor: '#e42076'}"
											count="40"
										/>
									</a-menu-item>
									<a-menu-item>
										<img width="22" src="@/assets/icon/chat-dots-fill-secondary.svg" alt="icon" />
										<span class="ml-2">Chat</span>
										<a-badge
											class="ml-auto"
											:number-style="{ backgroundColor: '#e42076'}"
											count="120"
										/>
									</a-menu-item>
								</a-menu>
							</a-dropdown>
						</div>
						<!-- dropdoen menu end -->
					</template>
				</Header>
			</div>
				<a-layout id="layout" style="background-color: #fff" :style="{ overflow: 'auto', height: 'calc(100vh - 80px)'}">
					<a-layout-sider
						class="bg-white shadow-default"
						v-model="collapsed"
						:trigger="null"
						collapsible
						:collapsedWidth="28"
						width="250"
						breakpoint="sm"
						@breakpoint="responsiveToggle"
					>
						<Sidebar 
							:collapsed="collapsed" 
							@collapseSideBar="collapsed = !collapsed" 
						>
						<template v-slot:search>
							<SimpleSearch />
						</template>
						</Sidebar>
					</a-layout-sider>
					<a-layout>  
						<a-layout-content>
							<div class="main-content-wrapper">
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
						</a-layout-content>
					</a-layout>
				</a-layout>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
// import Footer from "@/components/auth/Footer.vue";
import SimpleSearch from "@/components/search/SimpleSearch.vue";
import SearchForm from "@/components/search/CandidateProfile.vue";
export default {
	name: "AdvanceSearch",
	components: {
		Header,
		Sidebar,
		SimpleSearch,
		// Footer,
		SearchForm,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			collapsed: false
		};
	},
	created() {
		//this.loadUser();
	},
	methods: {
		responsiveToggle() {
           this.collapsed = false;
        },
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
.w-2 {
	width: 2rem;
}
.main-content-wrapper {
	margin-top: 0px;
	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}
	.main-content-1 {
		width: calc(100% - 350px);
		margin: 15px 10px;
		@media (max-width: 1024px) {
			width: 100%;
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