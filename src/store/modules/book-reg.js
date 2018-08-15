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
// --------------------------创建订单模块--------------------------------
// {orderId}
// {payType}
// {{orderNumber}} 流水号
// -----------------------------预约取号-----------------------------------------
// {{bookNumber}} 预约取号信息
const state = {
  reguserinfo:"",
  pdtotalCost:"",
  balance:"",
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
  bookNumber:""
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
  }
}
//acions 
const actions = {
  
}
export default {
  state,
  actions,
  mutations
}