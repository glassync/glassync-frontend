<template>
  <div class="container mt-3">
    <button
      class="btn btn-outline-secondary mb-4 d-block mx-auto"
      @click="goBack"
      type="button"
    >
      &lt; Вернуться в профиль
    </button>

    <ProfileParametersForm :profile="profile" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ProfileParametersForm from "@/components/ProfileParametersForm.vue";
import type { Profile } from "@/core/Profile";
import { defineProps } from "vue";

defineProps<{
  profile: Profile;
}>();

const router = useRouter();

function goBack() {
  router.push("/account");
}
</script>
