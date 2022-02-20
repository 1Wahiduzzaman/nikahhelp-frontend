import 'vuetify/dist/vuetify.min.css';
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-select/src/scss/vue-select.scss";
import Layout from '@/views/design/Layout';
import Loader from "@/plugins/loader/loader";
import AdminLayout from "@/components/admin/layout/AdminLayout.vue";
import MainHeader from "@/views/design/Header.vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import moment from 'moment'
import HighchartsVue from 'highcharts-vue';
// import axios from "axios";
// * This is the vue-web-storage package
import Storage from "vue-web-storage";
import TextareaAutosize from 'vue-textarea-autosize';
// * ApiService for the application
import ApiService from "./services/api.service";
import Vuetify from 'vuetify';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

Vue.use(VueTelInput); // Define default global options here (optional)
Vue.use(VueViewer);
Vue.use(Vuetify);
Vue.use(HighchartsVue);
Vue.use(Storage, {
  prefix: "",
  drivers: ["local"],
});
ApiService.init();


Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});

Vue.use(VueCompositionAPI);
Vue.use(Antd);
Vue.component('MainHeader', MainHeader);
Vue.component('Layout', Layout);
Vue.component('Loader', Loader);
Vue.component('AdminLayout', AdminLayout);
Vue.use(TextareaAutosize)
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
const socketConnection = SocketIO('https://biya.arranzed.com:4009');
// const socketConnection = SocketIO('http://localhost:4009');

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection
})
);

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'md',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
    theme: {
      dark: false,
    },
    themes: {
      light: {
        primary: "#4682b4",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  }),
  render: (h) => h(App),
}).$mount("#app");
