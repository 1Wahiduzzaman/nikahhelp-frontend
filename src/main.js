import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-select/src/scss/vue-select.scss";
import Layout from '@/views/design/Layout'

import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// import axios from "axios";
// * This is the vue-web-storage package
import Storage from "vue-web-storage";
// * ApiService for the application
import ApiService from "./services/api.service";


Vue.use(Storage, {
  prefix: "",
  drivers: ["local"],
});
ApiService.init();

Vue.use(VueCompositionAPI);
Vue.use(Antd);
Vue.use(require('vue-moment'));

Vue.component('Layout', Layout);

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('https://chat.arranzed.com');

Vue.use(new VueSocketIO({
    debug: true,
    connection:socketConnection 
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
