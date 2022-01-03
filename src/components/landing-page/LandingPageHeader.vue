<template>
  <nav
    id="landing-top-menu"
    class="landing-top-menu navbar justify-content-between"
  >
    <div class="container">
      <router-link to="/">
        <a href="javascript:void()" class="navbar-brand"
          ><img
            class="logo"
            src="@/assets/Icons/Logo/SVG/White Logo.svg"
            alt="logo"
        /></a>
      </router-link>
      <form class="login">
        <div>
          <router-link to="/login"
            ><img
              src="@/assets/Icons/sign in.svg"
              alt=""
              class="signinBtnDesign"
            />
            Sign in
          </router-link>

          <router-link to="/signup"
            ><img
              src="@/assets/Icons/join now.svg"
              alt=""
              class="signinBtnDesign"
            />
            Join Now
          </router-link>
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      isLoading: true,
      user: {},
      is_verified: 1,
      propsData: { ...createData() },
      fixedStatus: {
        headerIsFixed: false,
      },
    };
  },
  created() {},
  mounted() {
    // let scrollpos = window.scrollY;
    // const header = document.getElementById("landing-top-menu");
    // const header_height = header.offsetHeight;
    // const add_class_on_scroll = () => header.classList.add("on-scroll");
    // const remove_class_on_scroll = () => header.classList.remove("on-scroll");
    // window.addEventListener("scroll", function () {
    //   scrollpos = window.scrollY;
    //   if (scrollpos >= header_height) {
    //     add_class_on_scroll();
    //   } else {
    //     remove_class_on_scroll();
    //   }
    // });
  },

  computed: {
    // isLoggedIn() {
    //   return this.$store.getters.isAuthenticated;
    // },
  },

  methods: {
    updateFixedStatus(next) {
      this.fixedStatus.headerIsFixed = next;
    },
    handleScroll(event) {
      let scrollpos = window.scrollY;
      const header = document.querySelector("nav");
      const header_height = header.offsetHeight;
      const add_class_on_scroll = () => header.classList.add("on-scroll");
      const remove_class_on_scroll = () => header.classList.remove("on-scroll");
      scrollpos = window.scrollY;

      if (scrollpos >= header_height) {
        add_class_on_scroll();
      } else {
        remove_class_on_scroll();
      }
    },
    checkAuthentication() {
      if (!this.isLoggedIn && window.location.pathname !== "/") {
        this.$router.push("/").catch((err) => {
          console.log("err", err);
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.landing-top-menu {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // z-index: 10;
  // transition: all 0.5s;
  background: #000000a6;

  .logo {
    width: 200px;
    transition: all 0.5s;
    @media (max-width: 991px) {
      max-width: 120px;
    }
    @media (max-width: 575px) {
      max-width: 105px;
    }
  }
  &.on-scroll {
    background: #000000a6;
    .logo {
      max-width: 100px;
    }
  }
  a {
    color: $color-white;
  }

  .anticon-home {
    margin-right: 5px;
    font-size: 16px;
  }
  .login {
    a {
      display: inline-flex;
      align-items: center;
      margin-left: 15px;
      @media (max-width: 575px) {
        font-size: 14px;
      }
      img {
        margin-right: 5px;
      }
    }
  }
}

.signinBtnDesign {
  height: 15px;
}
</style>
