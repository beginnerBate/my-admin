// ------------------用户信息模块-----------------

import axios from 'axios'
import {getUrl,param} from './config'

// 1. 用户信息查询

export function patientInfo (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'manage/patientInfos' 
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