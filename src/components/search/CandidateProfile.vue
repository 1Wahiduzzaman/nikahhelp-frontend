<template>
	<div>
		<!-- start advanced search -->
		<div class="row">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="advanced-search">
					<div class="row">
					<div v-for="n in 5" :key="n" class="col-sm-12 col-lg-6">
						<CandidateGrid :candidate="candidate"/>
					</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end advanced search -->
	</div>
</template>

<script>
import CandidateGrid from "@/components/dashboard/CandidateGrid.vue";
const candidate = {
    image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
    candidate: {
        name: 'John Doe',
        location_name: 'Dhaka, Bangladesh',
        religion: 'Islam',
        ethnicity: 'Bangali'
    }
}
export default {
	name: 'CandidateProfile',
	components: {
		CandidateGrid
	},
	data: () => ({
		candidate
	}),
	methods: {
		
	}
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
// start css for advanced-search
.advanced-search {
	justify-content: space-between;
	width: 100%;
	padding: 30px;
	border-radius: 10px;
	position: relative;
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 1px rgba(63, 6, 17, 0.3);
}
</style>