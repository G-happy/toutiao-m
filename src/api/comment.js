import request from '@/utils/request'

/**
 * 对文章或者评论发布评论
 * @param {Object} data 评论内容,文章id等
 * @returns  Promise
 */
export const sendCommentAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: data
  })
}

/**
 * 获取评论或获取回复
 * @param {String} params 获取评论的相关参数
 * @returns Promise
 */
export const getCommentAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}
