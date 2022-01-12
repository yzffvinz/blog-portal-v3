import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '@/layout/BasicLayout.vue'
import Home from '@/views/Home/index.vue'
import Detail from '@/views/Detail/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          component: Home,
          meta: {
            title: '首页',
          },
        },
        {
          path: '/detail/:title/:path',
          component: Detail,
          meta: {
            title: '详情',
          },
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/',
        },
      ],
    },
  ],
})
export default router
