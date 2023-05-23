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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
