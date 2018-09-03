import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
//组件
// 首页模块组件
import IndexPage  from 'components/index-page/index-page'
import NavToday from 'components/index-page/nav-today'
import NavHistory from 'components/index-page/nav-history'
import NavPayment from 'components/index-page/nav-payment'
// 提示页面
import SystemPage from 'components/system-page/system-page'
import InfoPage from 'components/system-page/info-page'
import PaymentOk from 'components/system-page/payment-ok'
// payment 模块 住院缴费模块
import Payment from 'components/payment/payment'
import PaymentOne from 'components/payment/payment-one'
import PaymentTwo from 'components/payment/payment-two'
import PaymentThree from 'components/payment/payment-three'

// 当日查询模块
import Today from 'components/today/today'
import TodayOne from 'components/today/today-one'
import TodayTwo from 'components/today/today-two'
// 历史纪录查询模块
import Historycon from 'components/history/history'
import HistoryOne from 'components/history/history-one'
import HistoryTwo from 'components/history/history-two'
export default new Router({
  routes:[
    {
      path:"/",
      redirect:"/indexpage",
    },
    {
      path:"/indexpage",
      component:IndexPage,
      name:'indexpage',
      redirect:"/indexpage/today",
      children:[
        {
          path:"today",
          component:NavToday,
          name:'navtoday'
        },
        {
          path:"history",
          component:NavHistory,
          name:'navhistory'
        },
        {
          path:"payment",
          component:NavPayment,
          name:'navpayment'
        },
      ]
    },
    {
      path:"/systempage",
      component:SystemPage,
      name:'systempage',
      children:[
        {
          path:"infopage",
          component:InfoPage,
          name:'infopage'
        },
        {
          path:"paymentok",
          component:PaymentOk,
          name:'paymentok'
        }
      ]
    },
    {
      path:"/payment",
      component:Payment,
      name:"payment",
      redirect:"/payment/one",
      children:[
        {
          path:'one',
          component:PaymentOne,
          name:'paymentone',
          meta: { backpage: 'navpayment'}
        },
        {
          path:'two',
          component:PaymentTwo,
          name:'paymenttwo',
          meta: { backpage: 'navpayment'}
        },
        {
          path:'three',
          component:PaymentThree,
          name:'paymentthree',
          meta: { backpage: 'paymenttwo'}
        },
      ]
    },
    {
      path:'/today',
      component:Today,
      name:"today",
      redirect:'/today/one',
      children:[
        {
          path:'one',
          component:TodayOne,
          name:"todayone",
          meta: { backpage: 'navtoday'}
        },
        {
          path:'two',
          component:TodayTwo,
          name:"todaytwo",
          meta: { backpage: 'navtoday'}
        },
      ]
    },
    {
      path:'/history',
      component:Historycon,
      name:"history",
      redirect:'/history/one',
      children:[
        {
          path:'one',
          component:HistoryOne,
          name:"historyone",
          meta: { backpage: 'navhistory'}
        },
        {
          path:'two',
          component:HistoryTwo,
          name:"historytwo",
          meta: { backpage: 'navhistory'}
        },
      ]
    }

  ]
})
