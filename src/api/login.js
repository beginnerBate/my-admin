// 登录接口API
import axios from 'axios'
import {getUrl} from './config'
import qs from 'qs'

export function loginTo (data) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'manage/login' 
    return axios.post(url,qs.stringify(data),{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}

export function updatePassword (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'manage/updatePassword' 
    return axios.patch(url,qs.stringify(data),{
      headers:{
        token:token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}