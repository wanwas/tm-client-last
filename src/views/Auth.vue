<template>
  <div class="container pa-0 ma-0">
    <DialogMessage
      :dialog="dialog"
      @close-dialog="dialog = false"
    ></DialogMessage>
    <div class="container-content">
      <component
        :resetToken="this.$route.params.resetToken"
        :is="currentForm"
        @switch-form="switchCurrentForm"
        @show-dialog="showDialog"
      ></component>
    </div>
  </div>
</template>

<script>
import Reset from "@/components/auth-forms/Reset";
import Forgot from "@/components/auth-forms/Forgot";
import Login from "@/components/auth-forms/Login";
import Register from "@/components/auth-forms/Register";
import DialogMessage from "@/components/DialogMessage";

export default {
  components: {
    Reset,
    Forgot,
    Login,
    Register,
    DialogMessage,
  },

  data() {
    return {
      currentForm: "login",
      dialog: false,
    };
  },

  methods: {
    switchCurrentForm(newCurrent) {
      this.currentForm = newCurrent;
    },

    showDialog(dialog) {
      this.dialog = dialog;
    },
  },
};
</script>

<style lang="scss">
.container-content {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-auth {
  background: white;
  border-radius: 3px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
}
.form-control {
  width: 100%;
  display: flex;
  align-items: center;
}
.form-error {
  max-width: 350px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
}
.v-input {
  width: 240px;
}
</style>
