<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <MainHeader @toggleCollapse="toggleCollapse" />
      <a-layout
        id="layout"
        style="background-color: #fff"
        :style="{ height: 'calc(100vh - 80px) !important', overflow: 'hidden' }"
      >
        <a-layout-sider
          :style="{
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }"
          class="bg-white shadow-sidebar"
          v-model="collapsed"
          :trigger="null"
          collapsible
          :collapsedWidth="28"
          width="250"
          breakpoint="sm"
          @breakpoint="responsiveToggle"
        >
          <Sidebar
            :collapsed="collapsed"
            @collapseSideBar="collapsed = !collapsed"
          >
            <template v-slot:search>
              <SimpleSearch 
                ref="simpleSearch"
                @switchComponent="switchComponent"
              />
            </template>
          </Sidebar>
        </a-layout-sider>
        <a-layout id="bbx">
          <a-layout-content>
            <div id="top" class="main-content-wrapper">
              <div class="main-content-1">
                <component
                  @switchComponent="switchComponent"
                  @navigateProfile="navigateProfile"
                  @socketNotification="socketNotification"
                  v-bind:is="currentTabComponent"
                >
                </component>
                <Observer @intersect="onIntersect"/>
              </div>
              <div class="main-content-2">
                <component v-bind:is="rightSideComponentName"></component>
              </div>
            </div>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
    <Loader :isLoading="isFetching" />
  </div>
</template>

<script>
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Observer from "@/components/atom/Observer"
import Loader from "@/plugins/loader/loader.vue";
import CandidateProfiles from "@/components/search/CandidateProfiles.vue";
import AddComponent from "@/components/add/addComponent";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "AdvanceSearch",
  components: {
    ProfileDetail: () => import("@/components/search/CandidateProfileDetails"),
    RightSideCandidateDetail: () =>
      import("@/components/search/RightSideCandidateDetail"),
    RightSidebar: () => import("@/components/search/ProfileDetailRight"),
    SimpleSearch: () => import("@/components/search/SimpleSearch.vue"),
    Sidebar,
    Loader,
    //SimpleSearch,
    // Footer,
    CandidateProfiles,
    AddComponent,
    Observer
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    ping: function (data) {
      console.log(
          'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      collapsed: false,
      componentName: "CandidateProfiles",
    };
  },
  computed: {
    ...mapGetters({
      rightSideComponentName: "search/getComponentName",
      isFetching: "search/getLoadingStatus",
    }),
    currentTabComponent() {
      return this.componentName;
    },
  },
  methods: {
    ...mapActions({
      searchUser: "search/searchUser",
      getNextUserId: "search/getNextUserId",
      getPreviousUserId: "search/getPreviousUserId",
      fetchProfileDetail: 'search/fetchProfileDetail',
      getCandidateInfo: 'search/getCandidateInfo',
    }),
    ...mapMutations({
      clearProfiles: "search/clearProfiles",
      setProfiles: "search/setProfiles",
      setLoading: "search/setLoading",
    }),
    socketNotification(payload) {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      payload.sender = loggedUser.id;
      Notification.storeNotification(payload);
      payload.created_at = new Date();
      payload.seen = 0;
      payload.sender = loggedUser;
      if(payload && payload.receivers.length > 0) {
        payload.receivers = payload.receivers.map(item => {
          return item.toString();
        });
        this.$socket.emit('notification', payload);
      }
    },
    onIntersect() {
      this.$refs.simpleSearch.handlePaginate();
    },
    showError(message) {
      this.$error({
        title: message,
        center: true,
      });
    },
    async fetchInitialCandidate() {
      let url = 'v1/home-searches?page=0&parpage=10'
      let user = JSON.parse(localStorage.getItem("user"));
      if(user.get_candidate?.pre_partner_age_min){
        setTimeout(() =>{this.$refs.simpleSearch.setAttr('min_age', user.get_candidate.pre_partner_age_min)},1000)
        url += `&min_age=${user.get_candidate.pre_partner_age_min}`
      }
      if(user.get_candidate?.pre_partner_age_max){
        //this.$refs.simpleSearch.setAttr('max_age', user.get_candidate.pre_partner_age_max)
        setTimeout(() =>{this.$refs.simpleSearch.setAttr('max_age', user.get_candidate.pre_partner_age_max)},1000)
        url += `&max_age=${user.get_candidate.pre_partner_age_max}`
      }
      // const res = await this.searchUser('v1/home-searches?page=0&parpage=10&min_age=20&max_age=40&ethnicity=Amara&marital_status=single');
      this.setLoading(true);
      try {
        const res = await this.searchUser(
          {
            // url: "v1/home-searches?page=0&parpage=10&min_age=20&max_age=40",
            url: url,
            removePrevious: true
          }       
        );
        this.setLoading(false);
        if (res == undefined) {
          this.setProfiles([]);
        }
        if (res.data && res.data.length) {
          this.clearProfiles();
          this.setProfiles(res.data);
        }
      } catch (err) {
        this.setLoading(false);
        console.log(err);
      }
    },
    responsiveToggle() {
      this.collapsed = false;
    },
    switchComponent(name) {
      this.componentName = name;
    },
    async fetchCandidate(userId) {
      let url = `v1/candidate/info/${userId}`
      try {
        await this.fetchProfileDetail(url)
      } catch (e) {
        if(e.response) {
          this.showError(e.response.data.message)
        }
      }
    },
    async navigateProfile(data) {
      if(data.type == 'previous') {
        let previousId = await this.getPreviousUserId(data.userId)
        if(previousId) this.fetchCandidate(previousId)
        if(!previousId) this.showError("It's the first candidate")
        console.log(previousId, 'previous userid')
      }

      if(data.type == 'next') {
        let nextUserId = await this.getNextUserId(data.userId)
        if(nextUserId) this.fetchCandidate(nextUserId)
        if(!nextUserId) this.showError("It's the last candidate")
        console.log(nextUserId, 'next userid')
      }
      
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    async handleCandidateInfo() {
       const info = await this.getCandidateInfo('v1/candidate-of-team')
       console.log(info, 'infooooooooooooooooooooo')
    }
  },
  created() {
    this.handleCandidateInfo();
    this.fetchInitialCandidate();
  },
};
</script>

<style scoped lang="scss">
* {
  scroll-behavior: smooth;
}
@import "@/styles/base/_variables.scss";
.w-2 {
  width: 2rem;
}
.menu-icon-alt {
  width: 25px;
  color: #fff;
  margin-left: 10px;
}
.user-avatar-area {
  .avatar-image {
    border-radius: 50%;
    outline: 2px solid #ddd;
  }
  .team {
    display: inline-block;
    background-color: #fff;
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    padding-right: 20px;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      right: 6px;
      background-color: #4aa02c;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: 0px 0px 3px 1px #639e4e;
    }
  }
  .role {
    display: inline-block;
    border: 1px solid rgb(99, 99, 99);
    border-radius: 10px;
    font-size: 11px;
    position: relative;
    text-align: center;
  }
}
.main-content-wrapper {
  margin-top: 0px;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
  .main-content-1 {
    width: calc(100% - 350px);
    margin: 10px 5px 10px 15px;
    height: calc(100vh - 10px);
    @media (max-width: 1024px) {
      width: calc(100% - 25px);
    }
  }
  .main-content-2 {
    margin: 15px;
    width: 300px;
    @media (max-width: 600px) {
      width: calc(100% - 25px);
    }
    height: 100vh;
    .profile-overview {
      padding: 10px;
      height: 100%;
    }
  }
}
.shadow-sidebar {
  box-shadow: 0 0 10px 6px rgb(0 0 0 / 12%);
}
</style>