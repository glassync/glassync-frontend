<template>
  <div class="calendar-wrapper">
    <vue-cal
      class="calendar-inner"
      :events="events"
      view="month"
      :views="['day', 'month']"
      locale="ru"
      @event-click="onEventClick"
    >
      <template #event="{ event }">
        <div class="event-content">
          <div class="vuecal__event-title">{{ event.title }}</div>
          <div class="vuecal__event-time">
            {{ event.startTime.slice(0, -3) }} -
            {{ event.endTime.slice(0, -3) }}
          </div>
          <div class="vuecal__event-description" v-if="event.description">
            {{ event.description }}
          </div>
        </div>
      </template>
    </vue-cal>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

interface CalendarEvent {
  start: string;
  end: string;
  title: string;
  description: string;
  [key: string]: any;
}

const events = ref<CalendarEvent[]>([]);

const props = defineProps<{
  events: CalendarEvent[];
}>();

watch(
  () => props.events,
  (newEvents) => {
    events.value = newEvents;
  },
  { deep: true, immediate: true }
);

const onEventClick = (event: CalendarEvent) => {
  console.log("Событие кликнуто:", event);
};
</script>

<style scoped>
.calendar-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-inner {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
}
</style>

<style>
.vuecal__title-bar button {
  font-weight: 700;
  font-size: 1.4em;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 10px;
  border-radius: 4px;
  transition: all 0.2s;
}

.vuecal__title-bar button:hover {
  transform: scale(1.05);
}

.vuecal__title-bar button:focus {
  outline: none;
}

.vuecal {
  border: none;
  color: #333;
  height: 100%;
}

.vuecal__header {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  padding: 20px 0;
}

.vuecal__title {
  font-size: 1.4em;
  font-weight: 700;
}

.vuecal__arrow {
  color: white;
  transition: all 0.2s;
  font-weight: 700;
}

.vuecal__arrow:hover {
  transform: scale(1.2);
}

.vuecal__weekdays-headings {
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
}

.vuecal__weekday-header {
  font-weight: 700;
  color: #495057;
}

.vuecal__cell {
  border-right: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  transition: background 0.2s;
}

.vuecal__cell:hover {
  background-color: #f8f9fa;
}

.vuecal__cell-date {
  padding: 5px;
  font-weight: 700;
}

.vuecal__cell--today {
  background-color: rgba(76, 175, 80, 0.1);
}

.vuecal__cell--today .vuecal__cell-date {
  color: #4caf50;
}

.vuecal__cell--selected {
  background-color: rgba(76, 175, 80, 0.2);
}

.vuecal__event {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  border-radius: 4px;
  padding: 4px 6px;
  margin-bottom: 2px;
  font-size: 0.9em;
  border-left: 3px solid #388e3c;
  transition: all 0.2s;
}

.vuecal__event:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.vuecal__event-time {
  font-size: 0.85em;
  opacity: 0.9;
  margin-bottom: 2px;
}
</style>
