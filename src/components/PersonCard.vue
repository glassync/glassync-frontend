<template>
  <div class="card d-flex flex-row align-items-center p-2">
    <img
      src="@/assets/icons/person-circle.png"
      alt="avatar"
      class="rounded-circle"
      style="width: 40px; height: 40px; object-fit: cover"
    />
    <div class="ms-3 flex-grow-1">
      <div>{{ person.getFirstName() }} {{ person.getLastName() }}</div>
    </div>
    <div>
      <template v-if="relation === RelationToAuthorizedUser.NO_RELATION">
        <button class="btn btn-success btn-sm" @click="sendFriendRequest">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-plus-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </button>
      </template>

      <template
        v-else-if="relation === RelationToAuthorizedUser.SENT_FRIEND_REQUEST"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-check-lg"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
          />
        </svg>
      </template>

      <template
        v-else-if="
          relation === RelationToAuthorizedUser.PENDING_RESPONSE_TO_REQUEST
        "
      >
        <button
          class="btn btn-success btn-sm me-1"
          @click="acceptFriendRequest"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-check-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"
            />
            <path
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>
        </button>
        <button class="btn btn-danger btn-sm" @click="declineFriendRequest">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-x-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
      </template>

      <template v-else-if="relation === RelationToAuthorizedUser.FRIEND">
        <button class="btn btn-danger btn-sm" @click="removeFriend">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-dash-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
            />
            <path
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from "@/core/Person";
import { RelationToAuthorizedUser } from "@/core/Enum";
import type { Profile } from "@/core/Profile";
import { ref, defineProps } from "vue";

const props = defineProps<{
  person: Person;
  relation: RelationToAuthorizedUser;
  profile: Profile;
}>();

const currentRelation = ref(props.relation);

function doAction(action: string) {
  // ToDo: синхронизировать с готовой функцией
  const result = props.profile.doFriendAction(
    action,
    props.person.getUserUID()
  );

  if (
    result === "friend_request_sent" ||
    result === "friend_request_already_sent"
  ) {
    currentRelation.value = RelationToAuthorizedUser.SENT_FRIEND_REQUEST;
  } else if (result === "accept_friendship") {
    currentRelation.value = RelationToAuthorizedUser.FRIEND;
  } else if (result === "not_friends" || result === "decline_friendship") {
    currentRelation.value = RelationToAuthorizedUser.NO_RELATION;
  }
}

function sendFriendRequest() {
  doAction("send_friend_request");
}

function acceptFriendRequest() {
  doAction("accept_friend_request");
}

function declineFriendRequest() {
  doAction("decline_friend_request");
}

function removeFriend() {
  doAction("remove_friend");
}
</script>
