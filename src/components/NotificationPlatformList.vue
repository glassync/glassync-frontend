<template>
  <div
    class="card p-3"
    style="max-height: 80vh; overflow-y: auto; overflow-x: auto"
  >
    <div class="card-header text-center" style="background-color: #f8f9fa">
      <h5 class="mb-0">Выбор платформы для уведомлений</h5>
    </div>

    <NotificationPlatformCard
      v-for="platform in platforms"
      :key="platform.getPlatformUID()"
      :platform="platform"
    />
  </div>
</template>

<script setup lang="ts">
import type { NotificationPlatform } from "@/core/NotificationPlatform";
import NotificationPlatformCard from "./NotificationPlatformCard.vue";
import { defineProps } from "vue";

defineProps<{
  platforms: NotificationPlatform[];
}>();
</script>
