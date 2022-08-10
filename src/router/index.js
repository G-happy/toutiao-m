import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载,提升首屏加载速度
const router = new VueRouter({
  routes: [
    { path: '/login', component: () => import('@/views/login') },
    {
      path: '/',
      component: () => import('@/views/layout'),
      redirect: '/ ',
      children: [
        {
          path: 'profile',
          component: () => import('@/views/Profile/profile.vue')
        },
        {
          path: 'qa',
          component: () => import('@/views/Qa/qa.vue')
        },
        {
          path: '/ ',
          component: () => import('@/views/Home/home')
        },
        {
          path: 'video',
          component: () => import('@/views/Video/video')
        }
      ]
    },
    {
      // 搜索界面
      path: '/search',
      component: () => import('@/views/Search')
    },
    {
      // 我的(用户)界面
      path: '/user',
      component: () => import('@/views/User')
    },
    {
      // 文章详情
      path: '/detail',
      component: () => import('@/views/ArticleDetail')
    }
  ]
})

export default router
