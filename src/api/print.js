// 自助查询
import axios from 'axios'
import {getUrlA} from './config'

// 1. 查询缴费历史记录

export function ItemInfos (visitId) {
  return getUrlA().then((baseURL)=>{
    var url = baseURL + 'printInfos/'+visitId
    return axios.get(url).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}

// export function listPrintInfo (data) {
//   return getUrlA().then((baseURL)=>{
//     var url = baseURL + 'listPrintInfo'
//     return axios.get(url,data).then((res)=>{
//       return Promise.resolve(res.data)
//     }).catch((err)=>{
//       return Promise.reject(err)
//     })
//   })
// }