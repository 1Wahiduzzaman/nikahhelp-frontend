<template>
    <div class="notification-list">
        <div class="d-flex align-items-center">
            <div class="avatar-area">
                <img class="avatar" width="45" height="45" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
                <span class="online-icon-avatar"></span>
            </div>
            <div class="content">
                <span class="label">{{ item.label }}</span>
                <h4 class="mt-1">{{ item.name }}</h4>
                <p class="mb-0">{{ item.message ? item.message.body : '' }}</p>
                <p class="color-primary mb-0">Team listed by - Pervez alam</p>
            </div>
             <span class="online-icon"></span>
        </div>
        <div class="date">05 min ago</div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .notification-list {
        max-width: 300px;
        min-width: 300px;
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
                bottom: 0px;
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

        .date {
            font-size: 12px;
            text-align: right;
            color: #522e8e;
        }
    }
</style>