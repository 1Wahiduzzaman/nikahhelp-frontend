<template>
  <div>
    <Loader v-if="isLoading" :isLoading="isLoading" />
    <div v-else>
      <!-- Heading -->
      <div class="section-header text-center heading-text px-2 font-poppins">
        <h4 class="heading color-primary font-weight-bolder">
          Choose a Subscription Plan that Works for You
        </h4>
        <p class="font-weight-bold sub-heading">
          Matrimony Assist Subscription is Team Based. Only
          <b>ONE</b> member pays
          <br />
          the rest of the members use the platform for <b>FREE</b> of charge.
        </p>
      </div>
      <!-- Subscription details -->
      <div class="subscription-details container-fluid mt-4 font-poppins">
        <div class="row" :class="{ 'mobile-section': activeStep > 1 }">
          <div
            class="col-12 col-md-4 col-xl-4 font-poppins"
            :class="{ 'mobile-block': activeStep !== 1 }"
          >
            <!-- Card 1 -->
            <div
              class="
                custom-card
                card-1
                shadow-default
                background-design-cardfooter
                br-10
                position-relative
                height-1
              "
            >
              <div
                class="div-1 background-design text-center px-2 pb-2 br-top-10"
              >
                <h3 class="text-white">Choose Plan</h3>
              </div>
              <div class="div-2 position-relative bg-white">
                <div
                  class="d-flex cursor-pointer py-4 px-5 item-duration align-items-center justify-content-center border-bottom"
                  :class="{'bg-brand-gradient': choosedPlan && choosedPlan.id == plan.id, 'border-top': pIndex === 0 }"
                  @click="setPlan(plan)"
                  v-for="(plan, pIndex) in plans"
                  :key="pIndex"
                >
<!--                  <a-icon-->
<!--                    type="check"-->
<!--                    class="text-transparent icon-check"-->
<!--                    :class="{ 'text-white': isSelected1 }"-->
<!--                  />-->
                  <img src="@/assets/icon/subscription_check.svg" alt="icon" v-if="choosedPlan && choosedPlan.id == plan.id" class="mr-4" />
                  <h4
                    class="duration"
                    :class="{ selected: choosedPlan && choosedPlan.id == plan.id }"
                  >
                    {{ plan.title }}
                  </h4>
                </div>
                <div
                  class="d-flexx d-none cursor-pointer py-4 px-5 item-duration align-items-center justify-content-center border-bottom"
                  :class="{ 'bg-brand-gradient': isSelected2 }"
                  @click="secondOption"
                >
<!--                  <a-icon-->
<!--                    type="check"-->
<!--                    class="text-transparent fs-24 icon-check"-->
<!--                    :class="{ 'text-white': isSelected2 }"-->
<!--                  />-->
                  <img src="@/assets/icon/subscription_check.svg" alt="icon" v-if="isSelected2" class="mr-4" />
                  <h4
                    class="duration"
                    :class="{ selected: isSelected2 }"
                  >
                    3 month
                  </h4>
                </div>
                <div
                  class="d-flexx d-none cursor-pointer py-4 px-5 item-duration align-items-center justify-content-center border-bottom"
                  :class="{ 'bg-brand-gradient': isSelected3 }"
                  @click="thirdOption"
                >
<!--                  <a-icon-->
<!--                    type="check"-->
<!--                    class="text-transparent fs-24 icon-check"-->
<!--                    :class="{ 'text-white': isSelected3 }"-->
<!--                  />-->
                  <img src="@/assets/icon/subscription_check.svg" alt="icon" v-if="isSelected3" class="mr-4" />
                  <h4
                    class="duration"
                    :class="{ selected: isSelected3 }"
                  >
                    6 month
                  </h4>
                </div>
                <div
                  class="d-flexx d-none cursor-pointer py-4 px-5 free-duration align-items-center justify-content-center"
                  :class="{ 'bg-brand-gradient': isSelected4 }"
                  @click="fourthOption"
                >
