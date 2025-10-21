<template>
  <div class="container-fluid vh-100 d-flex">
    <div class="col-4 d-flex flex-column">
      <h4 class="mb-3 text-center">Друзья</h4>
      <PeopleList
        :profile="profile"
        :friends="friends"
        class="flex-grow-1 overflow-auto"
      />
    </div>

    <div class="col-4 d-flex flex-column">
      <h4 class="mb-3 text-center">Поиск людей</h4>
      <PeopleSearch @filtersReady="onFiltersReady" />
      <h6
        v-if="searchResultsReady"
        class="text-secondary mt-3 mb-2 text-center"
      >
        Результаты поиска
      </h6>
      <PeopleList
        :profile="profile"
        :friends="searchFriends"
        :pendingResponses="searchPendingResponses"
        :noRelations="searchNoRelations"
        :sentRequests="searchSentRequests"
        v-if="searchResultsReady"
        class="flex-grow-1 overflow-auto"
      />
    </div>

    <div class="col-4 d-flex flex-column">
      <h4 class="mb-3 text-center">Заявки в друзья</h4>
      <PeopleList
        :profile="profile"
        :pendingResponses="pendingResponses"
        :sentRequests="sentRequests"
        class="flex-grow-1 overflow-auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import { ref, defineProps } from "vue";
import PeopleList from "@/components/PeopleList.vue";
import PeopleSearch from "@/components/PeopleSearch.vue";
import { People } from "@/core/People";
import { PersonFilter } from "@/core/PersonFilter";
import { RelationToAuthorizedUser } from "@/core/Enum";
import { Person } from "@/core/Person";

defineProps<{
  profile: Profile;
}>();

const peopleInstance = People.getInstance();

const friends = ref<Person[]>([]);
const pendingResponses = ref<Person[]>([]);
const sentRequests = ref<Person[]>([]);

const searchFriends = ref<Person[]>([]);
const searchPendingResponses = ref<Person[]>([]);
const searchNoRelations = ref<Person[]>([]);
const searchSentRequests = ref<Person[]>([]);
const searchResultsReady = ref(false);

function loadFriends() {
  const filter = new PersonFilter(
    undefined,
    undefined,
    undefined,
    undefined,
    RelationToAuthorizedUser.FRIEND
  );
  friends.value = peopleInstance.getPeopleByFilter(filter);
}

function loadFriendRequests() {
  const filterPending = new PersonFilter(
    undefined,
    undefined,
    undefined,
    undefined,
    RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
  );
  const filterSent = new PersonFilter(
    undefined,
    undefined,
    undefined,
    undefined,
    RelationToAuthorizedUser.SENT_FRIEND_REQUEST
  );
  pendingResponses.value = peopleInstance.getPeopleByFilter(filterPending);
  sentRequests.value = peopleInstance.getPeopleByFilter(filterSent);
}

function onFiltersReady(filters: PersonFilter[]) {
  searchFriends.value = peopleInstance.getPeopleByFilter(
    filters.find((f) => f.getRelation() === RelationToAuthorizedUser.FRIEND) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.FRIEND
      )
  );
  searchPendingResponses.value = peopleInstance.getPeopleByFilter(
    filters.find(
      (f) =>
        f.getRelation() === RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
    ) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
      )
  );
  searchNoRelations.value = peopleInstance.getPeopleByFilter(
    filters.find(
      (f) => f.getRelation() === RelationToAuthorizedUser.NO_RELATION
    ) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.NO_RELATION
      )
  );
  searchSentRequests.value = peopleInstance.getPeopleByFilter(
    filters.find(
      (f) => f.getRelation() === RelationToAuthorizedUser.SENT_FRIEND_REQUEST
    ) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.SENT_FRIEND_REQUEST
      )
  );

  searchResultsReady.value = true;
}

loadFriends();
loadFriendRequests();
</script>

<style scoped>
.container-fluid {
  padding: 20px;
}

.col-4 {
  border-left: 1px solid #ddd;
  padding-left: 15px;
  padding-right: 15px;
}

.col-4:first-child {
  border-left: none;
}

h4 {
  font-weight: 600;
}
</style>
