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

            <div class="stats-row mt-3 pt-2 border-top d-flex align-items-center justify-content-around">
              <div class="text-center">
                <span class="d-block text-muted small">Событий</span>
                <span class="fw-bold">{{ calendarEvents.length }}</span>
              </div>

              <div class="vertical-divider"></div>

              <div class="text-center">
                <span class="d-block text-muted small">Друзей</span>
                <span class="fw-bold">{{ selectedFriendsCount }}</span>
              </div>
            </div>

          </div>
        </div>

        <div class="card flex-grow-1 mb-3" style="overflow: hidden;">
          <div class="card-body d-flex flex-column h-100 p-3">
            <div class="d-flex justify-content-between align-items-center mb-2 flex-shrink-0">
              <h5 class="card-title mb-0">Друзья</h5>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="selectAllFriends"
                  :checked="areAllFriendsSelected"
                  @change="toggleAllFriends"
                />
                <label class="form-check-label small" for="selectAllFriends">
                  Все
                </label>
              </div>
            </div>

            <div class="friends-list-container flex-grow-1 overflow-auto">
              <div
                v-for="friend in friends"
                :key="friend.getUserUID()"
                class="friend-item d-flex align-items-center mb-2 p-2 border rounded"
              >
                <div class="form-check mb-0 flex-grow-1">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'friend-' + friend.getUserUID()"
                    :checked="isFriendSelected(friend)"
                    @change="toggleFriendSelection(friend, $event.target.checked)"
                  />
                  <label
                    class="form-check-label d-flex align-items-center w-100"
                    :for="'friend-' + friend.getUserUID()"
                    style="cursor: pointer;"
                  >
                    <div class="ms-2 text-truncate">
                      <strong>{{ friend.getFirstName() }} {{ friend.getLastName() }}</strong>
                      <div class="text-muted small text-truncate">{{ friend.getEmail() }}</div>
                    </div>
                  </label>
                </div>
              </div>

              <div v-if="friends.length === 0" class="text-center text-muted p-3">
                Нет друзей для отображения
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-9 h-100 d-flex flex-column calendar-column">
        <div class="card calendar-card d-flex flex-column mb-3">
          <div class="card-body p-0 flex-grow-1" style="overflow: hidden;">
            <TestCalendar :events="calendarEvents" />
          </div>
        </div>
      </div>

    </div>

    <PeopleList
      v-show="false"
      ref="peopleListRef"
      :profile="profile"
      :friends="friends"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, onMounted } from "vue";
import TestCalendar from "@/components/TestCalendar.vue";
import PeopleList from "@/components/PeopleList.vue";
import type { Profile } from "@/core/Profile";
import { Event } from "@/core/Event";
import { People } from "@/core/People";
import { PersonFilter } from "@/core/PersonFilter";
import { RelationToAuthorizedUser } from "@/core/Enum";
import type { Person } from "@/core/Person";

const props = defineProps<{
  profile: Profile;
}>();

const user = computed(() => props.profile.getAuthorizedUser());
const searchStartDate = ref<Date>(new Date());
const searchEndDate = ref<Date>(new Date());
const manualStartDate = ref(formatDateInput(searchStartDate.value));
const manualEndDate = ref(formatDateInput(searchEndDate.value));
const calendarEvents = ref<any[]>([]);
const friends = ref<Person[]>([]);
const selectedFriendIds = ref<Set<number>>(new Set());
const peopleListRef = ref<InstanceType<typeof PeopleList>>();

// Вычисляемые свойства
const selectedFriendsCount = computed(() => selectedFriendIds.value.size);
const areAllFriendsSelected = computed(() => {
  return friends.value.length > 0 &&
    selectedFriendIds.value.size === friends.value.length;
});

function isFriendSelected(friend: Person): boolean {
  return selectedFriendIds.value.has(friend.getUserUID());
}

function toggleFriendSelection(friend: Person, checked: boolean): void {
  if (checked) {
    selectedFriendIds.value.add(friend.getUserUID());
  } else {
    selectedFriendIds.value.delete(friend.getUserUID());
  }
}

function toggleAllFriends(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  selectedFriendIds.value.clear();

  if (checked) {
    friends.value.forEach(friend => {
      selectedFriendIds.value.add(friend.getUserUID());
    });
  }
}

async function loadFriends() {
  if (!user.value?.getUserUID()) return;

  try {
    const filter = new PersonFilter(
      undefined,
      undefined,
      undefined,
      RelationToAuthorizedUser.FRIEND
    );
    friends.value = await People.getPeopleByFilter(filter);
  } catch (error) {
    console.error("Error loading friends:", error);
    friends.value = [];
  }
}

async function loadEventsForSelectedUsers() {
  const userID = user.value?.getUserUID();
  if (!userID || !searchStartDate.value || !searchEndDate.value) {
    calendarEvents.value = [];
    return;
  }

  try {
    const userIdsToLoad = [userID];
    friends.value.forEach(friend => {
      if (selectedFriendIds.value.has(friend.getUserUID())) {
        userIdsToLoad.push(friend.getUserUID());
      }
    });

    const eventsPromises = userIdsToLoad.map(userId =>
      Event.getEvents(userId, searchStartDate.value, searchEndDate.value)
    );

    const eventsArrays = await Promise.all(eventsPromises);
    const allEvents: any[] = [];

    eventsArrays.forEach((userEvents, index) => {
      const userId = userIdsToLoad[index];
      const userPerson = userId === userID
        ? user.value
        : friends.value.find(f => f.getUserUID() === userId);

      const userName = userPerson
        ? `${userPerson.getFirstName()} ${userPerson.getLastName()}`
        : 'Неизвестный';

      userEvents.forEach(event => {
        allEvents.push({
          start: formatDateToYMD(event.getDate()) + " " + event.getStartTime().slice(0, -3),
          end: formatDateToYMD(event.getDate()) + " " + event.getEndTime().slice(0, -3),
          description: event.getDescription(),
          class: userId === userID ? "event-normal" : "event-friend",
          title: event.getTitle() || "Без имени",
          userName: userName,
          userId: userId,
          isFriendEvent: userId !== userID,
          ...event,
        });
      });
    });

    calendarEvents.value = allEvents;
  } catch (error) {
    console.error("Error loading events:", error);
    calendarEvents.value = [];
  }
}

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

onMounted(async () => {
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

  await loadFriends();
});

watch(
  () => [user.value, searchStartDate.value, searchEndDate.value, selectedFriendIds.value.size],
  async () => {
    await loadEventsForSelectedUsers();
    localStorage.setItem('calendarStartDate', formatDateInput(searchStartDate.value))
    localStorage.setItem('calendarEndDate', formatDateInput(searchEndDate.value))
  },
  { immediate: true }
);

watch(
  () => user.value,
  async () => {
    await loadFriends();
    selectedFriendIds.value.clear();
  }
);

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

.form-control {
  font-size: 0.9rem;
}

.vertical-divider {
  width: 1px;
  height: 24px;
  background-color: #dee2e6;
  margin: 0 10px;
}

.friends-list-container {
  padding-right: 5px;
}

.friend-item {
  transition: all 0.2s ease;
  background-color: #f8f9fa;
}

.friend-item:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.friend-item .form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.friends-list-container::-webkit-scrollbar {
  width: 6px;
}

.friends-list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.friends-list-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.friends-list-container::-webkit-scrollbar-thumb:hover {
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
    height: auto !important;
  }

  .row {
    height: auto !important;
    overflow: visible !important;
  }
}
</style>
