import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/request/token'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers['Oauth-Token'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // 全局统一处理 Session超时
    if (response.headers['session_time_out'] == 'timeout') {
      store.dispatch('fedLogOut')
    }

    const res = response.data

    // 200 为成功状态
    if (res.statusCode !== 200) {
      if (res.statusCode === 500) {
        Message({
          message: res.statusMsg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      // return Promise.reject(new Error(res.statusCode || 'Error'))
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    const data = error.response.data
    const code = data.statusCode
    if (code === 305) {
      Message({
        message: data.statusMsg,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (code === 301) {
      Message({
        type: 'warning',
        showClose: true,
        message: '请重新登录'
      })
    } else {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 1000
      })
    }
    return Promise.reject(error)
  })
export default service
