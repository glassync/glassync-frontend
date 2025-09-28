<template>
  <div class="profile-page container py-4">
    <div class="profile-header text-center mb-4">
      <div class="avatar-container position-relative d-inline-block mb-3">
        <img
          :src="defaultAvatar"
          alt="Аватар"
          class="avatar rounded-circle border border-success"
        />
        <button
          @click="changeAvatar"
          class="avatar-edit-btn btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle"
          title="Изменить аватар"
        >
          ✏️
        </button>
      </div>
      <h1>{{ user?.getFirstName() }} {{ user?.getLastName() }}</h1>
      <p class="username text-muted">@{{ user?.getNickname() }}</p>
    </div>

    <div class="mb-4 pt-4 platforms-centered">
      <!-- TODO вставить корректный тег бота-->
      <TelegramLoginWidget
        bot-username="glassync_bot"
        url-callback="https://telegram.org/js/telegram-widget.js?22"
      />
    </div>

    <div class="mb-4 pb-4 platforms-centered">
      <NotificationPlatformList :platforms="notificationPlatforms" />
    </div>

    <div class="btn-group-centered gap-3">
      <button @click="editProfile" class="btn btn-success btn-lg">
        Редактировать профиль
      </button>
      <button @click="logout" class="btn btn-danger btn-lg">
        Выйти из аккаунта
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import NotificationPlatformList from "@/components/NotificationPlatformList.vue";
import { defineProps, ref, onMounted } from "vue";
import router from "@/router";
import TelegramLoginWidget from "@/components/TelegramAuthWidget.vue";
import type { NotificationPlatform } from "@/core/NotificationPlatform";

const props = defineProps<{
  profile: Profile;
}>();

const user = props.profile.getAuthorizedUser();
const defaultAvatar = "/images/ava.jpg";

const notificationPlatforms = ref<NotificationPlatform[]>([]);

onMounted(async () => {
  await props.profile.loadNotificationPlatforms();
  notificationPlatforms.value = props.profile.getNotificationPlatforms();
});

function changeAvatar() {
  alert("Изменить аватар");
}

function editProfile() {
  router.push("/edit-profile");
}

async function logout() {
  alert("Выйти из аккаунта");
  await props.profile.logout();
  router.push("/authorization");
}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.avatar-edit-btn {
  width: 32px;
  height: 32px;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
.username {
  font-size: 1.1rem;
}

.platforms-centered {
  display: flex;
  justify-content: center;
}

.btn-group-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.btn-group-centered > button {
  width: auto;
  min-width: 0;
}
</style>
