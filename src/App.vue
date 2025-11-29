<template>
  <Navbar :profile="profile" />
  <div class="main-content">
    <router-view :profile="profile" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Profile } from "@/core/Profile";
import Navbar from "@/components/Navbar.vue";

const profile = reactive(new Profile(/* параметры, если нужно */));
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
