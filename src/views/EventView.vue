<template>
  <div>
    <EventForm :profile="profile" :event="event" />
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import type { Event } from "@/core/Event";
import { ref, watch, defineProps } from "vue";
import EventForm from "@/components/EventForm.vue";
import { Events } from "@/core/Events";

const props = defineProps<{
  profile: Profile;
  eventUID?: number | string;
}>();

const event = ref<Event | null>(null);

const events = Events.getInstance();

watch(
  () => props.eventUID,
  (uid) => {
    if (uid !== undefined) {
      const numericUID = Number(uid);
      const findEvent = events.getEvent(numericUID);
      event.value = findEvent ?? null;
    } else {
      event.value = null;
    }
  },
  { immediate: true }
);
</script>
