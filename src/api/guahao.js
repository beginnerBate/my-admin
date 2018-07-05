import {getUrl,param} from './config'
import axios from 'axios'
// 1. --获取所有门诊
export function getOutpatients () {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/outpatients'
    return axios.get(url).then(function(res){
         return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}

// 2. 获取科室可预约医生列表

export function getDepartmentDocs (deptId) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/departmentDocs/'+ deptId
    return axios.get(url).then(function(res){
         return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}

//  3.获取可预约医生的详细信息

export function getBookDoctors (data) {
  return getUrl().then(function(baseURL){
    var url = baseURL + 'ot/register/bookDoctors'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return axios.get(url).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}

//  4.当日挂号获取当日可挂号医生信息 -- getDayDoctorList

export function getDayDoctorList (deptId) {
  return getUrl().then(function(baseURL) {
    var url = baseURL + 'ot/register/aDocInfoLists/' + deptId
    return axios.get(url).then(function(res){
      return Promise.resolve(res.data)
    }).catch(function(err){
      return Promise.reject(err)
    })
  })
}