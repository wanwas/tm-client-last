<template>
  <div class="task pa-2" :class="{ completed: item.completed }">
    <div class="task-status">
      <v-checkbox
        class="pa-1"
        v-model="item.completed"
        color="success"
        hide-details
      ></v-checkbox>
    </div>
    <div class="task-content">
      <div class="task-title title">{{ item.task }}</div>
      <div class="task-description text--secondary">{{ item.description }}</div>
      <div class="task-subtasks">
        <SubtasksList :subtasks="item.subtasks"></SubtasksList>
      </div>
    </div>
  </div>
</template>

<script>
import SubtasksList from "@/components/tasks/SubtasksList";

export default {

  props: ["item"],

  components: {
    SubtasksList,
  },

  computed: {
    completedSubtasks: () => {
      return this.item.subtasks.filter((el) => el.completed);
    },

    uncompletedSubtasks: () => {
      return this.item.subtasks.filter((el) => !el.completed);
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
}

.task-status {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-subtasks {
  width: 400px;
}

.completed {
  background: rgba(0, 0, 0, 0.075);
  .task-title {
    text-decoration: line-through;
  }
}
</style>
