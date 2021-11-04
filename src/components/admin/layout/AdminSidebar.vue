<template>
	<div class="d-sidebar">
		<!-- <div  class="srink-sidebar">toggle</div> -->
		<ul class="sidebar-list shadow-default">
			<li class="list-item">
				<a href="/admin/user-report"
					><img
						class="mr-3"
						src="@/assets/icon/search-love-secondary.svg"
						alt="icon"
					/>User Report</a
				>
			</li>
			<li class="list-item">
				<a href="#"
					><img
						class="mr-3"
						src="@/assets/icon/search-love-secondary.svg"
						alt="icon"
					/>Team Report</a
				>
			</li>
			<li class="list-item">
				<a href="/admin/pending-user-list"
					><img
						class="mr-3"
						src="@/assets/icon/group-fill-secondary.svg"
						alt="icon"
					/>Pending User List</a
				>
			</li>
			<li class="list-item">
				<a href="#"
					><img
						class="mr-3"
						src="@/assets/icon/connection-secondary.svg"
						alt="icon"
					/>Manage Notification</a
				>
			</li>
			<li class="list-item">
				<a href="/admin/subscription-report"
					><img
						class="mr-3"
						src="@/assets/icon/subscription-secondary.svg"
						alt="icon"
					/>Subscription Report</a
				>
			</li>
			<li class="list-item">
				<a href="#"
					><img
						class="mr-3"
						src="@/assets/icon/star-fill-secondary.svg"
						alt="icon"
					/>Other</a
				>
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
	</div>
</template>

<script>
export default {
	name: "Sidebar",
	components: {},
	methods: {
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
					vm.$router.push("/");
				},
				onCancel() {
					console.log("Cancel");
				},
			});
		},
	},
};

/*                                                  

  $(document).ready(function() {
            $('ul li a').click(function() {
                $('li a').removeClass("active");
                $(this).addClass("active");
            });
        });
*/
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.d-sidebar {
	margin-top: 10px;
	padding: 5px;
	width: 300px;
	// position: fixed;
	// overflow: hidden;
	// z-index: 1;
	background-color: white;
	// .srink-sidebar{

	// }
	.sidebar-list {
		padding: 15px;
		border-radius: 5px;
		.list-item {
			padding: 8px 15px;
			transition: all 0.4s;
			a {
				color: $bg-secondary;
			}
			&:hover {
				background: $bg-secondary;

				a {
					color: $color-white;
					text-decoration: none;
					img {
						filter: brightness(0) invert(1);
					}
				}
			}
			img {
				width: 24px;
			}
		}
	}
}
</style>
