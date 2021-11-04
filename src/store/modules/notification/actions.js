import ApiService from "../../../services/api.service";
export default {
  async loadNotifications(context, _) {
    return new Promise((resolve, reject) => {
      ApiService.get("v1/notifications?page=1&parpage=100")
        .then((data) => {
          console.log(data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
