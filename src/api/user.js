import request from '@/utils/request'
// 查询参数传参(params/query)和请求体传参(data)

/**
 * 登录 API
 * @param {String} mobile 手机号码
 * @param {String} code 验证码
 * @returns Promise
 */
export const loginAPI = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    // 请求体
    data: data
  })
}

/**
 * 手机验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
