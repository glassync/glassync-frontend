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
      />
    </div>

    <button class="btn btn-primary w-100" @click="handleLogin" type="button">
      Войти
    </button>

    <div v-if="error" class="mt-3 text-danger text-center">
      Не удалось войти
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

//TODO async func
async function handleLogin() {
  error.value = false;

  const success = await props.profile.login(form.email, form.password);
  if (success) {
    router.push("/");
  } else {
    error.value = true;
  }
}
</script>
