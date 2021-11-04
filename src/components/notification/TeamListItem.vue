<template>
    <div class="notification-list">
        <div class="d-flex align-items-center">
            <img class="avatar" width="45" height="45" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
            <div class="content">
                <h4 class="mt-1">Justen Web</h4>
                <p class="mb-0">Lorem ipsum dolor sit amet</p>
                <p class="color-primary mb-0">Team listed by - Pervez alam</p>
            </div>
            <!-- <a-switch default-checked size="small">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
            </a-switch> -->
            <a-switch size="small" />

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