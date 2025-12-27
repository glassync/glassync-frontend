<template>
  <div class="card shadow-sm mb-3">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">{{ props.event.getTitle() }}</h5>
      <button class="btn btn-link p-0" @click="openDetails">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="black"
          class="bi bi-gear"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"
          />
          <path
            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
          />
        </svg>
      </button>
    </div>
    <div class="card-body">
      <p class="text-muted">
        {{ formatDate(props.event.getDate()) }} •
        {{ props.event.getStartTime().slice(0, -3) }} –
        {{ props.event.getEndTime().slice(0, -3) }}
      </p>
      <p>{{ props.event.getDescription() }}</p>

      <div class="dropdown">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Участники
        </button>
        <ul
          class="dropdown-menu overflow-auto"
          style="max-height: 150px; width: 200px"
        >
          <li v-for="person in members" :key="person.getUserUID()">
            <span class="dropdown-item d-flex align-items-center">
              <span class="me-2 badge bg-secondary">
                {{ person.getFirstName().charAt(0).toUpperCase() }}
                <!-- аватар сюда, если есть -->
              </span>
              {{ person.getFirstName() }} {{ person.getLastName() }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from "@/core/Event";
import type { Person } from "@/core/Person";
import { ref, watch, defineProps } from "vue";

import { People } from "@/core/People";
import { useRouter } from "vue-router";

const props = defineProps<{
  event: Event;
}>();

const router = useRouter();

const members = ref<Person[]>([]);

async function loadMembers() {
  members.value = [];
  const membersMap = props.event.getMembers();
  const loadedPersons: Person[] = [];

  for (const [uid, included] of membersMap.entries()) {
    if (included) {
      const person = await People.getPersonByUID(uid);
      if (person) loadedPersons.push(person);
    }
  }

  members.value = loadedPersons;
}

watch(
  () => props.event,
  () => {
    if (props.event) {
      loadMembers();
    } else {
      members.value = [];
    }
  },
  { immediate: true }
);

function openDetails() {
  console.log(props.event);
  const eventID = props.event.getUID();
  console.log(eventID);
  router.push({
    path: "/event",
    query: { eventUID: eventID },
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
</script>

<style scoped>
.badge {
  width: 24px;
  height: 24px;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  color: white;
  font-weight: bold;
}
</style>
