import Vue from 'vue'
import Router from 'vue-router'
// 自助打印
import SelfPrint from 'components/self-print/self-print'
import SpStepone from 'components/self-print/sp-stepone'
import SpSteptwo from 'components/self-print/sp-steptwo'
// 提示页面
import TipPage from 'base/tip-page/tip-page'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      redirect:"/self-print"
    },
    {
      path:"/self-print",
      component:SelfPrint,
      redirect:'/self-print/SpStepone',
      children:[
        {
          path:"SpStepone",
          name:'spstepone',
          component:SpStepone,
          meta: { backpage: 'close'}
        },
        {
          path:"SpSteptwo",
          name:'spsteptwo',
          component:SpSteptwo,
          meta: { backpage: 'spstepone'}   
        },
        {
          path:'sptippage',
          name:"sptippage",
          component:TipPage,
          meta: { backpage: 'close',timer:15}
        }
      ]
    }
  ]
})
