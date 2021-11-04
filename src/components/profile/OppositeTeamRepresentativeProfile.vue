<template>
	<div class="rep-profile"  style="margin-top: 15px;">
		<div class="profile-heading">
			<!-- Avatar and cover images -->
			<div class="text-center">
				<img
					src="@/assets/Icons/profile cover.jpg"
					alt=""
					class="cover-img"
				/>
				<img :src="avatarSrc" alt="" class="avatar-img" />

				<h3 class="name">
					{{ representativeData.first_name }}
					{{ representativeData.last_name }}
				</h3>
			</div>
			<!-- Buttons -->
			<div class="row mt-3 mb-3 text-center">
				<div class="col">
						<button disabled class="btn btn-primary px-4">Gallery</button>
				</div>
				<div class="col">
					<a href="#" class="btn btn-primary px-4">
						<img src="@/assets/icon/star.svg" alt="" style="margin-bottom: 3px"> 
						Shortlist
					</a>
				</div>
				<div class="col">
					<button class="btn btn-primary px-4">
						<img src="@/assets/icon/teamlist.svg" alt="" width="20" height="20">
						Teamlist
					</button>
				</div>
				<div class="col">
					<button class="btn btn-primary px-4">
						<img src="@/assets/icon/connect.svg" alt="" height="18" width="20">
						Connect
					</button>
				</div>
				<div class="col">
					<button class="btn btn-block-pink px-4">
						<img src="@/assets/icon/block.svg" alt="" width="20" height="17">
						Block
					</button>
				</div>
			</div>
			<!-- Team name and profile link -->
			<div class="row mt-3 mb-3">
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
			</div>
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
								<ul>
									<!-- Full Name -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Full Name</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.first_name }}
												{{ representativeData.last_name }}
											</span>
										</span>
									</li>
									<!-- Screen Name -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Screen Name</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.screen_name }}
											</span>
										</span>
									</li>
									<!-- Gender -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Gender</span
										><span class="flex-70 px-2 d-inherit"
											>:<span
												class="ml-3"
												v-if="representativeData.per_gender == 1"
											>
												Male
											</span>
											<span
												class="ml-3"
												v-if="representativeData.per_gender == 2"
											>
												Female
											</span>
										</span>
									</li>
									<!-- DOB -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Date of Birth</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.dob }}
											</span>
										</span>
									</li>
									<!-- Occupation -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Occupation</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.per_occupation }}
											</span>
										</span>
									</li>
									<!-- Current Residence -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text"
											>Current Residence</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.per_current_residence_city }},
												{{ representativeData.per_current_residence_country }}
											</span>
										</span>
									</li>
									<!-- Permanent Residence -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text"
											>Permanent Residence</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.per_permanent_city }},
												{{ representativeData.per_permanent_country }}
											</span>
										</span>
									</li>
									<!-- Permanent Residence -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Address</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.per_permanent_address }}
											</span>
										</span>
									</li>
									<!-- Mobile Number -->
									<li class="flex-between-start">
										<span class="flex-30 px-2 label-text">Mobile Numbeer</span
										><span class="flex-70 px-2"
											>:<span class="ml-3">
												{{ representativeData.mobile_country_code
												}}{{ representativeData.mobile_number }}
											</span>
										</span>
									</li>
								</ul>
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
export default {
	name: "RepresentativeProfile",
	props: ["representativeData"],
	data() {
		return {
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			conversations: [],
		};
	},
	created() {
		var self = this;
		firebase
			.collection("conversations")
			.get()
			.then((querySnapshot) => {
				console.log(`Found ${querySnapshot.size} documents.`);
				querySnapshot.forEach((doc) => {
					var convDetails = doc.data();
					convDetails.id = doc.id;
					self.conversations.push(convDetails);
				});
			});

		console.log("conversations loaded");
	},
	methods: {
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

				var convCollection = firebase.collection("conversations");
				convCollection.add(newConv);
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
	margin: 25px;
	width: 120%;
	margin-left: 45px;
	.profile-heading {
		margin-bottom: 20px;
        margin-left: 10px;
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
			margin-left: 130px;
			margin-bottom: 50px;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			position: absolute;
			top: 208px;
			left: 380px;
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
	}

	.review {
        margin-left: 10px;
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
.btn-block-pink {
    color: $color-white;
    background: #E51F76;
    border: 1px solid $border-white;
    box-shadow: 2px 2px 2px #999;
    border-radius: 20px;
    &:hover,
    &:not(:disabled):not(.disabled):active {
    background: #E51F76;
    border: 1px solid $border-primary;
    opacity: 0.9;
    outline: 0;
    }
    &:disabled,
    &.disabled {
    color: $color-white;
    background: #E51F76;
    border: 1px solid $border-primary;
    opacity: 0.6;
    }
    img {
    margin-right: 3px;
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
.name {
	margin-top: 6%;
}
</style>