<template>
  <div class="layout">
    <div class="sidebar">
      <h2>📋 Задачи</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">{{ task }}</li>
      </ul>
    </div>

    <div class="calendar">
      <div class="calendar-header">
        <button @click="showEventModal = true" class="add-event-btn">
          + Добавить событие
        </button>
      </div>
      <vue-cal
        class="calendar-inner"
        default-view="week"
        :events="events"
        locale="ru"
        @event-click="onEventClick"
      />
    </div>

    <!-- Модальное окно для событий -->
    <div v-if="showEventModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showEventModal = false">&times;</span>
        <h3>Добавить новое событие</h3>
        <form @submit.prevent="addEvent">
          <div class="form-group">
            <label>Название:</label>
            <input v-model="newEvent.title" type="text" required />
          </div>
          <div class="form-group">
            <label>Дата начала:</label>
            <input v-model="newEvent.startDate" type="date" required />
            <input v-model="newEvent.startTime" type="time" required />
          </div>
          <div class="form-group">
            <label>Дата окончания:</label>
            <input v-model="newEvent.endDate" type="date" required />
            <input v-model="newEvent.endTime" type="time" required />
          </div>
          <button type="submit" class="submit-btn">Добавить</button>
        </form>
      </div>
    </div>

    <!-- Модальное окно для задач -->
    <div v-if="showTaskModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showTaskModal = false">&times;</span>
        <h3>Добавить новую задачу</h3>
        <form @submit.prevent="addTask">
          <div class="form-group">
            <label>Описание задачи:</label>
            <input v-model="newTask" type="text" required />
          </div>
          <button type="submit" class="submit-btn">Добавить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "MainCalendar",
  components: { VueCal },
  data() {
    return {
      events: [
        {
          start: "2025-04-01 10:00",
          end: "2025-04-01 11:00",
          title: "Командное совещание",
        },
        {
          start: "2025-04-02 13:00",
          end: "2025-04-02 14:30",
          title: "Разработка задач",
        },
      ],
      tasks: ["Задача 1", "Задача 2", "Задача 3"],
      showEventModal: false,
      showTaskModal: false,
      newEvent: {
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      },
      newTask: "",
    };
  },
  methods: {
    addEvent() {
      const start = `${this.newEvent.startDate} ${this.newEvent.startTime}`;
      const end = `${this.newEvent.endDate} ${this.newEvent.endTime}`;

      this.events.push({
        start,
        end,
        title: this.newEvent.title,
      });

      this.showEventModal = false;
      this.resetEventForm();
    },
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push(this.newTask);
        this.newTask = "";
        this.showTaskModal = false;
      }
    },
    resetEventForm() {
      this.newEvent = {
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      };
    },
    onEventClick(event) {
      // Можно добавить обработку клика по событию
      console.log("Событие кликнуто:", event);
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
  font-family: sans-serif;
}

.layout {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.sidebar {
  flex: 1;
  background-color: #f4f4f4;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  position: relative;
}

.calendar {
  flex: 4;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.calendar-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}

.calendar-inner {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.add-event-btn,
.add-task-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-event-btn:hover,
.add-task-btn:hover {
  background-color: #45a049;
}

.add-task-btn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  width: calc(100% - 2rem);
}

/* Стили модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  max-width: 90%;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
