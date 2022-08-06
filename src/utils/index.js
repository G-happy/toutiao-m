// 将 file 对象解析成 base64, 以 Promise管理
export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    //   创建一个阅读器(fr)
    const fr = new FileReader()

    fr.readAsDataURL(file)

    fr.onload = (e) => {
      // e.target.result 存储着 base64 格式的路径
      resolve(e.target.result)
    }
  })
}
