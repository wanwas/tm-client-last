<template>
  <div
    class="task pa-2"
    :class="{ completed: item.completed }"
    @contextmenu="show"
  >
    <div class="item-complete">
      <div class="checkbox">
        <input
          @change="completeTask"
          class="custom-checkbox"
          :checked="item.completed"
          type="checkbox"
          :id="item.id"
          :name="item.id"
        />
        <label :for="item.id"></label>
      </div>
    </div>
    <div class="task-content">
      <div class="task-title title d-flex justify-space-between align-end">
        {{ item.task }}
        <div class="text--secondary caption">{{ createdDate }}</div>
      </div>
      <div class="task-description text--secondary">{{ item.description }}</div>
      <div class="task-subtasks">
        <SubtasksList
          @edit-subtasks="editSubtasks"
          :subtasks="item.subtasks"
        ></SubtasksList>
      </div>
    </div>
  </div>
</template>

<script>
import SubtasksList from "@/components/tasks/SubtasksList";

export default {
  props: ["item"],

  emits: ["edit-task", "delete"],

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

    createdDate() {
      const date = new Date(this.item.created);
      return date != "Invalid Date"
        ? `Создано: ${date.toLocaleString("ru-Ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`
        : "";
    },
  },

  methods: {
    show(e) {
      this.$emit("show", { e, item: this.item });
    },

    completeTask() {
      const newItem = this.item;
      newItem.completed = !newItem.completed;
      this.$emit("edit-task", newItem);
    },

    editSubtasks(val) {
      const newItem = this.item;
      newItem.subtasks = val;
      if (!newItem.subtasks.find((el) => el.completed === false)) {
        newItem.completed = true;
      }
      this.$emit("edit-task", newItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  &:hover {
    background: rgb(240, 248, 255);
  }
  border-bottom: 1px solid rgb(214, 214, 214);
}
.task-content {
  width: 100%;
}
.task-status {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-subtasks {
  width: 100%;
}
.task-status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.completed {
  background: rgba(0, 0, 0, 0.075);
  .task-title {
    text-decoration: line-through;
  }
}

.item-complete {
  display: flex;
  justify-content: center;
  padding: 5px;
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
  width: 1.25em;
  height: 1.25em;
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
