import axios from 'axios'
import {getUrl,param} from './config'
import { get } from 'http';
// 1. 用户信息检验接口
export function userAuth(data) {
   return getUrl().then(function(baseURL){
     var url = baseURL + 'ot/login/card'
     url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
     return axios.post(url).then(function(res){
       return Promise.resolve(res.data)
     }).catch(function(err){
       return Promise.reject(err)
     })
   })
}

// 2. 注册建档接口

export function regUser (data) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/registrationArchives/user'
    // url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return axios.post(url,data).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}