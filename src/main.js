import 'vuetify/dist/vuetify.min.css';
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-select/src/scss/vue-select.scss";
import Layout from '@/views/design/Layout'
import AdminLayout from "@/components/admin/layout/AdminLayout.vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// import axios from "axios";
// * This is the vue-web-storage package
import Storage from "vue-web-storage";
// * ApiService for the application
import ApiService from "./services/api.service";
import Vuetify from 'vuetify';
Vue.use(Vuetify, 
  {
  iconfont: 'fa',
  theme: {
    primary: '#828282',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },

}

);
Vue.use(Storage, {
  prefix: "",
  drivers: ["local"],
});
ApiService.init();

Vue.use(VueCompositionAPI);
Vue.use(Antd);
Vue.component('Layout', Layout);
Vue.component('AdminLayout', AdminLayout);
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
const socketConnection = SocketIO('https://biya.arranzed.com:4009');

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection
})
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
