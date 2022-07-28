import axios from 'axios'
const request = axios.create({
  // 统一设置根路径
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
export default request
