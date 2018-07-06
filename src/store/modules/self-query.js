// 自助查询模块
// {queryType} 查询类型 1--缴费历史记录  2--就诊历史记录
const state = {
  queryType:""
}
// mutations
const mutations = {
  setQueryType (state, code) {
    state.queryType = code
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