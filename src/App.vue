<template>
  <div id="app">
    <NavbarApp :profile="profile" />
    <div class="main-content">
      <router-view :profile="profile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Profile } from "@/core/Profile";
import NavbarApp from "@/components/NavbarApp.vue";

const profile = reactive(Profile.getInstance());
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
</style>
