// 自助查询
import axios from 'axios'
import {getUrl} from './config'

// 1. 查询缴费历史记录

export function hisPayRecord (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/selfServiceQuery/queryHihstoryRecord'
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