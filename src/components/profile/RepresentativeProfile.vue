<template>
		<Loader v-if="isLoading" :isLoading="isLoading" />
	<div v-else class="rep-profile">
		<div class="profile-heading" >
			<ProfileBanner
				class="px-2 mt-2"
			/>
			<!-- Avatar and cover images -->
			<!-- <div class="text-center">
				<img
					src="@/assets/Icons/profile cover.jpg"
					alt=""
					class="cover-img"
				/>
				<img :src="avatarSrc" alt="" class="avatar-img" />

				<h3 style="margin-top: 60px">
					{{ representativeData.first_name }}
					{{ representativeData.last_name }}
				</h3>
			</div> -->
			<!-- Buttons -->
			<div class="row mt-3 mb-3 text-center">
				<!-- <div class="col">
					<button disabled class="btn btn-primary px-4">Gallery</button>
				</div> -->
				<!-- <div class="col">
					<router-link to="/edit_representative" class="btn btn-primary px-4">
						<img src="@/assets/icon/pencil-square.svg" />Edit Profile
					</router-link>
				</div> -->
				<!-- <div class="col">
					<button class="btn btn-primary px-4" @click="startConversation">
						<img src="@/assets/icon/chat-dots-fill-white.svg" alt="">
						Message
					</button>
				</div> -->
			</div>
			<!-- Team name and profile link -->
			<!-- <div class="row mt-3 mb-3">
				<div class="col">
					<div class="team-name-div">
						<span class="team-name-title">Representated by</span>
						<span class="team-name ml-3">Team name</span>
					</div>
				</div>
				<div class="col">
					<div class="team-name-div">
						<span class="team-name-title">Profile Link</span>
						<span class="team-name ml-1"
							>54.254.41.18/user/profile/{{ representativeData.user_id }}</span
						>
					</div>
				</div>
			</div> -->
		</div>
		<!-- Representative Info -->
		<fieldset class="review">
			<div class="text-start">
				<div class="review-edit">
					<div class="review-edit-label">
						Essential Information
						<img
							class="ms-2"
							src="@/assets/icon/pencil-square.svg"
							alt="icon"
						/>
					</div>
					<div class="row">
						<div class="col">
							<div class="card-custom h-100">
								<TableRow 
									title="Full Name"
									:value="representativeData.first_name + ' ' + representativeData.last_name"
								/>
								<TableRow 
									title="Screen Name"
									:value="representativeData.screen_name"
								/>
								<TableRow 
									title="Gender"
									:value="representativeData.per_gender == 1 ? 'Male' : 'Female'"
								/>
								<TableRow 
									title="Age"
									:value="representativeData.dob"
								/>
								<TableRow 
									title="Occupation"
									:value="representativeData.per_occupation"
								/>
								<TableRow 
									title="Current Residence"
									:value="representativeData.per_current_residence_city + ', ' +representativeData.per_current_residence_country"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
</template>

<script>
import firebase from "../../configs/firebase";
import ApiService from "@/services/api.service";
import ProfileBanner from "@/components/atom/ProfileBanner";
import TableRow from '@/components/atom/TableRow'