<!--                  <a-icon-->
<!--                    type="check"-->
<!--                    class="text-transparent fs-24 icon-check"-->
<!--                    :class="{ 'text-white': isSelected4 }"-->
<!--                  />-->
                  <img src="@/assets/icon/subscription_check.svg" alt="icon" v-if="isSelected4" class="mr-4" />
                  <h4
                    class="duration"
                    :class="{ selected: isSelected4 }"
                  >
                    Free 1 Day
                  </h4>
                </div>
              </div>
              <div class="div-3 bg-primary-gradient">
                <p class="text-center fs-12 text-white">
                  {{ activeStepIndex >=0 ? descriptions[activeStepIndex] : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni eius at expedita? Explicabo laboriosam ipsa commod' }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-4 col-xl-4 position-relative font-poppins"
            :class="{ 'mobile-block': activeStep !== 2 }"
          >
            <!-- Card 2 -->
            <div
              class="
                custom-card
                card-2
                shadow-default
                background-design-middle
                height-1
              "
            >
              <div class="div-1 text-center">
                <img
                  src="@/assets/icon/Pound.svg"
                  alt=""
                  width="180"
                  height="180"
                  class="mt-3"
                />
              </div>
              <div
                class="
                  div-2
                  text-center text-white
                  font-weight-bolder
                  desktop-py
                "
              >
                <h3 class="price text-white font-weight-bolder">
                  £ {{ amount.toFixed(2) }}
                </h3>
                <p class="price-text text-white font-weight-bolder">
<!--                  Saved {{ savedAmount }} £-->
                  Save {{ savedAmount }} £ by using cupon
                </p>
              </div>
              <div class="">
                <p class="text-center text-white px-4 fs-14">
                  In Matrimony Assist, All subscribing teams have full access to
                  platform and features. The only difference is time limit
                </p>
              </div>
            </div>

            <div class="position-absolute buttons-position">
              <div class="d-flex justify-content-between">
                <button
                  class="btn bg-danger px-4 py-2 text-white br-20 btn-back"
                  @click="nextStep(1)"
                >
                  Back
                </button>
                <button
                  class="btn btn-success px-4 py-2 ml-2 br-20 btn-next"
                  @click="nextStep(3)"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-md-4 col-xl-4 font-poppins"
            :class="{ 'mobile-block': activeStep !== 3 }"
          >
            <!-- Card 3 -->
            <div
              class="
                custom-card
                card-3
                shadow-default
                background-design-rightcard
                height-2
              "
            >
              <h1 class="px-4 text-white pt-2 fs-24 text-center">
                Select Team
              </h1>

              <div class="form-group px-4">
                <select class="w-100 custom-select fs-18" v-model="teamSelected">
                  <option
                    v-for="(team, teamIndex) in teams"
                    :value="team"
                    :key="team.id"
                  >
                    Team {{ teamIndex + 1 }}
                  </option>
                </select>
              </div>

              <div>
                <div
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    bg-white
                    px-4
                    cursor-pointer
                  "
                  @click="setContentType('details')"
                >
                  <h4 class="fs-14 pt-1">This team details</h4>
<!--                  <a-icon-->
<!--                    type="up"-->
<!--                    :class="{ 'rotate-180': contentShow == 'details' }"-->
<!--                  />-->
                </div>
                <div
                  class="team-details mt-2 px-4 d-block text-white mb-2"
                >
                  <li class="flex-between-start">
                    <span class="flex-45 px-2">Team Name </span>
                    <span class="flex-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamSelected.name }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-45 px-2">Team ID</span>
                    <span class="flex-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamSelected.team_id.substr(0, 8) }}</span></span
                    >
                  </li>
<!--                  <li class="flex-between-start">-->
<!--                    <span class="flex-45 px-2">Team Status </span>-->
<!--                    <span class="flex-55 px-2" v-if="teamSelected">-->
<!--                      :<span class="ml-2"-->
<!--                        >{{ teamSelected.status == 1 ? "Active" : "Inactive" }},-->
<!--                        {{-->
<!--                          teamSelected.member_count > 1 ? "Valid" : "Invalid"-->
<!--                        }}, Verified</span-->
<!--                      ></span-->
<!--                    >-->
<!--                  </li>-->
                  <li class="flex-between-start">
                    <span class="flex-45 px-2">Team Creation Date </span>
                    <span class="flex-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamCreationDate }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-45 px-2">Team Created By </span>
                    <span class="flex-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ teamCreatedBy }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-45 px-2">My Role </span>
                    <span class="flex-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ selfMember ? selfMember.role : '' }}</span></span
                    >
                  </li>
                  <li class="flex-between-start">
                    <span class="flex-45 px-2">Participated As </span>
                    <span class="flex-55 px-2" v-if="teamSelected">
                      :<span class="ml-2">{{ selfMember ? selfMember.user_type : '' }}</span></span
                    >
                  </li>
                </div>
              </div>

              <div class="mt-1">
                <div
                  class="
                    d-flex
                    align-items-center
                    justify-content-between
                    bg-white
                    px-4
                    cursor-pointer
                  "
                  @click="setContentType('subscription')"
                >
                  <h4 class="fs-14 pt-1">
                    This team's last subscription details
                  </h4>
<!--                  <a-icon-->
<!--                    type="up"-->
<!--                    :class="{ 'rotate-180': contentShow == 'subscription' }"-->
<!--                  />-->
                </div>
                <div
                  class="px-4 d-block mt-1"
                >
                  <small class="text-white">{{ teamSelected && teamSelected.last_subscription && teamSelected.last_subscription.created_at ? messageCreatedAt(teamSelected.last_subscription.created_at) : '' }}</small>
                  <h4 class="fs-12 text-white mt-2">
                    Subscribed <b>6 month Plan</b> by - <b>{{ teamSelected && teamSelected.last_subscription && teamSelected.last_subscription.user ? teamSelected.last_subscription.user.full_name : '' }}</b>
                  </h4>
                  <small class="text-white"
                    >Team Expire period extended to the date of -
                    {{ teamSelected && teamSelected.last_subscription && teamSelected.last_subscription.subscription_expire_at ? formateDate(teamSelected.last_subscription.subscription_expire_at) : '' }}</small
                  >
                </div>
              </div>
            </div>
            <button
              @click="handleContinue"
              class="
                btn
                bg-success
                btn-payment
                w-100
                text-white
                d-flex
                align-items-center
                justify-content-center
                br-10
              "
            >
              Continue to payment
              <a-icon type="arrow-right" class="ml-2 mt-1" />
            </button>

            <div class="position-absolute buttons-position">
              <div class="d-flex justify-content-between">
                <button
                  class="btn bg-danger px-4 py-2 text-white br-20 w-full"
                  @click="nextStep(2)"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="freeModal" title="Dou you have any cupon?">
      <a-input v-model="cupon" placeholder="Coupon" />

      <template slot="footer">
        <a-button key="back" @click="nextWithoutCupon">
          Skip
        </a-button>
        <a-button key="submit" type="primary" @click="handleOkFreeModal">
          Submit
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import ApiService from "../../services/api.service";
import {format} from "timeago.js";

export default {
  name: "Subscription",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      cupon: '',
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      isSelected1: false,
      isSelected2: false,
      isSelected3: false,
      isSelected4: false,
      amount: 0.0,
      savedAmount: 0.0,
      teams: [],
      teamSelected: null,
      contentShow: "details",
      activeStep: 1,
      freeModal: false,
      activeStepIndex: 0,
      plans: [],
      choosedPlan: null,
      descriptions: [
          'Plan 1',
          'Plan 2',
          'Plan 3',
          'Plan 4'
      ]
    };
  },
  created() {
    //this.loadUser();
    this.loadPlans();
    this.loadTeams();
    this.getSelectedTeam();
  },
  computed: {
    teamCreationDate() {
      if (this.teamSelected.created_at) {
        const date = this.teamSelected.created_at.split("T");
        return date[0];
      } else return "N/A";
    },
    getPlans() {
      if(this.plans && this.plans.plan_data && this.plans.plan_data.length > 0) {
        return this.plans.plan_data;
      }
      return [];
    },
    teamCreatedBy() {
      // const teamMembers = this.teamSelected.team_members;

      // var member = teamMembers.find((member) => {
      // 	return member.user_id == this.teamSelected.created_by;
      // });
      // return member.user.full_name;
      return this.teamSelected && this.teamSelected.created_by ? this.teamSelected.created_by.full_name : '';
    },
    selfMember() {
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if(loggedUser && this.teamSelected) {
        return this.teamSelected.team_members.find(member => parseInt(member.user_id) === parseInt(loggedUser.id));
      }
      return null;
    }
  },
  methods: {
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
    messageCreatedAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },
    setContentType(type) {
      this.contentShow = type;
    },
    // async loadUser() {
    // 	this.isLoading = true;
    // 	try {
    // 		await this.$store.dispatch("getUser");
    // 		this.user = this.$store.getters["userInfo"];
    // 		this.candidateInfo = this.$store.getters["candidateInfo"];
    // 		this.representativeInfo = this.$store.getters["representativeInfo"];
    // 		this.is_verified = this.user.is_verified;
    // 		if (this.is_verified == 0) {
    // 			this.$router.push("/email-verification");
    // 		}
    // 		if (this.user.account_type === 0) {
    // 			this.$router.push("/member-type");
    // 		}

    // 		if (this.user.account_type === 4) {
    // 			this.$router.push("/admin");
    // 		}
    // 		let data_input_status = this.$store.getters["userDataInputStatus"];
    // 		console.log("data input status", data_input_status);
    // 		if (data_input_status == 10) {
    // 			this.$router.push("/member-name/candidate");
    // 		}

    // 		if (data_input_status == 20) {
    // 			this.$router.push("/member-name/representative");
    // 		}

    // 		if (data_input_status == 11) {
    // 			this.$router.push("/candidate-registration");
    // 		}
    // 		if (data_input_status == 21) {
    // 			this.$router.push("/representative-registration");
    // 		}

    // 		// if (data_input_status == 12) {
    // 		// 	this.$router.push("/candidate-registration");
    // 		// }
    // 		// if (data_input_status == 22) {
    // 		// 	this.$router.push("/representative-registration");
    // 		// }
    // 	} catch (error) {
    // 		this.error = error.message || "Something went wrong";
    // 		//alert(this.error);
    // 		this.$error({
    // 			title: "Error!",
    // 			content: this.error,
    // 		});
    // 	}
    // 	this.isLoading = false;
    // },
    async loadPlans() {
      let {data} = await ApiService.get('/v1/package-list').then(res => res.data);
      if(data) {
        this.plans = data;
      }
    },
    async loadTeams() {
      await this.$store.dispatch("getTeams");
      this.teams = this.$store.getters["userTeamList"];
      console.log(this.teams);
      if (this.$route.params.id == null && this.teams.length > 0) {
        this.teamSelected = this.teams[0];
      }
    },
    async getSelectedTeam() {
      if (this.$route.params.id == null) {
        console.log("Null");
        return;
      } else {
        console.log(this.$route.params.id);
        await this.$store.dispatch("getTeams");
        this.teams = this.$store.getters["userTeamList"];
        var team = this.teams.find((team) => {
          return team.team_id == this.$route.params.id;
        });
        this.teamSelected = team;
      }
    },
    nextStep(step) {
      this.activeStep = step;
    },
    firstOption() {
      this.isSelected1 = !this.isSelected1;
      this.isSelected2 = false;
      this.isSelected3 = false;
      this.isSelected4 = false;
      this.amount = 10.0;
      this.savedAmount = 0.0;
      this.nextStep(2);
      this.activeStepIndex = 0;
    },
    secondOption() {
      this.isSelected2 = !this.isSelected2;
      this.isSelected1 = false;
      this.isSelected3 = false;
      this.isSelected4 = false;
      this.amount = 24.0;
      this.savedAmount = 6.0;
      this.nextStep(2);
      this.activeStepIndex = 1;
    },
    thirdOption() {
      this.isSelected3 = !this.isSelected3;
      this.isSelected2 = false;
      this.isSelected1 = false;
      this.isSelected4 = false;
      this.amount = 42.0;
      this.savedAmount = 18.0;
      this.nextStep(2);
      this.activeStepIndex = 2;
    },
    fourthOption() {
      this.isSelected4 = !this.isSelected4;
      this.isSelected2 = false;
      this.isSelected1 = false;
      this.isSelected3 = false;
      this.amount = 0.0;
      this.savedAmount = 0.0;
      this.nextStep(2);
      this.activeStepIndex = 3;
    },
    setPlan(item) {
      this.choosedPlan = item;
      this.amount = item.price;
      this.savedAmount = item.discount;
      this.$store.state.team.subscriptionAmount = this.amount;
      this.$store.state.team.legalSubscription = true;
      this.nextStep(2);
    },
    handleContinue() {
      if (this.teamSelected == null) {
        //alert("You have to select a team");
        this.$error({
          title: "No Team is Selected!",
          content: "You have to select a team",
          centered: true,
        });
        return;
      }

      if(this.choosedPlan && this.choosedPlan.id) {
        if(this.choosedPlan.promo_code && this.choosedPlan.id == this.plans[0].id) {
          let usedAlready = this.choosedPlan.team_ids.findIndex(item => parseInt(item) === parseInt(this.teamSelected.id));
          if(usedAlready >= 0) {
            this.$store.state.team.subscriptionAmount = this.amount;
            this.$store.state.team.legalSubscription = true;
            this.$router.push(
                `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
            );
          } else {
            if(this.choosedPlan.promo_code) {
              this.freeModal = true;
            } else {
              this.$store.state.team.legalSubscription = true;
              this.$router.push(
                  `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
              );
            }
          }
        } else {
          if(this.choosedPlan.promo_code) {
            this.freeModal = true;
          } else {
            this.freeModal = true;
            this.$store.state.team.subscriptionAmount = (this.amount - this.savedAmount);
            this.$store.state.team.legalSubscription = true;
            this.$router.push(
                `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
            );
          }
        }
        // this.$router.push(
        //     `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
        // );
      } else {
        this.$error({
          title: "No Subscription Plan is Selected!",
          content: "You have to select a subscription plan",
          centered: true,
        });
        return;
      }
      // var subId;
      // if (this.isSelected1) {
      //   subId = 1;
      // } else if (this.isSelected2) {
      //   subId = 2;
      // } else if (this.isSelected3) {
      //   subId = 3;
      // } else if (this.isSelected4) {
      //   subId = 0;
      //   this.freeModal = true;
      //   return;
      // } else {
      //   //alert("You have to select a subscription plan");
      //   this.$error({
      //     title: "No Subscription Plan is Selected!",
      //     content: "You have to select a subscription plan",
      //     centered: true,
      //   });
      //   return;
      // }
      // if(subId !== 0) {
      //   this.$router.push(
      //       `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${subId}`
      //   );
      // }
    },
    handleCancel() {
      this.freeModal = false;
    },
    handleOkFreeModal() {
      if(this.choosedPlan.promo_code && this.cupon == this.choosedPlan.promo_code) {
        this.$store.state.team.subscriptionAmount = (this.amount - this.savedAmount);
        this.$router.push(
            `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
        );
      } else {
        this.$error({
          title: "Invalid coupon",
          content: "Please try with a valid coupon",
          centered: true,
        });
      }
    },
    nextWithoutCupon() {
      this.$store.state.team.subscriptionAmount = (this.amount - this.savedAmount);
      this.$store.state.team.legalSubscription = true;
      this.$router.push(
          `/subscription/payment/${this.teamSelected.name}/${this.teamSelected.id}/${this.choosedPlan.id}?name=${this.choosedPlan.title}`
      );
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
  .main-content {
    width: 100%;
    margin-top: 15px;
    //		margin-left: 250px;
    .section-header {
      .heading {
        font-weight: 800;
        color: $color-primary;
      }
    }
    .subscription-details {
      margin: 15px;
      .custom-card {
        height: 370px;
        background-color: $color-primary;
        border-radius: 5px;
      }
      .card-1 {
        .div-1 {
          background-color: $color-brand;
          height: 70px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;

          h3 {
            color: white;
            font-weight: 800;
          }
        }
        .div-2 {
          background-color: white;
          height: 220px;
          padding-top: 10px;
          .duration {
            border: 1px solid white;
            background-color: white;
            color: black;
            font-weight: 400;
            padding: 5px;
            text-align: center;
            cursor: pointer;
            margin-bottom: 0 !important;
          }
          .selected {
            background-color: rgb(180, 61, 151);
            color: white;
          }
        }
        .div-3 {
          color: white;
          padding: 10px;
          p {
            font-size: 10px;
            font-weight: 400;
          }
        }
      }

      .card-2 {
        .div-2 {
          height: 120px;
          text-align: center;
          h3 {
            font-size: 50px;
            color: white;
          }
          p {
            margin-top: -20px;
            color: white;
          }
        }
        .div-3 {
          padding: 10px;
          p {
            font-size: 12px;
            color: white;
            text-align: justify;
          }
        }
      }

      .card-3 {
        height: 330px;

        h1 {
          text-align: center;
          font-size: 30px;
          color: white;
        }

        .form-group {
          .custom-select {
            font-size: 18px;
            width: auto;
            height: 50px;
            border-radius: 20px !important;
            background: #e6e6e6 url("~@/assets/select-arrow.png") no-repeat;
            background-position: right 2px center;
            background-color: rgb(219, 213, 248);
          }
        }

        .team-details-heading {
          margin-top: 10px;
          font-size: 14px;
          background-color: white;
        }
        .team-details {
          span {
            color: white;
          }
        }
        .team-sub-details-heading {
          margin-top: 10px;
          font-size: 14px;
          background-color: white;
        }
        .sub-details {
          font-size: 12px;
          color: white;
          margin-top: -5px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .btn-payment {
          margin-top: 3px;
        }
      }
    }
  }
}
.background-design {
  //background-image: linear-gradient(
  //  to right,
  //  #eb5e94,
  //  #eb5e94,
  //  #bf47a1,
  //  #962a7b
  //);
  background-image: linear-gradient(to right top, #522e8e, #602d8d, #6e2b8c, #7a2a8a, #852888, #912787, #9d2585, #a82483, #b72181, #c51f7e, #d31f7b, #e02076);
  padding-top: 10px;
}
.background-design-cardfooter {
  //background-image: linear-gradient(to right, #8859a7, #6159a7);
  margin-top: 18px;
}

.background-design-middle {
  //background-image: linear-gradient(
  //  to top right,
  //  #6159a7,
  //  #a459a7,
  //  #ca56ad,
  //  #eb5e94
  //);
  background-image: linear-gradient(to right top, #522e8e, #602d8d, #6e2b8c, #7a2a8a, #852888, #912787, #9d2585, #a82483, #b72181, #c51f7e, #d31f7b, #e02076);
  margin-top: 18px;
}

.background-design-rightcard {
  //background-image: linear-gradient(to bottom, #6159a7, #ca56ad, #eb5e94);
  background-image: linear-gradient(to right top, #522e8e, #602d8d, #6e2b8c, #7a2a8a, #852888, #912787, #9d2585, #a82483, #b72181, #c51f7e, #d31f7b, #e02076);
  margin-top: 18px;
}

.br-20 {
  border-radius: 20px;
}
.br-10 {
  border-radius: 10px;
}
.br-top-20 {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.br-top-10 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.div-3 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 8px;
}
.icon-check {
  margin-top: 4px;
  margin-right: 8px;
}
.text-transparent {
  color: transparent;
}
.selected {
  color: white;
}
.bg-brand-gradient {
  //background-image: linear-gradient(
  //  to right,
  //  #eb5e94,
  //  #eb5e94,
  //  #bf47a1,
  //  #962a7b
  //);
  background-image: linear-gradient(to right top, #522e8e, #602d8d, #6e2b8c, #7a2a8a, #852888, #912787, #9d2585, #a82483, #b72181, #c51f7e, #d31f7b, #e02076) !important;
}
.bg-primary-gradient {
  //background-image: linear-gradient(
  //  to top right,
  //  #6159a7,
  //  #a459a7,
  //  #ca56ad,
  //  #eb5e94
  //);
  background-image: linear-gradient(to right top, #522e8e, #602d8d, #6e2b8c, #7a2a8a, #852888, #912787, #9d2585, #a82483, #b72181, #c51f7e, #d31f7b, #e02076);
}
.price {
  font-size: 54px;
}
.price-text {
  margin-top: -28px;
  font-size: 20px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.btn-payment {
  border: 2px solid $color-white;
  outline-style: solid;
  outline-color: #cfcece;
}
.heading {
  font-size: 20px;
}
.sub-heading {
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
}
.mobile-block {
  display: none;
}
.buttons-position {
  top: -24px;
  left: 15px;
  //z-index: 9;
  width: 90%;
}
.btn-payment {
  margin-top: 30px;
}
.height-1 {
  height: 450px;
}
.height-2 {
  height: 510px;
}
.btn-back {
  width: 50%;
}
.btn-next {
  width: 50%;
}
.heading-text {
  margin-top: 12px;
}
.mobile-section {
  margin-top: 50px;
}
.item-duration:hover {
  background-image: linear-gradient(to right top, #522e8e, #602d8d, #6e2b8c, #7a2a8a, #852888, #912787, #9d2585, #a82483, #b72181, #c51f7e, #d31f7b, #e02076);
  .duration {
    color: #ffffff;
  }
}
.free-duration {
  background: #498ba133;
}
.free-duration:hover {
  background: $bg-brand !important;
  .duration {
    color: #ffffff;
  }
}
@media (min-width: 768px) {
  .subscription-details {
    padding: 0 2rem;
  }
  .desktop-py {
    padding: 16px 0;
  }
  .heading {
    font-size: 30px;
  }
  .mobile-block {
    display: block;
  }
  .buttons-position {
    display: none;
  }
  .height-1 {
    height: 665px;
  }
  .height-2 {
    height: 600px;
  }
  .heading-text {
    margin-top: 2rem;
  }
  .mobile-section {
    margin-top: 0;
  }
  .row {
    margin: -12px !important;
  }
}

@media (min-width: 992px) {
  .btn-payment {
    margin-top: 0.5rem;
  }
  .height-1 {
    height: 555px;
  }
  .height-2 {
    height: 510px;
  }
}

@media (min-width: 1300px) {
  .btn-payment {
    margin-top: 0.5rem;
  }
  .height-1 {
    height: 520px;
  }
  .height-2 {
    height: 475px;
  }
}

.duration {
  margin-bottom: 0 !important;
}
.custom-select {
  height: 50px;
  font-weight: bolder;
  text-align: center;
  border: none !important;
}
.custom-select:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none;
}
</style>
