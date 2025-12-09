<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="navbar-brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-calendar-check"
          viewBox="0 0 16 16"
        >
          <path
            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
          />
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
          />
        </svg>
        <span class="fs-2">Glassync</span>
      </router-link>
    </div>

    <div class="navbar-menu" v-if="isAuthorized">
      <router-link to="/" class="navbar-item fs-5">Главная</router-link>
      <router-link to="/glassies" class="navbar-item fs-5"
        >Занятость</router-link
      >
      <router-link to="/friends" class="navbar-item fs-5">Друзья</router-link>
    </div>

    <div class="navbar-menu" v-else></div>

    <div class="navbar-right">
      <template v-if="isAuthorized">
        <div class="notification-wrapper" ref="notificationWrapper">
          <button
            class="navbar-icon-btn"
            title="Уведомления"
            @click="toggleNotifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
              />
            </svg>
          </button>
        </div>

        <router-link to="/account" class="navbar-icon-btn" title="Аккаунт">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </router-link>
      </template>

      <template v-else>
        <router-link to="/authorization" class="navbar-icon-btn" title="Вход">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </router-link>
        <router-link
          to="/registration"
          class="navbar-icon-btn"
          title="Регистрация"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-box-arrow-in-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
            />
            <path
              fill-rule="evenodd"
              d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";

interface Profile {
  getAuthorizedUser(): any | null;
}

const props = defineProps<{ profile: Profile }>();

const showNotifications = ref(false);
const isAuthorized = computed(() => props.profile.getAuthorizedUser() !== null);

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
}
</script>

<style scoped>
.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.navbar-menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex: 2;
}

.navbar-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  gap: 8px;
}

.navbar-item.router-link-exact-active {
  color: #42b983;
  background-color: #e7f5ef;
}

.navbar-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 15px;
}

.navbar-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  background: none;
}

.navbar-icon-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.navbar-icon-btn:hover .nav-icon {
  transform: scale(1.1);
}

.notifications-dropdown {
  position: absolute;
  top: 55px;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
  border-radius: 6px;
  z-index: 10;
}
</style>
