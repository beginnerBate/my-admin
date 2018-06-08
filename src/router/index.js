import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Home from 'components/home/home'
import HUser from 'components/h-user/h-user'
import HOrder from 'components/h-order/h-order'
import HRegist from 'components/h-regist/h-regist'
import HPayment from 'components/h-payment/h-payment'
import HModify from 'components/h-modify/h-modify'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      redirect: '/login'
    },
    {
      path:'/login',
      name:"Login",
      component: Login
    },
    {
      path: '/home',
      name:"Home",
      component: Home,
      children:[
        {
          path:'user',
          component:HUser
        },
        {
          path:'order',
          component:HOrder
        },
        {
          path:'regist',
          component:HRegist
        },
        {
          path:'payment',
          component:HPayment
        },
        {
          path:'modify',
          component:HModify
        }
      ]
    }
  ]
})
