<template>
  <div class="position-absolute add-member-box" :class="{'from-data-card': from === 'details-card'}">
    <div class="member-box position-relative">
      <div class="cross-button-box mr-2 mt-2 d-flex justify-content-center align-items-center cursor-pointer" @click="$emit('toggleMemberbox')">&#10006;</div>
      <div class="d-flex px-4">
        <h4 class="fs-14 text-white invite-txt">Send team invitation</h4>
      </div>
      <div class="px-4 mt-2 position-relative">
        <a-input ref="userNameInput" placeholder="Search email or user ID" v-model="user_email" @keyup="searchMember()">
          <a-icon slot="suffix" type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-input>
        <span class="text-white fs-12 fw-500 ml-2">Invited/Suggested/Searched user</span>
      </div>
      <div class="suggestion-box mt-4 mx-4 px-2" :class="{'details-suggestion-card': from === 'details-card'}">
        <div class="user d-flex position-relative" v-for="(item, index) in 30" :key="index" :class="{'mt-2': index > 0}">
          <img src="https://picsum.photos/200" alt="avatar" class="user-avatar">
          <div class="d-flex justify-content-between ml-2">
            <div class="short-info">
              <h4 class="fs-14 text-white fw-700">Selina Parvez</h4>
              <h4 class="fs-12 text-white fw-500 candidate-type">Profile type: Candidate</h4>
            </div>
            <button class="btn btn-success position-absolute" @click="inviteMember(item)">Invite</button>
          </div>
        </div>
      </div>
      <div class="link-box px-4 position-absolute w-full">
        <div class="w-full mt-2">
          <input type="text" class="form-control invite-link text-white fs-12 py-5" id="copyInput" :value="invitationObject.visible_invitation_link" disabled />
          <button class="copy-button position-absolute px-2" @click="copyToken">Copy</button>
        </div>
        <p class="fs-10 text-white mt-2">Send this link through email or any messaging platform <br> Only one member can use this link once</p>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/api.service';
export default {
  name: "InviteMember",
  props: ['team', 'invitationObject', 'from'],
  data() {
    return {
      user_email: ''
    }
  },
  watch: {
    user_email: function (val) {
      console.log(val);
      // ApiService.get('/v1/team/invitations', {
      //   email: val
      // }).then(res => {
      //   console.log(res.data);
      // }).catch(e => {
      //   console.log(e);
      // });
    }
  },
  methods: {
    async searchMember() {
      await ApiService.get(`/v1/team-invitation-information/${this.user_email}`).then(response => {
        console.log(response);
      });
    },
    inviteMember(id) {
      if(this.from === 'details-card') {
        id = 'mahmud@gmail.com';
        this.$emit("executeInviteMember", id);
      } else {
        id = 'mahmud@gmail.com';
        this.$emit('addMember', id);
        this.$emit('toggleMemberbox');
      }
    },
    copyToken() {
      let copyText = document.getElementById("copyInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(copyText.value);
      alert("Copied the text: " + copyText.value);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.add-member-box {
  height: 500px;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  background: $bg-primary;
  //@media (min-width: 360px) {
  //  width: 325px;
  //}
  //@media (min-width: 1920px) {
  //  width: 411px;
  //}
  //@media (min-width: 576px) {
  //  width: 507px;
  //}
  //@media (min-width: 768px) {
  //  width: 698px;
  //}
  //@media (min-width: 992px) {
  //  width: 444px;
  //}
  //@media (min-width: 1024px) {
  //  width: 460px;
  //}
  //@media (min-width: 1200px) {
  //  width: 258px;
  //}
  //@media (min-width: 1920px) {
  //  width: 414px;
  //}
  .member-box {
    .cross-button-box {
      width: 30px;
      height: 30px;
      float: right;
      border-radius: 50%;
      background: white;
    }
    .d-flex {
      .invite-txt {
        margin-top: 2.5rem;
      }
    }
    .suggestion-box, .details-suggestion-card {
      overflow-y: auto;
      padding-bottom: 80px;
      .user {
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .d-flex {
          .short-info {
            .candidate-type {
              margin-top: -8px;
            }
          }
          .btn-success {
            border-radius: 20px;
            right: 0;
          }
        }
      }
    }
    .link-box {
      bottom: -22px;
      background: #3A3092;
      border-radius: 14px;
      .w-full {
        .invite-link {
          background: #3A3092;
          padding-right: 60px;
          border-radius: 4px;
        }
        .copy-button {
          top: 14px;
          right: 22px;
          height: 30px;
          border-radius: 4px;
          background: $bg-white;
        }
      }
    }
  }
}
.from-data-card {
  width: 93%;
  top: 32px;
  left: -1px;
  height: 500px;
  border-radius: 10px;
  margin-left: 16px;
  background: $bg-primary;
}
.details-suggestion-card {
  height: 350px;
}
.suggestion-box {
  height: 338px;
}
</style>
