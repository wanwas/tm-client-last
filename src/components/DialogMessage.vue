<template>
  <v-row v-if="dialog" class="modal-window">
    <div persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">
          {{ dialog.title }}
        </v-card-title>
        <v-card-text>{{ dialog.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close-dialog')">
            Хорошо
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-row>
</template>

<script>
export default {
  emits: ["close-dialog"],

  props: ["dialog"],
};
</script>

<style lang="scss" scoped>
.modal-window {
  position: absolute;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.575);
}
</style>
