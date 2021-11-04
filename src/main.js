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

// // * importing vue material uniqimport VueMaterial from 'vue-material'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
// // * attaching to vue instance
// Vue.use(VueMaterial)

// ! before doing anything else we are telling vue to
// ! use this storage package
// ! https://www.npmjs.com/package/vue-web-storage

Vue.use(Storage, {
  prefix: "",
  drivers: ["local"],
});
ApiService.init();

Vue.use(VueCompositionAPI);
Vue.use(Antd);
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/";
Vue.component('Layout', Layout);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
