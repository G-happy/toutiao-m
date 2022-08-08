import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索关键词
 * @returns  Promise
 */
export const getSearchSuggestAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

/**
 * 搜索结果
 * @param {Object} params 请求相关信息配置
 * @returns Promise
 */
export const getSearchResultAPI = (params) => {
  return request({
    url: '/v1_0/search',
    params: params
  })
}
