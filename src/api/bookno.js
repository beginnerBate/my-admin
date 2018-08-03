// 预约取号模块
import axios from 'axios'
import {getUrl} from './config'
import qs from "qs"

export function numberInfoList (token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/fetchNumber/fetchNumberInfo'
    return axios.get(url,{
      headers:{
        token: token
      } 
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}

// 预约挂号取号(打印预约挂号单)

export function printingFetchNumber (data,token) {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'ot/fetchNumber/printingFetchNumber'
    return axios.patch(url,qs.stringify(data),{
      headers:{
        token: token,
        "Content-Type":"application/x-www-form-urlencoded"
      } 
    }).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}