<template>
  <footer>
    <div class="container py-3">
      <div class="text-center">
        <a href="/dashboard">
          <img
            src="@/assets/Icons/Logo/SVG/Black_logo_footer.svg"
            width="150"
            height="50"
            alt="logo"
          />
        </a>
      </div>
      <ul class="footer-menu mt-3">
        <li>
          <a href="javascript:void()"
            ><router-link to="/about" class="color-primary">
              About
            </router-link></a
          >
        </li>
        <li>
          <a href="javascript:void()">
            <router-link to="/privacy-policy" class="color-primary">
              Privacy & Cookie Policy
            </router-link></a
          >
        </li>
        <li>
          <a href="javascript:void()"
            ><router-link to="/terms_condition" class="color-primary">
              Terms & Conditions
            </router-link></a
          >
        </li>
        <li>
          <a href="javascript:void()"
            ><router-link to="/safety_guidance" class="color-primary">
              Safety & Guidance
            </router-link></a
          >
        </li>
        <li>
          <a href="javascript:void()"
            ><router-link to="/user-agreement" class="color-primary">
              User Agreement
            </router-link></a
          >
        </li>
        <li>
          <a href="javascript:void()"
            ><router-link to="/help" class="color-primary">
              Help
            </router-link></a
          >
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
footer {
  border-top: 1px solid $border-default;

  // z-index: -1;
  // overflow: hidden;
  .footer-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    li {
      padding: 5px 10px;
    }
  }
}
.color-primary:hover {
  text-decoration: underline;
}
</style>