<template>
  <div
    class="overflow-auto border rounded p-2"
    :style="{ maxHeight: maxHeight + 'px' }"
  >
    <PersonCard
      v-for="person in friends"
      :key="'friend-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.FRIEND"
      :profile="profile"
    />
    <PersonCard
      v-for="person in pending"
      :key="'pending-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST"
      :profile="profile"
    />
    <PersonCard
      v-for="person in noRelation"
      :key="'no-rel-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.NO_RELATION"
      :profile="profile"
    />
    <PersonCard
      v-for="person in sentRequests"
      :key="'sent-' + person.getUserUID()"
      :person="person"
      :relation="RelationToAuthorizedUser.SENT_FRIEND_REQUEST"
      :profile="profile"
    />
    <PersonCard
      v-for="person in selectable"
      :key="'select-' + person.getUserUID()"
      :person="person"
      :profile="profile"
      :defaultChecked="selectedPeopleMap.get(person.getUserUID()) ?? false"
      @check="onCheck"
    />
    <p v-if="isEmpty" class="text-muted">Нет пользователей</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineExpose } from "vue";
import PersonCard from "./PersonCard.vue";
import type { Person } from "@/core/Person";
import type { Profile } from "@/core/Profile";
import { RelationToAuthorizedUser } from "@/core/Enum";

const props = defineProps({
  profile: { type: Object as () => Profile, required: true },
  friends: { type: Array as () => Person[], default: () => [] },
  pending: { type: Array as () => Person[], default: () => [] },
  noRelation: { type: Array as () => Person[], default: () => [] },
  sentRequests: { type: Array as () => Person[], default: () => [] },
  selectable: { type: Array as () => Person[], default: () => [] },
  maxHeight: { type: Number, default: 400 },
});

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
    props.noRelation.length === 0 &&
    props.sentRequests.length === 0 &&
    props.selectable.length === 0
);
</script>
