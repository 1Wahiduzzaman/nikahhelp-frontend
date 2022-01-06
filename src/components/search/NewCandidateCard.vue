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
        :title="candidate.is_short_listed ? 'Connect' : 'Disconnect'"
        icon="/assets/icon/connection-secondary.svg"
        :customEvent="candidate.is_connected ? 'removeConnection' : 'addConnection'"
        @onClickButton="onClickButton"
      />
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_short_listed ? 'TeamUnlist' : 'TeamList'"
        icon="/assets/icon/star-fill-secondary.svg"
        :customEvent="candidate.is_connected ? 'removeTeam' : 'addTeam'"
        @onClickButton="onClickButton"
      />
      <ButtonComponent
        wrapperWidth="49%"
        iconHeight="14px"
        :isSmall="true"
        :responsive="false"
        :title="candidate.is_short_listed ? 'Unblock' : 'Block'"
        :icon="candidate.is_blocked ? '/assets/icon/block-secondary.svg' : '/assets/icon/block.svg'"
        :customEvent="candidate.is_blocked ? 'removeBlock' : 'block'"
        :backgroundColor="candidate.is_blocked ? '' : '#d81b60'"
        :titleColor="candidate.is_blocked ? '' : 'white'"
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
        setSelectedProfileInfo: 'search/setSelectedProfileInfo'
      }),
      ...mapActions({
        connectCandidate: 'search/connectCandidate',
        getDetails: 'search/searchUser',

      }),
      onClickButton(eventData) {
        if(eventData.event == 'viewProfileDetail') {
          this.ViewProfileDetail()
        }
      },
      shortList() {
        console.log('short list')
      },
      async onClickConnect() {
        console.log('connect candidate');
        let res = await this.connectCandidate({
          url: 'v1/send-connection-request',
          data: {
            from_team_id: 1,
            to_team_id: 2
          }
        });
        console.log(res)
      },
      showDetailRightSide() {
        this.setSelectedProfileInfo(this.candidate)
        this.setComponent('RightSideCandidateDetail')
      },
      async ViewProfileDetail() {
        //let res = await this.getDetails('v1/user-profile?user_id=1');
       // console.log(res, '>>>>>>>>>>>>>>')
        this.$emit('switchComponent')
        this.setComponent('RightSidebar')
        console.log('show profile Detail')
      },
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>