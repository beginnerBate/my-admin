// 自助查询
import axios from 'axios'
import {getUrlA} from './config'
var qs = require('qs');
axios.defaults.timeout = 10 * 1000
// 1. 查询缴费历史记录

export function ItemInfos (patId,cardType) {
  return getUrlA().then((baseURL)=>{
    var url = baseURL + 'clinicAttendance'
    var data = {cardNo:patId,ksdm:ksdm,cardType:cardType}
    return axios.post(url,qs.stringify(data)).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}

// 服务器时间接口
export function serverTime () {
  return getUrlA().then((baseURL)=>{
    var url = baseURL + 'systemTime'
    return axios.get(url).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}
export function goSign (mydata) {
  return getUrlA().then((baseURL)=>{
    var url = baseURL + 'clinicAttendanceCommon'
    return axios.post(url,qs.stringify(mydata)).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}