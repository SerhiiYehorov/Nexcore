import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Posts.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Posts',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/Post.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
