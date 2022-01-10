<template>
  <div class="position-absolute add-member-box" :class="{'from-data-card': from === 'details-card'}">
    <div class="member-box position-relative">
      <div class="cross-button-box mr-2 mt-2 d-flex justify-content-center align-items-center cursor-pointer" @click="$emit('toggleMemberbox')">&#10006;</div>

      <div class="d-flex px-4">
        <h4 class="fs-14 text-white invite-txt">Send team invitation</h4>
      </div>
      <div class="px-4 mt-2 position-relative">
        <div class="position-relative d-none flex-column">
          <a-tooltip
              placement="top"
              title="Member role will"
          >
            <a-select
                placeholder="Role"
                class="fs-14"
                v-model="invitationObject.role"
            >
<!--              <a-select-option value="Owner+Admin"> Owner Admin </a-select-option>-->
              <a-select-option value="Admin"> Admin </a-select-option>
              <a-select-option value="Member"> Member </a-select-option>
            </a-select>
          </a-tooltip>

          <a-tooltip
              placement="top"
              title="Add as a"
          >
            <a-select
                placeholder="Add as a"
                class="fs-14 mt-2"
                v-model="invitationObject.add_as_a"
            >
              <a-select-option value="Candidate" :disabled="ifHasCandidate()"> Candidate </a-select-option>
              <a-select-option value="Representative"> Representative </a-select-option>
            </a-select>
          </a-tooltip>

          <a-tooltip
              placement="top"
              title="Relationship with candidate is"
          >
            <a-select
                placeholder="Relationship"
                class="mt-2 fs-14"
                v-model="invitationObject.relationship"
                :disabled="invitationObject.add_as_a == 'Candidate'"
            >
              <a-select-option value="Candidate" v-if="invitationObject.add_as_a == 'Candidate'"> Candidate </a-select-option>
              <a-select-option v-for="(relation, index) in relationships" v-else :key="index" :value="relation"> {{ relation }} </a-select-option>
            </a-select>
          </a-tooltip>

          <div class="flex justify-content-between mt-2">
            <button class="btn invitation-link-btn py-2">Generate Invitation Link</button>
            <button class="btn invitation-link-btn py-2 ml-1" @click="showUserBox = true">Attach a user</button>
          </div>
        </div>

        <div class="mt-4">
<!--          <h6 class="text-white fs-14">Attach a user to this invitation</h6>-->
          <a-input ref="userNameInput" class="mt-1" placeholder="Search email or user ID" v-model="user_email" @keyup="searchMember()">
            <a-icon slot="suffix" type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-input>
        </div>
<!--        <span class="text-white fs-12 fw-500 ml-2">Invited/Suggested/Searched user</span>-->
      </div>
      <div class="suggestion-box mt-4 mx-4 px-2" :class="{'details-suggestion-card': from === 'details-card'}">
        <div class="user d-flex position-relative" v-if="userObj && userObj.user">
          <img src="https://picsum.photos/200" alt="avatar" class="user-avatar">
          <div class="d-flex justify-content-between ml-2">
            <div class="short-info">
              <h4 class="fs-14 text-white fw-700">{{ userObj.user && userObj.user.full_name ? userObj.user.full_name : 'N/A' }}</h4>
              <h4 class="fs-12 text-white fw-500 candidate-type">Profile type: {{ userObj.user ? profileType[userObj.user.account_type] : 'N/A' }}</h4>
            </div>
            <button class="btn btn-sent position-absolute text-white cursor-default" v-if="userObj.invitation_status == 2">Joined</button>
            <button class="btn btn-sent btn-outline-secondary position-absolute text-white cursor-default" v-if="userObj.invitation_status == 1">Sent</button>
            <button class="btn btn-success position-absolute" v-if="userObj.invitation_status == 0" @click="inviteMember()">Invite</button>
          </div>
        </div>
      </div>
      <div class="link-box px-4 position-absolute w-full">
        <div class="w-full mt-2">
          <input type="text" class="form-control invite-link text-white fs-12 py-5" id="copyInput" :value="invitationObject.visible_invitation_link" disabled />
          <button class="copy-button position-absolute px-2" @click="copyToken">{{ copyBtnText }}</button>
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
      relationships: ['Father', 'Mother', 'Brother', 'Sister', 'Grand Father', 'Grand Mother', 'Brother-in-law', 'Sister-in-paw'],
      user_email: '',
      profileType: ['N/A', 'Candidate', 'Match Maker', 'Admin'],
      userObj: {},
      copyBtnText: 'Copy',
      showUserBox: false,
      // invitationObject: {
      //   role: "Admin",
      //   add_as_a: "Representative",
      //   relationship: "Father",
      //   invitation_link: "",
      //   visible: false,
      //   memberBox: false
      // },
    }
  },
  methods: {
    async searchMember() {
      await ApiService.post(`/v1/user-info/`, {
        email: this.user_email,
        team_id: this.team.id
      }).then(response => {
        this.userObj = response.data.data;
      }).catch(e => {
        this.userObj = {};
      });
    },
    inviteMember() {
      if(this.userObj) {
        if(this.from === 'details-card') {
          this.$emit("executeInviteMember", this.userObj.user);
        } else {
          this.$emit('addMemberInfo', this.userObj.user);
          this.$emit('toggleMemberbox');
        }
      }
    },
    copyToken() {
      this.copyBtnText = 'Copied';
      let copyText = document.getElementById("copyInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);

      navigator.clipboard.writeText(copyText.value);

      const self = this;
      setTimeout(() => {
        self.copyBtnText = 'Copy'
      }, 2000);
    },
    ifHasCandidate() {
      let hasCandidate = this.team.team_members.find(item => item.user_type.toString() == 'Candidate');
      if(hasCandidate) {
        return true;
      }

      hasCandidate = this.team.team_invited_members.find(item => item.user_type.toString() == 'Candidate');
      if(hasCandidate) {
        return true;
      }
      return false;
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.cursor-default {
  cursor: default !important;
}
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
          .btn-success, .btn-sent {
            border-radius: 20px;
            right: 0;
          }
        }
      }
    }
    .link-box {
      bottom: -44px;
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
  //height: 135px;
}
.invitation-link-btn {
  background: $bg-white;
  color: $color-primary;
  border-radius: 30px;
  font-size: 14px;
  &:hover {
    background: $bg-primary;
    color: #FFFFFF;
    border: 1px solid $border-white;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
</style>
