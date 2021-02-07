<template>
  <div>
    <v-card class="mt-3 pt-1 pb-1">
      <div v-if="tasks.length">
        <TaskItem
          v-for="item in paginatedData"
          :item="item"
          :key="item.id"
        ></TaskItem>
        <div class="mt-3 mr-3 d-flex align-center justify-end">
          <v-btn @click="prevPage" :disabled="pageNumber == 0" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="text--secondary caption">
            {{ pageNumber + 1 }} of {{ pageCount }}
          </div>
          <v-btn @click="nextPage" :disabled="pageNumber >= pageCount - 1" icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
      <div v-else class="d-flex align-center justify-center pa-2">
        <div class="subtitle">Ваш список задач пуст</div>
        <v-icon class="ml-2">mdi-archive-outline</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script>
import TaskItem from "@/components/tasks/TaskItem";

export default {
  components: {
    TaskItem,
  },

  props: ["tasks", "search"],

  data() {
    return {
      pageNumber: 0,
      size: 10,
    };
  },

  computed: {
    searchedData() {
      const s = this.search;
      if (s) {
        return this.tasks.filter((el) => {
          if (~el.task.indexOf(s)) return el;
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
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>
