import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标
import '@/assets/fonts/iconfont.css'
// 引入 Vant
import Vant from 'vant'
// 引入 Vant 样式
import 'vant/lib/index.css'
// 引入 flexible, 根标签的字体大小随视口变化而变化
import 'amfe-flexible/index.min.js'
// 注册
Vue.use(Vant)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
