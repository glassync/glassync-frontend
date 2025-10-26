<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-3 d-flex flex-column" style="height: 90vh">
        <button class="btn btn-primary mb-3" @click="goToCreateEvent">
          Создать событие
        </button>

        <div class="flex-grow-1 overflow-auto">
          <EventList :title="'События'" :events="events" />
        </div>
      </div>
      <div class="col-9" style="height: 90vh; overflow: auto">
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
import type { Event } from "@/core/Event";

import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

const props = defineProps<{
  profile: Profile;
}>();

const user = computed(() => props.profile.getAuthorizedUser());

const searchStartDate = ref<Date>(new Date());
const searchEndDate = ref<Date>(new Date());

const eventsInstance = Events.getInstance();
const events = ref<Event[]>([]);

// Маппинг наших событий в формат vue-cal
const vueCalEvents = computed(() => {
  return events.value.map((ev) => ({
    start: formatDateTime(ev.getDate(), ev.getStartTime()),
    end: formatDateTime(ev.getDate(), ev.getEndTime()),
    title: ev.getTitle(),
    eventObj: ev, // можно передавать сам объект события для клика
  }));
});

watch(
  () => [user.value, searchStartDate.value, searchEndDate.value],
  () => {
    if (user.value && searchStartDate.value && searchEndDate.value) {
      events.value = eventsInstance.getUserEvents(
        user.value,
        searchStartDate.value,
        searchEndDate.value
      );
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

// Обработчик смены вида / диапазона дат в vue-cal
function onViewChange({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  searchStartDate.value = startDate;
  searchEndDate.value = endDate;
}

// Вспомогательная функция для конвертации даты + времени в строку ISO
function formatDateTime(date: Date, timeStr: string): string {
  if (!timeStr) return date.toISOString();

  // timeStr ожидается в формате HH:mm
  const [hours, minutes] = timeStr.split(":").map(Number);
  const d = new Date(date);
  d.setHours(hours);
  d.setMinutes(minutes);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d.toISOString();
}

// Обработчик клика по событию
function onCellClick(event: any) {
  if (event?.eventObj) {
    console.log("Клик по событию:", event.eventObj);
  }
}
</script>
