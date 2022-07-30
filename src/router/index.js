import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载,提升首屏加载速度
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/login') }
  ]
})

export default router
