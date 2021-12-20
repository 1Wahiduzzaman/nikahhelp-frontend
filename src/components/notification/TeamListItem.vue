<template>
    <div class="notification-list">
        <div class="d-flex align-items-center">
            <img class="avatar" width="45" height="45" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
            <div class="content">
                <h4 class="mt-1">{{ item.name }}</h4>
                <p class="mb-0">{{ item.description }}</p>
                <p class="color-primary mb-0">Team listed by - {{ item.created_by && item.created_by.full_name ? item.created_by.full_name : 'Not found' }}</p>
            </div>
            <!-- <a-switch default-checked size="small">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
            </a-switch> -->
            <a-switch type="primary" v-model="turnOn" @click="onChangeActivateTeam" />

        </div>
        <div class="date">{{ item.created_at ? createdAt(item.created_at) : '' }}</div>
    </div>
</template>

<script>
import {format} from "timeago.js";
import JwtService from "../../services/jwt.service";
export default {
    props: {
        item: {
            type: Object
        }
    },
    data() {
        return {
          turnOn: false
        }
    },
    computed: {
      is_subscribed() {
        if (this.item.subscription_expire_at == null) {
          return false;
        }

        //check expiry returns false if sub is expired
        // if (!this.checkExpiry(this.item.subscription_expire_at)) {
        //   return false;
        // } else {
        //   return true;
        // }
      },
    },
    methods: {
      createdAt(time) {
        if (time) {
          return format(time);
        }
        return '';
      },
      async onChangeActivateTeam(checked) {
        if (checked) {
          let returnedResult = await this.turnOnTeam();
          this.$store.commit("setTeamInfo", this.item);
          if (returnedResult) {
            this.turnOn = true;
          } else {
            this.turnOn = false;
          }
        } else {
          this.$store.commit("setTeamInfo", null);
          JwtService.destroyTeamIDAppWide();
        }
      },
      turnOnTeam() {

      }
  }
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
</style>