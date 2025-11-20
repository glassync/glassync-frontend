import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Calendar from "../components/Calendar.vue";
import FriendsPage from "../views/FriendView.vue";
import UserProfile from "../views/AccountView.vue";
import GlassiesPage from "../views/GlassiesView.vue";
import AuthorizationView from "../views/AuthorizationView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import EventView from "../views/EventView.vue";
import MainView from "../views/MainView.vue";
import PeopleView from "../views/PeopleView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: MainView,
  },
  {
    path: "/calendar",
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
  {
    path: "/login",
    name: "Authorization",
    component: AuthorizationView,
  },
  {
    path: "/register",
    name: "Registration",
    component: RegistrationView,
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfileView,
  },
  {
    path: "/event/:id",
    name: "Event",
    component: EventView,
    props: true,
  },
  {
    path: "/people",
    name: "People",
    component: PeopleView,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: ProfileView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
