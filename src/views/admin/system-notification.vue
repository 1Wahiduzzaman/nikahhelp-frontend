<template>
    <div class="panel-container">
        <Loader  :isLoading="isLoading" />
        <span class="w-100 text-center">
            System Notification
        </span>

        <form class="mt-5 w-100" action="">
            <div class="container">
                <div class="notification-text">
                    <label for="notification-text">Notification Text:</label> <br>
                    <textarea v-model="notificationText" class="border"  id="notification-text" cols="30" rows="6" maxlength="255"></textarea>
                </div>
                <ButtonComponent
                    class="mt-2"
                    :isSmall="true"
                    title="Send"
                    :responsive="false"
                    @onClickButton="sendNotification"
                    :isBlock="false"
                />
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from "@/services/api.service";
import Notification from "@/common/notification.js";
import ButtonComponent from '../../components/atom/ButtonComponent.vue';

export default {
    name: "SystemNotification",
    components: {
        ButtonComponent
    },
    data() {
        return {
            notificationText: '',
            online_users: [],
            isLoading: false,
        };
    },
    created() {

    },
    mounted() {
        let loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser) {
            this.$socket.emit('ping', {user_id: 0});
            this.sockets.subscribe('ping_success', function (res) {
                if (res && res.online_users) {
                    this.online_users = res.online_users;
                }
                console.log('res', res);
            });
        }
    },
    
    methods: {
        socketNotification(payload) {
            console.log('socketNotification from candidate profile review')
            let loggedUser = JSON.parse(localStorage.getItem('user'));
            payload.sender = loggedUser.id;
            Notification.storeAdminNotification(payload);
            payload.created_at = new Date();
            payload.seen = 0;
            payload.sender = loggedUser;
            if(payload && payload.receivers.length > 0) {
                payload.receivers = payload.receivers.map(item => {
                    return item.toString();
                });
                this.$socket.emit('notification', payload);
            }
        },
        sendNotification() {
            // send notification 
            if(!this.notificationText) {
                Notification.error('Please enter notification text');
                return;
            }
            this.isLoading = true;
            let receivers = this.online_users;
            console.log(receivers, "receivers")
            let payload = {
                receivers: receivers,
                title: `${this.notificationText}`,
            };
            console.log('before sending notification', payload);
            this.socketNotification(payload);
            console.log('after sending notification');

            this.notificationText = '';
            this.isLoading = false;
        }
    },
};
</script>
<style lang="scss" scoped>
    .panel-container {
        height: calc(100vh - 150px);
        overflow: hidden;
        border: 2px solid #ddd;
        border-radius: 15px;
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 10px 30px #fff;
        margin: 20px;
        opacity: 1;
    }
</style>