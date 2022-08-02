import request from '@/utils/request'

/**
 * 获取频道导航条信息
 * @returns Promise
 */
export const channelsAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
