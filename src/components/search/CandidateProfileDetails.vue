<template>
    <div>
        <div style="height: 20px" class="top flex justify-space-between mt-2 align-center px-3">
            <v-btn
                class="d-none d-md-block mt-1 text-capitalize"
                rounded
                color="#6158a7"
                dark
                @click="loadSearchResultComponent"
            >
                <div class="flex justify-center align-center">
                    <img style="height: 13px; margin-right: 4px;" src="/assets/icon/chevron-left-solid.svg" alt="">
                    Back
                </div>
            </v-btn>
            <v-btn
                class="mt-1 z-9 d-block d-md-none text-capitalize"
                rounded
                absolute
                small
                color="#6158a7"
                dark
                @click="loadSearchResultComponent"
            >
                <div class="flex justify-center align-center">
                    <img style="height: 13px; margin-right: 4px;" src="/assets/icon/back.svg" alt="">
                </div>
            </v-btn>

            <v-btn-toggle rounded dense class="d-none d-md-block">
                <v-btn
                    style="border-right: 2px solid white !important;"
                    class="mt-1 text-capitalize"
                    color="deep-purple darken-3"
                    @click="$emit('navigateProfile', {userId: profileDetails.user_id, type: 'previous'})"
                >
                    <img style="height: 13px; margin-right: 4px;" src="/assets/icon/chevron-left-solid.svg" alt="">
                </v-btn>
                <v-btn
                    class="mt-1 text-capitalize"
                    rounded
                    color="deep-purple darken-3"
                    @click="$emit('navigateProfile', {userId: profileDetails.user_id, type: 'next'})"
                >
                    <img style="height: 13px; margin-right: 4px;" src="/assets/icon/chevron-right-solid.svg" alt="">
                </v-btn>
            </v-btn-toggle>
        </div>
        
        <!-- mobile profile next button -->
        <div class="d-block d-md-none px-3">
            <v-btn
                class="mt-1 text-capitalize z-9"
                rounded
                small
                absolute
                bottom
                color="#6158a7"
                @click="$emit('navigateProfile', {userId: profileDetails.user_id, type: 'previous'})"
            >
                <div class="flex justify-center align-center">
                    <img style="height: 13px; margin-right: 4px;" src="/assets/icon/chevron-left-solid.svg" alt="">
                    
                </div>
            </v-btn>
             <v-btn
                class="mt-1 text-capitalize z-9"
                rounded
                small
                absolute
                bottom
                right
                color="#6158a7"
                @click="$emit('navigateProfile', {userId: profileDetails.user_id, type: 'next'})"
            >
                <div class="flex justify-center align-center">
                    <img style="height: 13px;" src="/assets/icon/chevron-right-solid.svg" alt="">
                </div>
            </v-btn>
        </div>
        <!-- end mobile profile next button -->
        <ProfileBanner
            class="mt-5"
            :name="profileDetails.first_name + ' ' + profileDetails.last_name"
            :image="
            profileDetails.personal.per_main_image_url
                ? profileDetails.personal.per_main_image_url
                : avatarSrc
            "
        />

        <!-- button section -->
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
            <ButtonComponent
                iconHeight="14px"
                :isSmall="true"
                :title="profile.is_short_listed ? 'Unlist' : 'ShortList'"
                icon="/assets/icon/star-fill-secondary.svg"
                :customEvent="profile.is_short_listed ? 'removeShortList' : 'addShortList'"
                @onClickButton="onClickButton"
            />
            <ButtonComponent
                iconHeight="14px"
                :isSmall="true"
                :title="profile.is_connect ? 'Disconnect' : 'Connect'"
                icon="/assets/icon/connect-s.svg"
                :customEvent="profile.is_connect ? 'removeConnection' : 'addConnection'"
                @onClickButton="onClickButton"
            />
            <ButtonComponent
                iconHeight="14px"
                :isSmall="true"
                :title="profile.is_teamListed ? 'TeamUnlist' : 'TeamList'"
                icon="/assets/icon/team.svg"
                :customEvent="profile.is_teamListed ? 'removeTeam' : 'addTeam'"
                @onClickButton="onClickButton"
            />
            <ButtonComponent
                iconHeight="14px"
                :isSmall="true"
                :responsive="true"
                :title="profile.is_block_listed ? 'Unblock' : 'Block'"
                :icon="profile.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
                :customEvent="profile.is_block_listed ? 'removeBlock' : 'block'"
                :backgroundColor="profile.is_block_listed ? '' : '#d81b60'"
                :titleColor="profile.is_block_listed ? '' : 'white'"
                @onClickButton="onClickButton"
            />
        </div>
        <!-- button section -->

        <!-- personal information -->
        <PersonalInformation />
        <!-- personal information -->
    </div>
