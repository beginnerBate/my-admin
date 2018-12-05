// 预约挂号模块
// {departName}科室名称 {doctorList} 可预约医生列表 {doctorInfo} 预约医生 
// {deptId} 科室ID
// {jzId} 就诊ID {token} 令牌
// {bookDoctor} 预约医生信息
// {booktime} 预约时间
// {payInfo} 支付信息
//------------------当日挂号------------------
// {dayDoctorList} 当日可挂号医生列表
// {dayDoctorInfo} 当日挂号医生信息
// -------------------cardType------------------------
// {cardType} 证件类型
// -------------------注册建档信息保存-----------------------------
//  {reguserinfo:{name:'',sex:'',cardNo:"",birthday:""}}
//  {jzId}
// -------------------------预存金充值金额--------------------------------------
// {pdtotalCost} 
// {balance} 余额
// {payTime} 充值时间
// --------------------------创建订单模块--------------------------------
// {orderId}
// {payType}
// {{orderNumber}} 流水号
// -----------------------------预约取号-----------------------------------------
// {{bookNumber}} 预约取号信息
// -------------------------------订单答应----------------------------------------
// {{printInfo}}
// -------------------------------autoFlag--------------------------------------
// {{bodyData}} 智能导诊
// {{timeFlag}} 是否设置timer
// -------------------------------backFlag--------------------------------------
import { getDepartmentDocs, getBookDoctors,getDayDoctorList} from 'api/guahao.js'
const state = {
  reguserinfo:"",
  pdtotalCost:"",
  balance:"",
  payTime:"",
  departName:"" ,
  departId:"",
  doctorList:[],
  bookDoctor:'',
  doctorInfo:'', 
  booktime:"",
  user:"",
  token:'',
  orderId:"",
  payInfo:"",
  paymentTypeId:"",
  dayDoctorList:[],
  dayDoctorInfo:"",
  cardType:"",
  jzId:"",
  orderNumber:"",
  bookNumber:"",
  printInfo:"",
  autoFlag:"",
  othersTime:"",
  reactStatus:"",
  no:"",
  bodyData:'',
  timeFlag:false,
  backFlag:''
}
// mutations
const mutations = {
  setReguserinfo (state,code) {
    state.reguserinfo = code
  },
  setJzId (state, code) {
    state.jzId = code
  },
  setPdtotalCost (state, code) {
    state.pdtotalCost = code
  },
  setBalance (state, code){
    state.balance = code
  },
  setpayTime (state, code) {
    state.payTime = code
  },
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
  setorderId (state, code){
    state.orderId = code
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
  setDayDoctorInfo (state, code) {
    state.dayDoctorInfo = code
  },
  setCardType (state, code) {
    state.cardType = code
  },
  setOrderNumber (state, code) {
    state.orderNumber = code
  },
  setBookNumber (state, code) {
    state.bookNumber = code
  },
  setPrintInfo (state, code) {
    state.printInfo = code
  },
  setAutoFlag (state, code) {
    state.autoFlag = code
  },
  setOthersTime (state, code) {
    state.othersTime = code
  },
  setReactStatus (state, code) {
    state.reactStatus = code
  },
  setNo (state,code) {
    state.no = code
  },
  setBodyData (state,code) {
    state.bodyData = code
  },
  setTimeFlag (state,code){
    state.timeFlag = code
  },
  setBackFlag (state,code) {
    state.backFlag = code
  }
}
//acions 
const actions = {
  // 预约医生列表
  getDocotorList ({commit},item){
    // 设置科室name, 获取科室可预约医生
    commit('setDepartName',item.name)
    commit('setDepartId',item.id)
    if (item.id) {
      getDepartmentDocs(item.id).then((res)=>{
        if(res.code ==200) {
          commit('setDoctorList',res.data)
        }
      })
    }else {
      commit('setDoctorList','')
    }
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
    if (item.departId) {
      getBookDoctors({deptId:item.departId,hm:item.hm})
      .then(function(res){
        if (res.code == 200) {
          commit('setDoctorInfo',res.data)
        }
      })
    }else {
      commit('setDoctorInfo',res.data)
    }

  },
  getUserInfo ({commit},item){
    commit('setUser',{name:item.name,jzId:item.jzId,cardNumber:item.cardNumber,sex:item.sex})
    commit('setToken',item.token)
  },
  getDayDocotorList({commit},item){
    commit('setDepartName',item.name)
    commit('setDepartId',item.id)
    if (item.id) {
      getDayDoctorList(item.id).then((res)=>{
        if(res.code == 200) {
          commit('setDayDoctorList',{ordinaryDocs:res.ordinaryDocs,expertDocs:res.expertDocs})
        }
      })  
    }else {
      commit('setDayDoctorList','')
    }
  }
}
export default {
  state,
  actions,
  mutations
}