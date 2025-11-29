<template>
  <div class="container">
    <h3 class="pb-3">Данные пользователя</h3>

    <div class="row align-items-center mb-3">
      <label for="firstName" class="col-sm-2 col-form-label">Имя:</label>
      <div class="col-sm-7">
        <input
          v-model="form.firstName"
          type="text"
          class="form-control"
          id="firstName"
        />
      </div>
      <div class="col-sm-3">
        <button
          class="btn btn-secondary w-100"
          @click="updateFirstName"
          type="button"
        >
          Редактировать
        </button>
      </div>
      <div class="offset-sm-2 col-sm-12">
        <small
          v-if="messages.firstName"
          :class="messages.firstName.isError ? 'text-danger' : 'text-success'"
        >
          {{ messages.firstName.text }}
        </small>
      </div>
    </div>

    <div class="row align-items-center mb-3">
      <label for="lastName" class="col-sm-2 col-form-label">Фамилия:</label>
      <div class="col-sm-7">
        <input
          v-model="form.lastName"
          type="text"
          class="form-control"
          id="lastName"
        />
      </div>
      <div class="col-sm-3">
        <button
          class="btn btn-secondary w-100"
          @click="updateLastName"
          type="button"
        >
          Редактировать
        </button>
      </div>
      <div class="offset-sm-2 col-sm-12">
        <small
          v-if="messages.lastName"
          :class="messages.lastName.isError ? 'text-danger' : 'text-success'"
        >
          {{ messages.lastName.text }}
        </small>
      </div>
    </div>

    <div class="row align-items-center mb-3">
      <label for="nickname" class="col-sm-2 col-form-label">Никнейм:</label>
      <div class="col d-flex align-items-center">
        <div class="input-group">
          <span class="input-group-text">@</span>
          <input
            v-model="form.nickname"
            type="text"
            class="form-control"
            id="nickname"
          />
        </div>
      </div>
      <div class="col-sm-3">
        <button
          class="btn btn-secondary w-100"
          @click="updateNickname"
          type="button"
        >
          Редактировать
        </button>
      </div>
      <div class="offset-sm-2 col-sm-12 mt-1">
        <small
          v-if="messages.nickname"
          :class="messages.nickname.isError ? 'text-danger' : 'text-success'"
        >
          {{ messages.nickname.text }}
        </small>
      </div>
    </div>

    <div class="row align-items-center mb-3">
      <label for="email" class="col-sm-2 col-form-label">Почта:</label>
      <div class="col-sm-7">
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
        />
      </div>
      <div class="col-sm-3">
        <button
          class="btn btn-secondary w-100"
          @click="updateEmail"
          type="button"
        >
          Редактировать
        </button>
      </div>
      <div class="offset-sm-2 col-sm-12">
        <small
          v-if="messages.email"
          :class="messages.email.isError ? 'text-danger' : 'text-success'"
        >
          {{ messages.email.text }}
        </small>
      </div>
    </div>

    <hr />

    <h3 class="pb-3">Смена пароля</h3>

    <div class="row align-items-center mb-3">
      <label for="oldPassword" class="col-sm-3 col-form-label"
        >Старый пароль:</label
      >
      <div class="col-sm-9">
        <input
          v-model="passwords.oldPassword"
          type="password"
          id="oldPassword"
          class="form-control"
        />
      </div>
    </div>

    <div class="row align-items-center mb-3">
      <label for="newPassword" class="col-sm-3 col-form-label"
        >Новый пароль:</label
      >
      <div class="col-sm-9">
        <input
          v-model="passwords.newPassword"
          type="password"
          id="newPassword"
          class="form-control"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="offset-sm-3 col-sm-12">
        <small
          v-if="messages.password"
          :class="messages.password.isError ? 'text-danger' : 'text-success'"
        >
          {{ messages.password.text }}
        </small>
      </div>
    </div>

    <div class="row">
      <div class="offset-sm-3 col-sm-3">
        <button
          class="btn btn-secondary w-100"
          @click="changePassword"
          type="button"
        >
          Редактировать
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import { Person } from "@/core/Person";
import { reactive, defineProps, watch } from "vue";

const props = defineProps<{
  profile: Profile;
}>();

const form = reactive({
  firstName: "",
  lastName: "",
  nickname: "",
  email: "",
});

const passwords = reactive({
  oldPassword: "",
  newPassword: "",
});

const messages = reactive<{
  [key: string]: { text: string; isError: boolean } | undefined;
}>({
  firstName: undefined,
  lastName: undefined,
  nickname: undefined,
  email: undefined,
  password: undefined,
});

watch(
  () => props.profile,
  (newProfile) => {
    if (newProfile) {
      const user = newProfile.getAuthorizedUser();
      if (user) {
        form.firstName = user.getFirstName();
        form.lastName = user.getLastName();
        form.nickname = user.getNickname();
        form.email = user.getEmail();
      }
    }
  },
  { immediate: true }
);

function handleResult(
  field: keyof typeof messages,
  success: boolean,
  successMsg?: string
) {
  if (success) {
    messages[field] = { text: successMsg || "", isError: false };
  } else {
    messages[field] = { text: "Ошибка! Некорректные данные.", isError: true };
  }
}

// Создать новый объект Person с изменением только указанного поля
function createUpdatedUser(field: keyof typeof form): Person {
  const currentUser = props.profile.getAuthorizedUser();
  if (!currentUser) {
    throw new Error("Authorized user is not available");
  }

  return new Person(
    currentUser.getUserUID(),
    field === "firstName" ? form.firstName : currentUser.getFirstName(),
    field === "lastName" ? form.lastName : currentUser.getLastName(),
    field === "nickname" ? form.nickname : currentUser.getNickname(),
    field === "email" ? form.email : currentUser.getEmail()
  );
}

function updateFirstName() {
  const user = createUpdatedUser("firstName");
  const success = props.profile.updateProfile(user);
  handleResult("firstName", success, "Имя успешно обновлено!");
  if (success) {
    syncFormWithProfile();
  }
}

function updateLastName() {
  const user = createUpdatedUser("lastName");
  const success = props.profile.updateProfile(user);
  handleResult("lastName", success, "Фамилия успешно обновлена!");
  if (success) {
    syncFormWithProfile();
  }
}

function updateNickname() {
  const user = createUpdatedUser("nickname");
  const success = props.profile.updateProfile(user);
  handleResult("nickname", success, "Никнейм успешно обновлён!");
  if (success) {
    syncFormWithProfile();
  }
}

function updateEmail() {
  const user = createUpdatedUser("email");
  const success = props.profile.updateProfile(user);
  handleResult("email", success, "Почта успешно обновлена!");
  if (success) {
    syncFormWithProfile();
  }
}

function changePassword() {
  const success = props.profile.changePassword(
    passwords.oldPassword,
    passwords.newPassword
  );
  handleResult("password", success, "Пароль успешно обновлён!");
  if (success) {
    passwords.oldPassword = "";
    passwords.newPassword = "";
  }
}

// Обновить поля формы из текущих данных профиля
function syncFormWithProfile() {
  const user = props.profile.getAuthorizedUser();
  if (user) {
    form.firstName = user.getFirstName();
    form.lastName = user.getLastName();
    form.nickname = user.getNickname();
    form.email = user.getEmail();
  } else {
    form.firstName = "";
    form.lastName = "";
    form.nickname = "";
    form.email = "";
  }
}
</script>
