<template>
  <div class="container-fluid pt-5 font-poppins dashboard">
    <div class="row">
      <div class="col-md-4">
       <div class="team-info-div">
         <div class="user-info-div">
           <div class="flex align-items-center">
             <img src="https://www.w3schools.com/w3images/avatar2.png" alt="image" class="user-img" />
             <div class="intro mx-4 mt-2 border-bottom-white">
               <h4 class="color-primary fs-18">Welcome Back!</h4>
               <h6 class="color-primary fs-24 font-weight-bold">Selina Pervez</h6>
               <p class="color-primary fs-14">Last login 26 Jan 2022</p>
             </div>
           </div>
           <div class="status-div mt-4">
             <p class="fs-14 color-primary status">
               Profile Status:
               <span class="font-weight-bolder">Partially Completed</span>
               <button class="btn px-2 bg-primary ml-3 color-white profile-btn cursor-pointer fs-12 btn-hover btn-border">Update Profile</button>
             </p>
             <p class="fs-14 color-primary status">
               Verification Status:
               <span class="font-weight-bolder">Not Verified</span>
               <button class="btn px-2 bg-primary ml-3 color-white profile-btn cursor-pointer fs-12 btn-hover btn-border">Upload ID Now</button>
             </p>
           </div>
         </div>
         <div class="active-team mt-3 mx-3 flex align-items-center justify-content-center">
           <h4 class="fs-16 text-center pt-1 text-black-50">Active Team: <span class="text-success">Selina's family & friends</span></h4>
         </div>
         <div class="profile-overview mt-4">
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
         <div class="team-members-div mt-8">
           <h4 class="fs-18 text-black-50 text-center">Team members</h4>
           <div class="flex justify-content-center align-items-center members">
             <a-tooltip title="Title will go here" v-for="item in 4" :key="item" class="mr-2">
               <img src="https://www.w3schools.com/w3images/avatar2.png" alt="member" class="team-member-img" />
             </a-tooltip>
           </div>
           <div class="btn-div flex justify-content-center mt-5">
             <v-btn class="profile-btn text-capitalize btn-hover" small>View this team's candidate profile</v-btn>
           </div>
         </div>
         <div class="subscription-div mt-8">
           <h4 class="fs-18 text-black-50 text-center">Subscription info</h4>
           <h4 class="fs-14 text-black-50 mt-5">Last subscription plan: <span class="text-black font-weight-bolder">1 month plan</span></h4>
           <h4 class="fs-14 text-black-50 mt-3">Subscription expire date: <span class="text-black font-weight-bolder">22 March 2022, 14:00</span></h4>
         </div>
       </div>
      </div>
      <div class="col-md-8">
        <div class="chart-div">2</div>
        <div class="tips-div">3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard"
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.team-info-div {
  border: 1px solid #a3a3a3;
  border-radius: 12px;
  padding-bottom: 20px;
  .user-info-div {
    background: rgba(97, 89, 167, 0.2);
    padding: 10px 10px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    .flex {
      .user-img {
        border-radius: 50%;
        width: 100px;
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
  }
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
</style>