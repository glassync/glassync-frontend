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
import { People } from "@/core/People";

const profile = reactive(Profile.getInstance());
// const person = await People.getPersonByUID(6);
// console.log(person);
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
