<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">
        {{ isEditMode ? "Редактировать событие" : "Создать событие" }}
      </h5>
      <button type="button" class="btn-close" @click="goBack"></button>
    </div>

    <form @submit.prevent="onSubmit" class="card-body">
      <div class="row">
        <!-- Левая колонка -->
        <div class="col-8">
          <!-- Название -->
          <small class="text-secondary">Название события</small>
          <input
            type="text"
            class="form-control mb-3"
            v-model="form.name"
            :class="{ 'is-invalid': validationErrors.name }"
            placeholder="Введите название"
            :disabled="!canEditAll"
            required
          />
          <div v-if="validationErrors.name" class="invalid-feedback">
            {{ validationErrors.name }}
          </div>

          <!-- Описание -->
          <small class="text-secondary">Описание</small>
          <textarea
            class="form-control mb-3"
            v-model="form.description"
            :disabled="!canEditAll"
            rows="3"
            placeholder="Введите описание"
          ></textarea>

          <div class="row">
            <!-- Когда состоится -->
            <div class="col-6">
              <h5>Когда состоится?</h5>

              <small class="text-secondary">Дата события</small>
              <input
                type="date"
                class="form-control mb-3"
                v-model="form.date"
                :class="{ 'is-invalid': validationErrors.date }"
                :disabled="!canEditAll"
                required
              />
              <div v-if="validationErrors.date" class="invalid-feedback">
                {{ validationErrors.date }}
              </div>

              <small class="text-secondary">Время начала</small>
              <input
                type="time"
                class="form-control mb-3"
                v-model="form.startTime"
                :disabled="!canEditAll"
              />

              <small class="text-secondary">Время конца</small>
              <input
                type="time"
                class="form-control mb-3"
                v-model="form.endTime"
                :disabled="!canEditAll"
              />
            </div>

            <!-- Будет повторяться -->
            <div class="col-6">
              <h5>Будет повторяться?</h5>

              <div class="form-check mb-3">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="repeatCheckbox"
                  v-model="form.repeat"
                  :disabled="!canEditAll"
                />
                <label class="form-check-label" for="repeatCheckbox"
                  >Повторять</label
                >
              </div>

              <div v-if="form.repeat">
                <small class="text-secondary">Повторить через</small>
                <input
                  type="number"
                  class="form-control mb-3"
                  v-model.number="form.repeatInterval"
                  min="1"
                  :disabled="!canEditAll"
                  placeholder="Введите число"
                />

                <small class="text-secondary">Мера времени</small>
                <select
                  class="form-select"
                  v-model="form.repeatIntervalType"
                  :disabled="!canEditAll"
                >
                  <option
                    v-for="(label, key) in intervalLabels"
                    :key="key"
                    :value="key"
                  >
                    {{ label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая колонка -->
        <div class="col-4 border-start ps-3">
          <h5>Напоминать?</h5>

          <div class="form-check mb-3">
            <input
              type="checkbox"
              class="form-check-input"
              id="remindCheckbox"
              v-model="form.remind"
            />
            <label class="form-check-label" for="remindCheckbox"
              >Включить напоминание</label
            >
          </div>

          <div v-if="form.remind">
            <small class="text-secondary">За сколько минут до начала?</small>
            <input
              type="number"
              class="form-control"
              v-model.number="form.remindMinutes"
              min="1"
              placeholder="Введите число"
            />
          </div>

          <h5 class="mt-4">Пригласить участников</h5>

          <!-- Для создателя: список selectable друзей (с чекбоксами, активными) -->
          <PeopleList
            v-if="isCreator"
            :profile="props.profile"
            :selectable="selectableFriends"
            v-model:selectedPeople="selectedParticipants"
          />

          <!-- Для не создателя: список участников без чекбоксов -->
          <PeopleList
            v-else
            :profile="props.profile"
            :sentRequests="eventParticipants"
          />
        </div>
      </div>
    </form>

    <div class="card-footer d-flex justify-content-end gap-2">
      <button
        v-if="!isEditMode"
        class="btn btn-primary"
        @click="onCreate"
        type="button"
      >
        Создать
      </button>

      <template v-else>
        <button
          v-if="isCreator"
          class="btn btn-success"
          @click="onSave"
          type="button"
        >
          Сохранить
        </button>
        <button
          v-if="isCreator"
          class="btn btn-danger"
          @click="onDelete"
          type="button"
        >
          Удалить
        </button>
        <button v-else class="btn btn-danger" @click="onQuit" type="button">
          Выйти
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import type { Person } from "@/core/Person";
import { ref, reactive, watch, defineProps } from "vue";
import { RecurrenceInterval } from "@/core/Enum";
import { Event } from "@/core/Event";
import { People } from "@/core/People";
import { PersonFilter } from "@/core/PersonFilter";
import { RelationToAuthorizedUser } from "@/core/Enum";
import PeopleList from "@/components/PeopleList.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  profile: Profile;
  event?: Event;
}>();

const isEditMode = ref(false);
const isCreator = ref(false);

const intervalLabels = {
  [RecurrenceInterval.DAILY]: "День",
  [RecurrenceInterval.WEEKLY]: "Неделя",
  [RecurrenceInterval.MONTHLY]: "Месяц",
};

const form = reactive({
  name: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  repeat: false,
  repeatInterval: 1,
  repeatIntervalType: RecurrenceInterval.DAILY,
  remind: false,
  remindMinutes: 1,
  invited: {} as Record<number, boolean>, // uid -> boolean
});

const validationErrors = reactive({
  name: "",
  date: "",
});

const peopleInstance = People.getInstance();

const selectableFriends = ref<Person[]>([]);
const eventParticipants = ref<Person[]>([]);
const selectedParticipants = ref<Person[]>([]);

watch(
  () => props.event,
  (event) => {
    const user = props.profile.getAuthorizedUser();
    if (event) {
      isEditMode.value = true;
      isCreator.value = user?.getUserUID() === event.getCreatorUID();

      form.name = event.getTitle();
      form.description = event.getDescription();

      form.date = formatDate(event.getDate());
      form.startTime = event.getStartTime();
      form.endTime = event.getEndTime();

      form.repeat = event.getRecurrenceValue() !== null;
      if (form.repeat) {
        form.repeatInterval = event.getRecurrenceValue() ?? 1;
        form.repeatIntervalType =
          event.getRecurrenceInterval() ?? RecurrenceInterval.DAILY;
      } else {
        form.repeatInterval = 1;
        form.repeatIntervalType = RecurrenceInterval.DAILY;
      }

      const remindTimes = event.getReminderTimes();
      if (remindTimes && remindTimes.length > 0) {
        form.remind = true;
        form.remindMinutes = remindTimes[0];
      } else {
        form.remind = false;
        form.remindMinutes = 1;
      }

      const friendsFilter = new PersonFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.FRIEND
      );
      const allFriends = peopleInstance.getPeopleByFilter(friendsFilter);

      const membersMap = event.getMembersMap();
      const participantsArr: Person[] = [];
      for (const [uid, included] of membersMap.entries()) {
        if (included) {
          const person = allFriends.find((f) => f.getUserUID() === uid);
          if (person) participantsArr.push(person);
        }
      }
      eventParticipants.value = participantsArr;

      if (isCreator.value) {
        selectableFriends.value = allFriends.filter(
          (f) => !membersMap.get(f.getUserUID())
        );

        form.invited = {};
        for (const friend of allFriends) {
          form.invited[friend.getUserUID()] =
            membersMap.get(friend.getUserUID()) ?? false;
        }

        selectedParticipants.value = allFriends.filter(
          (uid) => form.invited[uid.getUserUID()]
        );
      } else {
        selectableFriends.value = [];
        selectedParticipants.value = [];
      }
    } else {
      isEditMode.value = false;
      isCreator.value = true;

      form.name = "";
      form.description = "";
      form.date = "";
      form.startTime = "";
      form.endTime = "";

      form.repeat = false;
      form.repeatInterval = 1;
      form.repeatIntervalType = RecurrenceInterval.DAILY;

      form.remind = false;
      form.remindMinutes = 1;

      const friendsFilter = new PersonFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.FRIEND
      );
      selectableFriends.value = peopleInstance.getPeopleByFilter(friendsFilter);

      eventParticipants.value = [];
      selectedParticipants.value = [];
      form.invited = {};
      for (const friend of selectableFriends.value) {
        form.invited[friend.getUserUID()] = false;
      }
    }
  },
  { immediate: true }
);

