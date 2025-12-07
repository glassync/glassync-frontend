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
        :disabled="loading"
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
        :disabled="loading"
      />
    </div>

    <div class="mb-3">
      <label for="nickname" class="form-label">Никнейм</label>
      <input
        v-model="form.nickname"
        type="text"
        class="form-control"
        id="nickname"
        placeholder="Введите отображаемый никнейм"
        :disabled="loading"
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
        :disabled="loading"
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
        :disabled="loading"
      />
    </div>

    <button
      class="btn btn-primary w-100"
      @click="register"
      type="button"
      :disabled="loading"
    >
      <span v-if="!loading">Зарегистрироваться</span>
      <span v-else>Обработка...</span>
    </button>

    <div v-if="error" class="mt-1 text-danger text-center">
      {{ error }}
    </div>

    <!-- Overlay with loading spinner -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
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
  nickname: "",
  email: "",
  password: "",
});

const error = ref("");
const loading = ref(false);

async function register() {
  error.value = "";
  loading.value = true;

  const newUser = new Person(
    0,
    form.firstName,
    form.lastName,
    form.nickname,
    form.email
  );

  const success = await props.profile.register(newUser, form.password);

  if (success) {
    props.profile.setPerson(newUser);
    // ToDo: логика перехода на главную страницу после успешной регистрации
    router.push("/");
  } else {
    error.value = "Ошибка! Некорректные данные.";
  }

  loading.value = false;
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.form-control:disabled {
  background-color: #e9ecef;
  opacity: 1;
}
</style>
