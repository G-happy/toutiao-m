import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('TOUTIAO_TOKEN')) || {}
    // tokenObj: storage.get('TOUTIAO_TOKEN') || {}
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, tokenValue) {
      state.tokenObj = tokenValue
      // token 存入本地存储
      // 本地存储支持的是 JSON 格式的字符串
      // localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(tokenValue))
      // storage.set('TOUTIAO_TOKEN', tokenValue)
      setToken(tokenValue)
    }
  },
  actions: {},
  modules: {}
})
