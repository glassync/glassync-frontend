<template>
  <div class="layout">
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
import { defineProps, ref, watch, onMounted } from "vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

interface CalendarEvent {
  start: string;
  end: string;
  title: string;
  description: string;
  [key: string]: any; // для дополнительных свойств
}
const events = ref([
  {
    start: "2025-05-28 10:00",
    end: "2025-05-28 11:00",
    title: "Тестовое событие 1",
  },
  {
    start: "2025-05-29 14:00",
    end: "2025-05-29 15:30",
    title: "Тестовое событие 2",
  },
]);

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

console.log("Initial events:", props.events);

const onEventClick = (event: CalendarEvent) => {
  console.log("Событие кликнуто:", event);
};
</script>

<style>
.vuecal__title-bar button {
  font-weight: 700; /* Жирный шрифт */
  font-size: 1.4em; /* Размер как у заголовка */
  color: white; /* Белый текст */
  background: transparent; /* Прозрачный фон */
  border: none; /* Убираем границу */
  cursor: pointer; /* Курсор-указатель */
  padding: 0 10px; /* Отступы */
  border-radius: 4px; /* Скругленные углы */
  transition: all 0.2s; /* Плавные переходы */
}

.vuecal__title-bar button:hover {
  transform: scale(1.05); /* Небольшое увеличение */
}

.vuecal__title-bar button:focus {
  outline: none; /* Убираем стандартный outline */
}

.layout {
  height: 100%;
  padding: 20px;
  background: #f5f7fa;
}

.calendar-inner {
  height: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Общие стили календаря */
.vuecal {
  border: none;
  color: #333;
}

.vuecal__header {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  padding: 20px 0;
  border-radius: 12px 12px 0 0;
}

.vuecal__title {
  font-size: 1.4em;
  font-weight: 700; /* Жирный шрифт */
}

.vuecal__arrow {
  color: white;
  transition: all 0.2s;
  font-weight: 700; /* Жирный шрифт */
}

.vuecal__arrow:hover {
  transform: scale(1.2);
}

/* Дни недели */
.vuecal__weekdays-headings {
  background-color: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
}

.vuecal__weekday-header {
  font-weight: 700; /* Жирный шрифт */
  color: #495057;
}

/* Ячейки дней */
.vuecal__cell {
  height: 100px;
  border-right: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  transition: background 0.2s;
}

.vuecal__cell:hover {
  background-color: #f8f9fa;
}

.vuecal__cell-date {
  padding: 5px;
  font-weight: 700; /* Жирный шрифт */
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

/* События */
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

.vuecal__event-title {
}

/* Адаптивность */
@media (max-width: 768px) {
  .calendar-inner {
    height: 600px;
  }

  .vuecal__cell {
    height: 70px;
  }
}
</style>
