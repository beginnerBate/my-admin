<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con" v-if='!flag'>
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
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
      <!-- 余额支付 -->
      <div  class="ye-pay" v-if="paymentTypeId ==''">{{payMsg}}</div>
    </div>
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
    <!-- <div v-if="waitpay" class="paywait">
      <p>支付中,请稍等...</p>
    </div> -->
  </div>
</template>

<script>
  import {wxPayOrder,zfbPayOrder,yePayOrder} from 'api/pay'
  import Loading from 'base/loading/loading'
  import QRCode from 'qrcodejs2'
  export default {
    data() {
      return {
        timer:"",
        payMsg:"余额支付中,请稍后！",
        mypayTime:"",
        getTimer:"",
        flag:false,
        title:'页面加载中...',
        requesting:true
        // waitpay:true
      }
    },
    beforeRouteLeave (to, from , next) {
      const answer = to.name === 'finishfour'? true : false
      if (answer) {
        next()
      } else {
        // 调用接口
        this.flag = true
        this.backSearch(next)
       
      }
    },
     components: {QRCode,Loading},
    created () {
      this.$store.commit('setMenuIdx',2)
            this.$nextTick (function () {
        this.qrcode();
      })
      // 设置定时器
      this.$store.commit('setTimeFlag',true)
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
      }else{
        // 余额支付
        this.getYePayOrder()
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
      }
    },
    destroyed () {
      clearTimeout(this.mypayTime)
      clearTimeout(this.timer)
      clearInterval(this.getTimer)
    },
    methods: {
      qrcode () {
        let qrcode = new QRCode('qrcode', {  
            width: 300,  // 设置宽度 
            height: 300, // 设置高度
            text:this.payInfo.QRcode
        })  
      },
      toTipPage () {
       this.$router.push({name:"rttippage"}) 
      },
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId
        }
        if(this.requesting){
            this.requesting = false;
            wxPayOrder(mydata,this.token).then((res)=>{
              this.requesting = true;
              if (res.code == 200) {
                // 请求成功
                clearInterval(this.getTimer)
                this.$store.commit('setOrderNumber',res.data.orderNumber)
                this.$router.push({name:'finishfour'})
              }else if(res.code == 408 || res.code ==409){
                // 如果路由没有变化的话,重新请求
                  clearInterval(this.getTimer)
                    this.getTimer = setInterval(()=>{
                      if(this.$router.currentRoute.name=='paymoney' && this.paymentTypeId ==2) {
                        this.getWxPayOrder()
                      }else{
                        clearInterval(this.getTimer)
                      }
                  },2000)              
              }else {
                this.$store.commit('setRegbookTip','支付失败, 请到柜台处理!')
                this.toTipPage() 
              }
            }).catch((err)=>{
                this.requesting = true;
                this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
                this.toTipPage() 
            })
        }
      },
      getZfbPayOrder () {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        if(this.requesting){
           this.requesting = false;
            zfbPayOrder(mydata,this.token).then((res)=>{
              this.requesting = true;
              if (res.code == 200) {
                // 请求成功
                clearInterval(this.getTimer)
                this.$store.commit('setOrderNumber',res.data.orderNumber)
                this.$router.push({name:"finishfour"})
              }else if(res.code == 408){
                // 如果路由没有变化的话,重新请求  
                    clearInterval(this.getTimer)
                      this.getTimer = setInterval(()=>{
                        if(this.$router.currentRoute.name=='paymoney' && this.paymentTypeId ==3) {
                          this.getZfbPayOrder()
                        }else{
                          clearInterval(this.getTimer)
                        }
                      },2000)
              }else if( res.code ==409){
                     clearInterval(this.getTimer)
                      this.getTimer = setInterval(()=>{
                        if(this.$router.currentRoute.name=='paymoney' && this.paymentTypeId ==3) {
                          this.getZfbPayOrder()
                        }else{
                          clearInterval(this.getTimer)
                        }
                      },2000)               
              }else {
                this.$store.commit('setRegbookTip','支付失败, 请到柜台处理!')
                this.toTipPage() 
              }
            }).catch((err)=>{
                this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
                this.toTipPage() 
            })
        }
      },
      getYePayOrder() {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        yePayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
           this.$store.commit('setOrderNumber',res.data.orderNumber)
           this.$router.push({name:"finishfour"})
          } else if (res.code == '407') {
            this.payMsg = '账户余额不足,请重新选择支付方式'
            this.mypayTime = setTimeout(()=>{
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
      },
      backSearch(callback){
          // 返回查询接口
          var mydata = {
            orderId: this.payInfo.orderId
          }
          // 判断是微信还是支付宝
          if (this.paymentTypeId ==2) {
              wxPayOrder(mydata,this.token).then((res)=>{
                 this.flag = false
                callback()
              }).catch((err)=>{
                  this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
                  this.toTipPage() 
              })
          }else if (this.paymentTypeId ==3) {
              zfbPayOrder(mydata,this.token).then((res)=>{
                 this.flag = false
                callback()
              }).catch((err)=>{
                  this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
                  this.toTipPage() 
              })
          }else{
             callback()
              this.flag = false
          }
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
.ye-pay
  text-align center
  color $color-font
  font-size 1.6em
  padding-top 100px
  letter-spacing 5px
</style>
