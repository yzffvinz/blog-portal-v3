import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '@/layout/BasicLayout.vue'
import List from '@/views/List/index.vue'
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
          component: List,
          meta: {
            title: '首页',
          },
        },
        {
          path: '/list/:category',
          component: List,
          meta: {
            title: '列表',
          },
        },
        {
          path: '/list/:category/:tag',
          component: List,
          meta: {
            title: '列表',
          },
        },
        {
          path: '/detail/:id',
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
