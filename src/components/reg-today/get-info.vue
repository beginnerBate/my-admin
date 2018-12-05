<template>
  <user-identity @authpass="topage200()" @authno="topage406()" @nouser="usernot()" @neterror='neterror()'></user-identity>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  import {createOrder}  from 'api/pay.js'
  export default {
    components:{
      UserIdentity
    },
    computed:{
      token() {
        return this.$store.state.bookReg.token
      },
      dayDoctorInfo () {
        return this.$store.state.bookReg.dayDoctorInfo
      }
    },
    methods:{
      topage200() {
        // 创建订单
        var mydata = {
          docNumber: this.dayDoctorInfo.number,
          terminalNumber:MachineCode
        }
        var that = this
        createOrder(mydata,this.token).then(function(res){
          if (res.code == 200) {
            // 订单创建成功
            // 保存orderId
            that.$store.commit('setorderId',res.orderId)
            that.$router.push({name:'choosethree'})
          }else if(res.code == 'AF401') {
            console.log('认证失败')
          }
        }).catch(function(res){
          console.log(res)
        }) 
      },
      // 用户不存在
      usernot() {
        this.$store.commit('setRegbookTip','没有该用户,请先注册建档!')
        this.toTipPage()
      },
      topage406() {
        this.$store.commit('setRegbookTip','用户账号已锁定, 请到柜台处理!')
        this.toTipPage() 
      },
      neterror() {
        this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
        this.toTipPage()        
      },
      toTipPage () {
       this.$router.push({name:"rttippage"}) 
      }
    }
  }
</script>