import axios from 'axios'
// import store from '../store'
import route from '../../router'

// /ams-api/auth /ams-api/system
const http = axios.create({
  timeout: 10000,
  baseURL: 'https://www.vue-js.com/api/v1/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// request 拦截器
http.interceptors.request.use(config => {
  // let uid = localStorage.getItem('UserId')
  // if (!uid) {
  //     route.push({
  //       path: '/login'
  //     })
  // }
  return config
}, Promise.reject)

// response 拦截器
http.interceptors.response.use(response => {
  let data = response
  return data.data
  return Promise.reject(data)
}, error => {
  console.log('err' + error.message)
  return Promise.reject(error)
})

export { http }
