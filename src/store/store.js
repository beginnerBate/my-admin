import Vue from 'vue'
import Vuex from 'vuex'
import loS from '@/common/js/loStorage'

//获取模块
import bookReg from './modules/book-reg'
import outPatient from './modules/out-patient'
import selfQuery from './modules/self-query'
// 在使用vuex之前使用，先初始化相关数据
const init = [
    {name: 'menuIdx', value: 0},
    {name: 'navTxt', value:''},
    {name: 'leftNav', value:JSON.stringify([])},
    {name:'loginInfo', value:''}
]
loS.initData(init)
Vue.use(Vuex)
const state = {
    menuIdx: loS.getItem('menuIdx', true),
    loginInfo: loS.getItem('loginInfo', true),
    navTxt: loS.getItem('navTxt', true),
    leftNav: loS.getItem('leftNav', true),
}
const mutations = {
    setMenuIdx (state, name) {
        loS.setItem('menuIdx',name);
        state.menuIdx = loS.getItem('menuIdx',true)
    },
    setNavTxt (state, name) {
       loS.setItem('navTxt', name)
       state.navTxt = loS.getItem('navTxt', true)
    },
    setLeftNav (state, name) {
       loS.setItem('leftNav', name)
       state.leftNav = loS.getItem('leftNav', true)
    },
    setLoginInfo (state, name) {
        loS.setItem('loginInfo', name)
        state.loginInfo = loS.getItem('loginInfo', true)
    }
}
const actions = {
    pageSet({ commit },arr) {
      commit('setMenuIdx',arr[0])
      commit('setNavTxt', arr[1])
      commit('setLeftNav', arr[2])
    }
}
export default new Vuex.Store({
    modules: {
        bookReg,
        outPatient,
        selfQuery
    },
    state,
    mutations,
    actions
})