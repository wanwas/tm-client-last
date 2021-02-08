<template>
  <div
    class="header primary d-flex align-center justify-space-between pr-5 pl-5"
  >
    <div class="header-logo">
      <div class="header-text display-1 white--text text-uppercase">
        Task Manager
      </div>
    </div>
    <div class="header-menu">
      <v-btn
        class="btn primary white-text"
        tile
        height="60px"
        text
        to="/main/today"
      >
        Сегодня
        <v-icon class="ml-2">mdi-calendar-outline</v-icon>
      </v-btn>
      <v-btn
        class="btn primary white-text"
        tile
        height="60px"
        text
        to="/main/calendar"
      >
        Календарь
        <v-icon class="ml-2">mdi-calendar-multiselect</v-icon>
      </v-btn>
      <v-btn
        class="btn primary white-text"
        tile
        height="60px"
        text
        to="/main/tasks"
      >
        Список задач
        <v-icon class="ml-2">mdi-format-list-checks</v-icon>
      </v-btn>
      <v-btn
        class="btn primary white-text"
        tile
        height="60px"
        text
        to="/main/archive"
      >
        Архив задач
        <v-icon class="ml-2">mdi-archive-outline</v-icon>
      </v-btn>
      <v-btn
        class="btn primary white-text"
        tile
        height="60px"
        @click="singOut"
        text
      >
        Выйти
        <v-icon class="ml-2">mdi-logout-variant</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    singOut() {
      this.logout();
      this.$router.push("/auth");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
}
</style>
