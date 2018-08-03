<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
      <!-- 支付 -->
      <ui-wx v-if="paymentTypeId ==2" :src="payInfo.QRcode"></ui-wx>
      <div  class="ye-pay" v-if="paymentTypeId ==''">{{payMsg}}</div>
      <ui-zfb v-if="paymentTypeId ==3" :src="payInfo.QRcode"></ui-zfb>
    </div>
  </div>
</template>

<script>
  import UiWx from './ui-wx'
  import UiZfb from './ui-zfb'
  import {wxPayOrder,zfbPayOrder,yePayOrder} from 'api/pay'
  export default {
    data() {
      return {
        timer: '',
        payMsg:"余额支付中,请稍后！"
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
    },
    components:{
      UiWx,
      UiZfb
    },
    computed: {
      user () {
        return this.$store.state.bookReg.user
      },
      paymentTypeId() {
        return  this.$store.state.bookReg.paymentTypeId
      },
      payInfo () {
        return this.$store.state.bookReg.payInfo
      },
      token() {
        return this.$store.state.bookReg.token
      }
    },
    methods: {
      toTipPage () {
       this.$router.push({name:"dtippage"}) 
      },
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId
        }
        wxPayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$store.commit('setOrderNumber',res.data.orderNumber)
            this.$router.push({path:'finish'})
          }else if(res.code == 408){
            // 如果路由没有变化的话,重新请求
            if(this.$router.currentRoute.name=='payment') {
              this.getWxPayOrder()
            }
          }else {
            this.$store.commit('setRegbookTip','支付失败, 请到柜台处理!')
            this.toTipPage() 
          }
        }).catch((err)=>{
            this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
            this.toTipPage() 
        })
      },
      getZfbPayOrder () {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        zfbPayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$store.commit('setOrderNumber',res.data.orderNumber)
            this.$router.push({path:'finish'})
          }else if (res.code==408){
            // 如果路由没有变化的话,重新请求
            if(this.$router.currentRoute.name=='payment') {
              this.getZfbPayOrder()
            }
          }else {
            this.$store.commit('setRegbookTip','支付失败, 请到柜台处理!')
            this.toTipPage() 
          }
        }).catch((err)=>{
            this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
            this.toTipPage() 
        })
      },
      getYePayOrder() {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        yePayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$store.commit('setOrderNumber',res.data.orderNumber)
            this.$router.push({path:'finish'})
          }else if (res.code == '407') {
            this.payMsg = '账户余额不足,请重新选择支付方式'
            setTimeout(()=>{
              this.$router.go(-1)
            },3000)
          }else if (res.code == '400' || res.code =='404') {
            this.$store.commit('setRegbookTip','订单失败, 请到柜台处理!')
            this.toTipPage()       
          }else{
            this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
            this.toTipPage() 
          }
        }).catch((err)=>{
            this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
            this.toTipPage() 
        })      
      }
    },
    mounted(){
      // 订单查询
      if (this.paymentTypeId ==2) {
        this.timer = setTimeout(()=>{
          this.getWxPayOrder()
        },1000)
      }else if (this.paymentTypeId ==3) {
        this.timer = setTimeout(()=>{
          this.getZfbPayOrder()
        },1000)
      }else{
        // 余额支付
        this.getYePayOrder()
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.login
  height 100%
.info-wrapper
  background $color-bg1
  padding 1em 3em
  margin-bottom 2em
  border-radius 8px
  color $color-font
.doctor-info>p
  font-size 1.4em
  margin 0.5em 0
  color $color-font
  padding-left 0.6em
.user-info span
  font-size 1.8em
  padding 0em 0.5em
.ye-pay
  text-align center
  color $color-font
  font-size 1.6em
  padding-top 100px
  letter-spacing 5px
</style>
