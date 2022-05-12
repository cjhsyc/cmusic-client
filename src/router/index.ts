import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Container.vue'),
    children: [
      {
        path: '/',
        component: () => import("@/views/Home.vue")
      },
      {
        path: "/song-sheet-detail/:id",
        component: () => import("@/views/songSheet/SongSheetDetail.vue")
      },
      {
        path: "/singer-detail/:id",
        component: () => import("@/views/singer/SingerDetail.vue")
      },
      {
        path: "/sign-in",
        component: () => import("@/views/SignIn.vue"),
      },
      {
        path: "/sign-up",
        component: () => import("@/views/SignUp.vue"),
      },
      {
        path: "/personal",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/Personal.vue"),
      }, {
        path: "/personal-data",
        component: () => import("@/views/setting/PersonalData.vue"),
      },
      {
        path: "/setting",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/setting/Setting.vue"),
        children: [
          {
            path: "/setting/PersonalData",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/setting/PersonalData.vue"),
          }
        ]
      },
      {
        path: "/song-sheet",
        component: () => import("@/views/songSheet/index.vue"),
      },
      {
        path: "/singer",
        component: () => import("@/views/singer/index.vue"),
      },
      {
        path: "/search",
        component: () => import("@/views/search/index.vue"),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router