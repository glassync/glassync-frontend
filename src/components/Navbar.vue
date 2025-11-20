<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="navbar-brand">
        <img :src="calendarCheckIcon" alt="Glassync" class="navbar-icon" />
        <span>Glassync</span>
      </router-link>
    </div>

    <div class="navbar-menu">
      <router-link to="/" class="navbar-item">
        <img :src="startAdornmentIcon" alt="Главная" class="nav-image" />
        <span>Главная</span>
      </router-link>
      <router-link to="/glassies" class="navbar-item">
        <img :src="intersectIcon" alt="Стекляши" class="nav-image" />
        <span>Стекляши</span>
      </router-link>
      <router-link to="/people" class="navbar-item">
        <img :src="peopleFillIcon" alt="Друзья" class="nav-image" />
        <span>Друзья</span>
      </router-link>
    </div>

    <div class="navbar-right">
      <router-link to="/profile" class="navbar-icon-btn" title="Аккаунт">
        <img :src="personCircleIcon" alt="Аккаунт" class="nav-icon" />
      </router-link>
      <router-link to="/login" class="navbar-icon-btn" title="Вход">
        <img :src="boxArrowInRightIcon" alt="Вход" class="nav-icon" />
      </router-link>
    </div>
  </nav>
</template>

<script>
import boxArrowInRightIcon from "@/assets/icons/box-arrow-in-right.png";
import calendarCheckIcon from "@/assets/icons/calendar-check.png";
import intersectIcon from "@/assets/icons/intersect.png";
import peopleFillIcon from "@/assets/icons/people-fill.png";
import personCircleIcon from "@/assets/icons/person-circle.png";
import startAdornmentIcon from "@/assets/icons/start-adornment.png";

export default {
  name: "AppNavbar",

  data() {
    return {
      boxArrowInRightIcon: boxArrowInRightIcon,
      calendarCheckIcon: calendarCheckIcon,
      intersectIcon: intersectIcon,
      peopleFillIcon: peopleFillIcon,
      personCircleIcon: personCircleIcon,
      startAdornmentIcon: startAdornmentIcon,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
}

.navbar-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.navbar-menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex: 2;
}

.navbar-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  gap: 8px;
}

.nav-image {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: transform 0.3s;
}

.navbar-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.navbar-item:hover .nav-image {
  transform: scale(1.1);
}

.navbar-item.router-link-exact-active {
  color: #42b983;
  background-color: #e7f5ef;
}

.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 15px;
}

.navbar-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s;
}

.navbar-icon-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: transform 0.3s;
}

.navbar-icon-btn:hover .nav-icon {
  transform: scale(1.1);
}
</style>
