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
