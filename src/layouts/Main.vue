<template>
  <div class="wrapper">
    <Header></Header>
    <div class="wrapper-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

import { mapActions } from "vuex";

export default {
  components: {
    Header,
  },

  methods: {
    ...mapActions({
      initTasks: "tasks/initTasks", //also supports payload `this.nameOfAction(amount)`
    }),
  },

  mounted() {
    this.initTasks();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}
.wrapper-container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
}
</style>
