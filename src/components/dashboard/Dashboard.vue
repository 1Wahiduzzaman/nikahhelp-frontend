<template>
  <div class="container-fluid pt-5 font-poppins dashboard">
    <div class="row">
      <div class="col-md-4 col-12 col-padding">
       <div class="team-info-div">
         <div class="user-info-div">
           <div class="flex align-items-center">
             <img :src="getAuthUser && getAuthUser.per_main_image_url ? getAuthUser.per_main_image_url : avatarSrc" alt="image" class="user-img" />
             <div class="intro mx-4 mt-4 border-bottom-white">
               <h4 class="color-primary fs-18">Welcome Back!</h4>
               <h6 class="color-primary fs-24 font-weight-bold">{{ getAuthUser ? getAuthUser.full_name : 'N/A' }}</h6>
               <p class="color-primary fs-14">Last login 26 Jan 2022</p>
             </div>
           </div>
           <div class="status-div mt-3">
             <p class="fs-14 color-primary status">
               Profile Status:
               <span class="font-weight-bolder">Not Completed</span>
               <router-link to="/edit_candidate" class="btn px-2 bg-primary ml-3 color-white profile-btn cursor-pointer fs-12 btn-hover btn-border">Update</router-link>
             </p>
             <p class="fs-14 color-primary status">
               Verification Status:
               <span class="font-weight-bolder">{{ userDataFromApi.status == 3 ? 'Verified' : 'Not Verified' }}</span>
               <router-link to="/settings" class="btn px-2 bg-primary ml-3 color-white profile-btn cursor-pointer fs-12 btn-hover btn-border">Upload ID</router-link>
             </p>
           </div>
         </div>
         <div class="active-team mt-3 mx-3 flex align-items-center justify-content-center">
           <h4 class="fs-16 text-center pt-1 text-black-50">Active Team: <span class="text-success">{{ activeTeam && activeTeam.name ? activeTeam.name : 'N/A' }}</span></h4>
         </div>
         <div class="team-short-info" v-if="activeTeam">
           <div class="profile-overview mt-5">
             <div class="profile-section flex justify-content-between">
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">{{ teamActivity.suggestion }}</h4>
                 <h4 class="fs-14 text-black-50">Suggestions</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">{{ teamActivity.teamlisted }}</h4>
                 <h4 class="fs-14 text-black-50">Teamlisted</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">{{ teamActivity.shortlisetd }}</h4>
                 <h4 class="fs-14 text-black-50">Shortlisted</h4>
               </a-tooltip>
             </div>
             <div class="profile-section flex justify-content-between mt-4">
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">{{ teamActivity.connected }}</h4>
                 <h4 class="fs-14 text-black-50">Connected</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">{{ teamActivity.request_received }}</h4>
                 <h4 class="fs-14 text-black-50">Request received</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">{{ teamActivity.request_sent }}</h4>
                 <h4 class="fs-14 text-black-50">Request sent</h4>
               </a-tooltip>
             </div>
           </div>
           <div class="team-members-div mt-8" v-if="activeTeam && activeTeam.team_members && activeTeam.team_members.length > 0">
             <h4 class="fs-18 text-black-50 text-center">Team members</h4>
             <div class="flex justify-content-center align-items-center members">
               <a-tooltip v-for="(member, index) in activeTeam.team_members.filter(item => item.user_id != getAuthUser.id && item.user)" :key="index" class="mr-2" :title="getMemberName(member.user)">
                 <img :src="getImage(member.user)" alt="member" class="team-member-img" />
               </a-tooltip>
             </div>
             <div class="btn-div flex justify-content-center mt-5" v-if="getCandidate">
               <v-btn class="profile-btn text-capitalize btn-hover" small :to="{name: 'ProfileView', params: {id: getCandidate}}">View this team's candidate profile</v-btn>
             </div>
           </div>
           <div class="subscription-div mt-8" v-if="activeTeam">
             <h4 class="fs-18 text-black-50 text-center">Subscription info</h4>
             <h4 class="fs-14 text-black-50 mt-5">Last subscription plan: <span class="text-black font-weight-bolder">{{ activeTeam && activeTeam.last_subscription && activeTeam.last_subscription.plans ? activeTeam.last_subscription.plans.title : 'N/A' }} plan</span></h4>
             <h4 class="fs-14 text-black-50 mt-3">Subscription expire date: <span class="text-black font-weight-bolder">{{ formateDate(activeTeam.subscription_expire_at) }}</span></h4>
             <div class="btn-div flex justify-content-center mt-5">
               <v-btn class="renew-btn text-capitalize" :to="{name: 'SubscriptionTeam', params: {id: activeTeam.team_id}}" small>Renew subscription now</v-btn>
             </div>
           </div>
         </div>
         <div v-else class="team-all">
           <div class="db-flex mt-4" v-for="(item, teamIndex) in teams" :key="teamIndex">
             <img class="avatar" width="45" height="45" :src="item.logo"
                  alt="image" />
             <div class="content">
               <h4 class="mt-1">{{ item.name }}</h4>
               <p class="mb-0">{{ item.description }}</p>
             </div>
             <div class="quick-switch-box">
               <a-tooltip
                   placement="top"
                   title="Click here to activate or deactive the team"
               >
                 <a-switch default-checked class="quick-switch" v-model="teamsStatus[teamIndex]" @click="onChangeActivateTeam($event, item, teamIndex)">
                   <a-icon slot="checkedChildren" type="check"/>
                   <a-icon slot="unCheckedChildren" type="close"/>
                 </a-switch>
               </a-tooltip>
             </div>
           </div>
         </div>
       </div>
      </div>
      <div class="col-md-8 col-12 none-l-padding">
        <div class="chart-div" id="chart">
          <div class="mobile-flex justify-content-between mx-6 pt-3">
            <h6 class="chart-heading">Total <span class="color-primary">{{ totalCount }}</span> view(s) in last <span class="color-primary">{{ viewType === 0 ? 7 : 1 }}</span> {{ chartRangeText }}</h6>
            <div class="btn-flex">
              <button class="btn btn-chart-type" :class="{'active-btn': viewType === 0}" @click="toggleProfileViewType(0)">Week</button>
              <button class="btn btn-chart-type ml-2" :class="{'active-btn': viewType === 1}" @click="toggleProfileViewType(1)">Month</button>
              <button class="btn btn-chart-type ml-2" :class="{'active-btn': viewType === 2}" @click="toggleProfileViewType(2)">Year</button>
            </div>
          </div>
          <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="tips-div mt-4">
          <carousel
              perPage="1"
              paginationActiveColor="#522e8e"
              paginationColor="#b7b7b7"
          >
            <slide v-for="(tip, index) in maTips" :key="index">
              <div class="flex justify-content-between tips-direction">
                <div class="w-slide-1">
                  <h5 class="text-black-50 font-weight-bold">Matrimony Assist Tips</h5>
                  <p class="tipsDetailsDesign pl-4 text-black-50">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged.
                  </p>
                </div>
                <img
                    class="img-tips my-2"
                    src="@/assets/icon/person-fill-gray.svg"
                    alt="img"
                />
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import ApiService from "@/services/api.service";
import JwtService from "../../services/jwt.service";
export default {
  name: "Dashboard",
  components: {
    Carousel,
    Slide,
  },
  created() {
    this.getUserInfo()
    this.loadTeams();
    this.loadProfileGraphApi();
    this.getTeamActivity();
  },
  data() {
    return {
      userInfo: {},
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      teams: [],
      activeTeam: null,
      viewType: 1,
      totalCount: 0,
      maTips: [
        { id: 1, title: '', image: '' },
        { id: 2, title: '', image: '' },
      ],
      teamsStatus: [false, false, false, false, false],
      profileGraphs: [],
      chartOptions: {
        chart: {
          type: 'area'
        },
        xAxis: {
          type: 'month',
          categories: [],
        },
        yAxis: {
          title: {
            text: 'Views'
          },
          // labels: {
          //   formatter: function () {
          //     return this.value;
          //   }
          // }
        },
        tooltip: {
          pointFormat: '{point.y} views'
        },
        title: {
          text: null
        },
        plotOptions: {
          area: {
            pointStart: 0,
            color: "#6159A733",
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [{
          name: 'Month',
          data: []
        }],
        legend: {
          enabled: false
        },
        rangeSelector:{
          enabled: true
        },
        credits: {
          enabled: false
        },
      },
      teamActivity: {
        suggestion: 20,
        teamlisted: 10,
        shortlisetd: 4,
        connected: 5,
        request_received: 2,
        request_sent: 3
      }
    }
  },
  computed: {
    userDataFromApi() {
      return this.userInfo?.user ? this.userInfo.user : {}
    },
    chartRangeText() {
      if(this.viewType === 0) {
        return 'days';
      } else if(this.viewType === 1) {
        return 'month';
      } else {
        return 'year';
      }
    },
    getAuthUser() {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },
    getCandidate() {
      if(this.activeTeam && this.activeTeam.team_members && this.activeTeam.team_members.length > 0) {
        let candidate = this.activeTeam.team_members.find(item => item.user_type == 'Candidate');
        if(candidate) {
          return candidate.user_id;
        }
      }
      return null;
    },
  },
  methods: {
    async getUserInfo () {
       let {data} = await ApiService.get("v1/user").then(res => res.data);
       this.userInfo = data
    },
    async loadTeams() {
      let activeTeamId = JwtService.getTeamIDAppWide();
      let {data} = await ApiService.get("v1/team-list").then(res => res.data);
      this.teams = data;
      this.activeTeam = this.teams.find((item) => item.team_id == activeTeamId);
    },
    async loadProfileGraphApi() {
      let {data} = await ApiService.get("v1/site-visit-graph").then(res => res.data);
      if(data) {
        this.chartOptions.xAxis.categories = data.date;
        let views = data.view.map(item => parseInt(item));

        let dataCount = 0;
        views.forEach(item => {
          dataCount += item;
        });
        this.totalCount = dataCount;

        this.chartOptions.series = [
          {
            name: 'Month',
            data: views
          }
        ];
      }
    },
    async getTeamActivity() {
      let {data} = await ApiService.get("v1/team-activity").then(res => res.data);
      this.teamActivity = data;
    },
    getMemberName(user) {
      if(user && user.full_name) {
        return user.full_name;
      }
      return 'N/A';
    },
    getImage(user) {
      if(user && user.candidate_info && user.candidate_info.per_main_image_url) {
        return user.candidate_info.per_main_image_url;
      }
      return this.avatarSrc;
    },
    toggleProfileViewType(type) {
      this.viewType = type;
    },
    formateDate(date) {
      if (date == null || date == undefined) {
        return "  Not Exist";
      }
      let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    async onChangeActivateTeam(e, item, teamIndex) {
      if (e) {
        let returnedResult = await this.turnOnTeam(item, teamIndex);
        this.$store.commit("setTeamInfo", item);
        if (returnedResult) {
          this.teamsStatus[teamIndex] = true;
        } else {
          this.teamsStatus[teamIndex] = false;
        }
      } else {
        this.$store.commit("setTeamInfo", null);
        JwtService.destroyTeamIDAppWide();
        let vm = this;
        this.$success({
              title: "Success",
              content: "Team deactivated",
              onOk() {
                setTimeout(() => vm.$router.go(), 100);
              },
            }
        );
      }
    },
    async turnOnTeam(item, teamIndex) {
      if (this.is_subscribed(item)) {
        if (item.team_members.length < 2) {
          this.$error({
            content: "This team do not contain sufficient users. Go to Manage team & add member",
            centered: true,
          });
          this.teamsStatus[teamIndex] = false;
          return false;
        }

        let candidateFlag = 0;
        item.team_members.map((_member) => {
          if (_member.user_type == "Candidate") {
            candidateFlag++;
          }
        });

        if (candidateFlag == 0) {
          this.$error({
            content: "This team do not contain any candidate. Go to Manage team & add a candidate",
            centered: true,
          });
          this.teamsStatus[teamIndex] = false;
          return false;
        }

        try {
          await ApiService.post("v1/team-turn-on", {
            team_id: item.id,
          })
              .then((data) => {
                if (data.data.status == "FAIL") {
                  this.$message.error(data.data.message);
                  return false;
                }
                if (data.data.status !== "FAIL") {
                  JwtService.saveTeamIDAppWide(item.team_id);
                  JwtService.saveTeamID(item.id);
                  const vm = this;
                  this.$success({
                    title: "Success",
                    content: "Selected Team Activated",
                    onOk() {
                      // vm.$emit("teamListUpdated");
                      setTimeout(() => vm.$router.go(), 100);
                    },
                  });
                  return true;
                }
              })
              .catch((error) => {
                console.log(error);
                console.log(error.response);
                this.$message.error("Something went Wrong");
                return false;
              });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$error({
          title: "Subscription Needed",
          content: "Please buy subscription to Activate the team. Go to Manage team & subscribe",
        });
        this.teamsStatus[teamIndex] = false;
        return false;
      }
      return true;
    },
    is_subscribed(item) {
      if (item.subscription_expire_at == null) {
        return false;
      }

      if (!this.checkExpiry(item.subscription_expire_at)) {
        return false;
      } else {
        return true;
      }
    },
    checkExpiry(dateString) {
      var myDate = new Date(dateString);
      var today = new Date();
      if (myDate > today) {
        return true;
      }
      return false;
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.db-flex {
  display: flex;
}
.team-info-div {
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding-bottom: 20px;
  .user-info-div {
    background: rgba(97, 89, 167, 0.2);
    padding: 5px 5px 5px 10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .flex {
      .user-img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
      }
      .border-bottom-white {
        border-bottom: 1px solid #FFFFFF;
      }
    }
    .status-div {
      .status {
        .profile-btn {
          border-radius: 20px;
        }
      }
    }
  }
  .active-team {
    background: rgba(97, 89, 167, 0.2);
    padding: 8px 10px;
    border-radius: 12px;
  }
  .team-short-info {
    .profile-overview {
      padding: 10px 20px;
    }
    .team-members-div {
      padding: 0 20px;
      .members {
        .team-member-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }
      .btn-div {
        .profile-btn {
          background: #6159a7;
          border-radius: 30px;
          color: #FFFFFF;
        }
      }
    }
    .subscription-div {
      padding: 0 20px;
      .flex {
        .renew-btn {
          border-radius: 20px;
          background: #44ac44;
          color: #FFFFFF;
          &:hover {
            border: 1px solid #FFFFFF;
          }
        }
      }
    }
  }
}
.chart-div {
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding: 5px 15px 15px 0;
}
.tips-div {
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  padding: 5px 15px 15px 15px;
}
.w33 {
  width: 33.33%;
}
.dashboard {
  height: calc(100vh - 90px);
  overflow-y: auto;
}
.btn-border {
  border: 1px solid transparent;
  padding-top: 0;
  padding-bottom: 0;
}
.btn-hover {
  &:hover {
    border: 1px solid #FFFFFF !important;
    background: rgba(97, 89, 167, 0.8) !important;
  }
}
.w-slide-1 {
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
  }
}
.img-tips {
  border: 1px solid #c9c9c9;
  width: 100%;
  border-radius: 12px;
  @media (min-width: 768px) {
    width: 30%;
  }
}
.tips-direction {
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
}
.col-padding {
  padding-top: 5px !important;
  padding-left: 15px !important;
  padding-right: 0 !important;
}
.none-l-padding {
  padding-top: 5px !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.chart-heading {
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
  span {
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
}
.btn-chart-type {
  background: rgba(189, 189, 189, 0.4);
  &:hover {
    background: rgba(128, 128, 128, 0.4);
  }
  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
}
.active-btn {
  background: rgba(128, 128, 128, 0.4);
}
.mobile-flex {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 10px;
  }
}
.btn-flex {
  display: flex;
}
.team-all {
  padding: 20px;
}
.avatar {
  border-radius: 50%;
  display: block;
  border: 2px solid #ddd
}
.content {
  margin-left: 12px;
  flex: auto;

  h4 {
    font-size: 13px;
  }

  p {
    font-size: 12px;
  }
}
</style>