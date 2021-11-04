import ApiService from "../../../services/api.service";

export default {
  async getUserReport(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(payload)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getPendingUsers(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(payload)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async approveUser(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/user-approved/${payload}`)
        .then((data) => {
          console.log(data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSubscriptionReport(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(payload)
        .then((data) => {
          console.log(data.data.data);
          //context.commit('setUserTeamList', data.data.data);
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
