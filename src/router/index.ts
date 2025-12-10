import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import AuthorizationView from "../views/AuthorizationView.vue";
import MainView from "../views/MainView.vue";
import PeopleView from "../views/PeopleView.vue";
import ProfileView from "../views/ProfileView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import EventView from "../views/EventView.vue";
import GlassiesView from "../views/GlassiesView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: MainView,
    props: true,
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: AuthorizationView,
    props: true,
  },
  {
    path: "/friends",
    name: "Friends",
    component: PeopleView,
    props: true,
  },
  {
    path: "/account",
    name: "Account",
    component: ProfileView,
    props: true,
  },
  {
    path: "/registration",
    name: "Registration",
    component: RegistrationView,
    props: true,
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfileView,
    props: true,
  },
  {
    path: "/event",
    name: "Event",
    component: EventView,
    props: (route) => ({
      eventUID: route.query.eventUID,
    }),
  },
  {
    path: "/glassies",
    name: "Glassies",
    component: GlassiesView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
