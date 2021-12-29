<template>
	<div>
		 <Loader v-if="isLoading" :isLoading="isLoading" />
		<div v-else>
			<MainHeader/>
			<a-layout id="layout" style="background-color: #fff" :style="{ height: 'calc(100vh - 80px) !important', overflow: 'hidden'}">
				<a-layout-sider
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
				</a-layout-sider>
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
		<Loader :isLoading="isFetching"/>
	</div>
</template>

<script>

import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Loader from "@/plugins/loader/loader.vue";
import CandidateProfiles from "@/components/search/CandidateProfiles.vue";
import AddComponent from '@/components/add/addComponent';
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
	name: "AdvanceSearch",
	components: {
		'ProfileDetail': () => import('@/components/search/CandidateProfileDetails'),
		'RightSideCandidateDetail': () => import('@/components/search/RightSideCandidateDetail'),
		'RightSidebar': () => import('@/components/search/ProfileDetailRight'),
    	SimpleSearch: () => import("@/components/search/SimpleSearch.vue"),
		Sidebar,
		Loader,
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
			rightSideComponentName: 'search/getComponentName',
			isFetching: 'search/getLoadingStatus'
		}),
		currentTabComponent() {
			return this.componentName
		},
		teams() {
		let teams = this.$store.state.team.team_list;
		let activeIndex = teams.findIndex(
			(item) => item.team_id == this.activeTeamId
		);
		if (activeIndex >= 0) {
			teams.unshift(teams[activeIndex]);
			teams.splice(activeIndex, 1);
		}
		return teams;
		},
		activeTeamInfo() {
			return this.teams.find((item) => item.team_id == this.activeTeamId);
		},
		teamRole() {
			let team = this.activeTeamInfo;
			let loggedUser = this.loggedUser;
			if (team && loggedUser && team.team_members) {
				let member = team.team_members.find(
				(item) => item.user_id == loggedUser.id
				);
				if (member) {
				return member.role.replace("+", " & ");
			}
		}
		return "N/A";
		},
		activeTeamIndex() {
			return this.teams.findIndex((item) => item.team_id == this.activeTeamId);
		},
		loggedUser() {
		let loggedUser = JSON.parse(localStorage.getItem("user"));
			if (loggedUser) {
				return loggedUser;
			}
			return null;
		},
		notifications() {
		return this.$store.state.notification.notifications;
		},
		unreadNotification() {
		return this.notifications.filter((item) => item.seen == 0).length;
		},
	},
	methods: {
		...mapActions({
			searchUser: 'search/searchUser'
		}),
		...mapMutations({
			setProfiles: 'search/setProfiles',
			setLoading: 'search/setLoading'
		}),
		async fetchInitialCandidate() {
			// const res = await this.searchUser('v1/home-searches?page=0&parpage=10&min_age=20&max_age=40&ethnicity=Amara&marital_status=single');
			this.setLoading(true);
			try{
				const res = await this.searchUser('v1/home-searches?page=0&parpage=10&ethnicity=Aboriginal&min_age=20&max_age=40');
				this.setLoading(false);
				if(res == undefined) {
					this.setProfiles([])
				}
				if(res.data && res.data.length ) {
					this.setProfiles(res.data)
				} 
				
			} catch(err) {
				this.setLoading(false);
				console.log(err)
			}
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
		logout() {
			const vm = this;
			this.$confirm({
				title: "Are you sure?",
				content: "Do you want to logout?",
				okText: "Yes",
				okType: "danger",
				cancelText: "No",
				async onOk() {
				await vm.$store.dispatch("logout");
				vm.$router.replace("/");
				},
				onCancel() {
				console.log("Cancel");
				},
			});
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
.menu-icon-alt {
  width: 25px;
  color: #fff;
  margin-left: 10px;
}
.user-avatar-area {
  .avatar-image {
    border-radius: 50%;
    outline: 2px solid #ddd;
  }
  .team {
    display: inline-block;
    background-color: #fff;
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    padding-right: 20px;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      right: 6px;
      background-color: #4aa02c;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: 0px 0px 3px 1px #639e4e;
    }
  }
  .role {
    display: inline-block;
    border: 1px solid rgb(99, 99, 99);
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    text-align: center;
  }
}
.main-content-wrapper {
	margin-top: 0px;
	@media (max-width: 1024px) {
		flex-wrap: wrap;
	}
	.main-content-1 {
		width: calc(100% - 350px);
		margin: 10px 5px 10px 15px;
		height: calc(100vh - 10px);
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
		height: 100vh;
		.profile-overview {
			padding: 10px;
			height: 100%;
		}
	}
}
</style>