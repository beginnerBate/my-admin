import axios from 'axios'
import loS from '@/common/js/loStorage'
export const ERR_OK = 200

export function getUrl (port="port") {
  if (loS.getItem('BASEURL',true)) {
    return Promise.resolve(loS.getItem('BASEURL',true))
  }
  return axios.get('static/config.json').then((res)=>{
    // 存储BASEURL
    loS.setItem('BASEURL',res.data[port])
    return Promise.resolve(res.data[port])
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

// export const Axios = axios.create({
//   headers:{
//     token:loS.getItem('token',true)
//   }
// })

// export function getToken () {
//   return loS.getItem('token', true)
// }