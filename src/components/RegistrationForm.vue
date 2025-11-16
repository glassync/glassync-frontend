<template>
  <div class="container" style="max-width: 400px; margin-top: 2rem">
    <h2 class="mb-4 text-center">Регистрация</h2>

    <div class="mb-3">
      <label for="firstName" class="form-label">Имя</label>
      <input
        v-model="form.firstName"
        type="text"
        class="form-control"
        id="firstName"
        placeholder="Введите ваше имя"
      />
    </div>

    <div class="mb-3">
      <label for="lastName" class="form-label">Фамилия</label>
      <input
        v-model="form.lastName"
        type="text"
        class="form-control"
        id="lastName"
        placeholder="Введите вашу фамилию"
      />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Почта</label>
      <input
        v-model="form.email"
        type="email"
        class="form-control"
        id="email"
        placeholder="Введите вашу почту"
      />
    </div>

    <div class="mb-4">
      <label for="password" class="form-label">Пароль</label>
      <input
        v-model="form.password"
        type="password"
        class="form-control"
        id="password"
        placeholder="Придумайте пароль"
      />
    </div>

    <button
      class="btn btn-primary w-100"
      @click="register"
      type="button"
      :disabled="loading"
    >
      Зарегистрироваться
    </button>

    <div v-if="error" class="mt-1 text-danger text-center">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import { Person } from "@/core/Person";
import { reactive, ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  profile: Profile;
}>();

const router = useRouter();

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const error = ref("");
const loading = ref(false);

function register() {
  error.value = "";
  loading.value = true;

  const newUser = new Person(0, form.firstName, form.lastName, "", form.email);

  const success = props.profile.register(newUser, form.password);

  if (success) {
    // ToDo: логика перехода на главную страницу после успешной регистрации
    router.push("/");
  } else {
    error.value = "Ошибка! Некорректные данные.";
  }

  loading.value = false;
}
</script>
