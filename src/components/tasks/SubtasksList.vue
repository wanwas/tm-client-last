<template>
  <div>
    <SubtaskItem
      v-for="item in uncomSubtasks"
      :item="item"
      :key="item.id"
    ></SubtaskItem>
    <SubtaskItem
      v-for="item in comSubtasks"
      :item="item"
      :key="item.id"
    ></SubtaskItem>
  </div>
</template>

<script>
import SubtaskItem from "@/components/tasks/SubtaskItem";

export default {
  props: ["subtasks"],

  components: {
    SubtaskItem,
  },

  computed: {
    comSubtasks() {
      return this.subtasks.filter((el) => el.completed);
    },

    uncomSubtasks() {
      return this.subtasks.filter((el) => !el.completed);
    },
  },
};
</script>
