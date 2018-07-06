// 门诊缴费
import axios from 'axios'
import {getUrl, param} from './config'
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