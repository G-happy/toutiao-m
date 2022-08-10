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

/**
 * 获取用户信息
 * @returns  Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 如果传的是对象,axios默认将对象转化成JSON,并加上content-type=application/json
// 如果传的是formData表单,那么axios会将变淡提交给后端,默认加上content-type=mutipart/form-data
// 这个接口要的是表单
/**
 * 修改用户头像
 * @param {Object} file 需上传的文件对象
 * @returns Promise
 */
export const uploadAvatorAPI = (file) => {
  // 创建表单
  const fd = new FormData()
  // 添加数据(key,vlaue)
  fd.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}

/**
 * 编辑用户信息
 * @param {Object | String} data 需要编辑的信息
 * @returns Promise
 */
export const editUserInfoAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: data
  })
}

/**
 * 关注用户
 * @param {String} id 被关注用户的ID
 * @returns Promise
 */
export const focusOnUserAPI = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消关注
 * @param {String} id 被取消关注的用户的id
 * @returns Promise
 */
export const cancelFocusUserAPI = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
