import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const base = axios.create({
  baseURL: "http://localhost:3001/api/v1", // replace on production env
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.prototype.$http = base;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
