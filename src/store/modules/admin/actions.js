

import ApiService from "../../../services/api.service";
import axios from "axios";
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
  async getPendingUsersByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/pending-user?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
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
  async getVerifiedUsersByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/verified-user-list?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
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
  async getRejectedUsersByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/rejected-user-list?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
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
  async getDocumentInfo(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/user-info/${payload}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getSearchLocation(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/v1/search/location`,payload)
        .then((data) => {
          console.log('dd',data.data)
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getUserReports() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/users-report`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  



  async getUserReportsByPage(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/users-report?page=${payload.page}&account_type=${payload.account_type}&keyword=${payload.keyword}`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  async getCountCanOrRep() {
    return new Promise((resolve, reject) => {
      ApiService.get(`v1/admin/count-can-rep`)
        .then((data) => {
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },



};
