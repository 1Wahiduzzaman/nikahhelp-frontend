<template>
  <v-card
    @click="showDetailRightSide"
    :loading="loading"
    class="mx-auto"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      :src="candidate.image"
    ></v-img>

    <v-card-title>{{ candidate.first_name }} {{ candidate.last_name }}</v-card-title>

    <div class="px-4">
        <ul class="desc-list">
            <!-- Location -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Location</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.per_nationality }}
                    </span>
                </span>
            </li>
            <!-- Age -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Age</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.per_age }} </span>
                </span>
            </li>
            
            <!-- Religion -->
            <li class="flex-between-start">
                <span class="flex-30 label-text">Religion</span>
                <span class="flex-70">:
                    <span class="ml-1">{{ candidate.per_religion }}</span>
                </span>
            </li>
            <template v-if="onceMore">
                <li class="flex-between-start">
                    <span class="flex-30 label-text">Ethnicity</span>
                    <span class="flex-70">:
                        <span class="ml-1">{{ candidate.per_ethnicity }} </span>
                    </span>
                </li>
                <li class="flex-between-start">
                    <span class="flex-30 label-text">Hobby</span>
                    <span class="flex-70">:
                        <span class="ml-1">  </span>
                    </span>
                </li>
            </template>
        </ul>
    </div>
    <v-divider class="mx-4"></v-divider>

    <div class="flex flex-wrap justify-space-between px-4">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_short_listed ? 'Unlist' : 'ShortList'"
        icon="/assets/icon/star-fill-secondary.svg"
        :customEvent="candidate.is_short_listed ? 'removeShortList' : 'addShortList'"
        @onClickButton="onClickButton"
      />
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_connect ? 'Disconnect' : 'Connect'"
        icon="/assets/icon/connect-s.svg"
        :customEvent="candidate.is_connect ? 'removeConnection' : 'addConnection'"
        @onClickButton="onClickButton"
      />
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_teamListed ? 'TeamUnlist' : 'TeamList'"
        icon="/assets/icon/team.svg"
        :customEvent="candidate.is_teamListed ? 'removeTeam' : 'addTeam'"
        @onClickButton="onClickButton"
      />
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_block_listed ? 'Unblock' : 'Block'"
        :icon="candidate.is_block_listed ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
        :customEvent="candidate.is_block_listed ? 'removeBlock' : 'block'"
        :backgroundColor="candidate.is_block_listed ? '' : '#d81b60'"
        :titleColor="candidate.is_block_listed ? '' : 'white'"
        @onClickButton="onClickButton"
      />
    </div>
    <div class="px-4 pb-4 mt-4">
      <ButtonComponent
        :responsive="false"
        title="View Profile"
        customEvent="viewProfileDetail"
        @onClickButton="onClickButton"
      />
      <!-- <v-btn
        class="mt-1 text-capitalize"
        block
        rounded
        color="deep-purple darken-1"
        dark
        @click.stop="ViewProfileDetail"
      >
        view profile
      </v-btn> -->
    </div>
  </v-card>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import JwtService from "@/services/jwt.service";
import ButtonComponent from '@/components/atom/ButtonComponent'
  export default {
    name: 'CandidateListCard',
    props: ["candidate"],
    components: {
      ButtonComponent
    },
    data: () => ({
      loading: false,
      selection: 1,
      onceMore: true
    }),
    methods: {
      ...mapMutations({
        setComponent: 'search/setComponent',
        setSelectedProfileInfo: 'search/setSelectedProfileInfo',
      }),
      ...mapActions({
        getDetails: 'search/searchUser',
        connectToCandidate: 'search/connectCandidate',
        blockACandidate: 'search/blockCandidate',
        shortListCandidate: 'search/shortListCandidate',
        fetchProfileDetail: 'search/fetchProfileDetail',
        teamListCandidate: 'search/teamListCandidate',

      }),
      onClickButton(eventData) {
        if(eventData.event == 'viewProfileDetail') {
          this.ViewProfileDetail()
        }
        if(eventData.event == 'addConnection') {
          this.connectCandidate();
        }
        if(eventData.event == 'block') {
          this.blockCandidate();
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
      shortList() {
        console.log('short list')
      },
      async connectCandidate() {
        let myTeamId = JwtService.getTeamIDAppWide();
        console.log(myTeamId, '>>>>>>>')
        if(!myTeamId) {
          this.showError("You don't have a team")
           return;
        }
        if(!this.candidate.team_id) {
          this.showError("This candidate has no team")
           return;
        }
        let data = {
          userId: this.candidate.user_id,
          url: 'v1/send-connection-request',
          payload: {
            from_team_id: myTeamId,
            to_team_id: this.candidate.team_id
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
          url: `v1/short-listed-candidates/store?shortlisted_by=${JwtService.getUserId()}&user_id=${this.candidate.user_id}`,
          value: true,
          actionType: 'post',
          user_id: this.candidate.user_id,
          params: {
            shortlisted_by: JwtService.getUserId(),
            user_id: this.candidate.user_id
          },
          payload: {
            shortlisted_by: JwtService.getUserId(),
            user_id: this.candidate.user_id
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
          user_id: this.candidate.user_id,
          payload: {
            user_id: this.candidate.user_id
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
          user_id: this.candidate.user_id,
          payload: {
            team_listed_by: JwtService.getUserId(),
            user_id: this.candidate.user_id
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
          user_id: this.candidate.user_id,
          payload: {
            user_id: this.candidate.user_id
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
        let url = `v1/candidate/info/${this.candidate.user_id}`
        try {
          await this.fetchProfileDetail(url)
        } catch (e) {
          if(e.response) {
            this.showError(e.response.data.message)
          }
        }
      },
      async blockCandidate() {
        let data = {
          url: 'v1/store-block-list',
          payload: {
            block_by: JwtService.getUserId(),
            user_id: this.candidate.user_id
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
      showDetailRightSide() {
        this.setSelectedProfileInfo(this.candidate)
        this.setComponent('RightSideCandidateDetail')
        console.log('show right side detail')
      },
      ViewProfileDetail() {
        this.fetchCandidate()
        this.$emit('switchComponent')
        document.getElementById('topper').click()
        setTimeout(() => {
          this.setComponent('RightSidebar')
        }, 10)
      },
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>