import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/home'
// 注册建档
import RegBook from 'components/reg-book/reg-book'
import RbStepone from 'components/reg-book/rb-stepone'
import RbSteptwo from 'components/reg-book/rb-steptwo'
import RbStepthree from 'components/reg-book/rb-stepthree'
import RbStepfour from 'components/reg-book/rb-stepfour'
// 预存金充值
import PreDeposit from 'components/pre-deposit/pre-deposit'
import PdStepone from 'components/pre-deposit/pd-stepone'
import PdSteptwo from 'components/pre-deposit/pd-steptwo'
import PdStepthree from 'components/pre-deposit/pd-stepthree'
import PdStepfour from 'components/pre-deposit/pd-stepfour'
import PdStepfive from 'components/pre-deposit/pd-stepfive'
// 预约挂号
import SDepartment from 'components/s-department/s-department'
import SDoctor from 'components/s-doctor/s-doctor'
import DoctorInfo from 'components/doctor-info/doctor-info'
import SelectCard from 'components/user-info/select-card'
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
// 提示页面
import TipPage from 'base/tip-page/tip-page'
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
          component: SDepartment,
          meta: { backpage: 'close'}
        },
        {
          path:'doctor',
          name:"doctor",
          component: SDoctor,
          meta: { backpage: 'department'}
        },
        {
          path:'doctor-info',
          name:"doctorInfo",
          component: DoctorInfo,
          meta: { backpage: 'doctor'}
        },
        {
          path:"select-card",
          name:"dselectcard",
          component:SelectCard,
          meta: { backpage: 'doctorInfo'}
        },
        {
          path:'user-info',
          name:"userInfo",
          component: UserInfo,
          meta: { backpage: 'dselectcard'}
        },
        {
          path:'info-confirm',
          name:"infoConfirm",
          component: InfoConfirm,
          meta: { backpage: 'doctorInfo'}
        },
        {
          path:'payment-method',
          name:"paymentMethod",
          component: PaymentMethod,
          meta: { backpage: 'infoConfirm'}
        },
        {
          path:'payment',
          name:"payment",
          component: Payment,
          meta: { backpage: 'paymentMethod'}
        },
        {
          path:'finish',
          name:"finish",
          component: Finish,
          meta: { backpage: 'close'}
        },
        {
          path:"dtippage",
          name:'dtippage',
          component:TipPage,
          meta: { backpage: 'close'}
        }
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
          name:"chooseone",
          component: ChooseOne,
          meta: { backpage: 'close'}
        },
        {
          path:'ChooseTwo',
          component: ChooseTwo,
          name:'choosetwo',
          meta: { backpage: 'chooseone'}
        },
        {
          path:'select-card',
          name:'regselectcard',
          component: RegCardType,
          meta: { backpage: 'choosetwo'}
        },
        {
          path:'get-info',
          name:'reggetinfo',
          component: GetInfo,
          meta: { backpage: 'regselectcard'}
        },
        {
          path:"choose-three",
          component:ChooseThree,
          name:'choosethree',
          meta: { backpage: 'choosetwo'}
        },
        {
          path:'pay-money',
          component:PayMoney,
          name:"paymoney",
          meta: { backpage: 'choosethree'}
        },
        {
          path:'finish-four',
          component:FinishFour,
          name:"finishfour",
          meta: { backpage: 'close'}
        },
        {
          path:"rttippage",
          name:'rttippage',
          component:TipPage,
          meta: { backpage: 'close'}
        }
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
          component: OpStepone,
          name:'opstepone',
          meta: { backpage: 'close'}
        },
        {
          path:'op-steptwo',
          component: OpSteptwo,
          name:'opsteptwo',
          meta: { backpage: 'opstepone'}
        },
        {
          path:'op-stepthree',
          name:'opstepthree',
          component: OpStepthree,
          meta: { backpage: 'opstepone'}
        },
        {
          path:"op-stepfour",
          component:OpStepfour,
          name:'opstepfour',
          meta: { backpage: 'opstepthree'}
        },
        {
          path:"op-stepfive",
          component:OpStepfive,
          name:'opstepfive',
          meta: { backpage: 'opstepfour'}
        },
        {
          path:"op-stepsix",
          component:OpStepsix,
          name:'opstepsix',
          meta: { backpage: 'close'}
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
          name:'bostepone',
          component: BoStepone,
          meta: { backpage: 'close'}
        },
        {
          path:'bo-steptwo',
          component: BoSteptwo,
          name:'bosteptwo',
          meta: { backpage: 'bostepone'}
        },
        {
          path:'bo-stepthree',
          name:'bostepthree',
          component: BoStepthree,
          meta: { backpage: 'bostepone'}
        },
        {
          path:"bo-stepfour",
          component:BoStepfour,
          name:'bostepfour',
          meta: { backpage: 'close'}
        },
        {
          path:"botippage",
          name:'botippage',
          component:TipPage,
          meta: { backpage: 'close'}
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
          component:SelfQuerylist,
          meta: { backpage: 'close'}
        },
        {
          path:"SqStepone",
          name:'sqstepone',
          component:SqStepone,
          meta: { backpage: 'selfquerylist'}
        },
        {
          path:"SqSteptwo",
          name:'sqsteptwo',
          component:SqSteptwo,
          meta: { backpage: 'sqstepone'}
        },
        {
          path:"SqStepthree",
          name:'sqstepthree',
          component:SqStepthree,
          meta: { backpage: 'selfquerylist'}
        },
        {
          path:"SqStepfour",
          name:'sqstepfour',
          component:SqStepfour,
          meta: { backpage: 'selfquerylist'}
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
          component:RbStepone,
          meta: { backpage: 'close'}
        },        
        {
          path:"RbSteptwo",
          name:"rbsteptwo",
          component:RbSteptwo,
          meta: { backpage: 'rbstepone'}
        },
        {
          path:"RbStepthree",
          name:"rbstepthree",
          component:RbStepthree,
          meta: { backpage: 'rbstepone'}
        },
        {
          path:"RbStepfour",
          name:"rbstepfour",
          component:RbStepfour,
          meta: { backpage: 'close'}          
        },
        {
          path:'TipPage',
          name:"rbtippage",
          component:TipPage,
          meta: { backpage: 'close'}
        }
      ]
    },
    {
      path:"/predeposit",
      component:PreDeposit,
      redirect:'/predeposit/pdStepone',
      children:[
        {
          path:"PdStepone",
          name:"pdstepone",
          component:PdStepone,
          meta: { backpage: 'close'}
        },        
        {
          path:"PdSteptwo",
          name:"pdsteptwo",
          component:PdSteptwo,
          meta: { backpage: 'pdstepone'}
        },
        {
          path:"PdStepthree",
          name:"pdstepthree",
          component:PdStepthree,
          meta: { backpage: 'pdstepone'}
        },
        {
          path:"PdStepfour",
          name:"pdstepfour",
          component:PdStepfour,
          meta: { backpage: 'pdstepthree'}
        },        
        {
          path:"PdStepfive",
          name:"pdstepfive",
          component:PdStepfive,
          meta: { backpage: 'close'}
        },        
        {
          path:'TipPage',
          name:"pdtippage",
          component:TipPage,
          meta: { backpage: 'close'}
        }
      ]
    }

  ]
})
