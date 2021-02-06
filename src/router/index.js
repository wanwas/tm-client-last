import Router from "vue-router";

import DefaultLayout from "@/layouts/Default"
import MainLayout from "@/layouts/Main"

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        name: "Home",
        path: "/",
        component: () => import("@/views/Home"),
      },
      {
        name: "Auth",
        path: "/auth",
        component: () => import("@/views/Auth"),
      },
      {
        name: "Reset",
        path: "/auth/:resetToken",
        component: () => import("@/views/Auth"),
      },
    ]
  },
  {
    path: '/main',
    component: MainLayout,
    children: []
  }
];

const router = new Router({
  routes,
  mode: "history",
});

export default router;
