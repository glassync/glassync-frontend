<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-3 d-flex flex-column" style="height: 90vh">
        <button class="btn btn-primary mb-3" @click="goToCreateEvent">
          Создать событие
        </button>

        <div class="flex-grow-1 overflow-auto">
          <EventList
            :title="'События дня'"
            :user="user"
            :searchStartDate="searchStartDate"
            :searchEndDate="searchEndDate"
          />
        </div>
      </div>
      <div class="col-9" style="height: 90vh; overflow: auto">
        <Calendar @dateRangeChanged="onDateRangeChanged" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import EventList from "@/components/EventList.vue";
import Calendar from "@/components/Calendar.vue";
import { Person } from "@/core/Person";

// ToDo: человека брать из профиля, но откуда брать профиль?
// Заглушка для человека
const user = new Person(1, "Коля", "Иванов", "kolya", "kolya@example.com");

// ToDo: ещё нужно брать диапазон поиска событий, его из календаря брать?
// Заглушки для дат диапазона
const now = new Date();
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const endOfDay = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  23,
  59,
  59
);

const searchStartDate = ref<Date>(startOfDay);
const searchEndDate = ref<Date>(endOfDay);

const router = useRouter();

function goToCreateEvent() {
  // ToDo: логика перехода на страницу редактирования события
  router.push("/events/create");
}

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
</script>
