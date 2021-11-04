<template>
	<div class="recently-joinded section-padding">
		<div class="container">
			<h2 class="color-brand text-center" id="recentlyJoinedDesign">
				<span style="padding-right: 50px">Recently Joined</span>
			</h2>
			<div class="row" style="margin-top: 10px">
				<div class="col-md-4" v-for="user in recJoin" :key="user.name">
					<div class="item flex-between-center">
						<div class="item-img">
							<img class="item-img" @error="imgLoad(index, user)" :ref="`avatar-${index}`" :src="user.image" alt="img" style="border: 1px solid white;"/>
						</div>
						<div class="item-content">
							<div>{{ user.name }}</div>
							<div>{{  getAge(user.age) }}, {{ user.religion }}</div>
							<div>{{ user.study_level }}</div>
							<div>{{ user.location_name }}</div>
							<!-- <div>{{ getAge(user.age) }}</div>
              <div>{{ user.religion }}</div>
              <div>{{ user.ethinicity }}</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ApiService from "../../services/api.service";
export default {
	name: "RecentlyJoined",
	components: {},
	data() {
		return {
			recJoin: [],
		};
	},
	async mounted() {
		await ApiService.get("v1/recent-join-candidate").then((data) => {
			console.log(data);
			this.recJoin = data.data.data;
		});
	},
	methods: {
		getAge(dateString) {
			let today = new Date();
			let birthDate = new Date(dateString);
			let age = today.getFullYear() - birthDate.getFullYear();
			let m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},
		imgLoad(index, user) {
			let img = this.$refs[`avatar-${index}`][0];
			img.src = `https://ui-avatars.com/api/?name=${user.name}background=b5b5b5&color=fff`;
		}
	},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.recently-joinded {
	.item {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid rgb(105, 104, 104);
		background-color: rgb(105, 104, 104);
		@media (max-width: 991px) {
			padding: 5px;
			margin-bottom: 15px;
			font-size: 14px;
		}
		.item-img {
			width: 50px;
			height: 50px;
			flex: 0 0 65px;
			padding: 2px;
			border-radius: 50%;
			background-size: cover;
			margin-top: -3px;
			
		}
		.item-content {
			padding: 5px;
			flex: 1 1 100%;
			color: white;
		}
	}

	#recentlyJoinedDesign {
		font-family: "Rochester", cursive;
		font-size: 45px;
		width: 100%;
		text-align: center; 
		margin-bottom: 45px;
	}
	
	h2 {
	    position: relative;
    	z-index: 1;
		overflow-x: hidden;
		text-align: center;
		margin-right: 30px;
		padding: 12px;
	}
	h2:before, h2:after {
		position: absolute;
		top: 51%;
		overflow: hidden;
		width: 50%;
		height: 1px;
		content: '\a0';
		background-color: #E51F76;	
	}
	h2:before {
		margin-left: -55%;
		text-align: right;
	}
	.color {
		background-color: #ccc;
	}
}
</style>