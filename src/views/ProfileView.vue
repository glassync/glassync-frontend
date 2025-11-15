<template>
  <div class="profile-page container py-4">
    <div class="profile-header text-center mb-4">
      <div class="avatar-container position-relative d-inline-block mb-3">
        <img
          :src="profile.getAvatarUrl() || defaultAvatar"
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
      <h1>{{ profile.getFullName() }}</h1>
      <p class="username text-muted">@{{ profile.getNickname() }}</p>
    </div>

    <NotificationPlatformList
      :platforms="profile.getNotificationPlatforms()"
      class="mb-4"
    />

    <div class="d-grid gap-2">
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
import { defineProps } from "vue";

const props = defineProps<{
  profile: Profile;
}>();

const defaultAvatar = "/images/default-avatar.png"; // Todo: путь к дефолтному аватару

function changeAvatar() {
  // Todo: Логика изменения аватара
  alert("Изменить аватар");
}

function editProfile() {
  // Todo: Логика редактирования профиля
  alert("Редактировать профиль");
}

function logout() {
  // Todo: Логика выхода из аккаунта
  alert("Выйти из аккаунта");
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
</style>
