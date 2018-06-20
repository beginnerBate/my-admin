import Vue from 'vue'
import Vuex from 'vuex'
import loS from '@/common/js/loStorage'

// 在使用vuex之前使用，先初始化相关数据
const init = [
    {name: 'menuIdx', value: -1},
    {name:'loginInfo', value:''}
]
loS.initData(init)
Vue.use(Vuex)
const state = {
    menuIdx: loS.getItem('menuIdx', true),
    loginInfo: loS.getItem('loginInfo', true),
}
const mutations = {
    setMenuIdx (state, name) {
        loS.setItem('menuIdx',name);
        state.menuIdx = loS.getItem('menuIdx',true)
    },
    setLoginInfo (state, name) {
        loS.setItem('loginInfo', name)
        state.loginInfo = loS.getItem('loginInfo', true)
    }
}

export default new Vuex.Store({
    state,
    mutations,
})