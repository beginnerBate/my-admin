// 门诊缴费模块 out-patient
// {{totalCost}} 总缴费金额
const state = {
  totalCost:""
}
// mutations
const mutations = {
  setTotalCost (state, code) {
    state.totalCost = code
  }
}
export default {
  state,
  mutations
}