<template>
  <div class="container-fluid mt-3">
    <div class="row" style="height: calc(100vh - 138px); overflow: hidden;">

      <div class="col-3 d-flex flex-column h-100">
        <div class="card mb-3 flex-shrink-0">
          <div class="card-body">
            <h5 class="card-title mb-3">Фильтр по датам</h5>

            <div class="mb-2">
              <label for="startDate" class="form-label">Начало</label>
              <input
                id="startDate"
                type="date"
                class="form-control"
                v-model="manualStartDate"
              />
            </div>

            <div class="mb-3">
              <label for="endDate" class="form-label">Конец</label>
              <input
                id="endDate"
                type="date"
                class="form-control"
                v-model="manualEndDate"
              />
            </div>

            <button
              class="btn btn-primary w-100"
              @click="applyManualDateRange"
            >
              Применить
            </button>
          </div>
        </div>

        <div class="events-header d-flex justify-content-between align-items-center mt-3 flex-shrink-0">
          <h2 class="mb-0">События</h2>
          <button class="btn btn-create" @click="goToCreateEvent" title="Добавить новое событие">
            Создать событие
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
        </div>

        <div class="flex-grow-1 overflow-auto event-list-container">
          <EventList :events="userEvents" />
        </div>
      </div>

      <div class="col-9 d-flex flex-column calendar-column">
        <div class="card calendar-card d-flex flex-column mb-3">
          <div class="card-body p-0" style="overflow: hidden;">
            <TestCalendar :events="calendarEvents" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
import EventList from "@/components/EventList.vue";
import { Events } from "@/core/Events";
import TestCalendar from "@/components/TestCalendar.vue";
import type { Profile } from "@/core/Profile";
import { Event } from "@/core/Event";

const props = defineProps<{
  profile: Profile;
}>();

const user = computed(() => props.profile.getAuthorizedUser());

const searchStartDate = ref<Date>(new Date());
const searchEndDate = ref<Date>(new Date());

const manualStartDate = ref(formatDateInput(searchStartDate.value));
const manualEndDate = ref(formatDateInput(searchEndDate.value));

const userEvents = ref<Event[]>([]);

interface CalendarEvent {
  start: string;
  end: string;
  title: string;
  description: string;
  [key: string]: any;
}

const calendarEvents = ref<CalendarEvent[]>([]);

function formatDateToYMD(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateCalendarEvents() {
  calendarEvents.value = [];
  for (const event of userEvents.value) {
    calendarEvents.value.push({
      start: formatDateToYMD(event.getDate()) + " " + event.getStartTime().slice(0, -3),
      end: formatDateToYMD(event.getDate()) + " " + event.getEndTime().slice(0, -3),
      description: event.getDescription(),
      class: "event-normal",
      title: event.getTitle() || "Без имени",
      ...event,
    });
  }
}

onMounted(() => {
  const savedStart = localStorage.getItem('calendarStartDate')
  const savedEnd = localStorage.getItem('calendarEndDate')

  if (savedStart) {
    searchStartDate.value = new Date(savedStart)
    manualStartDate.value = savedStart
  }
  if (savedEnd) {
    searchEndDate.value = new Date(savedEnd)
    manualEndDate.value = savedEnd
  }
})

watch(
  () => [user.value],
  async () => {
    const userID = user.value?.getUserUID();
    if (userID) {
      try {
        userEvents.value = await Event.getEvents(
          userID,
          searchStartDate.value,
          searchEndDate.value
        );
        updateCalendarEvents();
      } catch (error) {
        console.error("Error loading events:", error);
        userEvents.value = [];
      }
    } else {
      userEvents.value = [];
    }
  },
  { immediate: true }
);

watch(
  () => [user.value, searchStartDate.value, searchEndDate.value],
  async () => {
    const userID = user.value?.getUserUID();
    if (userID && searchStartDate.value && searchEndDate.value) {
      try {
        userEvents.value = await Event.getEvents(
          userID,
          searchStartDate.value,
          searchEndDate.value
        );
        updateCalendarEvents();
        manualStartDate.value = formatDateInput(searchStartDate.value);
        manualEndDate.value = formatDateInput(searchEndDate.value);
      } catch (error) {
        console.error("Error loading events:", error);
        userEvents.value = [];
      }
    } else {
      userEvents.value = [];
    }
    localStorage.setItem('calendarStartDate', formatDateInput(searchStartDate.value))
    localStorage.setItem('calendarEndDate', formatDateInput(searchEndDate.value))
  },
  { immediate: true }
);

const router = useRouter();

function goToCreateEvent() {
  router.push("/event");
}

function formatDateInput(date: Date): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

async function applyManualDateRange() {
  const start = new Date(manualStartDate.value);
  const end = new Date(manualEndDate.value);

  if (start <= end) {
    searchStartDate.value = start;
    searchEndDate.value = end;

    localStorage.setItem('calendarStartDate', manualStartDate.value);
    localStorage.setItem('calendarEndDate', manualEndDate.value);
  } else {
    alert("Дата начала не может быть позже даты окончания");
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0);
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-weight: 600;
  color: #212529;
  font-size: 1.1rem;
}

.form-label {
  font-weight: 500;
  color: #495057;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-create {
  background-color: #ffffff;
  border-color: #dee2e6;
  padding: 0.5rem 0.75rem;
  color: #212529;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-create:hover {
  background-color: #f8f9fa;
  border-color: #adb5bd;
  color: #000000;
}

.form-control {
  font-size: 0.9rem;
}

.events-header {
  padding: 0 0.5rem;
  gap: 10px;
}

.events-header h2 {
  font-weight: 600;
  color: #212529;
  font-size: 2rem;
  margin-bottom: 0;
}

.event-list-container {
  padding-right: 5px;
}

.event-list-container::-webkit-scrollbar {
  width: 6px;
}

.event-list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.event-list-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.event-list-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.calendar-column {
  height: 100%;
  max-height: 100%;
}

.calendar-card {
  height: 100%;
  flex-shrink: 1;
}

@media (max-width: 768px) {
  .col-3, .col-9 {
    width: 100%;
    margin-bottom: 1rem;
    height: auto ;
  }

  .row {
    height: auto ;
    overflow: visible ;
  }

  .calendar-column {
    max-height: 100%;
  }
}
</style>
