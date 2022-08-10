import request from '@/utils/request'

/**
 * 获取文章新闻推荐
 * @param {Number} channelId 频道的 ID
 * @param {String} timestamp 请求第一页数据传当前时间戳,请求上一页数据传历史时间戳
 * @returns Promise
 */
export const getNewsListAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp
    }
  })
}

/**
 * 获取文章(新闻)详情
 * @param {String} id 该文章的id
 * @returns Promise
 */
export const getArticleDetailAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

/**
 * 收藏文章
 * @param {String} id 被收藏的文章id
 * @returns Promise
 */
export const collectArticleAPI = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消收藏
 * @param {String} id 被取消收藏的文章id
 * @returns Promise
 */
export const cancleCollectArticleAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}

/**
 * 点赞文章
 * @param {String|Number} id 点赞文章的id
 *
 * @returns Promise
 */
export const articleLikeAPI = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消点赞
 * @param {String|Number} id  文章的id
 * @returns Promise
 */
export const cancleArticleLikeAPI = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}
