<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.918), rgba(0, 0, 0, 0.644)),
    url("https://store-images.s-microsoft.com/image/apps.46003.14259451864568504.ad5e5d07-0fbb-46ed-b9b6-a1b781645691.2ebcfa4e-172c-43d3-bf01-2d9a2a94e897?mode=scale&q=90&h=1080&w=1920")
      center / cover no-repeat;
}
</style>
