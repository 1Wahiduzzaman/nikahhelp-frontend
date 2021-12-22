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
      src="/candidate.png"
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
        <v-btn
          @click.stop="shortList"
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
        >
          <div class="flex justify-center align-center">
            <img 
              style="height: 13px; margin-right: 4px;" 
              src="@/assets/icon/star-fill-white.svg" 
              alt=""
            >
            ShortList
          </div>
        </v-btn>
        <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
          @click="onClickConnect"
        >
         <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/connect.svg" alt="">
          Connect
        </div>
        </v-btn>
    </div>
    <div class="mt-3 px-4 flex flex-wrap justify-space-between">
        <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="deep-purple darken-1"
          dark
        >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/teamlist.svg" alt="">
          Teamlist
        </div>
        </v-btn>
        <v-btn
          class="text-capitalize"
          style="width:47%"
          rounded
          small
          color="pink darken-1"
          dark
        >
        <div class="flex justify-center align-center">
          <img style="height: 13px; margin-right: 4px;" src="@/assets/icon/block.svg" alt="">
          Block
        </div>
        </v-btn>
    </div>
    <div class="px-4 pb-4 mt-4">
      <v-btn
        class="mt-1 text-capitalize"
        block
        rounded
        color="deep-purple darken-1"
        dark
        @click.stop="ViewProfileDetail"
      >
        view profile
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
  export default {
    props: ["candidate"],
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
        connectCandidate: 'search/connectCandidate'
      }),
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
      ViewProfileDetail() {
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