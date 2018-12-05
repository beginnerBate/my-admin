// 自助查询
import axios from 'axios'
import {getUrlA} from './config'

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

export function createQRCode (visitId,no) {
  return getUrlA().then((baseURL)=>{
    var url = baseURL + 'createQRCode/' +visitId+'?no=' +no;
    return axios.get(url).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}