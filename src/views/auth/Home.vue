<template>
	<div>
		<Header />
		<Banner />
		<div class="bg-home-page">
			<RecentlyJoined />
			<Feature />
			<Conversation />
			<FindPartner />
			<Footer />
		</div>
		<Cookies />
	</div>
</template>

<script>
import Header from "@/components/auth/Header.vue";
import Banner from "@/components/auth/Banner.vue";
import Feature from "@/components/auth/Feature.vue";
import Conversation from "@/components/auth/Conversation.vue";
import RecentlyJoined from "@/components/auth/RecentlyJoined.vue";
import FindPartner from "@/components/auth/FindPartner.vue";
import Footer from "@/components/auth/Footer.vue";
import Cookies from "@/components/cookies/Cookies.vue";

export default {
	name: "Home",
	components: {
		Header,
		Banner,
		RecentlyJoined,
		Feature,
		Conversation,
		FindPartner,
		Footer,
		Cookies,
	}
};
</script>

<style scoped>
	.bg-home-page {
		background: url("~@/assets/full.svg") no-repeat center center / cover;
		background-color: #f5f5ff;
	}
</style>
