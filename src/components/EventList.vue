<template>
  <div>
    <h4 class="mb-3">{{ title }}</h4>
    <div class="overflow-auto border rounded p-2">
      <EventCard v-for="event in events" :key="event.getUID()" :event="event" />
      <p v-if="events.length === 0" class="text-muted">Нет событий</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from "@/core/Event";
import EventCard from "./EventCard.vue";
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
  events: Event[];
}>();
</script>
