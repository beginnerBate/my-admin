import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
// 注册建档
import RegBook from 'components/reg-book/reg-book'
import RbStepone from 'components/reg-book/rb-stepone'
import RbSteptwo from 'components/reg-book/rb-steptwo'
import RbStepthree from 'components/reg-book/rb-stepthree'
import RbStepfour from 'components/reg-book/rb-stepfour'
// 预约挂号
import SDepartment from 'components/s-department/s-department'
import SDoctor from 'components/s-doctor/s-doctor'
import DoctorInfo from 'components/doctor-info/doctor-info'
import UserInfo from 'components/user-info/user-info'
import InfoConfirm from 'components/info-confirm/info-confirm'
import PaymentMethod from 'components/payment-method/payment-method'
import Payment from 'components/payment/payment'
import Finish from 'components/finish/finish'
// 当日挂号
import RegToday from 'components/reg-today/reg-today'
import ChooseOne from 'components/reg-today/choose-one'
import ChooseTwo from 'components/reg-today/choose-two'
import RegCardType from 'components/reg-today/cardType'
import GetInfo from 'components/reg-today/get-info'
import ChooseThree from 'components/reg-today/choose-three'
import PayMoney from 'components/reg-today/pay-money'
import FinishFour from 'components/reg-today/finish-four'
// 门诊缴费
import OutPatient from 'components/out-patient/out-patient'
import OpStepone from 'components/out-patient/op-stepone'
import OpSteptwo from 'components/out-patient/op-steptwo'
import OpStepthree from 'components/out-patient/op-stepthree'
import OpStepfour from 'components/out-patient/op-stepfour'
import OpStepfive from 'components/out-patient/op-stepfive'
import OpStepsix from 'components/out-patient/op-stepsix'
// 预约取号
import BookNo from 'components/book-no/book-no'
import BoStepone from 'components/book-no/bo-stepone'
import BoSteptwo from 'components/book-no/bo-steptwo'
import BoStepthree from 'components/book-no/bo-stepthree'
import BoStepfour from 'components/book-no/bo-stepfour'
// 自助查询
import SelfQuery from 'components/self-query/self-query'
import SelfQuerylist from 'components/self-query/self-querylist'
import SqStepone from 'components/self-query/sq-stepone'
import SqSteptwo from 'components/self-query/sq-steptwo'
import SqStepthree from 'components/self-query/sq-stepthree'
import SqStepfour from 'components/self-query/sq-stepfour'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect:"/department",
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
        },
        {
          path:'ChooseTwo',
          component: ChooseTwo,
          name:'choosetwo'
        },
        {
          path:'select-card',
          name:'regselectcard',
          component: RegCardType
        },
        {
          path:'get-info',
          name:'reggetinfo',
          component: GetInfo
        },
        {
          path:"choose-three",
          component:ChooseThree,
          name:'choosethree'
        },
        {
          path:'pay-money',
          component:PayMoney,
          name:"paymoney"
        },
        {
          path:'finish-four',
          component:FinishFour,
          name:"finishfour"
        },
      ]
    },
    {
      path:'/outpatient',
      name:'outpatient',
      component:OutPatient,
      redirect:'/OutPatient/op-stepone',
      children:[
        {
          path:"op-stepone",
          component: OpStepone
        },
        {
          path:'op-steptwo',
          component: OpSteptwo,
          name:'opsteptwo'
        },
        {
          path:'op-stepthree',
          name:'opstepthree',
          component: OpStepthree
        },
        {
          path:"op-stepfour",
          component:OpStepfour,
          name:'opstepfour'
        },
        {
          path:"op-stepfive",
          component:OpStepfive,
          name:'opstepfive'
        },
        {
          path:"op-stepsix",
          component:OpStepsix,
          name:'opstepsix'
        }
      ]
    },
    {
      path:'/bookno',
      name:'bookno',
      component:BookNo,
      redirect:'/bookno/bo-stepone',
      children:[
        {
          path:"bo-stepone",
          component: BoStepone
        },
        {
          path:'bo-steptwo',
          component: BoSteptwo,
          name:'bosteptwo'
        },
        {
          path:'bo-stepthree',
          name:'bostepthree',
          component: BoStepthree
        },
        {
          path:"bo-stepfour",
          component:BoStepfour,
          name:'bostepfour'
        }
      ]
    },
    {
      path:"/self-query",
      component:SelfQuery,
      redirect:'/self-query/SelfQuerylist',
      children:[
        {
          path:"SelfQuerylist",
          name:'selfquerylist',
          component:SelfQuerylist
        },
        {
          path:"SqStepone",
          name:'sqstepone',
          component:SqStepone
        },
        {
          path:"SqSteptwo",
          name:'sqsteptwo',
          component:SqSteptwo
        },
        {
          path:"SqStepthree",
          name:'sqstepthree',
          component:SqStepthree
        },
        {
          path:"SqStepfour",
          name:'sqstepfour',
          component:SqStepfour
        }
      ]
    },
    {
      path:"/regbook",
      component:RegBook,
      redirect:'/regbook/RbStepone',
      children:[
        {
          path:"RbStepone",
          name:"rbstepone",
          component:RbStepone
        },        
        {
          path:"RbSteptwo",
          name:"rbsteptwo",
          component:RbSteptwo
        },
        {
          path:"RbStepthree",
          name:"rbstepthree",
          component:RbStepthree
        },
        {
          path:"RbStepfour",
          name:"rbstepfour",
          component:RbStepfour          
        }
      ]
    }

  ]
})
