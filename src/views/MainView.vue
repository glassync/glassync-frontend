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
import { ref, computed, watch, defineProps } from "vue";
import { useRouter } from "vue-router";
import EventList from "@/components/EventList.vue";
import Calendar from "@/components/Calendar.vue";
import { Events } from "@/core/Events";
import type { Profile } from "@/core/Profile";
import type { Event } from "@/core/Event";

const props = defineProps<{
  profile: Profile;
}>();

const user = computed(() => props.profile.getAuthorizedUser());

// ToDo: ещё нужно брать диапазон поиска событий, его из календаря брать?
// Заглушки для дат диапазона
const now = new Date();
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const searchStartDate = ref<Date>(startOfDay);
const searchEndDate = ref<Date>(endOfDay);

const eventsInstance = Events.getInstance();
const events = ref<Event[]>([]);

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
