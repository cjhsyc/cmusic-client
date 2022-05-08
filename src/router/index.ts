import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path:'/',
    component: () => import('@/views/Container.vue'),
    children: [
      {
        path:'/',
        component: () => import("@/views/Home.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router