<template>
  <div class="content pt-3 pb-3">
    <v-card>
      <v-card-title class="d-flex align-center justify-center">
        <div>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="selectedDate"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="selectedDate"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </div>
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
    <div class="blocks d-flex">
      <div class="block">
        <TasksList
          @open-edit-form="openEditForm"
          :tasks="selectedTasks.reverse()"
          :search="search"
          :flagReturn="true"
        ></TasksList>
      </div>
      <div class="block">
        <TasksList
          @open-edit-form="openEditForm"
          :tasks="uncompletedTasks.reverse()"
          :search="search"
          :flagEnter="true"
          :selectedDate="selectedDate"
        ></TasksList>
      </div>
    </div>
  </div>
</template>

<script>
import TasksList from "@/components/tasks/TasksList";

import { mapActions, mapGetters } from "vuex";

import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: {
    TasksList,
  },

  mixins: [validationMixin],

  validations: {
    description: { maxLength: maxLength(300) },
    task: { required },
  },

  data() {
    return {
      search: "",
      dialog: "",
      task: "",
      description: "",
      subtasks: [],
      menu: false,
      selectedDate: new Date().toISOString().substr(0, 10),
    };
  },

  computed: {
    ...mapGetters({
      tasks: "tasks/tasks",
    }),

    taskErrors() {
      const errors = [];
      if (!this.$v.task.$dirty) return errors;
      !this.$v.task.required && errors.push("Это обязательное поле.");
      return errors;
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength &&
        errors.push("Описание должно быть не длинее 300 символов");
      return errors;
    },

    selectedTasks() {
      return this.tasks.filter((el) => {
        if (
          new Date(el.date).setHours(0, 0, 0, 0) ===
          new Date(this.selectedDate).setHours(0, 0, 0, 0)
        ) {
          return el;
        }
      });
    },
    uncompletedTasks() {
      return this.tasks.filter((el) => {
        if (!el.completed && !el.date) return el;
      });
    },
  },
  methods: {
    ...mapActions({
      createTask: "tasks/addTask",
      editTask: "tasks/editTask",
    }),

    openEditForm(val) {
      this.subtasks = val.subtasks.slice();
      this.task = val.task;
      this.description = val.description;
      this.id = val.id;
      this.dialog = true;
    },

    closeDialog() {
      this.id = null;
      this.task = "";
      this.description = "";
      this.subtasks = [];
      this.$v.$reset();
      this.dialog = false;
    },

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      const data = {
        task: this.task,
        description: this.description,
        subtasks: this.subtasks,
        completed: false,
      };
      if (this.id) {
        data.id = this.id;
        this.editTask(data).catch((e) => {
          console.log(e);
        });
      } else {
        data.created = new Date().toString();
        data.date = new Date().toString();
        console.log(data);
        this.createTask(data).catch((e) => {
          console.log(e);
        });
      }
      this.closeDialog();
    },

    addSubtask() {
      this.subtasks.push({
        subtask: "",
        completed: false,
      });
    },

    removeSubtask(idx) {
      this.subtasks.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 1400px;
  height: 100%;
}

.add {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.subtasks-list-create {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.blocks {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .block {
    width: 45%;
  }
}
</style>
