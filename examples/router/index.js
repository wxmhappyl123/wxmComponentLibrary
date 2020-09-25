import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/demo.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
