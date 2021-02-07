<template>
  <div class="content pt-3 pb-3">
    <v-card>
      <v-card-title class="d-flex align-center justify-center">
        <div class="headline">Архив выполненных задач</div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mr-10 ml-10"
        ></v-text-field>
      </v-card-title>
    </v-card>
    <TasksList :tasks="completedTasks" :search="search"></TasksList>
  </div>
</template>

<script>
import TasksList from "@/components/tasks/TasksList";

import { mapGetters } from "vuex";

export default {
  components: {
    TasksList,
  },

  data() {
    return {
      search: "",
    };
  },

  computed: {
    ...mapGetters({
      tasks: "tasks/tasks",
    }),

    completedTasks() {
      return this.tasks.filter((el) => el.completed);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 1400px;
  height: 100%;
}
</style>
