// 预约挂号模块
// {departName}科室名称 {doctorList} 可预约医生列表 {doctorInfo} 预约医生 
// {deptId} 科室ID
// {jzId} 就诊ID {token} 令牌
// {bookDoctor} 预约医生信息
// {booktime} 预约时间
// {payInfo} 支付信息
//------------------当日挂号------------------
// {dayDoctorList} 当日可挂号医生列表
// -------------------cardType------------------------
// {cardType} 证件类型
import { getDepartmentDocs, getBookDoctors,getDayDoctorList} from 'api/guahao.js'
const state = {
  departName:"" ,
  departId:"",
  doctorList:[],
  bookDoctor:'',
  doctorInfo:'', 
  booktime:"",
  user:"",
  token:'',
  payInfo:"",
  paymentTypeId:"",
  dayDoctorList:[],
  cardType:""
}
// mutations
const mutations = {
  setDepartName (state, code) {
    state.departName = code
  },
  setDepartId (state, code) {
    state.departId = code
  },
  setDoctorList (state, code) {
    state.doctorList = code
  },
  setBookDoctor (state, code){
    state.bookDoctor = code
  },
  setDoctorInfo (state, code) {
    state.doctorInfo = code
  },
  setBooktime (state, code) {
    state.booktime = code
  },
  setUser (state, code) {
    state.user = code
  },
  setToken (state, code) {
    state.token = code
  },
  setPayInfo (state, code) {
    state.payInfo = code
  },
  setPaymentTypeId (state,code) {
    state.paymentTypeId = code
  },
  setDayDoctorList (state, code) {
    state.dayDoctorList = code
  },
  setCardType (state, code) {
    state.cardType = code
  } 
}
//acions 
const actions = {
  // 预约医生列表
  getDocotorList ({commit},item){
    // 设置科室name, 获取科室可预约医生
    commit('setDepartName',item.name)
    commit('setDepartId',item.id)
    getDepartmentDocs(item.id).then((res)=>{
      if(res.code ==200) {
        commit('setDoctorList',res.data)
      }
    })
  },
  // 预约医生详细信息
  getBookDoctorsInfo ({commit}, item) {
    // 保存医生姓名 职称挂号费
    commit('setBookDoctor',{
      ysxm:item.ysxm,
      docTitle:item.docTitle,
      sumRegister:item.sumRegister,
      projectId:item.projectId,
      ysId:item.ysId,
      hm:item.hm,
      numberType: item.numberType == '专家'? 2:1
    })
    // 获取预约医生详细信息
    getBookDoctors({deptId:item.departId,hm:item.hm})
    .then(function(res){
      if (res.code == 200) {
        commit('setDoctorInfo',res.data)
      }
    })
  },
  getUserInfo ({commit},item){
    commit('setUser',{name:item.name,jzId:item.jzId,cardNumber:item.cardNumber,sex:item.sex})
    commit('setToken',item.token)
  },
  getDayDocotorList({commit},item){
    commit('setDepartName',item.name)
    commit('setDepartId',item.id)
    getDayDoctorList(item.id).then((res)=>{
      if(res.code == 200) {
        commit('setDayDoctorList',{ordinaryDocs:res.ordinaryDocs,expertDocs:res.expertDocs})
      }
    })  
  }
}
export default {
  state,
  actions,
  mutations
}