<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-3 d-flex flex-column" style="height: 90vh">
        <button class="btn btn-primary mb-3" @click="goToCreateEvent">
          Создать событие
        </button>

        <div class="flex-grow-1 overflow-auto">
          <EventList :title="'События дня'" :events="events" />
        </div>
      </div>
      <div class="col-9" style="height: 90vh; overflow: auto">
        <Calendar @dateRangeChanged="onDateRangeChanged" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import EventList from "@/components/EventList.vue";
import Calendar from "@/components/Calendar.vue";
import { Events } from "@/core/Events";
import { Person } from "@/core/Person";
import type { Event } from "@/core/Event";

// ToDo: человека брать из профиля, но откуда брать профиль?
const user = new Person(1, "Коля", "Иванов", "kolya", "kolya@example.com");

// ToDo: ещё нужно брать диапазон поиска событий, его из календаря брать?
// Заглушки для дат диапазона
const now = new Date();
const searchStartDate = ref(new Date(now.setHours(0, 0, 0, 0)));
const searchEndDate = ref(new Date(now.setHours(23, 59, 59, 999)));

const events = ref<Event[]>([]);
const eventsInstance = Events.getInstance();

watch(
  [searchStartDate, searchEndDate],
  () => {
    events.value = eventsInstance.getUserEvents(
      user,
      searchStartDate.value,
      searchEndDate.value
    );
  },
  { immediate: true }
);

function onDateRangeChanged({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  searchStartDate.value = startDate;
  searchEndDate.value = endDate;
}

const router = useRouter();
function goToCreateEvent() {
  // ToDo: логика перехода на страницу редактирования события
  router.push("/events/create");
}
</script>