</template>

<script>
import PersonalInformation from '@/components/search/personal-information/PersonalInformation'
import {btnData} from '@/data/candidate.button'
import ButtonComponent from '@/components/atom/ButtonComponent'
import ProfileBanner from '@/components/atom/ProfileBanner'
import {mapMutations, mapActions, mapGetters} from 'vuex'
import JwtService from "@/services/jwt.service";

export default {
    name: 'CandidateProfileDetails',
    data: () => ({
        btnData,
        images: []
    }),
    components: {
        ProfileBanner,
        ButtonComponent,
        PersonalInformation
    },
    computed: {
        ...mapGetters({
            profileDetails:'search/getProfileDetails',
            profile: 'search/getSelectedProfileInfo'
        }) 
    },
    methods: {
        ...mapMutations({
            setComponent: 'search/setComponent'
        }),
        ...mapActions({
            connectToCandidate: 'search/connectCandidate',
            blockACandidate: 'search/blockCandidate',
            shortListCandidate: 'search/shortListCandidate',
            teamListCandidate: 'search/teamListCandidate',
        }),
        onClickButton(eventData) {
            if(eventData.event == 'openGallery') this.openGallery();
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            if(userInfo.status != 3) {
                this.showError('Your account is not verified')
                return
            }
            if(this.profile.verification_status != 3) {
                this.showError('This candidate is not verified')
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
            url: `v1/short-listed-candidates/store?shortlisted_by=${JwtService.getUserId()}&user_id=${this.profile.user_id}`,
                value: true,
                actionType: 'post',
                user_id: this.profile.user_id,
                params: {
                    shortlisted_by: JwtService.getUserId(),
                    user_id: this.profile.user_id
                },
                payload: {
                    shortlisted_by: JwtService.getUserId(),
                    user_id: this.profile.user_id
                }
            }
            try {
                await this.shortListCandidate(data)
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
                await this.shortListCandidate(data)
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
            } catch (e) {
                if(e.response) {
                    this.showError(e.response.data.message)
                }
            }
            
        },
        async removeFromTeamList() {
            let data = {
                url: 'v1/delete-team-short-listed-by-candidates ',
                value: false,
                actionType: 'delete',
                user_id: this.profile.user_id,
                payload: {
                    user_id: this.profile.user_id
                }
            }
            try {
                await this.teamListCandidate(data)
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
            let data = {
                url: url,
                actionType: actionType,
                value: value,
                payload: {
                    //block_by: JwtService.getUserId(),
                    user_id: this.profile.user_id
                }
            }
            try {
                await this.blockACandidate(data)
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
            this.setComponent('AddComponent')
            this.$emit('switchComponent', 'CandidateProfiles')
        },
        openGallery() {
            this.images= [];
            let images = this.profileDetails.other_images
            if(images.length > 0) {
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
    }
}
</script>

<style scoped lang="scss">
.z-9 {
    z-index: 9;
}
.opacity-effect {
    opacity: 0.5;
    transition: .3s;
    &:hover {
        opacity: 1;
    }
}
.v-btn--absolute.v-btn--right, .v-btn--fixed.v-btn--right {
    right: 29px;
}

</style>
