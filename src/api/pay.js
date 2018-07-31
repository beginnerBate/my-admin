// 缴费管理模块
import axios from 'axios'
import {getUrl} from './config'

// 1. 获取缴费记录(分页)
export function payInfo (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'manage/payInfos' 
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