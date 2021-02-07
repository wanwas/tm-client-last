<template>
  <div class="form-auth d-flex flex-column justify-space-between align-center pa-15">
    <h2 class="headline">Сброс пароля</h2>

    <div class="form-error error--text">
      {{ errorMessage }}
    </div>

    <form class="d-flex flex-column justify-center align-center">
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
        label="Пароль"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        :error-messages="passwordErrorsConfirm"
        :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassConfirm ? 'text' : 'password'"
        @click:append="showPassConfirm = !showPassConfirm"
        label="Повторите пароль"
        required
        @input="$v.passwordConfirm.$touch()"
        @blur="$v.passwordConfirm.$touch()"
      ></v-text-field>

      <v-btn
        class="mt-5"
        color="primary"
        tile
        :loading="loading"
        @click="submit"
        >Изменить пароль</v-btn
      >
    </form>
    <div class="form-control mt-3">
      <v-btn text tile small @click="$emit('switch-form', 'login')"
        >Войти</v-btn
      >
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  emits: ["switch-form"],

  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(6) },
    passwordConfirm: { required, sameAsPassword: sameAs("password") },
  },

  data: () => ({
    password: "",
    showPass: false,
    passwordConfirm: "",
    showPassConfirm: false,
    loading: false,
    errorMessage: "",
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Это обязательное поле");
      !this.$v.password.minLength &&
        errors.push("Длинна пароля не менее 6 символов");
      return errors;
    },

    passwordErrorsConfirm() {
      const errors = [];
      if (!this.$v.passwordConfirm.$dirty) return errors;
      !this.$v.passwordConfirm.required && errors.push("Это обязательное поле");
      !this.$v.passwordConfirm.sameAsPassword &&
        errors.push("Поля должны совпадать");
      return errors;
    },
  },

  methods: {
    ...mapActions({
      reset: "auth/reset",
    }),

    async submit() {
      this.loadingSwitch();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = { password: this.password };
        this.reset(user)
          .then(() => {
            this.$emit("show-dialog", {
              title: "Восстановление доступа",
              message:
                "Пароль успешно изменен, теперь Вам необходимо войти в свой аккаунта.",
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
