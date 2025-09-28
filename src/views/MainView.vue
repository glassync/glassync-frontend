<template>
  <div class="container-fluid mt-3">
    <div class="row" style="height: 90vh">
      <div class="col-3 d-flex flex-column">
        <button class="btn btn-primary mb-3" @click="goToCreateEvent">
          Создать событие
        </button>

        <div class="date-range-wrapper mb-3 mt-4">
          <div class="mb-2">
            <label for="startDate" class="form-label">Начало</label>
            <input
              id="startDate"
              type="date"
              class="form-control"
              v-model="manualStartDate"
            />
          </div>
          <div>
            <label for="endDate" class="form-label">Конец</label>
            <input
              id="endDate"
              type="date"
              class="form-control"
              v-model="manualEndDate"
            />
          </div>
          <button
            class="btn btn-primary mt-3 w-100"
            @click="applyManualDateRange"
          >
            Найти
          </button>
        </div>

        <div class="flex-grow-1 overflow-auto">
          <EventList :title="'События'" :events="events" />
        </div>
      </div>

      <div class="col-9" style="overflow: auto">
        <vue-cal
          style="height: 100%"
          default-view="week"
          :events="vueCalEvents"
          locale="ru"
          @view-change="onViewChange"
          @cell-click="onCellClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from "vue";
import { useRouter } from "vue-router";
import EventList from "@/components/EventList.vue";
import { Events } from "@/core/Events";
import type { Profile } from "@/core/Profile";
import { Event } from "@/core/Event";

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

const props = defineProps<{
  profile: Profile;
}>();

const user = computed(() => props.profile.getAuthorizedUser());

const searchStartDate = ref<Date>(new Date());
const searchEndDate = ref<Date>(new Date());

// Новые переменные для ручного ввода даты (строки формата yyyy-MM-dd)
const manualStartDate = ref(formatDateInput(searchStartDate.value));
const manualEndDate = ref(formatDateInput(searchEndDate.value));

const eventsInstance = Events.getInstance();
const events = ref<Event[]>([]);

// Маппинг событий в формат vue-cal
const vueCalEvents = computed(() => {
  return events.value.map((ev) => ({
    start: formatDateTime(ev.getDate(), ev.getStartTime()),
    end: formatDateTime(ev.getDate(), ev.getEndTime()),
    title: ev.getTitle(),
    eventObj: ev,
  }));
});

watch(
  () => [user.value, searchStartDate.value, searchEndDate.value],
  () => {
    if (user.value && searchStartDate.value && searchEndDate.value) {
      events.value = eventsInstance.getEvents(
        searchStartDate.value,
        searchEndDate.value
      );
      // Но по идее можно и так:
      // events.value = eventsInstance.getUserEvents(
      //   user.value,
      //   searchStartDate.value,
      //   searchEndDate.value
      // );
      // Обновляем ручные поля под новые даты (если меняется диапазон не вручную)
      manualStartDate.value = formatDateInput(searchStartDate.value);
      manualEndDate.value = formatDateInput(searchEndDate.value);
    } else {
      events.value = [];
    }
  },
  { immediate: true }
);

const router = useRouter();

function goToCreateEvent() {
  router.push("/event");
}

function onViewChange({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  searchStartDate.value = startDate;
  searchEndDate.value = endDate;
  // Обновляем ручные поля тоже
  manualStartDate.value = formatDateInput(startDate);
  manualEndDate.value = formatDateInput(endDate);
}

// Конвертация для vue-cal ISO с временем
function formatDateTime(date: Date, timeStr: string): string {
  if (!timeStr) return date.toISOString();

  const [hours, minutes] = timeStr.split(":").map(Number);
  const d = new Date(date);
  d.setHours(hours);
  d.setMinutes(minutes);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.toISOString();
}

// Конвертация даты для <input type="date">: из Date в строку yyyy-MM-dd
function formatDateInput(date: Date): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Обработчик применения ручного диапазона по кнопке
function applyManualDateRange() {
  const start = new Date(manualStartDate.value);
  const end = new Date(manualEndDate.value);

  if (start <= end) {
    searchStartDate.value = start;
    searchEndDate.value = end;
    const userID = user.value?.getUserUID();

    if (userID !== undefined) Event.getEvents(userID, start, end);
    else console.error("User ID is undefined");
  } else {
    alert("Дата начала не может быть позже даты окончания");
  }
}

function onCellClick(event: any) {
  if (event?.eventObj) {
    console.log("Клик по событию:", event.eventObj);
  }
}
</script>

<style scoped>
.date-range-wrapper {
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 576px) {
  .date-range-wrapper {
    max-width: 100%;
  }
}
</style>
