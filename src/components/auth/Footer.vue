<template>
	<footer>
		<div class="container py-3">
			<div class="text-center">
				<a href="/dashboard">
					<img
						src="@/assets/Icons/Logo/SVG/Black_logo_footer.svg"
						width="150"
						height="50"
						alt="logo"
					/>
				</a>
			</div>
			<ul class="footer-menu mt-3">
				<li><a href="#">About</a></li>
				<li><a href="/privacy-policy">Privacy Policy & Cookie Policy</a></li>
				<li><a href="#">Terms and Condition</a></li>
				<li><a href="#">Safety and Guidance</a></li>
				<li><a href="#">Help</a></li>
			</ul>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
	components: {},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
footer {
	border-top: 1px solid $border-default;
	
	// z-index: -1;
	// overflow: hidden;
	.footer-menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		li {
			padding: 5px 10px;
		}
	}
}
</style>