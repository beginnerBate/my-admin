// 3D智能导诊
import axios from 'axios'
import {getUrl} from './config'

// 1. 主部位级联子部位部位id获取

export function mainByBodyInfo () {
  return getUrl().then((baseURL)=>{
    var url = baseURL + 'guidanceMainByBodyInfo'
    return axios.get(url).then((res)=>{
      return Promise.resolve(res.data)
    }).catch((err)=>{
      return Promise.reject(err)
    })
  })
}


// 2.部位导诊
export function bodyPart(bodyPartId){
    return getUrl().then((baseURL)=>{
        var url = baseURL + 'guidance/' +bodyPartId
        return axios.get(url).then((res)=>{
          return Promise.resolve(res.data)
        }).catch((err)=>{
          return Promise.reject(err)
        })
      })   
}

// 3. 导诊接口_主部位级联子部位部位信息获取
export function secondBodyPart(bodyPartId){
  return getUrl().then((baseURL)=>{
      var url = baseURL + 'guidanceSecondByMainBodyPartInfo/' +bodyPartId
      return axios.get(url).then((res)=>{
        return Promise.resolve(res.data)
      }).catch((err)=>{
        return Promise.reject(err)
      })
    })   
}