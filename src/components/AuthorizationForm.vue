<template>
  <div class="container" style="max-width: 400px; margin-top: 40px">
    <h3 class="mb-4 text-center">Вход в аккаунт</h3>

    <div class="mb-3">
      <label for="email" class="form-label">Почта:</label>
      <input
        v-model="form.email"
        type="email"
        id="email"
        class="form-control"
        placeholder="Введите вашу почту"
        :disabled="loading"
      />
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Пароль:</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        class="form-control"
        placeholder="Введите ваш пароль"
        :disabled="loading"
      />
    </div>

    <button
      class="btn btn-primary w-100"
      @click="handleLogin"
      type="button"
      :disabled="loading"
    >
      <span>Войти</span>
    </button>

    <div v-if="error" class="mt-3 text-danger text-center">
      Не удалось войти
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import { defineProps, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  profile: Profile;
}>();

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const error = ref(false);
const loading = ref(false);

//TODO async func
async function handleLogin() {
  loading.value = true;
  error.value = false;

  try {
    const success = await props.profile.login(form.email, form.password);
    if (success) {
      router.push("/");
    } else {
      error.value = true;
    }
  } catch (error) {
    error.value = true;
    console.error("Ошибка входа:", error);
  } finally {
    loading.value = false;
  }
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

.btn:disabled {
  opacity: 0.8;
}
</style>
