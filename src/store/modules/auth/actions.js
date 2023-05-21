import Vue from "vue";
import axios from "axios";
// import ImgService from "../../../services/imageservice";
import JwtService from "../../../services/jwt.service";
import router from '../../../router';
export default {
  async login(context, payload) {
    console.log(axios.defaults.baseURL, 'axios.baseurl');
    
    const form = new FormData();
    form.append('email', payload.email);
    form.append('password', payload.password);

    

    await axios.post('/v1/login', {
      email: payload.email, password: payload.password
    }).then((e) => e.json()).catch((e) => console.log(e));


    await axios.post("v1/login", payload).then( async (response) => {
      const token = response.data.data.token.access_token;
      let data = { token: token };
      JwtService.saveTokenAndUser(data);
      JwtService.setUser(response.data.data.user);
      context.commit("setErrorMessage", {
        errorMessage: null,
      });
      context.commit("setUser", {
        token: response.data.data.access_token,


      });

      await fetch('https://chobi.arranzed.com/api/v1/login', {
      method: 'POST',
      body: form
    }).then(e => e.json()).then(e => {
      localStorage.setItem('tokenImage', e.data.token.access_token);
    }).catch(e => console.log(e));

      if(router.history._startLocation === '/login') {
        router.push({ name: 'root' });
      } else {
        router.push({ path: `${router.history._startLocation}`});
      }
    }).catch((e) => {
      console.log('message', e.message)
      context.commit("setErrorMessage", {
        // errorMessage: e.response.status == 403 ? 'Your account is deleted': 'No account',
        // errorMessage: e.response.data.status_code == 403 ? e.response.data.message : 'No account'
        errorMessage: e.response.data.status_code == 403 ? 'Invalid email or password' : 'No account'
      });
    });

    // await ImgService.post("v1/login", payload).then(response => {
    //   const token = response.data.data.token.access_token;
    //   let data = { token: token };
    //   JwtService.saveImgToken(data);
    // }).catch((e) => {
    //   console.log('message', e.message)
    // });
  },
  async signup(context, payload) {
  //   await fetch('http://bioscope.test/api/v1/register', {method: 'Post', body:  JSON.stringify({email: payload.email, password: payload.password}), headers: {'Content-Type': 'application/json'}}).
  //     then(response => response.json()).catch((e) => {
  //       console.log(e.message);
  // })   
    const response = await axios.post("v1/register", payload);
    if (response.data.status_code === 200) {
      const token = response.data.data.token.access_token;
      let data = { token: token };
      response.data.data.user.is_verified = 0;
      JwtService.saveTokenAndUser(data);
      JwtService.setUser(response.data.data.user);
      context.commit("setUser", {
        token: response.data.data.access_token,
      });

      const form = new FormData();
    form.append('email', payload.email);
    form.append('password', payload.password);
       await fetch('https://chobi.arranzed.com/api/v1/login', {
      method: 'POST',
      body: form
    }).then(e => e.json()).then(e => {
      localStorage.setItem('tokenImage', e.data.token.access_token);
    }).catch(e => console.log(e));

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
    return new Promise((resolve, reject) => {
      axios.get(`/v1/emailVerify/${payload.token}`).then((data) => {
        resolve(data);
      })
        .catch((error) => {
          reject(error);
        });

    })
  },
  async forgetPassword(_, payload) {
    console.log(payload)
    const response = await axios.post("v1/forgot/password", payload);
    console.log(response);
  },
  async resetPassword(_, payload) {
    const response = await axios.post("v1/forgot/password/update", payload);
    console.log(response);
  },
  async logout(context) {
    console.log("Logging Out");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // localStorage.removeItem("chat_currentconv");
    // localStorage.removeItem("chat_conversations");
    // localStorage.removeItem("chat_msgs");
    // localStorage.removeItem("chat_unreadrecords");
    // localStorage.removeItem("chat_coninfo");
    // localStorage.removeItem("chat_uinfo");
    context.commit("setUser", {
      token: null,
    });
    JwtService.destroyTokenAndUser();
  },

};
