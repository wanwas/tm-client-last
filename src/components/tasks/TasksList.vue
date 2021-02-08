<template>
  <div>
    <v-card class="mt-3 pt-1 pb-1">
      <div v-if="tasks.length">
        <TaskItem
          @edit-task="editTask"
          v-for="item in paginatedData"
          :item="item"
          :key="item.id"
          @show="show"
          :flagReturn="flagReturn"
          :flagEnter="flagEnter"
          @set-date="setDate"
          @remove-date="removeDate"
        ></TaskItem>
        <div class="mt-3 mr-3 d-flex align-center justify-space-between">
          <div class="d-flex caption text--secondary ml-3">
            Всего в списке
            <div class="primary--text mr-1 ml-1">{{ tasks.length }}</div>
          </div>
          <div class="d-flex align-center justify-center">
            <v-btn @click="prevPage" :disabled="pageNumber == 0" icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <div class="text--secondary caption">
              {{ pageNumber + 1 }} of {{ pageCount }}
            </div>
            <v-btn
              @click="nextPage"
              :disabled="pageNumber >= pageCount - 1"
              icon
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div v-else class="d-flex align-center justify-center pa-2">
        <div class="subtitle">Ваш список задач пуст</div>
        <v-icon class="ml-2">mdi-archive-outline</v-icon>
      </div>
    </v-card>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item @click="openEditForm">
          <v-list-item-title>Изменить</v-list-item-title>
        </v-list-item>
        <v-list-item @click="openConfirmDialog">
          <v-list-item-title>Удалить</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline"> Подтверждение удаления </v-card-title>

        <v-card-text>
          Вы уверены что хотите удалить выбранную задачу?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="confirmDialog = false"> Отмена </v-btn>

          <v-btn color="red darken-1" text @click="deleteTask"> Удалить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskItem from "@/components/tasks/TaskItem";

import { mapActions } from "vuex";

export default {
  components: {
    TaskItem,
  },

  props: ["tasks", "search", "flagReturn", "flagEnter", "selectedDate"],

  data() {
    return {
      pageNumber: 0,
      size: 10,
      currentItem: null,
      showMenu: false,
      x: 0,
      y: 0,
      confirmDialog: false,
    };
  },

  computed: {
    searchedData() {
      const s = this.search.toLowerCase();
      if (s) {
        return this.tasks.filter((el) => {
          if (~el.task.toLowerCase().indexOf(s)) return el;
        });
      } else return this.tasks;
    },

    pageCount() {
      return Math.ceil(this.searchedData.length / this.size);
    },

    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.searchedData.slice(start, end);
    },
  },

  methods: {
    ...mapActions({
      edit: "tasks/editTask",
      delete: "tasks/deleteTask",
    }),

    openEditForm() {
      this.$emit("open-edit-form", this.currentItem);
    },

    openConfirmDialog() {
      this.confirmDialog = true;
    },

    deleteTask() {
      this.delete(this.currentItem.id).catch((e) => {
        console.log(e);
      });
      this.confirmDialog = false;
    },

    async setDate(item) {
      try {
        console.log(item);
        item.date = this.selectedDate;
        await this.editTask(item);
      } catch (e) {
        console.log(e);
      }
    },

    async removeDate(item) {
      try {
        item.date = "";
        await this.editTask(item);
      } catch (e) {
        console.log(e);
      }
    },

    show({ e, item }) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
      this.currentItem = item;
    },

    editTask(val) {
      this.edit(val).catch((e) => {
        console.log(e);
      });
    },

    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>
