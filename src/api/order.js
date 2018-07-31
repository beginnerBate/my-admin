// 订单管理模块
import axios from 'axios'
import {getUrl} from './config'
// 1. 获取订单信息(分页)

export function orderInfo (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'manage/orderInfos' 
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

// 2. 获取订单信息详情

export function orderDetials (orderId, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + `manage/orderInfoDetails/${orderId}` 
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