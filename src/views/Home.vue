<template>
  <div class="container pa-0 ma-0">
    <div class="container-content">
      <div class="content-head">
        <h1 class="display-2">Task Manager</h1>
        <img
          src="https://img.icons8.com/fluent/48/000000/microsoft-todo-2019.png"
        />
      </div>
      <div class="content-main">
        <p class="subtitle-1">
          Task Manager поможет Вам распланировать свое время правильно и не
          забыть даже про самые маленькие но важные задачи.
        </p>
        <v-btn depressed tile :to="link" color="primary"
          >Начать использовать</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ userAuthenticated: "auth/userAuthenticated" }),
  },

  data() {
    return {
      link: "/auth",
    };
  },

  mounted() {
    if (this.userAuthenticated) this.link = "/main";
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 500px;
    text-align: center;
  }
  * {
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
