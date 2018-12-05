<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
          <span><i>姓名: </i><i>{{user.name}}</i></span>
          <span><i>就诊卡号: </i><i>{{user.jzId}}</i></span>
          <span><i>充值金额: </i> <i>{{pdtotalCost}}</i> <i>元</i></span>
      </div>
      <!-- 支付模块 -->
      <!-- 微信支付 -->
      <div class="payment" v-if="paymentTypeId ==2">
        <div class="payment-img">
         <div id="qrcode" ref="qrcode"></div>
        </div>
        <p>打开手机微信,扫一扫完成支付!</p>
      </div>
      <!-- 支付宝支付 -->
      <div class="payment" v-if="paymentTypeId ==3">
        <div class="payment-img">
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <p>打开手机支付宝,扫一扫完成支付!</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {wxpdPayOrder,zfbpdPayOrder,cancel} from 'api/pay'
  import QRCode from 'qrcodejs2'
  export default {
    data() {
      return {
        timer:"",
        getTimer:"",
        requesting:true
      }
    },
    components: {QRCode},
    created () {
      this.$store.commit('setMenuIdx',2)
      this.$nextTick (function () {
        this.qrcode();
      })
    },
    mounted(){
      // 订单查询
      if (this.paymentTypeId ==2) {
        this.timer = setTimeout(()=>{
          this.getWxPayOrder()
        },3000)
      }else if (this.paymentTypeId ==3) {
        this.timer = setTimeout(()=>{
          this.getZfbPayOrder()
        },3000)
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
      clearInterval(this.getTimer);
      clearTimeout(this.timer)
    },
    methods: {
      qrcode () {
        let qrcode = new QRCode('qrcode', {  
            width: 300,  // 设置宽度 
            height: 300, // 设置高度
            text:this.payInfo.QRcode
        })  
      },
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId,
          ksId:""
        }
        if(this.requesting){
            this.requesting = false;
            wxpdPayOrder(mydata,this.token).then((res)=>{
              this.requesting = true;
              if (res.code == 200) {
                // 请求成功
                this.$store.commit('setBalance',res.balance)
                this.$store.commit('setpayTime',res.data.payTime)
                this.$store.commit('setOrderNumber',res.data.orderNumber)
                this.$router.push({name:'pdstepfive'})
              }else if(res.code == 408 || res.code ==409){
                // 如果路由没有变化的话,重新请求
                clearInterval(this.getTimer)
                  this.getTimer = setInterval(()=>{
                    if(this.$router.currentRoute.name=='pdstepfour' && this.paymentTypeId ==2) {
                      this.getWxPayOrder()
                  }else{
                      clearInterval(this.getTimer)
                  }
                },2000)
              }else {
                this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
                this.toTipPage()  
              }
            }).catch((err)=>{
              this.requesting = true;
                this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
                this.toTipPage()  
            })
        }        
      },
      getZfbPayOrder () {
        var mydata = {
          orderId: this.payInfo.orderId,
          ksId:""
        }
        if(this.requesting){
            this.requesting = false;
            zfbpdPayOrder(mydata,this.token).then((res)=>{
              this.requesting = true;
              if (res.code == 200) {
                // 请求成功
                this.$store.commit('setBalance',res.balance)
                this.$store.commit('setpayTime',res.data.payTime)
                this.$store.commit('setOrderNumber',res.data.orderNumber)
                this.$router.push({name:"pdstepfive"})
              }else if(res.code == 408 || res.code ==409) {
                // 如果路由没有变化的话,重新请求
                  clearInterval(this.getTimer)
                  this.getTimer = setInterval(()=>{
                      if(this.$router.currentRoute.name=='pdstepfour' && this.paymentTypeId ==3) {
                        this.getZfbPayOrder()
                      }else{
                        clearInterval(this.getTimer)
                      }            
                  },2000)
              }else {
                this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
                this.toTipPage()  
              }
            }).catch((err)=>{
              this.requesting = true;
                this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
                this.toTipPage() 
            })
        }  
      },
      toTipPage () {
       this.$router.push({name:"pdtippage"}) 
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
#qrcode
  border: 10px solid #fff;
  border-radius: 8px;
.login
  height 100%
.info-wrapper
  margin-bottom 2em
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
