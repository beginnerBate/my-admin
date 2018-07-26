import axios from 'axios'
import {getUrl} from './config'
import qs from "qs";

// 1.挂号缴费模块
export function createOrder (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/orders'
    // url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return axios.post(url,data,{
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

// 3. 挂号缴费订单查询(微信)
export function wxPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/wxPayOrderQuery' 
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
// 4. 挂号缴费订单查询(支付宝)
export function zfbPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/outpatientPayment/aliPayOrderQuery' 
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

// 5. 挂号缴费订单查询(余额)
export function yePayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/preDepositPay' 
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


// 预存金充值
export function createPredeposit (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/preDepositRecharge/orders'
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

// 预存金支付订单查询接口(微信
export function wxpdPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/preDepositRecharge/wxPayOrderQuery ' 
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

// 预存金支付订单查询接口(支付宝)
export function zfbpdPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/preDepositRecharge/aliPayOrderQuery' 
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