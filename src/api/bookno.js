// 预约取号模块
import axios from 'axios'
import {getUrl} from './config'

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