import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '分屏测试',
    component: () => import('../views/demo.vue')
  },
  {
    path: '/myPlayer',
    name: '单个测试',
    component: () => import('../views/demo2.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
