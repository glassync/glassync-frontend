<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="user" class="profile-page">
    <div class="profile-header">
      <div class="avatar-container">
        <img src="/images/ava.jpg" alt="Аватар" class="avatar" />
        <button @click="changeAvatar" class="avatar-edit-btn">✏️</button>
      </div>
      <h1>{{ user.fullName }}</h1>
      <p class="username">@{{ user.username }}</p>
    </div>

    <div class="profile-info">
      <div class="info-section">
        <h2>Основная информация</h2>
        <div class="info-item">
          <span class="info-label">Дата рождения:</span>
          <span class="info-value">{{ formattedBirthDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Email:</span>
          <span class="info-value">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Телефон:</span>
          <span class="info-value">{{ user.phone || "Не указан" }}</span>
          <button @click="editPhone" class="edit-btn">Изменить</button>
        </div>
      </div>

      <div class="info-section">
        <h2>Дополнительно</h2>
        <div class="info-item">
          <span class="info-label">Дата регистрации:</span>
          <span class="info-value">{{ formattedRegDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Статус:</span>
          <span class="info-value">{{ userStatus }}</span>
        </div>
      </div>
    </div>

    <button @click="editProfile" class="edit-profile-btn">
      Редактировать профиль
    </button>
  </div>
</template>

<script>
import { Profile } from "@/core/Profile";
import { People } from "@/core/People";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null, // Изначально null
      defaultAvatar: "../img/ava.jpg",
      isLoading: true, // Флаг загрузки
      error: null, // Для ошибок
    };
  },
  async created() {
    try {
      try {
        const response = await fetch(`http://glassync.ru/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "batsy@example.com",
            password: "SuperPass123!",
          }),
        });
      } catch (error) {
        console.log(error);
      }

      const person = await People.getPersonByUID(3);
      if (person) {
        const profile = new Profile();
        profile.setPerson(person);

        this.user = {
          fullName: `${person.getFirstName()} ${person.getLastName()}`,
          username: person.getNickname(),
          email: person.getEmail(),
          phone: "+7 (123) 456-78-90",
          birthDate: "1990-05-15",
          registrationDate: "2023-01-10",
          avatar: "",
          isVerified: true,
        };
      } else {
        this.error = "Пользователь не найден";
      }
    } catch (err) {
      this.error = "Ошибка при загрузке данных";
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  },
  computed: {
    formattedBirthDate() {
      return new Date(this.user.birthDate).toLocaleDateString("ru-RU");
    },
    formattedRegDate() {
      return new Date(this.user.registrationDate).toLocaleDateString("ru-RU");
    },
    userStatus() {
      return this.user.isVerified ? "Подтверждён ✅" : "Не подтверждён";
    },
  },
  methods: {
    editProfile() {
      // Логика редактирования профиля
      console.log("Редактирование профиля");
    },
    changeAvatar() {
      // Логика смены аватара
      console.log("Смена аватара");
    },
    editPhone() {
      // Логика изменения телефона
      console.log("Изменение телефона");
    },
  },
};
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #42b983;
}

.avatar-edit-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 14px;
}

.username {
  color: #666;
  font-size: 1.1em;
  margin-top: -10px;
}

.info-section {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.info-section h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.info-label {
  font-weight: bold;
  min-width: 150px;
  color: #555;
}

.info-value {
  flex-grow: 1;
}

.edit-btn {
  margin-left: 15px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 8px;
  cursor: pointer;
  font-size: 12px;
}

.edit-profile-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-profile-btn:hover {
  background-color: #369f6e;
}

@media (max-width: 600px) {
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .edit-btn {
    margin-left: 0;
    margin-top: 5px;
  }
}
</style>
