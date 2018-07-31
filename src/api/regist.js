// 挂号管理模块
import axios from 'axios'
import {getUrl} from './config'

// 1. 获取挂号记录
export function registerInfo (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'manage/registerInfo' 
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return axios.get(url,{
      headers:{
        token: token
      },
    }).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}

// 2. 获取挂号记录查询
export function orderDetials (registerRecordId, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + `manage/registerInfoDetails/${registerRecordId}` 
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return axios.get(url,{
      headers:{
        token: token
      },
    }).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}