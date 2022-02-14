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
               <span class="font-weight-bolder">{{ getAuthUser && getAuthUser.status == 3 ? 'Verified' : 'Not Verified' }}</span>
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
                 <h4 class="color-primary fs-24 font-weight-bolder">20+</h4>
                 <h4 class="fs-14 text-black-50">Suggestions</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">22</h4>
                 <h4 class="fs-14 text-black-50">Teamlisted</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">6</h4>
                 <h4 class="fs-14 text-black-50">Shortlisted</h4>
               </a-tooltip>
             </div>
             <div class="profile-section flex justify-content-between mt-4">
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">4</h4>
                 <h4 class="fs-14 text-black-50">Connected</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">3</h4>
                 <h4 class="fs-14 text-black-50">Request received</h4>
               </a-tooltip>
               <a-tooltip title="Title will go here" class="w33">
                 <h4 class="color-primary fs-24 font-weight-bolder">2</h4>
                 <h4 class="fs-14 text-black-50">Request sent</h4>
               </a-tooltip>
             </div>
           </div>
           <div class="team-members-div mt-8" v-if="activeTeam && activeTeam.team_members && activeTeam.team_members.length > 0">
             <h4 class="fs-18 text-black-50 text-center">Team members</h4>
             <div class="flex justify-content-center align-items-center members">
               <a-tooltip v-for="(member, index) in activeTeam.team_members.filter(item => item.user_id != getAuthUser.id && item.user)" :key="index" class="mr-2" :title="getMemberName(member.user)">
                 <img src="https://www.w3schools.com/w3images/avatar2.png" alt="member" class="team-member-img" />
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
       </div>
      </div>
      <div class="col-md-8 col-12 none-l-padding">
        <div class="chart-div" id="chart">
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
    this.loadTeams();
  },
  data() {
    return {
      avatarSrc: "https://www.w3schools.com/w3images/avatar2.png",
      teams: [],
      activeTeam: null,
      maTips: [
        { id: 1, title: '', image: '' },
        { id: 2, title: '', image: '' },
      ],
      chartOptions: {
        chart: {
          type: 'area'
        },
        xAxis: {
          type: 'month',
          categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        },
        yAxis: {
          title: {
            text: ''
          },
          // labels: {
          //   formatter: function () {
          //     return this.value;
          //   }
          // }
        },
        tooltip: {
          pointFormat: '{point.y} views <b>{point.y:,.0f}</b><br/> in {point.x}'
        },
        title: {
          show: false
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
          name: 'Profile View',
          data: [
            6, 11, 32, 45, 57, 66, 13, 3, 70, 21, 30, 20
          ]
        }],
        rangeSelector:{
          enabled: true
        },
      },
    }
  },
  computed: {
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
    }
  },
  methods: {
    async loadTeams() {
      let activeTeamId = JwtService.getTeamIDAppWide();
      let {data} = await ApiService.get("v1/team-list").then(res => res.data);
      this.teams = data;
      this.activeTeam = this.teams.find((item) => item.team_id == activeTeamId);
    },
    getMemberName(user) {
      if(user && user.full_name) {
        return user.full_name;
      }
      return 'N/A';
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
  },
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
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
</style>