function formatDate(date: Date): string {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function validate(): boolean {
  let valid = true;
  validationErrors.name = "";
  validationErrors.date = "";

  if (!form.name.trim()) {
    validationErrors.name = "Название обязательно";
    valid = false;
  }
  if (!form.date) {
    validationErrors.date = "Дата обязательна";
    valid = false;
  }
  return valid;
}

function buildEvent(): Event {
  const eventObj = new Event();

  if (isEditMode.value && props.event) {
    eventObj.setUID(props.event.getUID());
  }

  eventObj.setTitle(form.name.trim());
  eventObj.setDescription(form.description.trim());
  eventObj.setDate(new Date(form.date));
  eventObj.setStartTime(form.startTime || "");
  eventObj.setEndTime(form.endTime || "");

  if (form.repeat && form.repeatInterval > 0) {
    eventObj.setRecurrenceValue(form.repeatInterval);
    eventObj.setRecurrenceInterval(form.repeatIntervalType);
  }

  if (form.remind && form.remindMinutes > 0) {
    eventObj.setReminderTimes([form.remindMinutes]);
  } else {
    eventObj.setReminderTimes([]);
  }

  const membersMap = new Map<number, boolean>();

  if (isCreator.value) {
    for (const person of selectedParticipants.value) {
      membersMap.set(person.getUserUID(), true);
    }
  } else if (isEditMode.value && props.event) {
    const eventMembers = props.event.getMembersMap();
    for (const [uid, included] of eventMembers.entries()) {
      membersMap.set(uid, included);
    }
  }
  eventObj.setMembersMap(membersMap);

  return eventObj;
}

async function onCreate() {
  if (!validate()) return;

  const eventObj = buildEvent();
  const success = await props.profile.createEvent(eventObj);

  if (success) {
    goBack();
  } else {
    alert("Ошибка создания события");
  }
}

async function onSave() {
  if (!validate()) return;

  const eventObj = buildEvent();
  const success = await props.profile.updateEvent(eventObj);

  if (success) {
    goBack();
  } else {
    alert("Ошибка сохранения события");
  }
}

async function onDelete() {
  if (!props.event) return;

  const success = await props.profile.removeEvent(props.event);

  if (success) {
    goBack();
  } else {
    alert("Ошибка удаления события");
  }
}

async function onQuit() {
  if (!props.event) return;

  const success = await props.profile.quitEvent(props.event);

  if (success) {
    goBack();
  } else {
    alert("Ошибка выхода из события");
  }
}

const router = useRouter();
function goBack() {
  router.push("/");
}
</script>

<style scoped>
.card {
  max-width: 900px;
  margin: 1rem auto;
  padding: 1rem;
}

.card-body {
  max-height: 650px;
  overflow-y: auto;
}

.card-footer {
  border-top: none;
}

.border-start {
  border-left: 1px solid #ddd;
}
</style>
