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
  async connectCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.post(payload.url, payload.data)
        .then((data) => {
          console.log(data.data.data);
          resolve(data.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
