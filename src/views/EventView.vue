<template>
  <div>
    <EventForm :profile="profile" :event="event" />
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import { Event } from "@/core/Event";
import { ref, watch, defineProps } from "vue";
import EventForm from "@/components/EventSettingsForm.vue";
import { Events } from "@/core/Events";
import { useRoute } from "vue-router";

const props = defineProps<{
  profile: Profile;
  eventUID?: number;
}>();

const event = ref<Event | null>(null);
const route = useRoute(); // Получаем доступ к маршруту

console.log("EvenetID " + props.eventUID);
watch(
  () => props.eventUID,
  async (uid) => {
    if (uid !== undefined) {
      console.log("EVENT_UID " + uid);
      const findEvent = await Event.getEventsByIDs(uid);
      event.value = findEvent ?? null;
    } else {
      event.value = null;
    }
  },
  { immediate: true }
);
</script>
