<template>
  <div
    class="form-auth d-flex flex-column justify-space-between align-center pa-15"
  >
    <h2 class="headline">Вход</h2>

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

      <v-text-field
        class="mt-1"
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

      <v-btn
        class="mt-5"
        color="primary"
        tile
        :loading="loading"
        @click="submit"
        >Войти</v-btn
      >
    </form>
    <div class="form-control mt-3">
      <v-btn text tile small @click="$emit('switch-form', 'forgot')"
        >Забыли пароль?</v-btn
      >
      <v-btn text tile small @click="$emit('switch-form', 'register')"
        >зарегистрироваться</v-btn
      >
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  emits: ["switch-form"],

  mixins: [validationMixin],

  validations: {
    password: { required },
    email: { required, email },
  },

  data: () => ({
    email: "",
    password: "",
    showPass: false,
    loading: false,
    errorMessage: "",
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Пароль это обязательное поле");
      return errors;
    },

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
      login: "auth/login",
    }),

    submit() {
      this.loadingSwitch();
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = { password: this.password, email: this.email };
        this.login(user)
          .then(() => {
            this.$router.push("/main");
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
  justify-content: space-between;
}
</style>
