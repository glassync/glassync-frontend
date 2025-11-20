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

          <div
            class="overflow-auto"
            :style="{ maxHeight: '300px', minHeight: '200px' }"
          >
            <div
              v-for="friend in friends"
              :key="friend.getUserUID()"
              class="form-check d-flex align-items-center mb-2"
            >
              <input
                class="form-check-input me-2"
                type="checkbox"
                :id="'friend-' + friend.getUserUID()"
                v-model="form.invited[friend.getUserUID()]"
              />
              <label
                class="form-check-label"
                :for="'friend-' + friend.getUserUID()"
                >{{ friend.getFirstName() }} {{ friend.getLastName() }}</label
              >
            </div>
          </div>
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

const props = defineProps<{
  profile: Profile;
  event?: Event;
  friends: Person[];
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

watch(
  () => props.event,
  (event) => {
    if (event) {
      isEditMode.value = true;
      const user = props.profile.getAuthorizedUser();
      isCreator.value = user?.getUserUID() === event.getCreatorUID();

      // Заполняем поля из события
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

      // Инициируем список приглашённых
      form.invited = {};
      for (const friend of props.friends) {
        form.invited[friend.getUserUID()] =
          event.getMembersMap().get(friend.getUserUID()) ?? false;
      }
    } else {
      isEditMode.value = false;
      isCreator.value = true; // Создатель - текущий пользователь

      // Инициализация пустой формы для создания
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

      form.invited = {};
      for (const friend of props.friends) {
        form.invited[friend.getUserUID()] = false; // По умолчанию приглашены все друзья
      }
    }
  },
  { immediate: true }
);

// Форматируем дату в yyyy-mm-dd
function formatDate(date: Date): string {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

// Валидация формы (название и дата обязательны)
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

// Формируем объект события из формы
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

  // Сформировать map участников
  const membersMap = new Map<number, boolean>();
  for (const uid in form.invited) {
    if (Object.prototype.hasOwnProperty.call(form.invited, uid)) {
      membersMap.set(Number(uid), form.invited[uid]);
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

function goBack() {
  // ToDo: логика перехода на главную страницу
  window.history.back();
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
