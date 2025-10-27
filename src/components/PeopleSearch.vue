<template>
  <div class="d-flex align-items-center">
    <input
      v-model="searchText"
      type="text"
      class="form-control me-2"
      placeholder="Введите имя"
      @keyup.enter="onSearch"
    />
    <button class="btn btn-secondary py-1 px-2" @click="onSearch" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { RelationToAuthorizedUser } from "@/core/Enum";
import { PersonFilter } from "@/core/PersonFilter";

const searchText = ref("");

const emit = defineEmits<{
  (e: "filtersReady", filters: PersonFilter[]): void;
}>();

// ToDo: адаптировать под изменения фильтра
function onSearch() {
  console.log("ClickedSearch");
  const filters: PersonFilter[] = [
    new PersonFilter(
      searchText.value,
      undefined,
      undefined,
      RelationToAuthorizedUser.FRIEND
    ),
    new PersonFilter(
      searchText.value,
      undefined,
      undefined,
      RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
    ),
    new PersonFilter(
      searchText.value,
      undefined,
      undefined,
      RelationToAuthorizedUser.NO_RELATION
    ),
    new PersonFilter(
      searchText.value,
      undefined,
      undefined,
      RelationToAuthorizedUser.SENT_FRIEND_REQUEST
    ),
  ];

  emit("filtersReady", filters);
}
</script>
