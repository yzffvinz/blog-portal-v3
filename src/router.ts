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
            keepAlive: true,
          },
        },
        {
          path: '/list/:tag',
          component: List,
          meta: {
            title: '列表',
            keepAlive: true,
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
          path: '/edit/:id',
          component: () => import('@/views/Add/index.vue'),
          meta: {
            title: '编辑',
          },
        },
        {
          path: '/add',
          component: () => import('@/views/Add/index.vue'),
          meta: {
            title: '新增',
          },
        },
        {
          // emoadd,
          path: '/emoadder',
          component: () => import('@/views/EmoAdder/index.vue'),
          meta: {
            title: '暂存心情',
          },
        },
        {
          path: '/login',
          component: () => import('@/views/Login/index.vue'),
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
