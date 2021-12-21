<template>
	<div class="shortlist-wrapper">
		<div class="top" :class="classObject">
			<div class="shortlist-by">
				Team: {{ connection.team_name }} <span></span>
			</div>
		</div>

		<div class="bottom">
			<div class="user-img">
				<img
            :src="connection.candidateInfo && connection.candidateInfo.candidate_image ? connection.candidateInfo.candidate_image : avatarSrc"
					alt="image"
					class="avatar-img"
				/>
				<div class="name-address">
					<p v-if="connection.candidateInfo">
						{{ connection.candidateInfo ? connection.candidateInfo.candidate_fname : '' }}
						{{ connection.candidateInfo ? connection.candidateInfo.candidate_lname : '' }}
					</p>
					<p class="address" v-if="connection.candidateInfo">
						{{ connection.candidateInfo ? connection.candidateInfo.candidate_location : 'N/A' }},
						{{ connection.candidateInfo ? getAge(connection.candidateInfo.candidate_age) : 'Not found' }} Years,
						{{ connection.candidateInfo ? connection.candidateInfo.candidate_religion : 'N/A' }}
					</p>
				</div>
			</div>

			<div class="report-button">
				<!-- Block Button -->
				<button
					v-if="type == 'connected'"
					class="btn btn-sm btn-primary btn-brand"
					style="padding-bottom: 2px"
					@click="block"
				>
					<img src="@/assets/icon/block.svg" alt="report icon" height="13" />
					Block
				</button>
				<!-- Accepted Button -->
				<button
					v-else-if="type == 'Request received'"
					class="btn btn-sm btn-primary btn-success"
					@click="acceptRequest"
				>
					<img src="@/assets/icon/connect.svg" alt="report icon" />
					Accept
				</button>
				<!-- Cancel Button -->
				<button
					v-else-if="type == 'Request send'"
					class="btn btn-sm btn-primary btn-info"
				>
					<img src="@/assets/icon/connect.svg" alt="report icon" />
					Cancel
				</button>
				<!-- Connect Button -->
				<button
					v-else
					class="btn btn-sm btn-primary btn-success"
					@click="connectRequest"
					style="padding-bottom: 2px"
				>
					<img src="@/assets/icon/connect.svg" alt="report icon" height="15" />
					Connect
				</button>

				<!-- Disconnect Button -->
				<button
					v-if="type == 'connected'"
					class="btn btn-sm btn-secondary btn-dark"
					@click="disconnectTeam"
				>
					<img src="@/assets/icon/connect.svg" alt="report icon" />
					Disconnect
				</button>
				<!-- Decline Button -->
				<button
					v-else-if="type == 'Request received'"
					class="btn btn-sm btn-secondary btn-danger"
					@click="declineRequest"
				>
					<img src="@/assets/icon/connect.svg" alt="report icon" />
					Decline
				</button>
				<!-- Resend Button -->
				<button
					v-else-if="type == 'Request send'"
					class="btn btn-sm btn-primary btn-info"
				>
					<img src="@/assets/icon/connect.svg" alt="report icon" />
					Resend
				</button>
				<!-- Block Button -->
				<button
					v-else
					class="btn btn-sm btn-primary btn-brand"
					style="padding-bottom: 2px"
					@click="block"
				>
					<img src="@/assets/icon/block.svg" alt="report icon" height="13" />
					Block
				</button>

				<button
					v-if="type == 'connected'"
					class="btn btn-sm btn-secondary"
					@click="startConversation"
					style="padding-bottom: 2px"
				>
					<img
						src="@/assets/icon/Shortlist.svg"
						alt="report icon"
						height="13"
					/>
					Chat
				</button>
				<button
					v-else
					class="btn btn-sm btn-primary btn-brand"
					style="padding-bottom: 2px"
					@click="block"
				>
					<img src="@/assets/icon/block.svg" alt="report icon" height="13" />
					Block
				</button>

				<button
					class="btn btn-sm btn-secondary"
					@click="viewProfile"
					style="padding-bottom: 2px"
				>
					<img
						src="@/assets/icon/person-fill-gray.svg"
						alt="report icon"
						height="13"
					/>
					View Profile
				</button>
			</div>
			<div class="view-details">
				<button @click="selectCandidate">View More Details</button>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from "../../configs/firebase";
