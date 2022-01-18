<template>
  <div class="mt-4 box">
    <div class="px-4">
      <h4 class="fs-14">Team ID: #{{ team.team_id }}</h4>
      <div class="d-flex align-items-center">
        <h4 class="fs-16">To activate team add a member</h4>
        <a-icon type="info-circle" class="ml-2 fs-12" />
      </div>
    </div>

<!--    <div class="dropdowns d-flex mt-4 justify-content-center">-->
<!--      <a-tooltip-->
<!--          placement="top"-->
<!--          title="Member role will"-->
<!--      >-->
<!--        <a-select-->
<!--            placeholder="Role"-->
<!--            class="fs-10 w-20 brleft-20"-->
<!--            v-model="invitationObject.role"-->
<!--            :disabled="invitationObject.invitation_link"-->
<!--        >-->
<!--          &lt;!&ndash;         <a-select-option value="Owner+Admin"> Owner Admin </a-select-option>&ndash;&gt;-->
<!--          <a-select-option value="Admin"> Admin </a-select-option>-->
<!--          <a-select-option value="Member"> Member </a-select-option>-->
<!--        </a-select>-->
<!--      </a-tooltip>-->

<!--      <a-tooltip-->
<!--          placement="top"-->
<!--          title="Member role will"-->
<!--      >-->
<!--        <a-select-->
<!--            placeholder="Add as a"-->
<!--            class="ml-1 fs-10 w-20 none-radius"-->
<!--            v-model="invitationObject.add_as_a"-->
<!--            :disabled="invitationObject.invitation_link"-->
<!--        >-->
<!--          <a-select-option value="Candidate" v-if="team.add_as_a != 'Candidate'"> Candidate </a-select-option>-->
<!--          <a-select-option value="Representative" v-if="team.add_as_a != 'Representative'"> Representative </a-select-option>-->
<!--          &lt;!&ndash;        <a-select-option value="Match Maker"> Match Maker </a-select-option>&ndash;&gt;-->
<!--        </a-select>-->
<!--      </a-tooltip>-->

<!--      <a-tooltip-->
<!--          placement="top"-->
<!--          title="Member role will"-->
<!--      >-->
<!--        <a-select-->
<!--            placeholder="Relationship"-->
<!--            class="ml-1 fs-10 w-20 none-radius"-->
<!--            v-model="invitationObject.relationship"-->
<!--            :disabled="invitationObject.invitation_link"-->
<!--        >-->
<!--          <a-select-option v-for="(relation, index) in relationships" :key="index" :value="relation"> {{ relation }} </a-select-option>-->
<!--        </a-select>-->
<!--      </a-tooltip>-->

<!--      <a-button v-if="!clickedInviteNow"-->
<!--                class="ml-1 confirm-button fs-10 br-20 bright-20"-->
<!--                @click="goNextStep()"-->
<!--                :disabled="!invitationObject.role || !invitationObject.add_as_a || !invitationObject.relationship">Invite now</a-button>-->

<!--      <a-dropdown class="confirm-button right-br-20 w-20 fs-10 dropdown-button" v-if="clickedInviteNow">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="toggleMemberbox()">Invite Now </a-menu-item>-->
<!--          <a-menu-item key="2" @click="deleteInvitation()">Remove </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button class="ml-1 fs-10"> Invite Now</a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->

    <div class="mt-4 px-4">
      <h6 class="text-header-black">Now you can add member to your team</h6>
      <button class="btn add-member" @click="toggleAddMemberbox()" :disabled="isSuccess">
        Add member
      </button>
    </div>

    <div class="position">
      <div class="position-absolute footer-cancel-btn">
        <a-button class="cancel-button float-left" v-on:click="$emit('cancel_button')">Back</a-button>
      </div>
      <div class="position-absolute footer-conf-btn">
        <a-button class="confirm-button float-right" @click="saveAndContinue()" :loading="loading">Save & Continue</a-button>
      </div>
    </div>
    <InviteMember :team="team"
                  :invitationObject="invitationObject"
                  v-if="showMemberBox"
                  @toggleMemberbox="toggleMemberbox"
                  @addMemberInfo="addMemberInfo" />
  </div>
</template>

