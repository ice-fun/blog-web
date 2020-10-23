import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.statusCode !== 200) {
      if (res.statusCode === 201) {
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
    if (code === 201) {
      Message({
        message: data.statusMsg,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (code === 301) {
      Message({
        message: data.statusMsg,
        type: 'error',
        duration: 1000,
        onClose() {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }
      })
    } else {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 1000
        // 正式环境下打开以下注释
        // onClose() {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // }
      })
    }
    return Promise.reject(error)
  }
)

export default service
