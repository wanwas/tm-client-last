import Vue from "vue";
import Router from "vue-router";

import Vuelidate from "vuelidate";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "@/router/";
import store from "@/store/";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "@/firebase.config";

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(Vuelidate);

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
