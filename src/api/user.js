import request from '@/utils/request'
// 查询参数传参(params/query)和请求体传参(data)

/**
 * 登录 API
 * @param {String} mobile 手机号码
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    // 请求体
    data: data
  })
}
