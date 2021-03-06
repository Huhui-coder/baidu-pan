import axios from 'axios'
import { Notification } from 'element-ui'
import config from './config'

window.$notify = Notification

const instance = axios.create({
  timeout: 10000,
  headers: {},
  baseURL: config.baseUrl,
  validateStatus: () => {
    return true
  }
})

instance.interceptors.response.use(
  res => {
    if (res.status === 403) {
      const localUrl = localStorage.getItem('url')
      location.href = localUrl
      return
    }
    const { errors } = res.data
    if (errors) {
      if (res.config.selfHandleError) { // config中自定义处理error
        return Promise.reject(errors)
      }
      const message = errors[0] ? errors[0].message : errors[0]
      window.$notify.error({
        title: '错误',
        message
      })
      return Promise.reject(message)
    } else return res
  },
  error => {
    return Promise.reject(error)
  }
)

instance.message = true

export default instance
