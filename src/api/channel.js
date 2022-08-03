import request from '@/utils/request'
import storage from '@/utils/storage'

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

/**
 *
 * @param {Number} id 频道 id
 * @returns Promise
 */
export const deleteChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {Object} obj 传递频道的id和要添加到的索引值
 * @returns
 */
export const addChannelAPI = (obj) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [obj]
    }
  })
}

const MY_CHANNELS = 'MY_CHANNELS'
export const setLocalChannels = (myChannels) => {
  storage.set(MY_CHANNELS, myChannels)
}
export const getLocalChannels = () => {
  return storage.get(MY_CHANNELS)
}
