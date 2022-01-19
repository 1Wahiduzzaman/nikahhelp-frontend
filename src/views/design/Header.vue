<template>
  <header class="header-container bg-secondary shadow-default radius-none px-4">
    <div
      class="header-content d-flex align-items-center justify-content-between"
    >
      <div class="shrink-none none-mobile">
        <a href="/" class="navbar-brand">
          <img
            width="120"
            src="@/assets/Icons/Logo/SVG/White Logo.svg"
            alt="logo"
          />
        </a>
      </div>

      <div
        class="header-right user-avatar-area shrink-none mobile-menu"
        style="align-self: center;"
      >
        <div>
          <ul class="header-nav-icons d-none d-sm-flex">
            <li class="nav-item shrink-none">
              <a class="nav-link" aria-current="page" href="/dashboard">
                <img
                  width="25"
                  src="@/assets/icon/house-door-fill-white.svg"
                  alt="img"
                />
              </a>
            </li>
            <li class="nav-item shrink-none">
              <a-dropdown :trigger="['click']" placement="bottomRight">
                <a
                  class="nav-link"
                  aria-current="page"
                  @click.self="(e) => e.preventDefault()"
                >
                  <img
                    width="25"
                    src="@/assets/icon/group-fill-white.svg"
                    alt="img"
                  />
                </a>
                <template v-slot:overlay>
                  <NotificationPopup :items="teams" :use-for="'team'" />
                </template>
              </a-dropdown>
            </li>
            <li class="nav-item shrink-none">
              <!-- <a class="nav-link" aria-current="page" href="/shortlist">
                            <img width="25" src="@/assets/icon/star-fill-white.svg" alt="img"/>
                        </a> -->
              <a-dropdown :trigger="['click']" placement="bottomRight">
                <a
                  class="nav-link"
                  aria-current="page"
                  @click.self="(e) => e.preventDefault()"
                >
                  <img
                    width="25"
                    src="@/assets/icon/star-fill-white.svg"
                    alt="img"
                  />
                </a>
                <template v-slot:overlay>
                  <NotificationPopup :items="[]" :use-for="'shortlist'" />
                </template>
              </a-dropdown>
            </li>
            <li class="nav-item shrink-none">
              <a-dropdown :trigger="['click']" placement="bottomRight">
                <a
                  class="nav-link"
                  aria-current="page"
                  @click.self="(e) => e.preventDefault()"
                >
                  <a-badge :count="unreadNotification.length">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style="width: 30px"
                      viewBox="0 0 20 20"
                      fill="#fff"
                    >
                      <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </a-badge>
                </a>
                <template v-slot:overlay>
                  <NotificationPopup
                    :items="reducedNotifications"
                    :use-for="'notification'"
                  />
                </template>
              </a-dropdown>
            </li>
            <li class="nav-item shrink-none mr-6">
              <a-dropdown :trigger="['click']" placement="bottomRight">
                <a
                  class="nav-link"
                  aria-current="page"
                  @click.self="(e) => e.preventDefault()"
                >
                  <a-badge :count="unseenChat">
                    <img
                      width="25"
                      src="@/assets/icon/chat-dots-fill-white.svg"
                      alt="img"
                    />
                  </a-badge>
                </a>
                <template v-slot:overlay>
                  <NotificationPopup
                    count="29"
                    :items="chats"
                    :use-for="'chat'"
                  />
                </template>
              </a-dropdown>
            </li>
          </ul>
        </div>
        <div class="mobile-menu" style="display: flex;">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <img
                v-if="loggedUser.per_main_image_url"
                class="avatar-image"
                :src="loggedUser.per_main_image_url"
                alt=""
              />
              <img
                v-if="!loggedUser.per_main_image_url"
                class="avatar-image"
                src="@/assets/mike.jpg"
                alt=""
              />
            </a>
            <a-menu slot="overlay" class="none-mobile-block">
              <a-menu-item>
                <router-link to="/support">
                  <img
                    width="22"
                    src="@/assets/icon/support-secondary.svg"
                    alt="icon"
                  />
                  <span class="ml-2">Support</span>
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/settings">
                  <img
                    width="22"
                    src="@/assets/icon/gear-fill-secondary.svg"
                    alt="icon"
                  />
                  <span class="ml-2">Setting</span>
                </router-link>
              </a-menu-item>
              <a-menu-item @click="logout">
                <img width="22" src="@/assets/icon/logout.svg" alt="icon" />
                <span class="ml-2">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <div style="align-self: center">
            <div class="ml-2 text-white">
              <a-dropdown>
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                  <router-link class="" to="/profile">
                    <h6 class="mb-0 text-white fs-14 name-hover">
                      {{
                        loggedUser && loggedUser.full_name
                          ? loggedUser.full_name
                          : "N/A"
                      }}
                    </h6>
                  </router-link>
                </a>
                <a-menu slot="overlay" class="none-mobile-block">
                  <a-menu-item>
                    <router-link to="/support">
                      <img
                        width="22"
                        src="@/assets/icon/support-secondary.svg"
                        alt="icon"
                      />
                      <span class="ml-2">Support</span>
                    </router-link>
                  </a-menu-item>
                  <a-menu-item>
                    <router-link to="/settings">
                      <img
                        width="22"
                        src="@/assets/icon/gear-fill-secondary.svg"
                        alt="icon"
                      />
                      <span class="ml-2">Setting</span>
                    </router-link>
                  </a-menu-item>
                  <a-menu-item @click="logout">
                    <img width="22" src="@/assets/icon/logout.svg" alt="icon" />
                    <span class="ml-2">Logout</span>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              <div
                class="d-flex justify-content-between align-items-center mt-1"
              >
                <a-dropdown :trigger="['click']" placement="bottomRight">
                  <span
                    @click.self="(e) => e.preventDefault()"
                    class="team color-primary pl-2 mr-1 shrink-none"
                  >
                    {{
                      activeTeamIndex >= 0
                        ? "Team " + (activeTeamIndex + 1)
                        : "N/A"
                    }}
                  </span>
                  <template v-slot:overlay>
                    <ul class="avatar-dropdown">
                      <li class="list-item">
                        <span>Active now:</span>
                        <p class="mb-0 color-primary w-100px ellipse">
                          {{
                            activeTeamIndex >= 0
                              ? "Team " + (activeTeamIndex + 1)
                              : "N/A"
                          }}
                        </p>
                      </li>
                      <li class="list-item">
                        <span>Team ID:</span>
                        <p class="mb-0 color-primary w-100px ellipse">
                          {{
                            activeTeamInfo && activeTeamInfo.team_id
                              ? activeTeamInfo.team_id.substring(0, 8)
                              : "N/A"
                          }}
                        </p>
                      </li>
                      <li class="list-item">
                        <span>Team Name:</span>
                        <p class="mb-0 color-primary w-100px ellipse">
                          {{
                            activeTeamInfo && activeTeamInfo.name
                              ? activeTeamInfo.name.substring(0, 12)
                              : "N/A"
                          }}
                        </p>
                      </li>
                      <li class="list-item">
                        <span>Your Role:</span>
                        <p class="mb-0 color-primary w-100px ellipse">
                          {{ activeTeamInfo ? teamRole : 'N/A' }}
                        </p>
                      </li>
                    </ul>
                  </template>
                </a-dropdown>
                <img src="@/assets/icon/verified_icon.svg" alt="icon" class="verify-icon" width="14px" v-if="loggedUser && parseInt(loggedUser.status) === 3" />
