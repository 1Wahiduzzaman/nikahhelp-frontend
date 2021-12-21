<template>
  <div class="notification-list">
    <div class="d-flex align-items-center">
      <span class="online-icon"></span>
      <img class="avatar" width="45" height="45" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">

      <div class="content">
        <h4>Just</h4>
        <p class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eligendi minima incidunt quia </p>
      </div>
    </div>
    <div class="date">23 Nov 2021 at 12:44 pm</div>
  </div>
</template>

<script>
import {format} from "timeago.js";
export default {
    name: 'TeamListNotification',
    props: {
        item: {
            type: Object,
        }
    },
    data() {
        return {

        }
    },
    methods: {
      createdAt(time) {
        if (time) {
          return format(time);
        }
        return '';
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
</style>