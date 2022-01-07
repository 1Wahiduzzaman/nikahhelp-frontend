// import axios from "axios";
//import JwtService from "../../../services/jwt.service";
import ApiService from "../../../services/api.service";
export default {
  async searchUser(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.get(payload)
        .then((data) => {
          console.log(data.data.data);
          resolve(data.data.data);
        })
        .catch((err) => {
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
          context.commit('setLoading', true)
          console.log(data.data, '<<<<<<<then');
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
