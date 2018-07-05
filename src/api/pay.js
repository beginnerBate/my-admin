import axios from 'axios'
import {getUrl,param} from './config'

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

// 2. 挂号缴费订单余额支付

// 3. 挂号缴费订单查询(微信)
export function wxPayOrder (data, token) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/wxPayOrderQuery' 
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
// 4. 挂号缴费订单查询(支付宝)
