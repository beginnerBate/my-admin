// 页面提示模块
// ----------注册建档提示-----------
// {regbookTip} 提示信息
// {tipType} 提示类型
const state = {
  regbookTip:"",
  tipType:""
}
// mutations
const mutations = {
  setRegbookTip(state, code) {
    state.regbookTip = code
  },
  setTipType(state, code) {
    state.tipType = code
  }
}
//acions 
const actions = {
  setTipPage ({commit},arr){
    commit('setRegbookTip',arr[0])
    commit('setTipType',arr[1])
  }
}
export default {
  state,
  actions,
  mutations
}