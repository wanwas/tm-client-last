import firebase from "firebase/app";

import { getMessage } from "@/utils";

export default {
  namespaced: true,

  state: {
    user: {},
  },

  actions: {
    async login(ctx, user) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password);
      } catch (e) {
        return Promise.reject(getMessage(e.code));
      }
    },

    async register({ dispatch }, user) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .set({
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            status: user.status,
            email: user.email,
            admin: false,
          });
        await dispatch("logout");
      } catch (e) {
        return Promise.reject(getMessage(e.code));
      }
    },

    async forgot(ctx, user) {
      try {
        const auth = firebase.auth();
        auth.languageCode = "ru";
        const res = await auth.sendPasswordResetEmail(user.email);
        console.log(res);
      } catch (e) {
        return Promise.reject(getMessage(e.code));
      }
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout() {
      await firebase.auth().signOut();
    },
  },

  mutations: {
    userUpdated(state, newUser) {
      state.user = newUser;
    },
  },

  getters: {
    user: (state) => {
      return state.user;
    },
    userAuthenticated: (state) => {
      return !!state.user.token;
    },
  },
};
