<template>
    <div class="notification-list">
        <div class="d-flex align-items-center">
            <span class="online-icon"></span>
            <img class="avatar" width="45" height="45" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">

            <div class="content">
                <h4>Justen Web</h4>
                <p class="mb-0">Lorem ipsum dolor sit amet</p>
                <p class="color-primary">Team listed by - Pervez alam</p>
            </div>
        </div>
        <div class="date">23 Nov 2021 at 12:44 pm</div>
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

        .avatar {
            border-radius: 50%;
            border: 2px solid #e9e9e9
        }

        .content {
            margin-left: 12px;
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