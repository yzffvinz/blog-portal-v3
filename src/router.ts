import { createRouter, createWebHistory } from 'vue-router'

import BasicLayout from '@/layout/BasicLayout.vue'
import Home from '@/views/Home/index.vue'
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
          component: Home,
          meta: {
            title: '首页',
          },
        },
        {
          path: '/list/:category/:type',
          component: List,
          meta: {
            title: '列表',
          },
        },
        {
          path: '/detail/:articleId',
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