<!--                <span class="role px-2 ml-1 shrink-none">-->
<!--&lt;!&ndash;                  {{ loggedUser && parseInt(loggedUser.status) === 3 ? 'V' : 'Not verified' }}&ndash;&gt;-->
<!--                </span>-->
              </div>
            </div>
          </div>
        </div>
        <div class="d-sm-none">
          <a-dropdown :trigger="['click']">
            <svg
              @click="(e) => e.preventDefault()"
              xmlns="http://www.w3.org/2000/svg"
              class="menu-icon-alt"
              fill="#fff"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <a-menu slot="overlay" style="min-width: 320px">
              <a-menu-item @click="$emit('toggleCollapse')">
                <img width="22" src="@/assets/Icons/form.svg" alt="icon" />
                <span class="ml-2"
                  >{{ collapsed ? "Open" : "Close" }} left sidebar</span
                >
              </a-menu-item>
              <a-divider class="m-0" />
              <a-menu-item class="d-flex align-items-center">
                <a-dropdown :trigger="['click']" placement="bottomLeft" :getPopupContainer="popupDiv()">
                  <a
                      class="nav-link"
                      aria-current="page"
                      @click.self="(e) => e.preventDefault()"
                  >
                    <img
                        width="22"
                        src="@/assets/icon/group-fill-secondary.svg"
                        alt="icon"
                    />
                    <span class="ml-2 mr-2">Manage Team </span>
