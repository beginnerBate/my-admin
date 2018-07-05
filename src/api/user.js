import axios from 'axios'
import {getUrl,param} from './config'
// 1. 用户信息检验接口
export function userAuth(data) {
   return getUrl().then(function(baseURL){
     var url = baseURL + 'login/card'
     url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
     return axios.post(url).then(function(res){
       return Promise.resolve(res.data)
     }).catch(function(err){
       return Promise.reject(err)
     })
   })
}