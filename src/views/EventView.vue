<template>
  <div>
    <EventForm :profile="profile" :event="event" />
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import type { Event } from "@/core/Event";
import { defineProps } from "vue";

import EventForm from "@/components/EventForm.vue";

defineProps<{
  profile: Profile;
  event?: Event;
}>();
</script>
