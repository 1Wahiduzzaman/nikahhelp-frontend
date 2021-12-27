<template>
	<div>
		 <Loader v-if="isLoading" :isLoading="isLoading" />
		<div v-else>
		
				<Setting />
		
		</div>
		
	</div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer";
import Setting from "@/components/setting/Setting.vue";
export default {
	name: "CreateTeam5",
	components: {
		Header,
		Sidebar,
		Footer,
		Setting,
	},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
		};
	},
	created() {
	},
	methods: {
		
	},
};
</script>
