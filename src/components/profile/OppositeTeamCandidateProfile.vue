<template>
	<div id="wrap-div">
		<Loader v-if="$store.state.search.isLoading" :isLoading="isLoading" />
		<v-container fluid>
			<v-row >
				<v-col cols="12">
					<ProfileBanner
						class="px-2 mt-2"
						:name="candidateData.first_name + ' ' + candidateData.last_name"
						:image="
						candidateData.personal.per_avatar_url
							? candidateData.personal.per_avatar_url
							: avatarSrc
						"
					/>
					<div class="flex justify-space-between flex-wrap mt-10">
						<ButtonComponent
							class="mb-3"
							iconHeight="14px"
							:isSmall="true"
							title="Gallery"
							customEvent="openGallery"
							icon="/assets/icon/gallery.svg"
							@onClickButton="onClickButton"
						/>
						<template v-if="!isOwnProfile">
							<ButtonComponent
								iconHeight="14px"
								:isSmall="true"
								:title="candidateData.status.is_connect ? 'Disconnect' : 'Connect'"
								icon="/assets/icon/connect-s.svg"
								:customEvent="candidateData.status.is_connect ? 'removeConnection' : 'addConnection'"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								iconHeight="14px"
								:isSmall="true"
								:title="candidateData.status.is_short_listed ? 'Unlist' : 'ShortList'"
								icon="/assets/icon/star-fill-secondary.svg"
								:customEvent="candidateData.status.is_short_listed ? 'removeShortList' : 'addShortList'"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								iconHeight="14px"
								:isSmall="true"
								:title="candidateData.status.is_teamListed ? 'Unlist Team' : 'TeamList'"
								icon="/assets/icon/team.svg"
								:customEvent="candidateData.status.is_teamListed ? 'removeTeam' : 'addTeam'"
								@onClickButton="onClickButton"
							/>
							<ButtonComponent
								iconHeight="14px"
								:isSmall="true"
								:responsive="true"
								:title="candidateData.status.is_block_listed ? 'Unblock' : 'Block'"
								:icon="candidateData.status.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
								:customEvent="candidateData.status.is_block_listed ? 'removeBlock' : 'block'"
								:backgroundColor="candidateData.status.is_block_listed ? '' : '#d81b60'"
								:titleColor="candidateData.status.is_block_listed ? '' : 'white'"
								@onClickButton="onClickButton"
							/>
						</template>
					</div>

					<div>
						<v-row class="mt-5">
							<v-col class="pt-0" cols="12" md="6">
								<div class="d-flex justify-space-between d-md-none">
									<OutlinedButton
										:name="copyProfileText"
										customEvent="onClickCopyText"
										@onClickCopyText="onClickCopyText"
									/>
									<OutlinedButton 
										name="Team Information"
										customEvent="onClickTeamDetail"
										@onClickTeamDetail="onClickTeamDetail"
									/>
								</div>
								<div class="d-none d-md-flex">
									<OutlinedButton
										:name="copyProfileText"
										customEvent="onClickCopyText"
										@onClickCopyText="onClickCopyText"
									/>
									<OutlinedButton 
										name="Team Information"
										customEvent="onClickTeamDetail"
										@onClickTeamDetail="onClickTeamDetail"
									/>
								</div>
							</v-col>
							<v-col class="pt-0" cols="12" md="6">
								<Scroller />
							</v-col>
						</v-row>
					</div>

					<div>
						<v-container fluid>
							<v-row dense>
								<v-col cols="12">
									<fieldset class="">
										<legend class="ml-8 px-1"><span>Personal Information</span></legend>
										<v-container fluid class="pt-0 px-5">
											<v-row dense>
												<v-col class="pt-1" cols="12" md="8">
													<PersonalInformationTable :data="candidateData"/>
												</v-col>
												<v-col ref="family-information" class="pt-1" cols="12" md="4">
													<MoreAbout 
														:data="candidateData"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														title="More about me"
														:detail="candidateData.personal.per_about" class="mt-2"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														:showDownloadBtn="true"
														title="Additional Information"
														class="mt-2"
														:detail="candidateData.more_about.per_additional_info_text"
                            							@onClickDownload="onClickDownload"
													/>
												</v-col>
												<v-col class="pt-1 mb-5" cols="12" md="6">
													<CardInfo
													title="I'm thankful for"
													class="mt-2"
													:detail="candidateData.personal.per_thankfull_for"
													/>
												</v-col>
												<v-col class="pt-1 mb-5" cols="12" md="6">
													<CardInfo
														title="How I improve myself?"
														class="mt-2"
														:detail="getHowIImprove()"
													/>
												</v-col>
											</v-row>
										</v-container>
									</fieldset>
									<fieldset style="width:100%" id="family-information" class="-mt-15">
									<legend class="ml-8 bg-white px-1"><span>Family Information</span></legend>
									<v-container fluid class="pt-0 px-5">
										<v-row dense>
											<v-col class="pt-1 mb-5" cols="12" md="7">
												<FamilyInfoTable :data="candidateData"/>
											</v-col>
											<v-col class="pt-1 mb-5" cols="12" md="5">
												<CardInfo :detail="candidateData.family.family_info"/>
											</v-col>
										</v-row>
									</v-container>
									</fieldset>
									<fieldset class="-mt-15">
										<legend id="my-partner-pref" class="ml-8 bg-white px-1"><span>My partner preference</span></legend>
										<v-container fluid class="pt-0 px-5">
											<v-row dense>
												<v-col class="pt-1" cols="12" md="7">
													<MyPrefTable
														:preference="candidateData.preference"
														:countries="candidateData.preference.preferred_countries"
													/>
												</v-col>
												<v-col class="pt-1" cols="12" md="5">
													<CardInfo
														title="What I'm Looking for"
														:detail="candidateData.preference.pre_description"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<CardInfo
														title="Other requirements"
														:detail="candidateData.preference.pre_other_preference"
													/>
												</v-col>
												<v-col class="pt-1" cols="12">
													<v-card class="px-3 py-5">
													<h5>More about preferred partner</h5>
													<p>How Important following characters are to me</p>
													<!-- Character -->
													<!-- <rating-component
														title="Strength of character from a moral point of view"
														:value="
														candidateData.preference.pre_strength_of_character_rate
														"
														:valueString="
														candidateData.preference
															.pre_strength_of_character_rate_string
														"
													></rating-component> -->
													<!-- Looks and Apperance -->
													<rating-component
														title="Looks, appearance & attractiveness"
														:value="
														candidateData.preference.pre_look_and_appearance_rate
														"
														:valueString="
														candidateData.preference
															.pre_look_and_appearance_rate_string
														"
													></rating-component>
													<!-- Religiosity/Faith -->
													<rating-component
														title="Religiosity/ Faith"
														:value="
														candidateData.preference.pre_religiosity_or_faith_rate
														"
														:valueString="
														candidateData.preference
															.pre_religiosity_or_faith_rate_string
														"
													></rating-component>
													<rating-component
														title="Manners, Social skills and ethics"
														:value="
														candidateData.preference
															.pre_manners_socialskill_ethics_rate
														"
														:valueString="
														candidateData.preference
															.pre_manners_socialskill_ethics_rate_string
														"
													></rating-component>
													<!-- Emotional Maturity and compatibility -->
													<rating-component
														title="Emotional Maturity and general intelligence"
														:value="
														candidateData.preference.pre_emotional_maturity_rate
														"
														:valueString="
														candidateData.preference
															.pre_emotional_maturity_rate_string
														"
													></rating-component>
													<!-- Good Listener -->
													<rating-component
														title="Good Listener"
														:value="candidateData.preference.pre_good_listener_rate"
														:valueString="
														candidateData.preference.pre_good_listener_rate_string
														"
													></rating-component>
													<!-- Good talker -->
													<rating-component
														title="Good communicator"
														:value="candidateData.preference.pre_good_talker_rate"
														:valueString="
														candidateData.preference.pre_good_talker_rate_string
														"
													></rating-component>
													<!-- Willing to learn -->
													<rating-component
														title="Willing to learn"
														:value="candidateData.preference.pre_wiling_to_learn_rate"
														:valueString="
														candidateData.preference.pre_wiling_to_learn_rate_string
														"
													></rating-component>
													<!-- Family or Social Status-->
													<rating-component
														title="Family or Social Status"
														:value="
														candidateData.preference.pre_family_social_status_rate
														"
														:valueString="
														candidateData.preference
															.pre_family_social_status_rate_string
														"
													></rating-component>
													<!-- Employment or Wealth-->
													<rating-component
														title="Employment and financial stability"
														:value="
														candidateData.preference.pre_employment_wealth_rate
														"
														:valueString="
														candidateData.preference
															.pre_employment_wealth_rate_string
														"
													></rating-component>
													<!-- Education -->
													<rating-component
														title="Education and academic accomplishments"
														:value="candidateData.preference.pre_education_rate"
														:valueString="
														candidateData.preference.pre_education_rate_string
														"
													></rating-component>
													</v-card>
												</v-col>
											</v-row>
										</v-container>
									</fieldset>
								</v-col>
							</v-row>
						</v-container>
					</div>
					<!-- <div class="profile-footer">
						<Footer></Footer>
					</div> -->
					<ComingSoonModal
						title="Team details quick view"
						ref="advDiag"
					/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import RatingComponent from "./RatingComponent.vue";
