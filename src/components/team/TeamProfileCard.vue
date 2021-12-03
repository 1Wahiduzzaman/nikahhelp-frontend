<template>
  <div class="team-profile-box position-absolute">
    <div class="d-flex justify-content-between px-2 position-relative align-items-center">
      <h4 class="fs-20 text-white font-weight-bold py-2 cursor-pointer p-2" @click="$emit('toggleProfileCard')">&#8592;</h4>
      <div class="cross-button-box mr-2 mt-2 d-flex justify-content-center align-items-center cursor-pointer py-1" @click="$emit('toggleProfileCard')">
        &#10006;
      </div>
    </div>
    <div class="profile text-center">
      <img src="https://picsum.photos/200/300?random=1" alt="profile" class="profile-img br-4">
      <h4 class="fs-16 text-white pt-2">{{ profileActive.user && profileActive.user.full_name ? profileActive.user.full_name : profileActive.user.email }}</h4>
      <div class="team-profile-short pt-2 text-center d-flex justify-content-center">
        <table class="table table-borderless short-table">
          <tr>
            <td class="fs-12 text-white opacity-60" >Team join Date</td>
            <td class="fs-12 text-white opacity-60">:</td>
            <td class="fs-12 text-white ml-3">{{ formateDate(profileActive.created_at) }}</td>
          </tr>
          <tr>
            <td class="fs-12 text-white opacity-60">Joined as a</td>
            <td class="fs-12 text-white opacity-60">:</td>
            <td class="fs-12 text-white ml-3">{{ profileActive.user_type }}</td>
          </tr>
          <tr>
            <td class="fs-12 text-white opacity-60">Relationship</td>
            <td class="fs-12 text-white opacity-60">:</td>
            <td class="fs-12 text-white ml-3">{{ profileActive.relationship }}</td>
          </tr>
          <tr>
            <td class="fs-12 text-white opacity-60">Team Role</td>
            <td class="fs-12 text-white opacity-60">:</td>
            <td class="fs-12 text-white ml-3">{{ profileActive.role.replace('+', ' & ') }}</td>
          </tr>
<!--          <tr>-->
<!--            <td class="fs-12 text-white opacity-60">Permission</td>-->
<!--            <td class="fs-12 text-white opacity-60">:</td>-->
<!--            <td class="fs-14 text-white ml-3">None</td>-->
<!--          </tr>-->
        </table>
      </div>
      <router-link :to="{name: 'Profile', query: { user_id: profileActive.user_id }}">
        <button class="btn btn-sm fs-14 text-white bg-primary mt-1 py-1 prof-detail">Profile Details</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamProfileCard",
  props: ['profileActive'],
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

      return [day, month, year].join("/");
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.opacity-60 {
  opacity: 0.6;
}
.short-table tr td {
  padding: 0 !important;
}
.br-10 {
  border-radius: 10px;
}
.team-profile-box {
  background: $bg-primary;
  width: 100%;
  height: 354px;
  margin-left: -8px;
  border-radius: 10px;
  z-index: 9;

  .position-relative {
    .cross-button-box {
      width: 30px;
      height: 30px;
      float: right;
      border-radius: 50%;
      background: white;
    }
  }
  .profile {
    margin-top: -4px;
    .profile-img {
      width: 100px;
      height: 100px;
      border: 2px solid $color-white;
    }
    .prof-detail {
      border: 2px solid $color-white;
      border-radius: 20px;
    }
  }
}
</style>
