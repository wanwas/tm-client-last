import Vue from "vue";
import Router from "vue-router";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "@/router/";
import store from "@/store/";

Vue.config.productionTip = false;
Vue.use(Router);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

if (localStorage.getItem("user")) {
  store.commit("auth/userUpdated", JSON.parse(localStorage.getItem("user")));
}