import { getAge } from "@/common/helpers.js";
import JwtService from "@/services/jwt.service";
export default {
	name: "Candidate",
	// props: ["candidate"],
	props: ["connection"],
	data() {
		return {
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			conversations: [],
			type: this.connection.connection_type,
		};
	},
	mounted() {
		// var self = this;
		// firebase.collection("conversations").get().then(querySnapshot => {
		// 		console.log(`Found ${querySnapshot.size} documents.`);
		// 		querySnapshot.forEach(doc => {
		// 			var convDetails = doc.data();
		// 			convDetails.id = doc.id;
		// 			self.conversations.push(convDetails);
		// 		});
		// 	});
		this.conversations = this.$store.state.chat.conversations;
		console.log("conversations loaded");
		// this.$store.dispatch("getConwiseInfo");
	},
	computed: {
		// location() {
		// 	return this.$store.state.candidateInfo.countries[
		// 		this.connection.candidate_location
		// 	].name;
		// },
		classObject() {
			if (this.type == "connected") {
				return {
					connected: this.type,
				};
			} else if (this.type == "Request received") {
				return {
					received: this.type,
				};
			} else if (this.type == "Request send") {
				return {
					"request-sent": this.type,
				};
			} else if (this.type == "we declined") {
				return {
					"we-declined": this.type,
				};
			} else {
				return {
					"they-declined": this.type,
				};
			}
		},
	},
	methods: {
		getAge,
		selectCandidate() {
			console.log(this.connection.team_name);
			this.selectedData = this.connection;
			this.$emit("selected-connection", this.connection);
		},
		viewProfile() {
			this.$router.push(
				`/user/profile/${this.connection.candidateInfo.candidate_userid}`
			);
		},
		acceptRequest() {
			this.$emit("accept-request", this.connection.connection_id);
		},
		disconnectTeam() {
			console.log(this.connection.connection_id);
			this.$emit("disconnect-team", this.connection.connection_id);
		},
		declineRequest() {
			this.$emit("decline-request", this.connection.connection_id);
		},
		connectRequest() {
			let teamId = JwtService.getTeamIDAppWide();
			if (this.connection.from_team_id != teamId) {
				this.$emit("connect-request", this.connection.from_team_id);
			} else {
				this.$emit("connect-request", this.connection.to_team_id);
			}
		},
		block() {
			this.$emit(
				"block-candidate",
				this.connection.candidateInfo.candidate_userid
			);
		},
		startConversation() {
			console.log("start clicked");
			var con_id = this.connection.connection_id;
			var conwise_chatinfo = this.$store.state.chat.conwise_info;
			for (var i = 0; i < conwise_chatinfo.length; i++) {
				if (conwise_chatinfo[i].con_id == con_id) {
					var chat_title = conwise_chatinfo[i].title;
					var member_list = conwise_chatinfo[i].member_list;
					var chat_category = "connected_" + con_id.toString();
					var check = this.checkChatCategory(chat_category);
					if (check) {
						console.log("chat found");
						this.$store.dispatch("setCurrentConversation", check);
					} else {
						var newConv = {
							title: chat_title,
							type: "connected",
							members: member_list,
							last_msg: "",
							category_id: chat_category,
						};
						var convCollection = firebase.collection("conversations");
						var newconvid = "";
						var self = this;
						convCollection
							.add(newConv)
							.then(function (docRef) {
								newconvid = docRef.id;
								self.$store.dispatch("setCurrentConversation", docRef.id);
								console.log("Document written with ID: ", docRef.id);
							})
							.catch(function (error) {
								console.error("Error adding document: ", error);
							});

						console.log("New conv ID:", newconvid);
						// this.$store.dispatch('setCurrentConversation',newconvid);
						alert("conv createed:" + chat_title);
					}
					this.$router.push("/chat-window");
				}
			}
		},
		checkChatCategory(categoryId) {
			console.log("inside");
			console.log(this.conversations.length);
			console.log(this.conversations);
			for (var i = 0; i < this.conversations.length; i++) {
				console.log("category given:", categoryId);
				console.log("category item:", this.conversations[i].category_id);
				if (this.conversations[i].category_id == categoryId) {
					console.log(this.conversations[i].id);
					return this.conversations[i].id;
				}
			}
			return false;
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.shortlist-wrapper {
	position: relative;
	padding-top: 30px;
	margin-bottom: 20px;
	padding-left: 5px;
	padding-right: 10px;
	.top {
		background-color: #8983bf;
		border-top-left-radius: 15px;
		border-top-right-radius: 100px;
		width: 94%;
		max-width: 400px;
		position: absolute;
		top: 0;
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		padding: 5px 40px 5px 5px;
		min-height: 50px;
		font-size: 13px;
		@media (max-width: 1024px) {
			max-width: calc(100% - 15px);
			border-radius: 10px;
		}
		@media (max-width: 767px) {
			max-width: none;
			padding-right: 15px;
			padding-left: 15px;
			border-top-right-radius: 15px;
		}
		.shortlist-by {
			span {
				font-style: normal;
			}
		}

		.date {
			font-style: italic;
			img {
				width: 18px;
				margin-right: 5px;
			}
		}
	}
	.connected {
		background-color: $bg-success;
	}
	.received {
		background-color: $bg-warning;
	}
	.request-sent {
		background-color: $bg-info;
	}
	.we-declined {
		background-color: $bg-danger;
	}
	.they-declined {
		background-color: $bg-secondary;
	}
	.bottom {
		background-color: #ffffff;
		box-shadow: 2px 0px 8px 0px #999;
		position: relative;
		z-index: 1;
		border-radius: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 3px solid #ffffff;
    margin-right: 15px;
		@media (max-width: 1024px) {
			flex-direction: column;
			align-items: flex-start;
		}
		@media (max-width: 767px) {
			flex-direction: column;
			padding: 10px 0;
			text-align: center;
		}
		&:hover {
			border: 3px solid #3f9de7;
		}
		.user-img {
			min-width: 250px;
			@media (max-width: 1024px) {
				margin-bottom: 5px;
			}
			img {
				max-width: 55px;
				border-radius: 10px;
				float: left;
				margin-right: 10px;
			}
			.name-address {
				float: left;
				@media (max-width: 767px) {
					padding-top: 10px;
				}
				p {
					color: #4d4d4d;
					font-size: 16px;
					margin: 0;
				}
				.address {
					color: #7a7a7a;
					font-size: 14px;
				}
			}
		}

		.team-name {
			flex-basis: 50%;
			text-align: center;
			@media (max-width: 992px) {
				flex-basis: 30%;
			}
			@media (max-width: 767px) {
				padding-top: 20px;
			}
			p {
				margin: 0;
			}
		}
		.report-button {
			text-align: right;
			@media (max-width: 1024px) {
				margin-bottom: 20px;
				text-align: left;
			}
			@media (max-width: 767px) {
				padding-top: 20px;
			}
			button {
				font-size: 11px;
				margin-right: 5px;
				margin-top: 5px;
				margin-bottom: 5px;
				img {
					width: 18px;
					margin-top: -3px;
					margin-left: -3px;
				}
			}
			.btn-brand {
				background-color: $color-brand;
			}
			.btn-success {
				background-color: $color-success;
			}
			.btn-dark {
				background-color: $color-black;
			}
			.btn-info {
				background-color: $color-info;
			}
			.btn-danger {
				background-color: $color-danger;
			}
		}
		.reported {
			background-color: #b3b3b3;
		}
		.view-details {
			background-color: #6158a7;
			width: auto;
			margin-left: 5px;
			height: 55px;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			font-size: 13px;
			padding: 5px;
			@media (max-width: 1024px) {
				margin-bottom: 10px;
				border-radius: 10px;
				height: 34px;
			}
			@media (max-width: 767px) {
				margin-top: 20px;
				border-radius: 10px;
				line-height: 30px;
				padding: 0 30px;
				margin-left: 0;
				display: block;
				width: auto;
			}
			button {
				line-height: 14px;
			}
		}
	}
}
// end css for shortlist wrapper
// .shortlist-wrapper {
// 	position: relative;
// 	padding-top: 30px;
// 	margin-bottom: 30px;
// 	.listed-by {
// 		margin-left: 5px;
// 		background-color: $color-primary;
// 		color: $color-white;
// 		border-top-left-radius: 10px;
// 		padding: 0px 5px 0px 5px;
// 	}
// 	.shortlisted-component {
// 		display: flex;
// 		align-items: center;
// 		height: 50px;
// 		width: 100%;
// 		margin-left: 5px;
// 		border: 1px solid #aaa;
// 		border-radius: 5px;
// 		.avatar-img {
// 			height: 45px;
// 			width: 45px;
// 			border-radius: 5px;
// 		}
// 		.col-md-1 {
// 			padding: 0px !important;
// 		}
// 		.view-details {
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			background-color: $color-secondary;
// 			padding: 0 !important;
// 			height: 100%;
// 			color: $color-white;
// 			font-size: 12px;
// 			border-radius: 5px;
// 		}
// 	}
// }
</style>
