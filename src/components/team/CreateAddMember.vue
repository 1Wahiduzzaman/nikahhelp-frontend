<template>
  <div class="mt-4 box position-relative">
    <div class="px-4">
      <h4 class="fs-14">Team ID: #{{ team.team_id }}</h4>
      <div class="d-flex align-items-center">
        <h4 class="fs-16">To activate team add a member</h4>
        <a-icon type="info-circle" class="ml-2 fs-12" />
      </div>
    </div>
    <div class="dropdowns d-flex mt-4">
      <a-select
          placeholder="Role"
          class="fs-10 w-25"
          v-model="invitationObject.role"
      >
         <a-select-option value="Owner+Admin"> Owner Admin </a-select-option>
        <a-select-option value="Admin"> Admin </a-select-option>
        <a-select-option value="Member"> Member </a-select-option>
      </a-select>

      <a-select
          placeholder="Add as a"
          class="ml-2 fs-10 w-25"
          v-model="invitationObject.add_as_a"
      >
        <a-select-option value="Candidate"> Candidate </a-select-option>
        <a-select-option value="Representative"> Representative </a-select-option>
        <a-select-option value="Match Maker"> Match Maker </a-select-option>
      </a-select>

      <a-select
          placeholder="Relationship"
          class="ml-2 fs-10 w-25"
          v-model="invitationObject.relationship"
      >
        <a-select-option v-for="(relation, index) in relationships" :key="index" :value="relation"> {{ relation }} </a-select-option>
      </a-select>

<!--      <a-button v-if="invitedUsers.length <= 0"-->
<!--                type="primary"-->
<!--                class="ml-2 fs-10 br-20"-->
<!--                @click="goNextStep()"-->
<!--                :disabled="!invitationObject.role || !invitationObject.add_as_a || !invitationObject.relationship">Invite now</a-button>-->
      <a-dropdown class="right-br-20 bg-primary text-white w-25 fs-10 dropdown-button">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="goNextStep()">Invitation </a-menu-item>
          <a-menu-item key="2" @click="removeInvite()">Remove </a-menu-item>
        </a-menu>
        <a-button class="ml-1 fs-10"> Invite Now <a-icon type="down" /> </a-button>
      </a-dropdown>
    </div>
    <div class="position">
      <div class="position-absolute footer-cancel-btn">
        <a-button class="back-button button float-left text-white" v-on:click="$emit('cancel_button')">Back</a-button>
      </div>
      <div class="position-absolute footer-conf-btn">
        <a-button class="confirm-button button float-right bg-primary text-white" @click="addMember()">Save & Continue</a-button>
      </div>
    </div>
    <InviteMember :team="team"
                  :invitationObject="invitationObject"
                  v-if="showMemberBox"
                  @toggleMemberbox="toggleMemberbox"
                  @addMember="addInvitedMember" />
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
        role: "Owner+Admin",
        add_as_a: "Candidate",
        relationship: "Father",
        invitation_link: "",
      },
      invitedUsers: []
    }
  },
  methods: {
    goNextStep() {
      // this.$emit("goNext", 4);
      this.showMemberBox = !this.showMemberBox;
    },
    toggleMemberbox() {
      this.showMemberBox = !this.showMemberBox;
    },
    async addMember() {
      let payload = {
        team_id: this.team.team_id,
        members: this.invitedUsers
      };

      await ApiService.post('/v1/invite-team-members', payload).then(res => {
        if(res && res.data) {
          this.$emit("goNext", 3);
          this.$emit("loadTeams");
        }
      });
    },
    addInvitedMember(id) {
      let data = {
        role: this.invitationObject.role,
        add_as_a: this.invitationObject.add_as_a,
        relationship: this.invitationObject.relationship,
        invitation_link: this.invitationObject.invitation_link,
        email: id
      };
      if(this.invitedUsers.length > 0) {
        this.invitedUsers[0] = data;
      } else {
        this.invitedUsers.push(data);
      }
    },
    removeInvite() {
      this.invitedUsers = [];
    }
  },
  mounted() {
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
    })();
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
.right-br-20 {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.dropdown-button {
  padding: 0 8px !important;
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
</style>
