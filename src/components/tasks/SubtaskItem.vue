<template>
  <div :class="{ completed: item.completed }" class="subtask d-flex align-center">
    <v-checkbox :checked="item.completed"></v-checkbox>
    <div class="subtask-title">{{ item.subtask }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],

  emits: ["delete", "complete"],
};
</script>

<style lang="scss" scoped>
.completed {
  background: rgba(0, 0, 0, 0.075);
  .subtask-title {
    text-decoration: line-through;
  }
}
</style>
