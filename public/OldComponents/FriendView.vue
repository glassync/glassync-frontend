<template>
  <div class="friends-page">
    <h1>Друзья</h1>

    <!-- Поиск друзей -->
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Найти друзей..."
        class="search-input"
      />
      <button @click="searchUsers" class="search-button">Поиск</button>
    </div>

    <!-- Результаты поиска -->
    <div v-if="searchResults.length > 0" class="search-results">
      <h3>Результаты поиска</h3>
      <ul>
        <li v-for="user in searchResults" :key="user.id" class="user-item">
          {{ user.name }} ({{ user.email }})
          <button @click="addFriend(user.id)" class="add-button">
            + Добавить
          </button>
        </li>
      </ul>
    </div>

    <!-- Список друзей -->
    <div class="friends-list">
      <h2>Мои друзья ({{ friends.length }})</h2>
      <ul>
        <li
          v-for="friend in filteredFriends"
          :key="friend.id"
          class="friend-item"
        >
          <div class="friend-info">
            <img :src="friend.avatar || defaultAvatar" class="avatar" />
            <span>{{ friend.name }}</span>
          </div>
          <button @click="removeFriend(friend.id)" class="remove-button">
            Удалить
          </button>
        </li>
      </ul>

      <!-- Пустое состояние -->
      <div v-if="friends.length === 0" class="empty-state">
        У вас пока нет друзей. Найдите друзей через поиск!
      </div>
    </div>
  </div>
</template>

<script>
import guts from "/public/images/guts.jpg";
import ivan_zolo from "/public/images/ivan_zolo.png";
import rostik from "/public/images/rostik.jpg";

export default {
  name: "FriendsPage",
  data() {
    return {
      searchQuery: "",
      friends: [
        { id: 1, name: "Иван Иванов", email: "ivan@example.com", avatar: guts },
        {
          id: 2,
          name: "Мария Петрова",
          email: "maria@example.com",
          avatar: ivan_zolo,
        },
        {
          id: 3,
          name: "Алексей Смирнов",
          email: "alex@example.com",
          avatar: rostik,
        },
      ],
      allUsers: [
        { id: 4, name: "Елена Сидорова", email: "elena@example.com" },
        { id: 5, name: "Дмитрий Кузнецов", email: "dmitry@example.com" },
        { id: 6, name: "Ольга Васильева", email: "olga@example.com" },
      ],
      searchResults: [],
      defaultAvatar: "https://via.placeholder.com/50",
    };
  },
  computed: {
    filteredFriends() {
      return this.friends.filter(
        (friend) =>
          friend.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    searchUsers() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }

      // Фильтруем пользователей, исключая уже добавленных в друзья
      this.searchResults = this.allUsers.filter(
        (user) =>
          (user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) &&
          !this.friends.some((friend) => friend.id === user.id)
      );
    },
    addFriend(userId) {
      const userToAdd = this.allUsers.find((user) => user.id === userId);
      if (userToAdd && !this.friends.some((friend) => friend.id === userId)) {
        this.friends.push({ ...userToAdd, avatar: "" });
        this.searchResults = this.searchResults.filter(
          (user) => user.id !== userId
        );
      }
    },
    removeFriend(friendId) {
      this.friends = this.friends.filter((friend) => friend.id !== friendId);
    },
  },
};
</script>

<style scoped>
.friends-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1,
h2,
h3 {
  color: #2c3e50;
}

.search-section {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-button,
.add-button,
.remove-button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.search-button {
  background-color: #42b983;
  color: white;
}

.search-button:hover {
  background-color: #369f6e;
}

.search-results {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 30px;
}

.user-item,
.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.friend-item {
  padding: 15px 10px;
}

.friend-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.add-button {
  background-color: #4caf50;
  color: white;
}

.add-button:hover {
  background-color: #45a049;
}

.remove-button {
  background-color: #f44336;
  color: white;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
