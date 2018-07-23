<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:{{user.name}}</span>
          <span>就诊卡号:  {{user.jzId}}</span>
        </p>
      </div>
      <!-- 支付模块 -->
      <!-- 微信支付 -->
      <div class="payment" v-if="paymentTypeId ==2">
        <div class="payment-img">
          <img :src="payInfo.QRcode" alt="">
        </div>
        <p>打开手机微信,扫一扫完成支付!</p>
      </div>
      <!-- 支付宝支付 -->
      <div class="payment" v-if="paymentTypeId ==3">
        <div class="payment-img">
           <img :src="payInfo.QRcode" alt="">
        </div>
        <p>打开手机支付宝,扫一扫完成支付!</p>
      </div>
      <!-- 余额支付 -->
      <div v-if="paymentTypeId ==''">支付中,请稍等！</div>
    </div>
  </div>
</template>

<script>
  import {yeOutpatientQuery, wxOutpatientQuery, zfbOutpatientQuery} from 'api/outpatient'
  export default {
    data() {
      return {
        timer: ""
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
    },
    computed: {
      user() {
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
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId
        }
        wxOutpatientQuery(mydata,this.token).then((res)=>{
          console.log(res)
          if (res.code == 200) {
            // 请求成功
             this.$router.push({name:'opstepsix'})
          }else{
            // 重新请求
            this.getWxPayOrder()
          }
        }).catch((err)=>{
          console.log('err')
        })
      },
      getZfbPayOrder () {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        zfbOutpatientQuery(mydata,this.token).then((res)=>{
          
          if (res.code == 200) {
            // 请求成功
            this.$router.push({name:'opstepsix'})
          }else{
            // 重新请求
            this.getZfbPayOrder()
          }
        }).catch((err)=>{
          console.log('err')
        })
      },
      getYePayOrder() {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        yeOutpatientQuery(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
             this.$router.push({name:'opstepsix'})
          }else{
            // 重新请求
            this.getYePayOrder()
          }
        }).catch((err)=>{
          console.log('err')
        })        
      }
    },
    mounted(){
      // 订单查询
      // if (this.paymentTypeId ==2) {
      //   this.timer = setTimeout(()=>{
      //     this.getWxPayOrder()
      //   },1000)
      // }else if (this.paymentTypeId ==3) {
      //   this.timer = setTimeout(()=>{
      //     this.getZfbPayOrder()
      //   },1000)
      // }else{
      //   // 余额支付
      //   this.timer = setTimeout(()=>{
      //    this.getYePayOrder()
      //   },1000)
        
      // }
      this.getYePayOrder()
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
.user-info>p>span
  font-size 1.8em
  padding 0em 0.5em
.payment
  text-align center
  .payment-img
    width 320px
    height 320px
    margin 0 auto
    img 
      border 4px solid $color-a4
      border-radius 20px
  p
    color $color-font
    font-size 1.6em
    letter-spacing 3px
    padding-top 1em
</style>
