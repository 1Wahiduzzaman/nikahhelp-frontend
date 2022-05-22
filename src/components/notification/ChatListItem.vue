<template>
  <div class="notification-list">
    <div class="flex position-relative">
      <div class="avatar-area">
        <img class="avatar" width="45" height="45"
             :src="item.logo ? item.logo : getImage()" alt="">
        <span :class="{'online-icon-avatar': ifOnline}"></span>
      </div>
      <div class="content">
        <span class="label">{{ item.label }}</span>
        <h4 class="mt-1 fs-14">{{ item.name }}</h4>
        <p class="mb-0 text-margin">{{ item.message && item.message.body ? messageStr(item.message.body) : '' }}</p>
      </div>
      <span class="online-icon" v-if="item.message && item.message.seen == 1"></span>
      <a-dropdown v-if="status == 'connected'">
        <a class="ant-dropdown-link dropdown-box" @click="e => e.preventDefault()">
          <a-icon type="more" class="fs-28 font-weight-bolder br-50 bg-c9 color-primary icon-30"/>
        </a>
        <a-menu slot="overlay" class="text-center px-2">
          <a-menu-item class="border-bottom">
            <a class="fs-12 color-primary">Accept</a>
          </a-menu-item>
          <a-menu-item class="border-bottom">
            <a class="fs-12 text-danger">Reject</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="flex chat-bottom-place justify-content-between">
      <div class="date">{{ item.typing_text }}</div>
      <div class="date">{{ item.message ? messageCreatedAt(item.message.created_at) : '' }}</div>
    </div>
  </div>
</template>

<script>
import {format} from "timeago.js";

export default {
  name: 'ChatListItem',
  props: {
    item: {
      type: Object
    },
    status: {
      type: String
    },
    online_users: {
      type: Array
    },
    teamMembers: {
      type: Array,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  },
  computed: {
    ifOnline() {
      if(this.item.label === 'Group chat') {
        return this.onlineTeam();
      } else if(this.item.label == 'Team member' || this.item.label == 'Private chat') {
        return this.onlineUser();
      }
      return false;
    },
  },
  watch: {
    item: function(newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  methods: {
    messageCreatedAt(time) {
      if (time) {
        return format(time);
      }
      return '';
    },

    messageStr(body){
      if (body.length>20){
        return body.substr(0,20) + '...'
      }
      return body
    },

    onlineTeam() {
      let team_members = [];
      let loggedUser = JSON.parse(localStorage.getItem('user'));
      if(this.item && this.teamMembers && this.teamMembers.length > 0) {
        team_members = this.teamMembers.map(i => {
          if(loggedUser.id != i) {
            return parseInt(i);
          }
        });
      }
      let online = this.online_users.find(item => team_members.includes(parseInt(item)));
      if(online) {
        return true;
      } else {
        return false;
      }
    },
    onlineUser() {
      if(this.item && this.item.other_mate_id && this.online_users.includes(parseInt(this.item.other_mate_id))) {
        return true;
      } else {
        return false;
      }
    },
    getImage() {
      return require('../../assets/info-img.png');
    }
  }
}
</script>

<style lang="scss" scoped>
.text-margin {
  margin-top: -8px;
}
.icon-30 {
  height: 30px;
  width: 30px;
}
.notification-list {
  //max-width: 300px;
  //min-width: 300px;
  .online-icon {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    display: block;
    background-color: #e42076;
    margin: 10px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px #e775a7;
  }

  .avatar-area {
    position: relative;

    .avatar {
      border-radius: 50%;
      border: 2px solid #4AA02C;
      position: relative;
      display: block;
    }

    .online-icon-avatar {
      position: absolute;
      width: 10px;
      height: 10px;
      top: 32px;
      right: 0;
      background: #4AA02C;
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: content-box;
    }
  }

  .content {
    margin-left: 12px;
    flex: auto;

    h4 {
      font-size: 13px;
    }

    p {
      font-size: 12px;
    }

    .label {
      background-color: #7455a7;
      font-size: 10px;
      padding: 1px 4px;
      border-radius: 2px;
      color: #fff;
    }
  }

  .chat-bottom-place {
    margin-left: 56px;

    .date {
      font-size: 12px;
      text-align: right;
      color: #522e8e;
    }
  }
}
.dropdown-box {
  height: 25px;
}
</style>
