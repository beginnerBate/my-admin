import axios from 'axios'
import {getUrl,param} from './config'
import { get } from 'http';
import qs from "qs";

// 1. 用户信息检验接口
export function userAuth(data) {
   return getUrl().then(function(baseURL){
     var url = baseURL + 'it/login/card'
     url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
     return axios.post(url).then(function(res){
       return Promise.resolve(res.data)
     }).catch(function(err){
       return Promise.reject(err)
     })
   })
}

// 1. 当日消费查询
export function todayInfo(token,data) {
  return getUrl().then(function(baseURL){
    var url = baseURL + '/it/paymentRecord/costRecords'
    return axios.get(url,{
      params:data,
      headers:{
        token:token
      }
    }).then(function(res){
         return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}
// 1. 历史消费
export function historyInfo(token,data) {
  return getUrl().then(function(baseURL){
    var url = baseURL + '/it/paymentRecord/costRecords'
    return axios.get(url,{
      params:data,
      headers:{
        token:token
      }
    }).then(function(res){
         return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}
// 1. 订单创建
export function createOrder (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'it/preDepositRecharge/orders'
    return axios.post(url,qs.stringify(data),{
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

// 3. 住院充值订单查询(微信)
export function wxpdPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'it/preDepositRecharge/wxPayOrderQuery' 
    return axios.post(url,qs.stringify(data),{
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
// 4. 住院充值订单查询(支付宝)
export function zfbpdPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'it/preDepositRecharge/aliPayOrderQuery' 
    return axios.post(url,qs.stringify(data),{
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

// 5. 获取服务器时间
export function systemTime () {
  return getUrl().then(function(baseURL) {
    var url = baseURL + 'systemTime'
    return axios.get(url).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}