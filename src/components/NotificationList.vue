<template>
  <div class="notifications-list">
    <NotificationCard
      v-for="notification in notifications"
      :key="notification.getUID()"
      :notification="notification"
      :profile="profile"
    />
    <p v-if="notifications.length === 0" class="text-muted text-center">
      Нет уведомлений
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import type { Profile } from "@/core/Profile";
import type { Notification } from "@/core/Notification";
import NotificationCard from "@/components/NotificationCard.vue";

const props = defineProps<{
  profile: Profile;
}>();

const notifications = ref<Notification[]>([]);

function loadNotifications() {
  notifications.value = props.profile.getNotifications() || [];
}

onMounted(() => {
  loadNotifications();
});
</script>

<style scoped>
.notifications-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
