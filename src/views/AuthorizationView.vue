<template>
  <div class="container mt-5" style="max-width: 400px">
    <AuthorizationForm :profile="profile" />

    <div class="text-center mt-2">
      Вы не зарегистрированы?
      <a href="#" @click.prevent="goToRegister">Регистрация</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AuthorizationForm from "@/components/AuthorizationForm.vue";
import type { Profile } from "@/core/Profile";
import { defineProps } from "vue";

const router = useRouter();

defineProps<{ profile: Profile }>();

function goToRegister() {
  router.push("/registration");
}
</script>
