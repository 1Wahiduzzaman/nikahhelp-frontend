import Vue from "vue";
import axios from "axios";
import JwtService from "../../../services/jwt.service";
import router from '../../../router';
export default {
  async login(context, payload) {
    const response = await axios.post("v1/login", payload);
    const token = response.data.data.token.access_token;
    let data = { token: token };
    JwtService.saveTokenAndUser(data);
    JwtService.setUser(response.data.data.user);
    context.commit("setUser", {
      token: response.data.data.access_token,
    });

    if (token && response.data.data.user.is_verified > 0) {
      router.push({
        name: "DHome",
      })
    }
    else {
      router.push({
        name: "EmailVerification",
      })
    }



  },
  async signup(context, payload) {
    const response = await axios.post("v1/register", payload);
    if (response.data.status_code === 200) {
      const token = response.data.data.token.access_token;
      let data = { token: token };
      JwtService.saveTokenAndUser(data);
      JwtService.setUser(response.data.data.user);
      context.commit("setUser", {
        token: response.data.data.access_token,
      });
      if (token) {
        router.push({
          name: "EmailVerification",
        })
      }
    }
    else {
      context.commit("setErrorMessage", {
        errorMessage: "The email has already been taken.",
      });
    }


  },
  async verify(_, payload) {
    const response = await axios.get(`/v1/emailVerify/${payload.token}`);
    console.log(response);
  },
  async forgetPassword(_, payload) {
    const response = await axios.post("v1/forgot/password", payload);
    console.log(response);
  },
  async resetPassword(_, payload) {
    const response = await axios.post("v1/forgot/password-update", payload);
    console.log(response);
  },
  async logout(context) {
    console.log("Logging Out");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("chat_currentconv");
    localStorage.removeItem("chat_conversations");
    localStorage.removeItem("chat_msgs");
    localStorage.removeItem("chat_unreadrecords");
    localStorage.removeItem("chat_coninfo");
    localStorage.removeItem("chat_uinfo");
    context.commit("setUser", {
      token: null,
    });
    JwtService.destroyTokenAndUser();
  },

};