<!--                    <a-badge :count="unreadNotification" />-->
                  </a>
                  <template v-slot:overlay>
                    <NotificationPopup
                        count="29"
                        :items="teams"
                        :use-for="'team'"
                    />
                  </template>
                </a-dropdown>
              </a-menu-item>

              <a-menu-item>
                <a-dropdown :trigger="['click']" placement="bottomLeft" :getPopupContainer="popupDiv()">
                  <a
                      class="nav-link"
                      aria-current="page"
                      @click.self="(e) => e.preventDefault()"
                  >
                    <img
                        width="22"
                        src="@/assets/icon/star-fill-secondary.svg"
                        alt="icon"
                    />
                    <span class="ml-2 mr-2">Shortlist </span>
                    <a-badge count="0" />
                  </a>
                  <template v-slot:overlay>
                    <NotificationPopup
                        count="29"
                        :items="[]"
                        :use-for="'shortlist'"
                    />
                  </template>
                </a-dropdown>
              </a-menu-item>
              <a-menu-item>
                <a-dropdown :trigger="['click']" placement="bottomLeft" :getPopupContainer="popupDiv()">
                  <a
                      class="nav-link"
                      aria-current="page"
                      @click.self="(e) => e.preventDefault()"
                  >
                    <img
                        width="22"
                        src="@/assets/icon/bell-fill-secondary.svg"
                        alt="icon"
                    />
                    <span class="ml-2 mr-2">Notification </span>
                    <a-badge :count="unreadNotification.length" />
                  </a>
                  <template v-slot:overlay>
                    <NotificationPopup
                        count="29"
                        :items="reducedNotifications"
                        :use-for="'notification'"
                    />
                  </template>
                </a-dropdown>
              </a-menu-item>
              <a-menu-item>
                <a-dropdown :trigger="['click']" placement="bottomLeft" :getPopupContainer="popupDiv()">
                  <a
                      class="nav-link"
                      aria-current="page"
                      @click.self="(e) => e.preventDefault()"
                  >
                    <img
                        width="22"
                        src="@/assets/icon/chat-dots-fill-secondary.svg"
                        alt="icon"
                    />
                    <span class="ml-2 mr-2">Chat </span>
                    <a-badge :count="unseenChat" />
                  </a>
                  <template v-slot:overlay>
                    <NotificationPopup
                        count="29"
                        :items="chats"
                        :use-for="'chat'"
                    />
                  </template>
                </a-dropdown>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/support">
                  <img
                    width="22"
                    src="@/assets/icon/support-secondary.svg"
                    alt="icon"
                  />
                  <span class="ml-2">Support</span>
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link to="/settings">
                  <img
                    width="22"
                    src="@/assets/icon/gear-fill-secondary.svg"
                    alt="icon"
                  />
                  <span class="ml-2">Setting</span>
                </router-link>
              </a-menu-item>
              <a-menu-item @click="logout">
                <img width="22" src="@/assets/icon/logout.svg" alt="icon" />
                <span class="ml-2">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import NotificationPopup from "@/components/notification/NotificationPopup";

