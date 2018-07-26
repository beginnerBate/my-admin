<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:{{user.name}}</span>
          <span>性别:{{user.sex}}</span>
          <span>充值金额: {{pdtotalCost}} 元</span>
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
    </div>
  </div>
</template>

<script>
  import {wxpdPayOrder,zfbpdPayOrder} from 'api/pay'
  export default {
    data() {
      return {
        timer:""
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
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
      }
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
      },
      pdtotalCost () {
         return this.$store.state.bookReg.pdtotalCost
      }
    },
    destroyed() {
      // 取消请求
    },
    methods: {
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId,
          ksId:""
        }
        wxpdPayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$router.push({name:'pdstepfive'})
          }else{
            // 重新请求
            if(this.$router.currentRoute.name=='pdstepfour') {
               this.getWxPayOrder()
            }
           
          }
        }).catch((err)=>{
          console.log('err')
        })
      },
      getZfbPayOrder () {
        var mydata = {
          orderId: this.payInfo.orderId,
          ksId:""
        }
        zfbpdPayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$router.push({name:"pdstepfive"})
          }else{
            // 如果路由没有变化的话,重新请求
            if(this.$router.currentRoute.name=='pdstepfour') {
              this.getZfbPayOrder()
            }
            
          }
        }).catch((err)=>{
          console.log('err')
        })
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
