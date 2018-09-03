
// -------------------cardType------------------------
// {cardType} 证件类型
// {user} 病人信息
// --------------------payment-------------------------------
// {{balance}} 余额
// {{paymoney}} 充值金额
//  {{orderNumber}} 流水号
const state = {
  user:"",
  token:'',
  cardType:"",
  payInfo:"",
  totalCost:"",
  paymentTypeId:"",
  balance:"",
  paymoney:"",
  payTime:"",
  orderNumber:""
}
// mutations
const mutations = {
  setUser (state, code) {
    state.user = code
  },
  setToken (state, code) {
    state.token = code
  },
  setCardType (state, code) {
    state.cardType = code
  },
  setPayInfo (state, code) {
    state.payInfo = code
  },
  settotalCost (state, code) {
    state.totalCost = code
  },
  setPaymentTypeId (state,code) {
    state.paymentTypeId = code
  },
  setBalance (state,code) {
    state.balance = code
  },
  setPaymoney (state, code) {
    state.paymoney = code
  },
  setPaytime (state, code) {
    state.payTime = code
  },
  setOrderNumber (state, code) {
    state.orderNumber = code
  }
}
//acions 
const actions = {
  getUserInfo ({commit},item){
    commit('setUser',{name:item.name,zyh:item.zyh,cardNumber:item.cardNumber,sex:item.sex,balance:item.balance})
    commit('setToken',item.token)
  }
}
export default {
  state,
  actions,
  mutations
}