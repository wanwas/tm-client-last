import * as auth from "@/services/auth-service.js";

import $router from "@/router/";

export default {
  namespaced: true,

  state: {
    user: {},
  },

  actions: {
    async login({ commit }, user) {
      try {
        const data = await auth.loginRequest(user);
        commit("userUpdated", data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async register(ctx, user) {
      try {
        await auth.registerRequest(user);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async forgot(ctx, user) {
      try {
        await auth.forgotRequest(user);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async reset(ctx, user) {
      try {
        await auth.resetRequest(user);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    logout(ctx) {
      ctx.commit("userUpdated", {});
      localStorage.removeItem("user");
      $router.push("/auth");
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
