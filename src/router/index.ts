// Composables
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/tasks",
    component: () =>
      import(/* webpackChunkName: "tasks" */ "@/views/Tasks.vue"),
  },
  {
    path: "/create",
    component: () =>
      import(/* webpackChunkName: "create" */ "@/views/Create.vue"),
  },
  {
    path: "/tasks/:id",
    component: () =>
      import(/* webpackChunkName: "taskDialog" */ "@/views/TaskDialog.vue"),
    children: [
      {
        name: "tasks",
        path: "",
        components: {
          default: () => import("@/views/Tasks.vue"),
          dialog: () => import("@/components/TaskDialog.vue"),
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
