<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>
			<div style="height:80px;">	
				<header
					class="header-container bg-secondary shadow-default radius-none px-4"
				>
				<div
					class="header-content d-flex align-items-center justify-content-between"
				>
					<div class="shrink-none none-mobile">
					<a href="/" class="navbar-brand">
						<img
						width="120"
						src="@/assets/Icons/Logo/SVG/White Logo.svg"
						alt="logo"
						/>
					</a>
					</div>

					<div
					class="header-right user-avatar-area shrink-none"
					style="align-self: center"
					>
					<div>
						<ul class="header-nav-icons d-none d-sm-flex">
						<li class="nav-item shrink-none">
							<a class="nav-link" aria-current="page" href="/dashboard">
							<img
								width="25"
								src="@/assets/icon/house-door-fill-white.svg"
								alt="img"
							/>
							</a>
						</li>
						<li class="nav-item shrink-none">
							<a-dropdown :trigger="['click']" placement="bottomRight">
							<a
								class="nav-link"
								aria-current="page"
								@click.self="(e) => e.preventDefault()"
							>
								<img
								width="25"
								src="@/assets/icon/group-fill-white.svg"
								alt="img"
								/>
							</a>
							<template v-slot:overlay>
								<NotificationPopup :items="teams" :use-for="'team'" />
							</template>
							</a-dropdown>
						</li>
						<li class="nav-item shrink-none">
							<!-- <a class="nav-link" aria-current="page" href="/shortlist">
										<img width="25" src="@/assets/icon/star-fill-white.svg" alt="img"/>
									</a> -->
							<a-dropdown :trigger="['click']" placement="bottomRight">
							<a
								class="nav-link"
								aria-current="page"
								@click.self="(e) => e.preventDefault()"
							>
								<img
								width="25"
								src="@/assets/icon/star-fill-white.svg"
								alt="img"
								/>
							</a>
							<template v-slot:overlay>
								<NotificationPopup :items="[]" :use-for="'shortlist'" />
							</template>
							</a-dropdown>
						</li>
						<li class="nav-item shrink-none">
							<a-dropdown :trigger="['click']" placement="bottomRight">
							<a
								class="nav-link"
								aria-current="page"
								@click.self="(e) => e.preventDefault()"
							>
								<a-badge :count="unreadNotification">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="width: 30px"
									viewBox="0 0 20 20"
									fill="#fff"
								>
									<path
									d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
									/>
								</svg>
								</a-badge>
							</a>
							<template v-slot:overlay>
								<NotificationPopup
								:items="notifications"
								:use-for="'notification'"
								/>
							</template>
							</a-dropdown>
						</li>
						<li class="nav-item shrink-none mr-6">
							<a-dropdown :trigger="['click']" placement="bottomRight">
							<a
								class="nav-link"
								aria-current="page"
								@click.self="(e) => e.preventDefault()"
							>
								<a-badge count="5">
								<img
									width="25"
									src="@/assets/icon/chat-dots-fill-white.svg"
									alt="img"
								/>
								</a-badge>
							</a>
							<template v-slot:overlay>
								<NotificationPopup
								count="29"
								:items="[]"
								:use-for="'chat'"
								/>
							</template>
							</a-dropdown>
						</li>
						</ul>
					</div>
					<div style="display: flex">
						<a-dropdown>
						<a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
							<img
							class="avatar-image"
							src="@/assets/mike.jpg"
							width="35"
							alt=""
							/>
						</a>
						<a-menu slot="overlay" class="none-mobile-block">
							<a-menu-item>
							<img
								width="22"
								src="@/assets/icon/support-secondary.svg"
								alt="icon"
							/>
							<span class="ml-2">Support</span>
							</a-menu-item>
							<a-menu-item>
							<router-link to="/settings">
								<img
								width="22"
								src="@/assets/icon/gear-fill-secondary.svg"
								alt="icon"
								/>
								<span class="ml-2">Setting</span>
							</router-link>
							</a-menu-item>
							<a-menu-item @click="logout">
							<img width="22" src="@/assets/icon/logout.svg" alt="icon" />
							<span class="ml-2">Logout</span>
							</a-menu-item>
						</a-menu>
						</a-dropdown>

						<div style="align-self: center">
						<div class="ml-2 text-white">
							<a-dropdown>
							<a
								class="ant-dropdown-link"
								@click="(e) => e.preventDefault()"
							>
								<router-link class="" to="/profile">
								<h6 class="mb-0 text-white fs-14 name-hover">
									{{
									loggedUser && loggedUser.full_name
										? loggedUser.full_name
										: "N/A"
									}}
								</h6>
								</router-link>
							</a>
							<a-menu slot="overlay" class="none-mobile-block">
								<a-menu-item>
								<img
									width="22"
									src="@/assets/icon/support-secondary.svg"
									alt="icon"
								/>
								<span class="ml-2">Support</span>
								</a-menu-item>
								<a-menu-item>
								<router-link to="/settings">
									<img
									width="22"
									src="@/assets/icon/gear-fill-secondary.svg"
									alt="icon"
									/>
									<span class="ml-2">Setting</span>
								</router-link>
								</a-menu-item>
								<a-menu-item @click="logout">
								<img
									width="22"
									src="@/assets/icon/logout.svg"
									alt="icon"
								/>
								<span class="ml-2">Logout</span>
								</a-menu-item>
							</a-menu>
							</a-dropdown>
							<div
							class="d-flex justify-content-between align-items-center mt-1"
							>
							<a-dropdown :trigger="['click']" placement="bottomRight">
								<span
								@click.self="(e) => e.preventDefault()"
								class="team color-primary pl-2 mr-1 shrink-none"
								>
								{{
									activeTeamIndex >= 0
									? "Team " + (activeTeamIndex + 1)
									: "N/A"
								}}
								</span>
								<template v-slot:overlay>
								<ul class="avatar-dropdown">
									<li class="list-item">
									<span>Active now:</span>
									<p class="mb-0 color-primary w-100px ellipse">
										{{
										activeTeamIndex >= 0
											? "Team " + (activeTeamIndex + 1)
											: "N/A"
										}}
									</p>
									</li>
									<li class="list-item">
									<span>Team ID:</span>
									<p class="mb-0 color-primary w-100px ellipse">
										{{
										activeTeamInfo && activeTeamInfo.team_id
											? activeTeamInfo.team_id.substring(0, 8)
											: "N/A"
										}}
									</p>
									</li>
									<li class="list-item">
									<span>Team Name:</span>
									<p class="mb-0 color-primary w-100px ellipse">
										{{
										activeTeamInfo && activeTeamInfo.name
											? activeTeamInfo.name.substring(0, 12)
											: "N/A"
										}}
									</p>
									</li>
								</ul>
								</template>
							</a-dropdown>
							<span class="role px-2 ml-1 shrink-none">{{ teamRole }}</span>
							</div>
						</div>
						</div>
					</div>
					<div class="d-sm-none">
						<a-dropdown :trigger="['click']">
						<svg
							@click="(e) => e.preventDefault()"
							xmlns="http://www.w3.org/2000/svg"
							class="menu-icon-alt"
							fill="#fff"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>

						<a-menu slot="overlay" style="min-width: 250px">
							<a-menu-item @click="collapsed = !collapsed">
							<img width="22" src="@/assets/Icons/form.svg" alt="icon" />
							<span class="ml-2"
								>{{ collapsed ? "Open" : "Close" }} left sidebar</span
							>
							</a-menu-item>
							<a-divider class="m-0" />
							<a-menu-item class="d-flex align-items-center">
							<router-link to="/manageteam">
								<img
								width="22"
								src="@/assets/icon/group-fill-secondary.svg"
								alt="icon"
								/>
								<span class="ml-2">Manage Team</span>
							</router-link>
							</a-menu-item>

							<a-menu-item class="d-flex align-items-center">
							<router-link to="/shortlist">
								<img
								width="22"
								src="@/assets/icon/star-fill-secondary.svg"
								alt="icon"
								/>
								<span class="ml-2">Shortlist</span>
							</router-link>
							</a-menu-item>

							<a-menu-item>
							<router-link to="/notifications">
								<img
								width="22"
								src="@/assets/icon/bell-fill-secondary.svg"
								alt="icon"
								/>
								<span class="ml-2 mr-2">Notification</span>
								<a-badge
								class="ml-auto"
								:number-style="{ backgroundColor: '#e42076' }"
								:count="unreadNotification"
								/>
							</router-link>
							</a-menu-item>
							<a-menu-item>
							<router-link to="/chat-window">
								<img
								width="22"
								src="@/assets/icon/chat-dots-fill-secondary.svg"
								alt="icon"
								/>
								<span class="ml-2 mr-2">Chat</span>
								<!--                <a-badge-->
								<!--                  class="ml-auto"-->
								<!--                  :number-style="{ backgroundColor: '#e42076' }"-->
								<!--                  count="120"-->
								<!--                />-->
							</router-link>
							</a-menu-item>
							<a-menu-item>
							<img
								width="22"
								src="@/assets/icon/support-secondary.svg"
								alt="icon"
							/>
							<span class="ml-2">Support</span>
							</a-menu-item>
							<a-menu-item>
							<router-link to="/settings">
								<img
								width="22"
								src="@/assets/icon/gear-fill-secondary.svg"
								alt="icon"
								/>
								<span class="ml-2">Setting</span>
							</router-link>
							</a-menu-item>
							<a-menu-item @click="logout">
							<img width="22" src="@/assets/icon/logout.svg" alt="icon" />
							<span class="ml-2">Logout</span>
							</a-menu-item>
						</a-menu>
						</a-dropdown>
					</div>
					</div>
				</div>
				</header>
			</div>
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
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
// import NotificationPopup from "@/components/notification/NotificationPopup";
import Loader from "@/plugins/loader/loader.vue";
//import SimpleSearch from "@/components/search/SimpleSearch.vue";
import CandidateProfiles from "@/components/search/CandidateProfiles.vue";
import AddComponent from '@/components/add/addComponent';
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
	name: "AdvanceSearch",
	components: {
		NotificationPopup: () => import('@/components/notification/NotificationPopup'),
		'ProfileDetail': () => import('@/components/search/CandidateProfileDetails'),
		'RightSideCandidateDetail': () => import('@/components/search/RightSideCandidateDetail'),
		'RightSidebar': () => import('@/components/search/ProfileDetailRight'),
    	SimpleSearch: () => import("@/components/search/SimpleSearch.vue"),
		Header,
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