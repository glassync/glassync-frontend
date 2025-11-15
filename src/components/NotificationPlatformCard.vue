<template>
  <div class="card p-2 mb-2 d-flex align-items-center">
    <input
      type="checkbox"
      class="form-check-input me-3"
      :checked="platform.getIsActive()"
      @change="toggleActive"
    />
    <span class="flex-grow-1">{{ platform.getPlatformName() }}</span>
    <a
      :href="platform.getIdentifier()"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ platform.getIdentifier() }}
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { NotificationPlatform } from "@/core/NotificationPlatform";
import { defineProps } from "vue";

const props = defineProps<{
  platform: NotificationPlatform;
}>();

function toggleActive(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  props.platform.setIsActive(checkbox.checked);
  // Здесь можно добавить логику сохранения изменений (может, запрос к серверу?)
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
}
</style>
