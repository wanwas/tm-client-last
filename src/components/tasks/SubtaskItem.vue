<template>
  <div
    :class="{ completed: item.completed }"
    class="subtask d-flex align-center justify-space-between"
  >
    <div class="d-flex">
      <div class="item-complete">
        <div class="checkbox" @click="$emit('complete-subtask', item)">
          <input
            class="custom-checkbox"
            :checked="item.completed"
            type="checkbox"
            :id="item.id"
            :name="item.id"
          />
          <label :for="item.id"></label>
        </div>
      </div>
      <!-- <label :for="item.id" v-if="!item.completed" class="ml-1 mr-1">{{ idx + 1 }}.</label> -->
      <div class="subtask-title">{{ item.subtask }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "idx"],

  emits: ["delete-subtask", "complete-subtask"],
};
</script>

<style lang="scss" scoped>
.completed {
  background: rgba(0, 0, 0, 0.075);
  .subtask-title {
    text-decoration: line-through;
  }
}

.item-complete {
  display: flex;
  justify-content: center;
  margin-right: 3px;
}
.checkbox {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  cursor: pointer;
}
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #4b9ffd;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #4b9ffd;
}
.custom-checkbox:not(:disabled):active + label::before {
  background-color: #4b9ffd;
  border-color: #4b9ffd;
}
.custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.custom-checkbox:focus:not(:checked) + label::before {
  border-color: #4b9ffd;
}
.custom-checkbox:checked + label::before {
  border-color: #4b9ffd;
  background-color: #4b9ffd;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}
</style>
