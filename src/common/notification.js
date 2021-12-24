// import ApiService from "@/services/api.service";
export default {
    storeNotification: function (payload) {
        // let loggedUser = JSON.parse(localStorage.getItem('user'));
        // let payload = {
        //   sender: loggedUser.id,
        //   receiver: 80,
        //   receivers: ['80'],
        //   team_id: 2,
        //   seen: 0,
        //   title: 'Team notification',
        //   created_at: new Date(),
        // }
        // this.$socket.emit('notification', payload);
        // payload.receivers.forEach(receiver => {
        //     payload.receiver = receiver;
        //     ApiService.post("v1/send-notification", payload)
        //         .then((data) => {
        //             console.log(data.data);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // });
        return payload;
    },
}