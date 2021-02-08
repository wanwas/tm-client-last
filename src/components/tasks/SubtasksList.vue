<template>
  <div>
    <SubtaskItem
      v-for="(item, index) in uncomSubtasks"
      :item="item"
      :idx="index"
      :key="item.id"
      @complete-subtask="completeSubtask"
      @delete-subtask="deleteSubtask"
    ></SubtaskItem>
    <SubtaskItem
      v-for="(item, index) in comSubtasks"
      :item="item"
      :idx="index"
      :key="item.id"
      @complete-subtask="completeSubtask"
      @delete-subtask="deleteSubtask"
    ></SubtaskItem>
  </div>
</template>

<script>
import SubtaskItem from "@/components/tasks/SubtaskItem";

export default {
  props: ["subtasks"],

  emits: ["edit-subtasks"],

  components: {
    SubtaskItem,
  },

  computed: {
    comSubtasks() {
      if (this.subtasks) {
        return this.subtasks.filter((el) => el.completed);
      } else {
        return [];
      }
    },

    uncomSubtasks() {
      if (this.subtasks) {
        return this.subtasks.filter((el) => !el.completed);
      } else {
        return [];
      }
    },
  },

  methods: {
    completeSubtask(val) {
      const result = this.subtasks.map((el) => {
        if (el.subtask === val.subtask) {
          el.completed = !el.completed;
        }
        return el;
      });
      this.$emit("edit-subtasks", result);
    },

    deleteSubtask(val) {
      const result = this.subtasks.filter((el) => {
        if (el.title !== val.title) {
          return el;
        }
      });
      this.$emit("edit-subtasks", result);
    },
  },
};
</script>
