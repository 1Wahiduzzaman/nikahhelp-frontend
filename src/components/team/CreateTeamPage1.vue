<template>
	<a-card class="card-container" style="padding-bottom: 50px">
		<a-row>
			<a-col :span="24">
				<a-col :span="24"
					><img
						class="group-logo"
						src="@/assets/Icons/Create a team.svg"
						alt=""
				/></a-col>
				<a-col :span="24"><span class="card-title">Create a team</span></a-col>
			</a-col>
		</a-row>
		<a-row>
			<a-divider />
		</a-row>
		<a-row>
			<a-input
				v-model="$store.state.team.team_name"
				size="large"
				class="team-name-input"
				placeholder="Team name"
			/>
		</a-row>
		<a-row>
			<a-textarea
				class="team-description"
				placeholder="Team description"
				:auto-size="{ minRows: 3, maxRows: 5 }"
				v-model="$store.state.team.team_description"
			/>
		</a-row>
		<a-row>
			<a-button class="next-button" @click="goNext">Next</a-button>
			<a-button
				class="next-button"
				style="margin-right: 10px"
				v-on:click="$emit('cancel_button')"
				>Cancel</a-button
			>
		</a-row>
	</a-card>
</template>

<script>
export default {
	name: "CreateTeam1",
	components: {},
	data() {
		return {
			isLoading: false,
			user: {},
			is_verified: 1,
		};
	},
	created() {},
	methods: {
		validate() {
			let validation_status = true;
			let validation_msgs = [];
			if (!this.$store.state.team.team_name) {
				validation_msgs.push("Please enter a team name");
				// alert("Please type a team name");
				validation_status = false;
			}

			if (!this.$store.state.team.team_description) {
				validation_msgs.push("Please enter team description");
				// alert("Please type a team description");
				validation_status = false;
			}

			if (validation_msgs.length > 0) {
				let msg = validation_msgs.join(".\n");
				// this.$notification.open({
				// 	message: "Error",
				// 	description: msg,
				// 	onClick: () => {
				// 		console.log("Notification Clicked!");
				// 	},
				// });
				this.$error({
					title: "Create Team Error!",
					content: msg,
					centered: true,
				});
				// this.$message.error(msg);
				//alert(msg);
			}
			return validation_status;
		},
		goNext() {
			let validation_status = this.validate();
			console.log("pressedGoNext");
			console.log(this.$store.state.team);
			if (validation_status == true) {
				console.log("true found");
				this.$store.dispatch("setCreateTeamStep", 2);
				this.$router.push("/create-team-2");
			}
		},
	},
};
</script>

<style scoped>
.card-container {
	margin: 20px 15px 0px 15px;
	padding: 15px;
	border-radius: 5px;
	box-shadow: 0 0 5px 3px #d3d3d3 !important;
	text-align: center;
	height: 96%;
}
.group-logo {
	width: 80px;
	margin-bottom: 10px;
}
.card-title {
	color: #6158a7;
	font-weight: 400;
	font-size: 2.25rem;
}
.team-description {
	margin-top: 10px;
}
.next-button {
	margin-top: 10px;
	float: right;
	background-color: #6158a7;
	color: white;
}
</style>