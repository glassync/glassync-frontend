import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { Profile } from "@/core/Profile";

import AuthorizationView from "../views/AuthorizationView.vue";
import MainView from "../views/MainView.vue";
import PeopleView from "../views/PeopleView.vue";
import ProfileView from "../views/ProfileView.vue";
import RegistrationView from "../views/RegistrationView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import EventView from "../views/EventView.vue";
import GlassiesView from "../views/GlassiesView.vue";
import TestCalendar from "@/components/TestCalendar.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: MainView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/authorization",
    name: "Authorization",
    component: AuthorizationView,
    props: true,
    meta: { requiresAuth: false },
  },
  {
    path: "/friends",
    name: "Friends",
    component: PeopleView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    name: "Account",
    component: ProfileView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/registration",
    name: "Registration",
    component: RegistrationView,
    props: true,
    meta: { requiresAuth: false },
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: EditProfileView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/event",
    name: "Event",
    component: EventView,
    props: (route) => ({
      eventUID: route.query.eventUID,
    }),
    meta: { requiresAuth: true },
  },
  {
    path: "/glassies",
    name: "Glassies",
    component: GlassiesView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: TestCalendar,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/authorization",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let profileInstance: Profile | null = null;

export function setProfileInstance(profile: Profile) {
  profileInstance = profile;
}

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthorized = profileInstance?.getAuthorizedUser() !== null;
  const requiresAuth = to.meta.requiresAuth as boolean;

  if (requiresAuth && !isAuthorized) {
    next("/authorization");
  }
  else if (!requiresAuth && isAuthorized && (to.path === "/authorization" || to.path === "/registration")) {
    next("/");
  }
  else {
    next();
  }
});

export default router;
