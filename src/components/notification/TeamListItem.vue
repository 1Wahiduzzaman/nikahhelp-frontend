<template>
  <div class="notification-list pr-2">
    <div class="flex">
      <h4 class="active-team-text" v-if="index == 0">Active Team</h4>
      <h4 class="active-team-text" v-if="index == 1">Other Teams</h4>
      <span class="active-icon ml-2" v-if="index == 0"></span>
    </div>
    <div class="d-flex">
      <img class="avatar" width="45" height="45" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
      <div class="content">
        <h4 class="mt-1">{{ item.name }}</h4>
        <p class="mb-0">{{ item.description }}</p>
      </div>
      <div class="quick-switch-box">
        <a-tooltip
            placement="top"
            title="Click here to activate or deactive the team"
        >
          <a-switch default-checked class="quick-switch" v-model="turnOn">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-tooltip>
      </div>
<!--      <a-switch type="success" size="medium" />-->

    </div>
    <div class="date">{{ formateDate(item.created_at) }}</div>
  </div>
</template>

<script>
import {format} from "timeago.js";
import JwtService from "../../services/jwt.service";
export default {
    name: 'TeamListItem',
    props: {
        item: {
            type: Object,
        },
        index: {
          type: Number
        }
    },
    created() {
      let _team_id = JwtService.getTeamIDAppWide();
      if(_team_id && _team_id == this.item.id) {
        this.turnOn = true;
      }
    },
  data() {
        return {
          turnOn: false,
        }
    },
    methods: {
      createdAt(time) {
        if (time) {
          return format(time);
        }
        return '';
      },
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

        return [year, month, day].join("-");
      },
  },
}
</script>

<style lang="scss" scoped>
    .notification-list {
        max-width: 300px;
        min-width: 300px;
        .avatar {
            border-radius: 50%;
            display: block;
            border: 2px solid #ddd
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
        }

        .date {
            font-size: 12px;
            text-align: right;
            color: #522e8e;
        }
    }
    .active-team-text {
      color: #bfbcbc;
      font-size: 14px;
    }
    .active-icon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #39b54a;
      margin-top: 4px;
    }
</style>