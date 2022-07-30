import storage from '@/utils/storage'
const TOKEN = 'TOUTIAO_TOKEN'

export const setToken = (value) => storage.set(TOKEN, value)

export const getToken = () => storage.get(TOKEN)

export const removeToken = () => storage.remove(TOKEN)
