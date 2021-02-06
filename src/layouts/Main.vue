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

export default {
  components: {
    Header,
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
  height: calc(100vh - 60px);
}
</style>
