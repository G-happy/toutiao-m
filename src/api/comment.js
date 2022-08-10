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

/**
 * 对评论点赞
 * @param {String} comId 被点赞的评论id
 * @returns Promise
 */
export const likingsAPI = (comId) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}

/**
 * 对评论取消点赞
 * @param {String} comId  被取消点赞的评论id
 * @returns Promise
 */
export const noLikeingAPI = (comId) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
