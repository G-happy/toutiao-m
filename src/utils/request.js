import axios from 'axios'

import store from '@/store/index'
const request = axios.create({
  // 统一设置根路径
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000000000
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 用户登录后的所有请求,均设置 Authorization 字段
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
