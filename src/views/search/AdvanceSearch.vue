<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<a-layout id="layout" style="background-color: #fff" :style="{ height: 'calc(100vh - 80px) !important', overflow: 'hidden'}">
				<!-- <a-layout-sider
					:style="{ height: 'calc(100vh - 80px)', overflowY: 'auto',overflowX: 'hidden'}"
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
				</a-layout-sider> -->
				<a-layout>  
					<a-layout-content>
						<div class="main-content-wrapper">
							<div class="main-content-1">
								<component
									@switchComponent="switchComponent"
									v-bind:is="currentTabComponent"
								>
								</component>
							</div>
							<div class="main-content-2">
								<component v-bind:is="rightSideComponentName"></component>
							</div>
						</div>
					</a-layout-content>
				</a-layout>
			</a-layout>
		</div>
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
// import Footer from "@/components/auth/Footer.vue";
//import SimpleSearch from "@/components/search/SimpleSearch.vue";
import CandidateProfiles from "@/components/search/CandidateProfiles.vue";
import AddComponent from '@/components/add/addComponent'
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
	name: "AdvanceSearch",
	components: {
		'ProfileDetail': () => import('@/components/search/CandidateProfileDetails'),
		'RightSideCandidateDetail': () => import('@/components/search/RightSideCandidateDetail'),
		'RightSidebar': () => import('@/components/search/ProfileDetailRight'),
		Header,
		Sidebar,
		//SimpleSearch,
		// Footer,
		CandidateProfiles,
		AddComponent
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
			error: null,
			collapsed: false,
			componentName: 'CandidateProfiles'
		};
	},
	computed: {
		...mapGetters({
			rightSideComponentName: 'search/getComponentName'
		}),
		currentTabComponent() {
			return this.componentName
		}
	},
	methods: {
		...mapActions({
			searchUser: 'search/searchUser'
		}),
		...mapMutations({
			setProfiles: 'search/setProfiles'
		}),
		async fetchInitialCandidate() {
			const res = await this.searchUser('v1/home-searches?page=0&parpage=10&min_age=20&max_age=40&ethnicity=Amara&marital_status=single');
			this.setProfiles(res)
		},
		responsiveToggle() {
           this.collapsed = false;
        },
		switchComponent(name) {
			this.componentName = name
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
	created() {
		this.fetchInitialCandidate();
	}
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
		margin: 10px 0px 10px 15px;
		height: calc(100vh - 80px);
		padding-right: 5px;
		overflow-y: auto;
		@media (max-width: 1024px) {
			width: calc(100% - 25px);
		}
	}
	.main-content-2 {
		margin: 15px;
		width: 300px;
		@media (max-width: 600px) {
			width: calc(100% - 25px);
		}
		height: 70vh;
		.profile-overview {
			padding: 10px;
			height: 100%;
		}
	}
}
</style>