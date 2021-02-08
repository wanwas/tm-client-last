<template>
  <div class="content pt-3 pb-3">
    <v-card>
      <v-card-title class="d-flex align-center justify-center">
        <div>
          <v-container>
            <v-row>
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="computedDateFormattedMomentjs"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="selectedDate = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  @change="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-row>
          </v-container>
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
        <template>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                  fab
                  small
                  dark
                  color="primary"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Новая задача</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="task"
                        label="Название*"
                        required
                        :error-messages="taskErrors"
                        @input="$v.task.$touch()"
                        @blur="$v.task.$touch()"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-textarea
                        :counter="300"
                        solo
                        :error-messages="descriptionErrors"
                        v-model="description"
                        label="Описание"
                        @input="$v.description.$touch()"
                        @blur="$v.description.$touch()"
                      ></v-textarea>
                    </v-row>
                    <div
                      v-for="(item, index) in subtasks"
                      :key="index"
                      class="subtasks-list-create"
                    >
                      <div class="title mr-3">{{ index + 1 }}.</div>
                      <v-text-field
                        v-model="item.subtask"
                        label="Подзадача"
                        :append-icon="'mdi-delete'"
                        @click:append="removeSubtask(index)"
                      ></v-text-field>
                    </div>
                    <div class="add">
                      <v-btn
                        class="mx-2"
                        @click="addSubtask"
                        title="Добавить подзадачу"
                        fab
                        x-small
                        dark
                        color="primary"
                      >
                        <v-icon dark> mdi-plus </v-icon>
                      </v-btn>
                    </div>
                  </v-container>
                  <small>*отмечены обязательные поля</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="submit">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-card-title>
    </v-card>
    <TasksList
      @open-edit-form="openEditForm"
      :tasks="selectedTasks.reverse()"
      :search="search"
    ></TasksList>
  </div>
</template>

<script>
import TasksList from "@/components/tasks/TasksList";

import { mapActions, mapGetters } from "vuex";

import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

import moment from "moment";

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
      id: null,
      selectedDate: new Date(),
      menu1: false,
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

    computedDateFormattedMomentjs() {
      return this.selectedDate
        ? moment(this.selectedDate).format("dddd, MMMM Do YYYY")
        : "";
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
          moment(new Date(el.date)).format("dddd, MMMM Do YYYY") ===
          moment(this.selectedDate).format("dddd, MMMM Do YYYY")
        ) {
          return el;
        }
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
</style>
