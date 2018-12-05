// 自助查询
import axios from 'axios'
import {getUrl} from './config'

// 1.(挂号记录查询)

export function guahaoRecord (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/selfServiceQuery/queryregRecord'
    return axios.get(url,{
      headers:{
        token:token
      }
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}


// 2. 缴费记录查询
export function jiaofeiRecord (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/selfServiceQuery/queryOrderPay'
    return axios.get(url,{
      headers:{
        token:token
      }
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}

// 2. 缴费记录查询
export function chongzhiRecord (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/selfServiceQuery/queryPreDeposits'
    return axios.get(url,{
      headers:{
        token:token
      }
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}
// 1. 查询就诊历史记录
export function hisMedicalRecord (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/selfServiceQuery/queryDiagnosisRecord'
    return axios.get(url,{
      headers:{
        token:token
      }
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}
// 1. 个人信息查询
export function queryPatInfo (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/selfServiceQuery/queryPatInfo'
    return axios.get(url,{
      headers:{
        token:token
      }
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}