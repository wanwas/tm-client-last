import firebase from "firebase/app";

export default {
  namespaced: true,

  state: {
    tasks: [],
  },

  actions: {
    async initTasks({ dispatch }) {
      const uid = await dispatch("auth/getUid", null, { root: true });
      const ref = firebase.database().ref("users/" + uid + "/tasks");
      ref.on("value", (snapshot) => {
        const data = snapshot.val();
        dispatch("getTasks", data);
      });
    },

    getTasks({ commit }, data) {
      if (data) {
        commit("tasksUpdated", Object.values(data));
      } else {
        commit("tasksUpdated", []);
      }
    },

    async deleteTask({ dispatch }, id) {
      try {
        const uid = await dispatch("auth/getUid", null, { root: true });
        await firebase
          .database()
          .ref(`users/${uid}/tasks/${id}`)
          .remove();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async editTask({ dispatch }, data) {
      try {
        const uid = await dispatch("auth/getUid", null, { root: true });
        await firebase
          .database()
          .ref(`users/${uid}/tasks/${data.id}`)
          .set({
            ...data,
          });
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async addTask({ dispatch }, data) {
      try {
        const uid = await dispatch("auth/getUid", null, { root: true });
        const key = firebase
          .database()
          .ref("users/" + uid)
          .child("tasks")
          .push().key;
        data.id = key;
        await firebase
          .database()
          .ref(`users/${uid}/tasks/${key}`)
          .set({
            ...data,
          });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },

  mutations: {
    tasksUpdated(state, data) {
      state.tasks = data;
    },
  },

  getters: {
    tasks: (state) => {
      return state.tasks;
    },
  },
};
