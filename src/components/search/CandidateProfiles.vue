<template>
	<div>
		<h4 class="text-xl-h3 text-h4 font-weight-bold text--disabled mb-2">
			{{isSearched ? 'Search Results' : 'Suggestion'}}
		</h4>
		<span v-if="isSearched" class="text--secondary text-h6">
			Matches for your requirements: {{ totalProfile }} results
		</span>
		<!-- <div class="query-tag flex flex-wrap justify-end align-center my-4">
			<Tag v-for="(item, index) in query" :key="index" :text="item"/>
			<a
				class="query-limit"
				@click.prevent="showAllQuery = !showAllQuery"  
				href="#"
			>
				{{ showAllQuery ? 'See less' : 'See more' }}
			</a>
		</div> -->
		<!-- start advanced search -->
		<div class="row">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="row">
					<div v-for="(profile, n) in  limitedProfiles" :key="n" class="col-sm-12 col-md-6 col-lg-4">
						<CandidateGrid
							:candidate="profile"
							@switchComponent="()=>$emit('switchComponent', 'ProfileDetail')"
						/>
					</div>
				</div>
			</div>
		</div>
		<!-- end advanced search -->
	</div>
</template>

<script>
import CandidateGrid from '@/components/search/NewCandidateCard.vue';
import Tag from '@/components/atom/Tag'
import {mapGetters} from 'vuex';

export default {
	name: 'CandidateProfiles',
	components: {
		CandidateGrid,
		Tag
	},
	data: () => ({
		showAllQuery: false
	}),
	computed: {
		...mapGetters({
			profiles: 'search/getProfiles',
			totalProfile: 'search/getProfileCount',
			queryArr: 'search/getQueryArr',
			isSearched: 'search/getSearchStatus'
		}),

		limitedProfiles() {
			return this.profiles.slice(0,10);
		},

		query() {
			let length = this.queryArr.length;
			if(length > 5) {
				if(this.showAllQuery) {
					return this.queryArr
				}
				return this.queryArr.slice(0,5);
			}
			return this.queryArr
		}
	},
	methods: {
		
	}
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
// start css for advanced-search
.query-tag {
	.query-limit {
		color: $bg-brand;
		text-decoration: underline;
		width: 68px;
		text-align: right;
		transition: .3s;
		&:hover {
			color: $border-danger;
		}
	}
}
</style>