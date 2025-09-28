<template>
  <div class="card p-2 mb-2">
    <div class="d-flex align-items-center gap-3">
      <input
        type="checkbox"
        class="form-check-input"
        :checked="platform.getIsActive()"
        @change="toggleActive"
      />
      <span class="flex-shrink-0">{{ platform.getPlatformName() }}:</span>
      <a
        :href="platform.getIdentifier()"
        target="_blank"
        rel="noopener noreferrer"
        class="text-break"
      >
        {{ platform.getIdentifier() }}
      </a>
    </div>
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
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
}
</style>
