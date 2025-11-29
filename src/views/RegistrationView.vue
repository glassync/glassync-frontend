<template>
  <div class="container mt-5" style="max-width: 400px">
    <RegistrationForm :profile="profile" />

    <div class="text-center mt-2">
      Уже есть аккаунт?
      <a href="#" @click.prevent="goToLogin">Войти</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import RegistrationForm from "@/components/RegistrationForm.vue";
import type { Profile } from "@/core/Profile";
import { defineProps } from "vue";

const router = useRouter();

defineProps<{ profile: Profile }>();

function goToLogin() {
  router.push("/authorization");
}
</script>
