import ApiService from "../../../services/api.service";

export default {

  async getPendingUsers() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/pending-user`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getVerifiedUsers() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/verified-user-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getRejectedUsers() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/rejected-user-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getTeamList() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/team-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async getDeletedTeamList() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/deleetd-team-list`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async updateUserVerifyOrReject(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(`v1/admin/user-verify-reject`, payload)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },


};