import improveMyselfThings from '@/common/improveMyselfThings'
// import Footer from "@/components/auth/Footer.vue";

import ProfileBanner from "@/components/atom/ProfileBanner";
import PersonalInformationTable from '@/components/search/personal-information/PersonalInformationTable.vue'
import FamilyInfoTable from '@/components/search/personal-information/FamilyInfoTable.vue'
import MyPrefTable from '@/components/search/personal-information/MyPrefTableProfile.vue'
import CardInfo from '@/components/atom/CardInfo'
import MoreAbout from '@/components/search/personal-information/MoreAbout.vue'
import Scroller from  '@/components/atom/Scroller'
import ButtonComponent from '@/components/atom/ButtonComponent'
import JwtService from "@/services/jwt.service";

import OutlinedButton from '@/components/atom/OutlinedButton'
import ComingSoonModal from "@/components/search/ComingSoonModal"
import {mapActions} from 'vuex'

export default {
	name: "CandidateProfile",
	props: ["candidateData", "userId", "role"],
	components: { 
		RatingComponent, 
		// Footer,
		ProfileBanner,
		PersonalInformationTable,
		FamilyInfoTable,
		MyPrefTable,
		CardInfo,
		MoreAbout,
		Scroller,
		ButtonComponent,
		OutlinedButton,
		ComingSoonModal
	},
	data() {
		return {
			copyProfileText: 'Copy Profile URL',
			avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
			conversations: [],
			profile: '',
			improveMyselfThings
		};
	},

	computed: {
		studyLevel() {
			if (this.candidateData.preference.pre_study_level_id) {
				var results =
					this.$store.state.candidateInfo.study_level_options.filter(
						(level) => {
							return (
								level.id == this.candidateData.preference.pre_study_level_id
							);
						}
					);
				return results[0].name;
			} else {
				return null;
			}
		},
		isOwnProfile() {
			let loggedInUserId = JSON.parse(localStorage.getItem('userId'))
			return this.candidateData.user_id == loggedInUserId
		}
	},
	methods: {
		...mapActions({
            connectToCandidate: 'search/connectCandidate',
            blockACandidate: 'search/blockCandidate',
            shortListCandidate: 'search/shortListCandidate',
            teamListCandidate: 'search/teamListCandidate',
        }),
		onClickDownload() {
            if(this.candidateData.more_about?.per_additional_info_doc == null) {
                this.$error({
                title: 'Link not available!',
                center: true,
                });
            }

            if(this.candidateData.more_about?.per_additional_info_doc) {
                window.open(this.candidateData.more_about?.per_additional_info_doc, '_blank')
            }
        },
		onClickTeamDetail() {
            this.$refs.advDiag.openDiag()
        },
		 onClickCopyText() {
            this.copyProfileText = 'Copy successful'
            navigator.clipboard.writeText(this.domain+'/user/profile/'+this.candidateData.user_id);
            this.copied = true;
            setTimeout(() => {
                this.copyProfileText = 'Copy Profile URL';
            }, 3000);
        },
		getHowIImprove() {
			let text = [];
			let items = [];
			if(this.candidateData.more_about?.per_improve_myself?.length) {
				this.candidateData.more_about.per_improve_myself.map(i => {
				items.push(this.improveMyselfThings.find(im => im.value === i))
				})
			}
			if(items && items.length) {
				items.map(i => {
				text.push(i.label)
				})
			}
			return text.join(' \n ');
		},
		startConversation() {},
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

		
        onClickButton(eventData) {
			console.log(eventData)
            if(eventData.event == 'openGallery') this.openGallery();

			let userInfo = JSON.parse(localStorage.getItem("userInfo"))
			if(userInfo.status != 3) {
				this.showError('Your account is not verified')
				return
			}
            if(eventData.event == 'addConnection') {
                this.connectCandidate();
            }
            if(eventData.event == 'block') {
                this.handleBlockCandidate('post', true, 'v1/store-block-list');
            }
            if(eventData.event == 'removeBlock') {
                this.handleBlockCandidate('delete', false, 'v1/unblock-by-candidate');
            }
            if(eventData.event == 'addShortList') {
                this.addShortList();
            }
            if(eventData.event == 'removeShortList') {
				console.log('......s.....')
                this.removeFroShortList();
            }
            if(eventData.event == 'addTeam') {
                this.addTeamList();
            }
            if(eventData.event == 'removeTeam') {
                this.removeFromTeamList();
            }
        },

        async connectCandidate() {
            let myTeamId = JwtService.getTeamIDAppWide();
            console.log(myTeamId, '>>>>>>>')
            if(!myTeamId) {
                this.showError("You don't have a team")
                return;
            }
            if(!this.profile.team_id) {
                this.showError("This candidate has no team")
                return;
            }
            let data = {
                userId: this.profile.user_id,
                url: 'v1/send-connection-request',
                payload: {
                    from_team_id: myTeamId,
                    to_team_id: this.profile.team_id
                }
            }
            try {
            let res = await this.connectToCandidate(data)
                this.$success({
                title: "Connection Request Sent Successfully!",
                content: res.message,
                centered: true,
            });
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },

        async addShortList() {
            let data = {
            url: `v1/short-listed-candidates/store?shortlisted_by=${JwtService.getUserId()}&user_id=${this.candidateData.user_id}`,
                value: true,
                actionType: 'post',
                user_id: this.candidateData.user_id,
                params: {
                    shortlisted_by: JwtService.getUserId(),
                    user_id: this.candidateData.user_id
                },
                payload: {
                    shortlisted_by: JwtService.getUserId(),
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.shortListCandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
					// location.reload()
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },

        async removeFroShortList() {
            let data = {
                url: 'v1/delete-short-listed-by-candidates ',
                value: false,
                actionType: 'delete',
                user_id: this.profile.user_id,
                payload: {
                    user_id: this.profile.user_id
                }
            }
            try {
                let res = await this.shortListCandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
					// location.reload()
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
        },
        async addTeamList() {
            let data = {
                url: `v1/team-short-listed-candidates/store`,
                value: true,
                actionType: 'post',
                user_id: this.profile.user_id,
                payload: {
                    team_listed_by: JwtService.getUserId(),
                    user_id: this.profile.user_id
                }
            }
            try {
                let res = await this.teamListCandidate(data)
                if(res.status_code == 422) {
                    this.showError('Something went wrong!')
                }
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },
        async removeFromTeamList() {
			if(this.role != 'Admin' && this.role != 'Owner & Admin') {
                this.showError("You don't have permission.")
                return
            }
            let data = {
                url: 'v1/delete-team-short-listed-by-candidates ',
                value: false,
                actionType: 'delete',
                user_id: this.candidateData.user_id,
                payload: {
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.teamListCandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },

        async fetchCandidate() {
            let url = `v1/candidate/info/${this.profile.user_id}`
            try {
                await this.fetchProfileDetail(url)
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
        },
        async handleBlockCandidate(actionType, value, url) {
			 if(this.role != 'Admin' && this.role != 'Owner & Admin') {
                this.showError("You don't have permission.")
                return
            }
            let data = {
                url: url,
                actionType: actionType,
                value: value,
                payload: {
                    //block_by: JwtService.getUserId(),
                    user_id: this.candidateData.user_id
                }
            }
            try {
                let res = await this.blockACandidate(data)
				if(res.status == "SUCCESS") {
					this.$emit('onFetchUserInfo')
				}
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }  
        },
        showError(message) {
            this.$error({
            title: message,
            center: true,
            });
        },
        loadSearchResultComponent() {
            this.setComponent('')
            this.$emit('switchComponent', 'CandidateProfiles')
        },
        openGallery() {
            this.images= [];
            let images = this.candidateData.other_images
            if(images && images.length > 0) {
                images.map(i => this.images.push(i.image_path));
                this.show();
            } else {
                this.$error({
                title: 'No image found',
                center: true,
                });
            }
        },
        show() {
            this.$viewerApi({
                images: this.images,
            })
        },
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
#wrap-div {
	.container--fluid {
		max-width: 100% !important;
	}
}

.opposite-candidate-profile {
	margin: 25px;
	// width: 1000px;
	widows: 100%;
	margin-left: 10px;
	margin-left: 70px;
	.profile-heading {
		margin-left: 10px;
		margin-bottom: 20px;
		.cover-img {
			width: 100%;
			height: 300px;
			position: relative;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			border-radius: 5px;
			top: 0;
			left: 0;
		}
		.avatar-img {
			width: 150px;
			height: 150px;
			border: 1px solid white;
			box-shadow: 2px 5px 5px #aaa;
			position: absolute;
			top: 192px;
			left: 368px;
			border-radius: 5px;
			margin-left: 110px;
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
	@media (min-width: 1024px){
		margin: 0 auto;
	}
	.h-100{
		height: 100%;
	}
	.h-67{
		height: 66%;
		margin-bottom: 2%;
		@media (max-width: 1024px){
			height: 80%;
		}
		@media (max-width: 767px){
			height: 80%;
		}
	}
	.h-33{
		height: 32%;
		margin-top: 1%;
		@media (max-width: 1024px){
			height: 20%;
			margin-bottom: 2%;
		}
		@media (max-width: 767px){
			// margin-top: auto;
			height: 20%;
			// margin-bottom: 16px;
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
.profile-footer{
	width: 100%;
	@media (max-width: 767px){
		display: none;
	}
}

fieldset {
    border: 1px solid #d3d0e4;
    border-radius: 10px;
}
legend {
    display: inline;
    width: inherit;
    color: #6259a8;
    font-size: 18px;
    font-weight: 600;
}
.-mt-15 {
    margin-top: -13px;
}
.bg-white {
    background: white;
}
</style>