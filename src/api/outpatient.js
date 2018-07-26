// 门诊缴费
import axios from 'axios'
import {getUrl} from './config'
import qs from "qs"

// 1.门诊缴费查询列表
export function payProjectList (token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/outpatientPayment/getOrders'
    return axios.get(url,{
      headers:{
        token: token
      }
    }).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}

// 2.门诊缴费订单创建
export function outpatientOrder (token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/outpatientPayment/orders' 
    return axios.get(url,{
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

// 3. 选择支付方式
export function payMethod (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/outpatientPayment/selectPayType'
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
// 3. 门诊缴费订单余额支付(余额)
export function yeOutpatientQuery (data,token) {
  return getUrl().then(function(baseURL){ 
    var url = baseURL + 'ot/outpatientPayment/depositPay' 
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

// 4. 门诊缴费订单余额支付(微信)
export function wxOutpatientQuery (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/outpatientPayment/wxPayOrderQuery' 
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

// 4. 门诊缴费订单余额支付(支付宝)
export function zfbOutpatientQuery (data,token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/aliPayOrderQuery' 
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

