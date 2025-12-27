<template>
  <div id="app">
    <NavbarApp :profile="profile" />
    <div class="main-content">
      <div v-if="isLoading" class="loading-container">
        <div class="loading-spinner"></div>
      </div>
      <router-view v-else :profile="profile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { Profile } from "@/core/Profile";
import NavbarApp from "@/components/NavbarApp.vue";
import { People } from "@/core/People";
import { Person } from "@/core/Person";
import { setProfileInstance } from "@/router";

const profile = reactive(Profile.getInstance());
const isLoading = ref(true);

function hasSession() {
  return localStorage.getItem("userID") !== null;
}

async function loadProfile(): Promise<void> {
  try {
    const userID = Number(localStorage.getItem("userID"));
    if (!userID || isNaN(userID)) {
      console.error("Invalid userID");
    }

    const person = (await People.getPersonByUID(userID)) || new Person();
    profile.setPerson(person);
    console.log("Profile loaded:", person);
  } catch (error) {
    console.error("Failed to load profile:", error);
    profile.setPerson(new Person());
  } finally {
    setProfileInstance(profile);
    isLoading.value = false;
  }
}

onMounted(async () => {
  console.log("hasSession:", hasSession());
  if (hasSession()) {
    await loadProfile();
  } else {
    console.log("No session found");
    setProfileInstance(profile);
    isLoading.value = false;
  }
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.main-content {
  position: relative;
}
</style>
