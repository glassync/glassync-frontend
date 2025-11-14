<template>
  <div>
    <h4 class="mb-3">{{ title }}</h4>
    <div class="overflow-auto border rounded p-2" style="max-height: 400px">
      <EventCard
        v-for="event in events"
        :key="event.getUID()"
        :event="event"
        :members="event.getMembersMap()"
      />
      <p v-if="events.length === 0" class="text-muted">Нет событий</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from "@/core/Person";
import type { Event } from "@/core/Event";
import EventCard from "./EventCard.vue";
import { Events } from "@/core/Events";
import { ref, watch, defineProps } from "vue";

const props = defineProps<{
  title: string;
  user: Person;
  searchStartDate: Date;
  searchEndDate: Date;
}>();

const eventsInstance = Events.getInstance();

const events = ref<Event[]>([]);

watch(
  () => [props.user, props.searchStartDate, props.searchEndDate],
  () => {
    if (props.user && props.searchStartDate && props.searchEndDate) {
      events.value = eventsInstance.getUserEvents(
        props.user,
        props.searchStartDate,
        props.searchEndDate
      );
    } else {
      events.value = [];
    }
  },
  { immediate: true }
);
</script>
