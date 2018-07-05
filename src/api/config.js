import axios from 'axios'
import loS from '@/common/js/loStorage'
export function getUrl () {
  return Promise.resolve('http://10.0.0.88:8080/hss-restapi/')
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export const Axios = axios.create({
  headers:{
    token:loS.getItem('token',true)
  }
})

export function getToken () {
  return loS.getItem('token', true)
}