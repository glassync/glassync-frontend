import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "../components/Calendar.vue";
import FriendsPage from "../views/FriendView.vue";
import UserProfile from "../views/AccountView.vue";
import GlassiesPage from "../views/GlassiesView.vue";

// Явная типизация маршрутов
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/friends",
    name: "Friends",
    component: FriendsPage,
  },
  {
    path: "/account",
    name: "Account",
    component: UserProfile,
  },
  {
    path: "/glassies",
    name: "Glassies",
    component: GlassiesPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
