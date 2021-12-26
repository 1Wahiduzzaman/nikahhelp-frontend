<template>
  <div>
    <div>
      <div v-if="isLoading">Loading</div>
      <div v-else>
        <div class="main-content-wrapper">
          <div class="main-content-1 px-4">
            <div class="flex border-bottom pb-4 justify-content-between align-items-center">
              <h4 class="d-sm-none d-md-block">All Notifications</h4>
              <div class="flex justify-content-end align-items-center w-full flex-wrap">
                <v-btn
                    rounded
                    color="primary"
                    dark
                    small
                    @click="notiType = 'all'"
                >
                  All
                </v-btn>
                <v-btn
                    rounded
                    color="error"
                    dark
                    class="ml-2"
                    small
                    @click="notiType = 0"
                >
                  Unread
                </v-btn>
                <v-btn
                    rounded
                    color="success"
                    dark
                    class="ml-2 read-btn"
                    small
                >
                  <a-icon type="check" color="success" class="pr-2" />
                  Mark all as read
                </v-btn>
              </div>
            </div>
            <div class="notification-page-height pr-3 mt-4">
              <notification
                  v-for="(notification, index) in filteredNotifications"
                  :key="index"
                  :notification="notification" />
            </div>
          </div>
          <!-- <div class="main-content-2">
						<div class="shadow-default notifications-sidebar">
							<div class="filter-notification">
								<h6>Filter Notification By</h6>
								<button class="btn btn-primary btn-block mt-5 mb-5">
									Show Unseen Only
								</button>
								<button class="btn btn-primary btn-block mt-5 mb-5">
									Show Seen Only
								</button>
							</div>
							<div class="manage-notification">
								<h6>Manage Noification</h6>
								<button class="btn btn-primary btn-block">
									Mark all as Seen
								</button>
								<button class="btn btn-primary btn-block">
									Mark all as Unseen
								</button>
								<button class="btn btn-primary btn-block">
									Manage Mute Notification
								</button>
								<button class="btn btn-primary btn-block">
									Mute all Notification
								</button>
							</div>
						</div>
					</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/dashboard/layout/Header.vue";
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
import Footer from "@/components/auth/Footer.vue";
import Notification from "@/components/notification/Notification.vue";
import JwtService from "@/services/jwt.service";
import ApiService from "@/services/api.service";
export default {
  name: "NotificationPage",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    ping: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  components: {
    Header,
    Sidebar,
    Footer,
    Notification,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      is_verified: 1,
      error: null,
      teamId: null,
      notiType: 'all',
    };
  },
  computed: {
    filteredNotifications() {
      if(this.notiType == 'all') {
        return this.notifications;
      } else {
        return this.notifications.filter(item => item.seen == this.notiType);
      }
    },
    notifications() {
      return this.$store.state.notification.notifications;
    }
  },
  mounted() {
    this.sockets.subscribe('receive_notification', function (res) {
      this.notifications.unshift(res);
    });
  },
  created() {
    //this.loadUser();
    this.getActiveTeamId();
    // this.loadNotifications();
  },
  methods: {
    async loadUser() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getUser");
        this.user = this.$store.getters["userInfo"];
        this.is_verified = this.user.is_verified;
        this.isLoading = false;
        // if (this.is_verified == 0) {
        //   this.$router.push("/email-verification");
        // }
        // if (this.user.account_type === 0) {
        //   this.$router.push("/member-type");
        // }
        //
        // if (this.user.account_type === 4) {
        //   this.$router.push("/admin");
        // }
        //
        // let data_input_status = this.$store.getters["userDataInputStatus"];
        // console.log("data input status", data_input_status);
        // if (data_input_status == 10) {
        //   this.$router.push("/member-name/candidate");
        // }
        //
        // if (data_input_status == 20) {
        //   this.$router.push("/member-name/representative");
        // }
        //
        // if (data_input_status == 11) {
        //   this.$router.push("/candidate-registration");
        // }
        // if (data_input_status == 21) {
        //   this.$router.push("/representative-registration");
        // }

        // if (data_input_status == 12) {
        // 	this.$router.push("/candidate-registration");
        // }
        // if (data_input_status == 22) {
        // 	this.$router.push("/representative-registration");
        // }
      } catch (error) {
        this.error = error.message || "Something went wrong";
        //alert(this.error);
        this.$error({
          title: "Error",
          content: this.error,
        });
        console.log(this.error);
        this.$router.push("/notifications");
      }
      this.isLoading = false;
    },
    async getActiveTeamId() {
      console.log("Function Called, Get Active  Team Id");
      const response = this.$store.dispatch("getTeams");
      response
        .then((data) => {
          let teamId = JwtService.getTeamIDAppWide();
          console.log(data.data.data);
          if (data.data.data.length == 0) {
            // this.$warning({
            //   title: "You don't have a team",
            //   content: "Please create or join a team!",
            // });
           // this.$router.push("/manageteam");
          } else if (!teamId) {
            // this.$warning({
            //   title: "You don't have an active team",
            //   content: "Please select an active team to continue!",
            // });
           // this.$router.push("/manageteam");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadNotifications() {
      this.isLoading = true;
      try {
        ApiService.get("v1/list-notification").then(response => {
          this.notifications = response.data.data;
          this.isLoading = false;
        }).catch(e => {
          console.log(e);
          this.isLoading = false;
        })
      } catch (error) {
        this.error = error.message || "Something went wrong! Try again!";
        console.log(this.error);
        this.isLoading = false;
      }
    },
    changeTeam(data) {
      console.log(data);
      this.teamId = data;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.main-content-wrapper {
  margin-top: 8px;
  .side-bar {
    max-width: 250px;
  }
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    .side-bar {
      width: 30%;
      flex: 0 0 30%;
    }
  }

  @media (max-width: 767px) {
    max-width: 100%;
    .side-bar {
      width: 30%;
      flex: 0 0 30%;
    }
  }

  @media (max-width: 541px) {
    .side-bar {
      width: 120px;
      flex: 0 0 10%;
    }
  }

  @media (max-width: 415px) {
    .side-bar {
      // max-width: 128px;
      width: auto;
      flex: 0 0 10%;
    }
  }

  .main-content-1 {
    flex: 0 0 100%;
    h4 {
      padding-top: 10px;
      padding-left: 8px;
      // @media (max-width: 321px) {
      // 	padding-left: 5px;
      // }
    }
  }
  // .main-content-2 {
  // 	margin: 15px;
  // 	width: 300px;
  // 	height: 80vh;
  // 	.notifications-sidebar {
  // 		padding: 10px;
  // 		height: 80vh;
  // 		.filter-notification {
  // 			height: 50%;
  // 			padding: 15px;
  // 			h6 {
  // 				text-align: center;
  // 			}
  // 		}
  // 		.manage-notification {
  // 			height: 50%;
  // 			padding: 15px;
  // 			h6 {
  // 				text-align: center;
  // 			}
  // 		}
  // 	}
  // 	@media (max-width: 1025px) {
  // 		display: none;
  // 	}
  // }

  // @media (max-width: 767px) {
  // 	.footer-portion{
  // 		display: none;
  // 	}
  // }
}
.d-sm-none {
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
}
.d-md-block {
  display: none;
  @media (min-width: 992px) {
    display: flex !important;
    width: 100%;
  }
}
.notification-page-height {
  height: calc(100vh - 165px);
  overflow-y: unset;
  @media (min-width: 992px) {
    height: calc(100vh - 175px);
    overflow-y: auto;
  }
}
.read-btn {
  margin-top: 6px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
}
</style>
