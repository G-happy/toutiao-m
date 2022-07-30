// 本地存储封装

class Storage {
  // 封装 getItem
  get(key) {
    const val = localStorage.getItem(key)
    try {
      return JSON.parse(val)
    } catch {
      return val
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