export default {
	name: "RepresentativeProfile",
	props: ["representativeData"],
	components: {
		ProfileBanner,
		TableRow
	},
	data() {
		return {
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			conversations: [],
			candidateData: null,
			isLoading: false,
		};
	},
	created() {
		this.getCandidateData();
	},
	methods: {
		async getCandidateData() {
			console.log(JSON.parse(localStorage.getItem("user")), '>>>>>>>>>>>>')
			try {
				this.isLoading = true;
				const user = JSON.parse(localStorage.getItem("user"));
				console.log(ApiService, 'before call')
				const response = await ApiService.get(`v1/candidate/info/${user.id}`);
				console.log('after api call')
				if (response.status === 200) {
				this.isLoading = false;
				this.candidateData = {
					...response.data.data,
					preference: {
					...response.data.data.preference,
					pre_occupation: JSON.parse(
						response.data.data.preference.pre_occupation
					),
					},
				};
				}
			} catch (error) {
				this.isLoading = false;
				console.log(error, '>>>>>>>>>')
			}
		},
		startConversation() {
			var res_userid = this.representativeData.user_id;
			var my_user_id = this.$store.state.user.user.id;
			var chat_category = this.returnCategoryId(
				"one2one",
				res_userid,
				my_user_id
			);
			var checkConvId = this.checkChatCategory(chat_category);
			// check if same chat exists
			if (checkConvId) {
				console.log("chat found");
				this.$store.dispatch("setCurrentConversation", checkConvId);
			} else {
				console.log("chat not found");
				// else create chat
				var res_fname = this.representativeData.first_name;
				var my_fname = "";
				if (this.$store.state.user.user.account_type == 1) {
					my_fname = this.$store.state.user.candidate_information.first_name;
				} else {
					my_fname =
						this.$store.state.user.representative_information.first_name;
				}
				var chatTitle = this.returnChatTitle(
					res_userid,
					my_user_id,
					res_fname,
					my_fname
				);

				var members = [res_userid, my_user_id];
				var newConv = {
					title: chatTitle,
					type: "connected",
					members: members,
					last_msg: "",
					category_id: chat_category,
				};

				var self = this;
				var convCollection = firebase.collection("conversations");
				convCollection.add(newConv)
				.then(function(docRef) {
					self.$store.dispatch('setCurrentConversation',docRef.id);
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
				alert("conv createed:" + chatTitle);
				// console.log('conversation start clicked');
				// console.log(res_userid);
				// console.log(my_user_id);
				// console.log(chat_category);
				// console.log(res_fname);
				// console.log(my_fname);
				// console.log(chatTitle);
			}
			this.$router.push("/chat-window");
		},
		returnCategoryId(type, id1, id2) {
			var category_id = "";
			if (id1 > id2) {
				category_id = type + "_" + id2.toString() + "_" + id1.toString();
			} else {
				category_id = type + "_" + id1.toString() + "_" + id2.toString();
			}
			return category_id;
		},
		returnChatTitle(id1, id2, name1, name2) {
			var title = "";
			if (id1 > id2) {
				title = name1 + " & " + name2;
			} else {
				title = name1 + " & " + name2;
			}
			return title;
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
.rep-profile {
	padding: 10px;
	.profile-heading {
		margin-bottom: 20px;
		.cover-img {
			width: 100%;
			height: 300px;
			position: relative;
			box-shadow: 2px 5px 5px #aaa;
			border: 1px solid white;
			border-radius: 5px;
			top: 0;
			left: 0;
		}
		.avatar-img {
			width: 150px;
			height: 150px;
			margin-left: 105px;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			position: absolute;
			top: 200px;
			left: 410px;
			border-radius: 5px;
		}
		.team-name-div {
			border: 1px solid $color-primary;
			border-radius: 20px;
			.team-name-title {
				background-color: $color-primary;
				color: white;
				border-top-left-radius: 20px;
				border-bottom-left-radius: 20px;
				padding: 0 15px;
			}
		}
	}

	.review {
		font-size: 14px;
		h4 {
			font-size: 16px;
			opacity: 0.8;
		}
		p {
			font-size: 14px;
		}
		.review-edit {
			position: relative;
			padding: 15px;
			border: 1px solid $border-secondary;
			border-radius: 5px;
			.review-edit-label {
				position: absolute;
				color: $color-secondary;
				left: 50px;
				top: -12px;
				background: $bg-white;
				cursor: pointer;
			}
		}
		ul {
			.label-text {
				opacity: 0.8;
			}
		}
		.profile-img {
			border-radius: 5px;
			overflow: hidden;
		}
	}
}

.badge-info {
	background: $bg-white !important;
	color: black;
	position: relative;
	padding: 8px;
	border-radius: 5px;
	border: 1px solid $border-gray;
	margin-bottom: 15px;
	text-align: center;
	.badge-info-label {
		position: absolute;
		top: -12px;
		opacity: 0.7;
		left: 0;
		right: 0;
		.inner {
			background: $bg-white;
		}
	}
}
</style>