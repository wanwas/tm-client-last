<template>
  <div
    class="form-auth d-flex flex-column justify-space-between align-center pa-15"
  >
    <h2 class="headline">Восстоновление пароля</h2>

    <div class="form-error error--text">
      {{ errorMessage }}
    </div>

    <form class="d-flex flex-column justify-center align-center">
      <v-text-field
        class="mt-1"
        v-model="email"
        :error-messages="emailErrors"
        :append-icon="'mdi-email'"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-btn
        class="mt-5"
        color="primary"
        tile
        :loading="loading"
        @click="submit"
        >Отправить письмо</v-btn
      >
    </form>
    <div class="form-control mt-3">
      <v-btn text tile small @click="$emit('switch-form', 'login')"
        >Назад</v-btn
      >
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  emits: ["switch-form", "show-dialog"],

  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },

  data: () => ({
    email: "",
    loading: false,
    errorMessage: "",
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Это e-mail не похож на почту");
      !this.$v.email.required && errors.push("E-mail это обязательное поле");
      return errors;
    },
  },

  methods: {
    ...mapActions({
      forgot: "auth/forgot",
    }),

    async submit() {
      this.loadingSwitch();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = { email: this.email };
        this.forgot(user)
          .then(() => {
            this.$emit("show-dialog", {
              title: "Восстановление доступа",
              message:
                "Письмо с ссылкой для восстоновления отправлено на Вашу почту. Не забудьте проверить папку спам.",
            });
            this.$emit("switch-form", "login");
          })
          .catch((e) => {
            this.errorMessage = e;
          });
      }
      this.loadingSwitch();
    },

    loadingSwitch() {
      this.loading = !this.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  justify-content: flex-start;
}
</style>
