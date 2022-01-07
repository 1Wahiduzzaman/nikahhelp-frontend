// import axios from "axios";
//import JwtService from "../../../services/jwt.service";
import ApiService from "../../../services/api.service";
export default {
  async searchUser(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.get(payload.url)
        .then((res) => {
          context.commit('setLoading', false)
          console.log(res.data.status,"then")
          if(res.data) {
            if(res.data.status == 'SUCCESS') {
              if(payload.removePrevious) context.commit('clearProfiles');
              console.log(res.data.data.pagination,'res.data.data.pagination')
              context.commit('setProfiles', res.data.data.data);
              context.commit('setPaginationData', res.data.data.pagination);
            }

            if(res.data.status == 'FAIL') {
              context.commit('clearProfiles');
              context.commit('setPaginationData', {});
            }
          }
          resolve(res.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
  async shortListCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService[payload.actionType](payload.url, payload.payload)
      .then((data) => {
        context.commit('setLoading', false)
        resolve(data.data);
        context.commit('updateCandidateAfterShortlisted',{userId: payload.user_id, value: payload.value})
      })
      .catch((err) => {
        context.commit('setLoading', false)
        reject(err);
      });
    });
  },
  async blockCandidate(context, payload) {
    // context.commit('updateCandidateAfterBlock',{userId: payload.payload.user_id, value: true})
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.post(payload.url, payload.payload)
        .then((data) => {
          context.commit('setLoading', false)
          resolve(data.data);
        })
        .catch((err) => {
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
  async connectCandidate(context, data) {
    return new Promise((resolve, reject) => {
      context.commit('setLoading', true)
      ApiService.post(data.url, data.payload)
        .then((data) => {
          context.commit('setLoading', false)
          resolve(data.data.data);
        })
        .catch((err) => {
          console.log(err)
          context.commit('setLoading', false)
          reject(err);
        });
    });
  },
};