import ApiService from "@/services/api.service";
import JwtService from "../../services/jwt.service";
export default {
  name: "Layout",
  props: ['collapsed'],
  components: {
    NotificationPopup,
  },
  created() {
    this.loadNotifications();
    this.loadTeams();
  },
  data() {
    return {
      activeTeamId: null,
    };
  },

  computed: {
    loggedUser() {
      let loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser) {
        return loggedUser;
      }
      return null;
    },
    activeTeamInfo() {
      return this.teams.find((item) => item.team_id == this.activeTeamId);
    },
    activeTeamIndex() {
      return this.teams.findIndex((item) => item.team_id == this.activeTeamId);
    },
    teamRole() {
      let team = this.activeTeamInfo;
      let loggedUser = this.loggedUser;
      if (team && loggedUser && team.team_members) {
        let member = team.team_members.find(
          (item) => item.user_id == loggedUser.id
        );
        if (member) {
          return member.role.replace("+", " & ");
        }
      }
      return "N/A";
    },
    reducedNotifications() {
      return this.$store.state.notification.notifications;
      // if(this.$store.state.notification.notifications.length > 5) {
      //   let reduceSize = this.$store.state.notification.notifications - 5;
      //   this.$store.state.notification.notifications -= reduceSize;
      //   return this.$store.state.notification.notifications;
      // } else {
      //   return this.$store.state.notification.notifications;
      // }
    },
    unreadNotification() {
      // return this.$store.state.notification.instantNotifications;
      return this.$store.state.notification.notifications.filter(item => item.seen == 0);
    },
    teams() {
      let teams = this.$store.state.team.team_list;
      let activeIndex = teams.findIndex(
        (item) => item.team_id == this.activeTeamId
      );
      if (activeIndex >= 0) {
        teams.unshift(teams[activeIndex]);
        teams.splice(activeIndex, 1);
      }
      return teams;
    },
    chats() {
      return this.$store.state.chat.chats;
      // if(this.$store.state.chat.chats > 5) {
      //   let reduceSize = this.$store.state.chat.chats.length - 5;
      //   this.$store.state.chat.chats -= reduceSize;
      //   return this.$store.state.chat.chats;
      // } else {
      //   return this.$store.state.chat.chats;
      // }
    },
    unseenChat() {
      let count = 0;
      this.$store.state.chat.chats.forEach(item => {
        count = count + item && item.message && item.message.seen == 0 ? 1 : 0;
        count = count + item && item.last_message && item.last_message.seen == 0 ? 1 : 0;
        count = count + item && item.last_group_message && item.last_message.seen == 0 ? 1 : 0;
      });
      return count;
    }
  },
  methods: {
    responsiveToggle() {
      this.collapsed = false;
    },
    popupDiv() {
      document.getElementById('layout');
    },
    async loadNotifications() {
      await ApiService.get("v1/list-notification")
        .then((response) => {
          this.$store.state.notification.notifications = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async loadTeams() {
      const self = this;
      try {
        await this.$store
          .dispatch("getTeams")
          .then((data) => {
            console.log(data.data.data);
            self.checkTurnedOnSwitch();
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
    checkTurnedOnSwitch() {
      this.activeTeamId = JwtService.getTeamIDAppWide();
    },
    logout() {
      const vm = this;
      this.$confirm({
        title: "Are you sure?",
        content: "Do you want to logout?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await vm.$store.dispatch("logout");
          vm.$router.replace("/");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base/_variables.scss";
.main-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.notification-wrapper {
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 3px 8px 1px #d3d3d3;
  border-radius: 5px;
}
.header-nav-icons .nav-item {
  position: relative;
}
.mobile-menu {
  width: 100%;
  @media (min-width: 768px) {
    width: auto;
  }
}
.menu-icon-alt {
  width: 25px;
  color: #fff;
  margin-left: 10px;
}
.header-nav-icons .nav-item .ant-dropdown-open img,
.header-nav-icons .nav-item .ant-dropdown-open svg {
  outline: 8px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}
.notification__items {
  overflow-y: scroll;
  max-height: 350px;
}
.user-avatar-area {
  .avatar-image {
    border-radius: 50%;
    outline: 2px solid #ddd;
    width: 35px;
    height: 35px;
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

.avatar-dropdown {
  background-color: #fff;
  box-shadow: 0 3px 8px 1px #d3d3d3;
  padding: 5px;
  border-radius: 4px;
  min-width: 150px;
  padding: 10px;
  .list-item {
    text-align: center;
    & > span {
      font-size: 11px;
    }
    & > p {
      background-color: #ddd;
      font-size: 13px;
      border-radius: 2px;
    }
  }
}
.name-hover:hover {
  color: #e51f76ff !important;
  text-decoration: underline;
}
//.w-100px {
//  width: 100px;
//}
//.ellipse {
//  white-space: nowrap;
//  overflow: hidden;
//  text-overflow: ellipsis;
//}
.none-mobile {
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
}
.none-mobile-block {
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
}
.header-container {
  padding-top: 10px;
  padding-bottom: 10px;
  @media (min-width: 768px) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>