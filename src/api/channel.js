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

export const allChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const deleteChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
