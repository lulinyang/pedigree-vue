// interApi.js
import axios from 'axios'
import store from '@/store/index'
import config from '@/config/index'
import VueCookies from 'vue-cookies'
// 配置 axios，并生成实例
const creatAxios = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true
})

// 拦截器配置
creatAxios.interceptors.request.use(configData => { // 请求拦截 在发送请求之前做些什么
  if(!/\/oauth\/token/g.test(configData.url)) {
    configData.headers = {
      "Authorization": store.state.user.token_type + ' ' + store.state.user.access_token
    }
  }
  configData.withCredentials = false;
  return configData
}, error => { // 请求失败做的事情
  return Promise.reject(error)
})
    
creatAxios.interceptors.response.use(response => { // 响应拦截 对响应数据做点什么

  return response
}, error => { // 响应失败做的事
  VueCookies.remove("access_token");
  VueCookies.remove("token_type");
  VueCookies.remove("headUrl");
  VueCookies.remove("username");
  window.location.href = '/';
  return Promise.reject(error)
})

function sendAll (arr) { // 顺序和请求发送的顺序相同，使用 axios.spread 分割成多个单独的响应对象
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return axios.all(arr).then(axios.spread(function (...res) { // axios.all 是axios的静态方法，不是实例上的方法
      // 请求全部都执行完成
      return Promise.resolve(res)
    }))
  } else {
    const error = new Error('参数错误！')
    try {
      throw error
    } catch (e) {
      // console.log(e)
    }
  }
}

export default {
  creatAxios,
  sendAll
}