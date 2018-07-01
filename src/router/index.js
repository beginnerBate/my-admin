import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
import SDepartment from 'components/s-department/s-department'
import SDoctor from 'components/s-doctor/s-doctor'
import DoctorInfo from 'components/doctor-info/doctor-info'
import UserInfo from 'components/user-info/user-info'
import InfoConfirm from 'components/info-confirm/info-confirm'
import PaymentMethod from 'components/payment-method/payment-method'
import Payment from 'components/payment/payment'
import Finish from 'components/finish/finish'
// 当日挂号
import ChooseOne from 'components/reg-today/choose-one'
import RegToday from 'components/reg-today/reg-today'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      // redirect:"/department",
      children:[
        {
          path:'department',
          name:"department",
          component: SDepartment
        },
        {
          path:'doctor',
          name:"doctor",
          component: SDoctor
        },
        {
          path:'doctor-info',
          name:"doctorInfo",
          component: DoctorInfo
        },
        {
          path:'user-info',
          name:"userInfo",
          component: UserInfo
        },
        {
          path:'info-confirm',
          name:"infoConfirm",
          component: InfoConfirm
        },
        {
          path:'payment-method',
          name:"paymentMethod",
          component: PaymentMethod
        },
        {
          path:'payment',
          name:"payment",
          component: Payment
        },
        {
          path:'finish',
          name:"finish",
          component: Finish
        },
      ]
    },
    {
      path:'/regtoday',
      name:'regtoday',
      component:RegToday,
      redirect:'/regtoday/choose-one',
      children:[
        {
          path:"choose-one",
          component: ChooseOne
        }
      ]
    }

  ]
})
