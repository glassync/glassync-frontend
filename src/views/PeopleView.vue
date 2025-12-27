<template>
  <div class="people-container">
    <div class="people-column">
      <h4 class="column-title">Друзья</h4>
      <PeopleList
        :profile="profile"
        :friends="friends"
        :maxHeight="listHeight"
        @relationChanged="reloadAll"
      />
    </div>

    <div class="people-column">
      <h4 class="column-title">Поиск людей</h4>
      <PeopleSearch @filtersReady="onFiltersReady" />
      <h6 v-if="searchResultsReady" class="results-label">
        Результаты поиска
      </h6>
      <PeopleList
        :profile="profile"
        :friends="searchFriends"
        :pending="searchPendingResponses"
        :noRelations="searchNoRelations"
        :sentRequests="searchSentRequests"
        :maxHeight="searchListHeight"
        v-if="searchResultsReady"
        @relationChanged="reloadAll"
      />
    </div>

    <div class="people-column">
      <h4 class="column-title">Заявки в друзья</h4>
      <PeopleList
        :profile="profile"
        :pending="pendingResponses"
        :sentRequests="sentRequests"
        :maxHeight="listHeight"
        @relationChanged="reloadAll"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/core/Profile";
import { ref, defineProps, onMounted, onBeforeUnmount } from "vue";
import PeopleList from "@/components/PeopleList.vue";
import PeopleSearch from "@/components/PeopleSearch.vue";
import { People } from "@/core/People";
import { PersonFilter } from "@/core/PersonFilter";
import { RelationToAuthorizedUser } from "@/core/Enum";
import { Person } from "@/core/Person";

defineProps<{
  profile: Profile;
}>();

const friends = ref<Person[]>([]);
const pendingResponses = ref<Person[]>([]);
const sentRequests = ref<Person[]>([]);

const searchFriends = ref<Person[]>([]);
const searchPendingResponses = ref<Person[]>([]);
const searchNoRelations = ref<Person[]>([]);
const searchSentRequests = ref<Person[]>([]);
const searchResultsReady = ref(false);

const listHeight = ref(400);
const searchListHeight = ref(350);

let lastSearchFilters: PersonFilter[] = [];

function updateHeights() {
  const headerPadding = 20;
  const titleHeight = 35;
  const titleMargin = 15;
  const gap = 20;
  const viewportHeight = window.innerHeight;

  listHeight.value = viewportHeight - headerPadding * 2 - titleHeight - titleMargin - gap;

  const searchInputHeight = 40;
  const searchInputMargin = 15;
  const resultsLabelHeight = 22;
  const resultsLabelMargin = 10;

  searchListHeight.value = viewportHeight - headerPadding * 2 - titleHeight - titleMargin - searchInputHeight - searchInputMargin - resultsLabelHeight - resultsLabelMargin - gap;
}

onMounted(() => {
  updateHeights();
  window.addEventListener("resize", updateHeights);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeights);
});

async function loadFriends() {
  const filter = new PersonFilter(
    undefined,
    undefined,
    undefined,
    RelationToAuthorizedUser.FRIEND
  );
  friends.value = await People.getPeopleByFilter(filter);
}

async function loadFriendRequests() {
  const filterPending = new PersonFilter(
    undefined,
    undefined,
    undefined,
    RelationToAuthorizedUser.FRIEND_REQUEST_RECEIVED
  );
  const filterSent = new PersonFilter(
    undefined,
    undefined,
    undefined,
    RelationToAuthorizedUser.SENT_FRIEND_REQUEST
  );
  pendingResponses.value = await People.getPeopleByFilter(filterPending);
  sentRequests.value = await People.getPeopleByFilter(filterSent);
}

async function reloadSearchResults() {
  if (lastSearchFilters.length > 0) {
    await onFiltersReady(lastSearchFilters);
  }
}

async function reloadAll() {
  console.log("Reloading all data...");
  await Promise.all([
    loadFriends(),
    loadFriendRequests(),
    reloadSearchResults()
  ]);
}

async function onFiltersReady(filters: PersonFilter[]) {
  console.log("Filters ready");
  console.log(filters);

  lastSearchFilters = filters;

  const [
    friendsResult,
    pendingResult,
    noRelationsResult,
    sentRequestsResult
  ] = await Promise.all([
    People.getPeopleByFilter(
      filters.find((f) => f.getRelation() === RelationToAuthorizedUser.FRIEND) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.FRIEND
      )
    ),
    People.getPeopleByFilter(
      filters.find(
        (f) =>
          f.getRelation() === RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
      ) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
      )
    ),
    People.getPeopleByFilter(
      filters.find(
        (f) => f.getRelation() === RelationToAuthorizedUser.NO_RELATION
      ) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.NO_RELATION
      )
    ),
    People.getPeopleByFilter(
      filters.find(
        (f) => f.getRelation() === RelationToAuthorizedUser.SENT_FRIEND_REQUEST
      ) ??
      new PersonFilter(
        undefined,
        undefined,
        undefined,
        RelationToAuthorizedUser.SENT_FRIEND_REQUEST
      )
    )
  ]);

  searchFriends.value = friendsResult;
  searchPendingResponses.value = pendingResult;
  searchNoRelations.value = noRelationsResult;
  searchSentRequests.value = sentRequestsResult;

  searchResultsReady.value = true;
}

loadFriends();
loadFriendRequests();
</script>

<style scoped>
.people-container {
  display: flex;
  height: 100%;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
}

.people-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
  min-width: 0;
}

.people-column:first-child {
  padding-left: 0;
}

.column-title {
  font-weight: 600;
  margin: 0 0 15px 0;
  flex-shrink: 0;
  text-align: center;
}

.results-label {
  color: #6c757d;
  margin: 15px 0 10px 0;
  text-align: center;
  flex-shrink: 0;
  font-size: 0.9rem;
}
</style>