<script>
import ApiService from '@/services/api.service';
import InviteMember from "./InviteMember";
export default {
  name: "CreateAddMember",
  components: {InviteMember},
  props: ['team', 'file'],
  data() {
    return {
      showMemberBox: false,
      relationships: ['Father', 'Mother', 'Brother', 'Sister', 'Grand Father', 'Grand Mother', 'Brother-in-law', 'Sister-in-paw'],
      invitationObject: {
        role: "Admin",
        add_as_a: this.team.add_as_a != "Candidate" ? "Candidate" : "Representative",
        relationship: "Father",
        invitation_link: null,
      },
      invitedUsers: [],
      invitedObj: null,
      clickedInviteNow: false,
      memberInfo: null,
      loading: false,
      isSuccess: false
    }
  },
  methods: {
    goNextStep() {
      // this.$emit("goNext", 4);
      this.createInvitaionLink();
    },
    toggleMemberbox(success = false) {
      this.showMemberBox = !this.showMemberBox;
      this.isSuccess = success;
    },
    addMemberInfo(user) {
      this.memberInfo = user;
    },
    async saveAndContinue() {
      if(this.invitedObj && this.invitedObj.invitation_id && this.memberInfo && this.memberInfo.email && this.memberInfo.id) {
        this.loading = true;
        let payload = {
          invitation_id: this.invitedObj.invitation_id,
          email: this.memberInfo.email
        };

        await ApiService.post('/v1/invite-team-member-update', payload).then(res => {
          this.loading = false;
          if(res && res.data) {
            let socketData = {
              receivers: [this.memberInfo.id],
              // team_id: this.team.id,
              title: `invited you to join ${this.team.name} team as ${this.invitationObject.role}`,
              team_temp_name: this.team.name
            };
            this.$emit("socketNotification", socketData);
            this.$emit("goNext", 3);
            // this.$emit("loadTeams");
          }
        });
      } else {
        this.$emit("goNext", 3);
        // this.$emit("loadTeams");
      }
    },
    async deleteInvitation() {
      let self = this;
      this.modal = this.$confirm({
        title: "Delete Confirmation",
        content: `Are you sure you want to remove this invitation from ${self.team.name} team?`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        confirmLoading: true,
        async onOk() {
          await ApiService.delete(`/v1/member-invitation-delete?id=${self.invitedObj.invitation_id}`)
              .then((data) => {
                console.log(data);
                if (data.data.status != "FAIL") {
                  self.$message.success("Invitation removed from " + self.team.name);
                  self.invitedMembers = [];
                  self.invitationObject.invitation_link = null;
                  self.invitedObj = {};
                  self.clickedInviteNow = false;
                } else {
                  self.$message.error("Something went wrong");
                  self.$emit("teamListUpdated");
                }
              })
              .catch((error) => {
                console.log(error);
                self.$message.error("Something went wrong");
              });
        },
      });
    },
    toggleAddMemberbox() {
      this.showMemberBox = !this.showMemberBox;
    },
    createInvitaionLink() {
      // amaizingly, for some reason i need to refer this to
      // a other variable so my iffe function can access this
      var self = this;
      (function createShotLink() {
        // this is the method i am using to create a short link
        function makeid(length) {
          var result = [];
          var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result.push(
                characters.charAt(Math.floor(Math.random() * charactersLength))
            );
          }
          return result.join("");
        }
        self.invitationObject.invitation_link = makeid(10);
        self.invitationObject.visible_invitation_link = window.location.host + '/manageteam?invitation=' + self.invitationObject.invitation_link;

        let data = {
          role: self.invitationObject.role,
          add_as_a: self.invitationObject.add_as_a,
          relationship: self.invitationObject.relationship,
          invitation_link: self.invitationObject.invitation_link,
          email: null
        };
        self.invitedUsers.push(data);

        let payload = {
          team_id: self.team.team_id,
          members: self.invitedUsers
        };
        ApiService.post('/v1/invite-team-members', payload).then(res => {
          self.clickedInviteNow = true;
          self.showMemberBox = !self.showMemberBox;
          self.invitedObj = res.data.data[0];
        });
      })();
    },
  },
}
</script>
<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.ant-input-suffix {
  right: 6px !important;
}
.br-20 {
  border-radius: 20px;
}
.w-20 {
  width: 20%;
}
.right-br-20 {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.dropdown-button {
  padding: 0 4px !important;
}
.w-25 {
  width: 25%;
}
.team-invite-link {
  height: 30px;
  width: 60px;
  border-radius: 16px;
}
.forward-link {
  height: 16px;
  right: 3px;
  top: 7px;
}
.box {
  min-height: 420px;
  .px-4 {
    .fs-14 {
      color: #aaaaaa;
    }
    .d-flex {
      .fs-16 {
        color: #aaaaaa;
      }
      .fs-12 {
        margin-top: -6px;
      }
    }
  }
  .dropdowns {
    .ant-input-box > input{
      height: 20px !important;
    }
  }
  .position {
    bottom: 50px;
    .footer-cancel-btn {
      bottom: 20px;
      left: 32px;
      .button {
        border-radius: 16px;
        background: $bg-brand;
      }
    }
    .footer-conf-btn {
      bottom: 20px;
      right: 32px;
      .button {
        border-radius: 16px;
      }
    }
  }
}
.bright-20 {
  border-radius: 0 20px 20px 0;
}
.w-23 {
  width: 23%;
}
.add-member {
  display: flex;
  justify-content: center;
  width: 100%;
  background: #522e8e;
  color: #FFFFFF;
  border-radius: 30px;
  border: 1px solid #FFFFFF;
  &:hover {
    background: #FFFFFF;
    color: #522e8e;
    border: 1px solid #522e8e;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  img {
    width: 20px;
    margin-right: 10px;
  }
}
</style>
