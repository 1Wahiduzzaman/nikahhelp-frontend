<template>
  <div class="main-container">
    <header
      class="header-container bg-secondary shadow-default radius-none px-4"
    >
      <div class="header-content d-flex align-items-center justify-content-between">
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
          class="header-right user-avatar-area shrink-none"
          style="align-self: center"
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
                    <NotificationPopup :items="[]" :use-for="'team'" />
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
                    <a-badge :count="unreadNotification">
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
                    <NotificationPopup :items="notifications" :use-for="'notification'" />
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
                    <a-badge count="5">
                      <img
                        width="25"
                        src="@/assets/icon/chat-dots-fill-white.svg"
                        alt="img"
                      />
                    </a-badge>
                  </a>
                  <template v-slot:overlay>
                    <NotificationPopup count="29" :items="[]" :use-for="'chat'" />
                  </template>
                </a-dropdown>
              </li>
            </ul>
          </div>
        <div style="display:flex">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <img class="avatar-image" src="@/assets/mike.jpg" width="35" alt="" />
            </a>
            <a-menu slot="overlay" class="none-mobile-block">
              <a-menu-item>
                <img
                    width="22"
                    src="@/assets/icon/support-secondary.svg"
                    alt="icon"
                />
                <span class="ml-2">Support</span>
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
                <img
                    width="22"
                    src="@/assets/icon/logout.svg"
                    alt="icon"
                />
                <span class="ml-2">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <div style="align-self: center">
            <div class="ml-2 text-white">
              <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  <h6 class="mb-0 text-white fs-14 name-hover">Selina Parvez Shumi</h6>
                </a>
                <a-menu slot="overlay" class="none-mobile-block">
                  <a-menu-item>
                    <img
                        width="22"
                        src="@/assets/icon/support-secondary.svg"
                        alt="icon"
                    />
                    <span class="ml-2">Support</span>
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
                    <img
                        width="22"
                        src="@/assets/icon/logout.svg"
                        alt="icon"
                    />
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
                    Team 1
                  </span>
                  <template v-slot:overlay>
                    <ul class="avatar-dropdown">
                      <li class="list-item">
                        <span>Active now:</span>
                        <p class="mb-0 color-primary">Team 1</p>
                      </li>
                      <li class="list-item">
                        <span>Team ID:</span>
                        <p class="mb-0 color-primary">#6302432</p>
                      </li>
                      <li class="list-item">
                        <span>Team Name:</span>
                        <p class="mb-0 color-primary">Selina's Family</p>
                      </li>
                    </ul>
                  </template>
                </a-dropdown>
                <span class="role px-2 ml-1 shrink-none">Admin</span>
              </div>
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

            <a-menu slot="overlay" style="min-width: 250px">
              <a-menu-item @click="collapsed = !collapsed">
                <img width="22" src="@/assets/Icons/form.svg" alt="icon" />
                <span class="ml-2"
                  >{{ collapsed ? "Open" : "Close" }} left sidebar</span
                >
              </a-menu-item>
              <a-divider class="m-0" />
              <a-menu-item class="d-flex align-items-center">
                <img
                  width="22"
                  src="@/assets/icon/group-fill-secondary.svg"
                  alt="icon"
                />
                <span class="ml-2">Manage Team</span>
              </a-menu-item>

              <a-menu-item class="d-flex align-items-center">
                <img
                  width="22"
                  src="@/assets/icon/star-fill-secondary.svg"
                  alt="icon"
                />
                <span class="ml-2">Shortlist</span>
              </a-menu-item>

              <a-menu-item>
                <img
                  width="22"
                  src="@/assets/icon/bell-fill-secondary.svg"
                  alt="icon"
                />
                <span class="ml-2 mr-2">Notification</span>
                <a-badge
                  class="ml-auto"
                  :number-style="{ backgroundColor: '#e42076' }"
                  :count="unreadNotification"
                />
              </a-menu-item>
              <a-menu-item>
                <img
                  width="22"
                  src="@/assets/icon/chat-dots-fill-secondary.svg"
                  alt="icon"
                />
                <span class="ml-2 mr-2">Chat</span>
<!--                <a-badge-->
<!--                  class="ml-auto"-->
<!--                  :number-style="{ backgroundColor: '#e42076' }"-->
<!--                  count="120"-->
<!--                />-->
              </a-menu-item>
              <a-menu-item>
                <img
                    width="22"
                    src="@/assets/icon/support-secondary.svg"
                    alt="icon"
                />
                <span class="ml-2">Support</span>
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
                <img
                    width="22"
                    src="@/assets/icon/logout.svg"
                    alt="icon"
                />
                <span class="ml-2">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </header>

    <a-layout
      id="layout"
      style="background-color: #fff"
      :style="{ overflow: 'auto', height: 'calc(100vh - 80px)' }"
    >
      <a-layout-sider
        :style="{ overflow: 'hidden auto', height: 'calc(100vh - 80px)' }"
        class="bg-white shadow-default"
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
            <SimpleSearch />
          </template>
        </Sidebar>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from "@/components/dashboard/layout/Sidebar.vue";
//import SimpleSearch from "@/components/search/SimpleSearch.vue";
import NotificationPopup from "@/components/notification/NotificationPopup";
import ApiService from "@/services/api.service";
export default {
  name: 'Layout',
  components: {
    NotificationPopup,
    Sidebar,
    // SimpleSearch
    SimpleSearch: () => import('@/components/search/SimpleSearch.vue')
  },
  created() {
    this.loadNotifications();
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    notifications() {
      return this.$store.state.notification.notifications;
    },
    unreadNotification() {
      return this.notifications.filter(item => item.seen == 0).length;
    }
  },
  methods: {
    responsiveToggle() {
      this.collapsed = false;
    },
    async loadNotifications() {
      await ApiService.get("v1/list-notification").then(response => {
        this.$store.state.notification.notifications = response.data.data;
      }).catch(e => {
        console.log(e);
      })
    },
    logout() {
      console.log("Logout clicked");
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
.main-container{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh
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
  color: #E51F76FF !important;
  text-decoration: underline;
}
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