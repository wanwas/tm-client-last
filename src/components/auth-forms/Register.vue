<template>
  <div
    class="form-auth d-flex flex-column justify-space-between align-center pa-15"
  >
    <h2 class="headline">Регистрация</h2>

    <div class="form-error error--text">
      {{ errorMessage }}
    </div>

    <form class="d-flex flex-column justify-center align-center">
      <div class="fields-group d-flex">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          label="Имя"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          class="mr-5"
        ></v-text-field>
        <v-text-field
          v-model="surname"
          :error-messages="surnameErrors"
          label="Фамилия"
          required
          @input="$v.surname.$touch()"
          @blur="$v.surname.$touch()"
        ></v-text-field>
      </div>

      <div class="fields-group d-flex">
        <v-text-field
          v-model="patronymic"
          :error-messages="patronymicErrors"
          label="Отчество"
          required
          @input="$v.patronymic.$touch()"
          @blur="$v.patronymic.$touch()"
          class="mr-5"
        ></v-text-field>
        <v-text-field
          v-model="status"
          :error-messages="statusErrors"
          label="Должность"
          required
          @input="$v.status.$touch()"
          @blur="$v.status.$touch()"
        ></v-text-field>
      </div>

      <div class="fields-group">
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          :append-icon="'mdi-email'"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
      </div>

      <div class="fields-group d-flex">
        <v-text-field
          class="mr-5"
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
      </div>

      <v-btn
        class="mt-5"
        color="primary"
        tile
        :loading="loading"
        @click="submit"
        >Зарегистрироваться</v-btn
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
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  emits: ["switch-form"],

  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(6) },
    passwordConfirm: { required, sameAsPassword: sameAs("password") },
    email: { required, email },
    name: { required },
    surname: { required },
    patronymic: { required },
    status: { required },
  },

  data: () => ({
    email: "",
    name: "",
    surname: "",
    patronymic: "",
    status: "",
    password: "",
    showPass: false,
    passwordConfirm: "",
    showPassConfirm: false,
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

    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Это обязательное поле");
      return errors;
    },

    surnameErrors() {
      const errors = [];
      if (!this.$v.surname.$dirty) return errors;
      !this.$v.surname.required && errors.push("Это обязательное поле");
      return errors;
    },

    patronymicErrors() {
      const errors = [];
      if (!this.$v.patronymic.$dirty) return errors;
      !this.$v.patronymic.required && errors.push("Это обязательное поле");
      return errors;
    },

    statusErrors() {
      const errors = [];
      if (!this.$v.status.$dirty) return errors;
      !this.$v.status.required && errors.push("Это обязательное поле");
      return errors;
    },
  },

  methods: {
    ...mapActions({
      register: "auth/register",
    }),

    async submit() {
      this.loading = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          password: this.password,
          email: this.email,
          name: this.name,
          surname: this.surname,
          patronymic: this.patronymic,
          status: this.status,
        };
        this.register(user)
          .then(() => {
            this.$emit("show-dialog", {
              title: "Регистрация",
              message:
                "Регистрация прошла успешно, теперь Вам необходимо войти в свой аккаунта.",
            });
            this.$emit("switch-form", "login");
          })
          .catch((e) => {
            this.errorMessage = e;
          });
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  justify-content: flex-start;
}
</style>
