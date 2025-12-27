<template>
  <div class="people-list" :style="{ height: maxHeight + 'px' }">
    <PersonCard
      v-for="person in friends"
      :key="'friend-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.FRIEND"
      :profile="profile"
      @relationChanged="$emit('relationChanged')"
    />
    <PersonCard
      v-for="person in pending"
      :key="'pending-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST"
      :profile="profile"
      @relationChanged="$emit('relationChanged')"
    />
    <PersonCard
      v-for="person in noRelations"
      :key="'no-rel-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.NO_RELATION"
      :profile="profile"
      @relationChanged="$emit('relationChanged')"
    />
    <PersonCard
      v-for="person in sentRequests"
      :key="'sent-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.SENT_FRIEND_REQUEST"
      :profile="profile"
      @relationChanged="$emit('relationChanged')"
    />
    <PersonCard
      v-for="person in selectable"
      :key="'select-' + person.getUserUID()"
      :person="person"
      :profile="profile"
      :defaultChecked="selectedPeopleMap.get(person.getUserUID()) ?? false"
      @check="onCheck"
      @relationChanged="$emit('relationChanged')"
    />
    <div v-if="isEmpty" class="empty-state">
      Нет пользователей
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineExpose, defineEmits } from "vue";
import PersonCard from "./PersonCard.vue";
import type { Person } from "@/core/Person";
import type { Profile } from "@/core/Profile";
import { RelationToAuthorizedUser } from "@/core/Enum";

const props = defineProps({
  profile: { type: Object as () => Profile, required: true },
  friends: { type: Array as () => Person[], default: () => [] },
  pending: { type: Array as () => Person[], default: () => [] },
  noRelations: { type: Array as () => Person[], default: () => [] },
  sentRequests: { type: Array as () => Person[], default: () => [] },
  selectable: { type: Array as () => Person[], default: () => [] },
  maxHeight: { type: Number, default: 400 },
});

const emit = defineEmits<{
  (e: "relationChanged"): void;
}>();

const selectedPeopleMap = ref(new Map<number, boolean>());

function onCheck(person: Person, checked: boolean) {
  selectedPeopleMap.value.set(person.getUserUID(), checked);
}

const selectedPeople = computed(() =>
  props.selectable.filter((p) => selectedPeopleMap.value.get(p.getUserUID()))
);

defineExpose({ selectedPeople });

const isEmpty = computed(
  () =>
    props.friends.length === 0 &&
    props.pending.length === 0 &&
    props.noRelations.length === 0 &&
    props.sentRequests.length === 0 &&
    props.selectable.length === 0
);
</script>

<style scoped>
.people-list {
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.empty-state {
  color: #6c757d;
  font-size: 1rem;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
</style>
