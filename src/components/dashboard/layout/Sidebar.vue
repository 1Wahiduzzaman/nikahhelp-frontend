<template>
	<div class="d-sidebar" style="padding-right: 15px">
		<template v-if="showMenu && path == 'AdvanceSearch'">
			<div>
				<SidebarHeader @onClickBack="showMenu = false" v-if="!collapsed"/>
				<div v-if="!collapsed" class="mt-5">
					<SimpleSearch />
				</div>
			
			</div>
		</template>
		<template v-else>
			<ul class="sidebar-list" v-show="!collapsed">
				<li @click.prevent="showMenu = true"  class="list-item">
					<router-link to="/search/advance"
						><img
							class="mr-3"
							src="@/assets/icon/search-love-secondary.svg"
							alt="icon"
						/>Search Your Match
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/manageteam" class="flex align-items-center">
						<img class="mr-3" src="@/assets/icon/group-fill-secondary.svg" alt="icon" />
						<span class="mb-0">Manage Team</span>
						<a-badge
							class="ml-2"
							:number-style="{ backgroundColor: '#e42076'}"
							count="100"
						/>
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/connections" class="flex align-items-center">
						<img class="mr-3" src="@/assets/icon/connection-secondary.svg" alt="icon" />
						<span class="mb-0">Connection</span>
						<a-badge
							class="ml-2"
							:number-style="{ backgroundColor: '#e42076'}"
							count="17"
						/>
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/shortlist"
						><img
							class="mr-3"
							src="@/assets/icon/star-fill-secondary.svg"
							alt="icon"
						/>Shortlist
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/notifications" class="flex align-items-center">
						<img class="mr-3" src="@/assets/icon/bell-fill-secondary.svg" alt="icon" />
						<span class="mb-0">Notification</span>
						<a-badge
							class="ml-2"
							:number-style="{ backgroundColor: '#e42076'}"
							count="40"
						/>
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/chat-window" class="flex align-items-center">
						<img class="mr-3" src="@/assets/icon/chat-dots-fill-secondary.svg" alt="icon" />
						<span class="mb-0">Chat</span>
						<a-badge
							class="ml-2"
							:number-style="{ backgroundColor: '#e42076'}"
							count="10"
						/>
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/blocklist"
						><img
							class="mr-3"
							src="@/assets/icon/block-secondary.svg"
							alt="icon"
						/>Block List
					</router-link>
				</li>
				<li class="list-item">
					<router-link to="/profile"
						><img
							class="mr-3"
							src="@/assets/icon/person-fill-secondary.svg"
							alt="icon"
						/>Profile
					</router-link>
				</li>
				<li class="list-item">

					<router-link to="/subscription"
						><img
							class="mr-3"
							src="@/assets/icon/subscription-secondary.svg"
							alt="icon"
						/>Subscription
					</router-link>
				</li>
				<li class="list-item">
					<a href="#"
						><img
							class="mr-3"
							src="@/assets/icon/support-secondary.svg"
							alt="icon"
						/>Support</a
					>
				</li>
				<li class="list-item">
					<router-link to="/settings"
						><img
							class="mr-3"
							src="@/assets/icon/gear-fill-secondary.svg"
							alt="icon"
						/>Setting
					</router-link>
				</li>
				<li class="list-item">
					<a @click.prevent="logout"
						><img
							class="mr-3"
							src="@/assets/icon/logout.svg"
							alt="icon"
						/>Logout</a
					>
				</li>
			</ul>
			<ul class="links" v-show="!collapsed">
				<li><a href="#">Help</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Safety & Guidance</a></li>
				<li><a href="#">Terms & Conditation</a></li>
				<li><a href="/privacy-policy">Privacy Policy & Cookie Policy</a></li>
			</ul>
		</template>
		<div class="trigger" @click="$emit('collapseSideBar')">
			<a-icon :type="collapsed ? 'caret-right' : 'caret-left'" style="font-size: 20px" />
		</div>
	</div>
</template>

<script>
import SidebarHeader from '@/components/dashboard/layout/SidebarHeader'
import SimpleSearch from "@/components/search/SimpleSearch.vue";

export default {
	name: "Sidebar",
	components: {
		SidebarHeader,
		SimpleSearch
	},
	data: () => ({
		showMenu: true
	}),
	computed: {
		path() {
			return this.$route.name
		}
	},
	props: {
		collapsed: Boolean
	},
	methods: {
		// goToChat(){
		// 	alert('go to chat clicked');
		// 	this.$router.push('chat-window');
		// },
		// goToConnection(){
		// 	alert('go to connection clicked');
		// 	this.$router.push('connections');
		// },
		logout() {
			console.log("Logout clicked");
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
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.sidebar-trigger {
  display: none;
}
@media (min-width: 576px) {
  .sidebar-trigger {
    display: flex;
  }
}
.d-sidebar {
	padding: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	position: relative;
	background-color: $bg-white;
	.sidebar-list {
		a {
			color: $color-secondary;
		}
		.list-item > a{
			padding: 8px 15px;
			display: block;
			transition: all 0.4s;

			&:hover {
				background: $bg-secondary;
				color: $color-white;
				text-decoration: none;
				img {
					filter: brightness(0) invert(1);
				}
				
			}
			img {
				width: 24px;
			}
		}

		.list-item > a.router-link-active {
			background: $bg-secondary;
			color: $color-white;
			text-decoration: none;
			img {
				filter: brightness(0) invert(1);
			}
		}
	}
	.trigger {
		position: absolute;
		top: 50%;
		translate: transformY(-50%);
		right: 0px;
		background: $bg-primary;
		color: $bg-white;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 48px;
		border-top-left-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom: 0;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		cursor: pointer;
		box-shadow: -2px 2px 4px 2px #cfcfcf;
	}
	.links {
		padding: 5px;
		&>li {
			font-size: 12px;
			margin-bottom: 2px;
		}
	}
}
</style>
