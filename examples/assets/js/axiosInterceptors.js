import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
// 创建axios实例
const service = axios.create({
  timeout: 30000 // 请求超时时间
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 401) {
      MessageBox.confirm('登录失效，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        type: 'warning'
      }).then(() => {
        location.reload()
      })
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
