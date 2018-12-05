<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con" v-if='!flag'>
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名</i>: <i>{{user.name}}</i></span>
        <span><i>就诊卡号</i>: <i>{{user.jzId}}</i></span>
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
      <div class="ye-pay" v-if="paymentTypeId ==''">{{payMsg}}</div>
    </div>
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>

<script>
  import {yeOutpatientQuery, wxOutpatientQuery, zfbOutpatientQuery} from 'api/outpatient'
    import Loading from 'base/loading/loading'
    import QRCode from 'qrcodejs2'
  export default {
    data() {
      return {
        timer: "",
        payMsg:"余额支付中,请稍后",
        mypayTime:'',
        getTimer:"",
        flag:false,
        title:'页面加载中...',
        requesting:true
      }
    },
    beforeRouteLeave (to, from , next) {
      const answer = to.name === 'opstepsix'? true : false
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
    destroyed() {
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
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId
        }
        if(this.requesting){
            this.requesting = false;
            wxOutpatientQuery(mydata,this.token).then((res)=>{
              this.requesting = true;
              if (res.code == 200) {
                // 请求成功
                this.$store.commit('setOrderNumber',res.data.orderNumber)
                this.$store.commit('setpayTime',res.data.payTime)
                this.$router.push({name:'opstepsix'})
              }else if (res.code ==408 || res.code ==409){
                // 如果路由没有变化的话,重新请求
                  clearInterval(this.getTimer)
                    this.getTimer = setInterval(()=>{
                      if(this.$router.currentRoute.name=='opstepfive' && this.paymentTypeId ==2) {
                        this.getWxPayOrder()
                      }else{
                        clearInterval(this.getTimer)
                      }
                  },2000)                           
              }else {
                this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
                
                this.toTipPage()
              }
            }).catch((err)=>{
              this.requesting = true;
                this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

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
            zfbOutpatientQuery(mydata,this.token).then((res)=>{
              this.requesting = true;
              if (res.code == 200) {
                // 请求成功
                this.$store.commit('setOrderNumber',res.data.orderNumber)
                this.$store.commit('setpayTime',res.data.payTime)

                this.$router.push({name:'opstepsix'})
              }else if (res.code == 408 || res.code ==409){
                // 如果路由没有变化的话,重新请求
                clearInterval(this.getTimer)
                      this.getTimer = setInterval(()=>{
                        if(this.$router.currentRoute.name=='opstepfive' && this.paymentTypeId ==3) {
                          this.getZfbPayOrder()
                        }else{
                          clearInterval(this.getTimer)
                        }
                },2000)  
              }else {
                // 失败
                this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
                this.toTipPage()            
              }
            }).catch((err)=>{
                this.requesting = true;
                this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
                this.toTipPage()
            })
        }
      },
      getYePayOrder() {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        yeOutpatientQuery(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
             this.$store.commit('setOrderNumber',res.data.orderNumber)
            this.$store.commit('setpayTime',res.data.payTime)

             this.$router.push({name:'opstepsix'})
          }else if (res.code == '407') {
            this.payMsg = '账户余额不足,请重新选择支付方式'

            this.mypayTime = setTimeout(()=>{
                this.$router.go(-1)
            },15*1000)
          } else if (res.code == '400') {
            // this.$store.commit('setRegbookTip','订单错误,请到柜台处理')
            this.$store.dispatch('setTipPage',['订单不存在,请到柜台处理!','error'])
            this.toTipPage()
          }else if (res.code == '404') {
            // this.$store.commit('setRegbookTip','订单不存在,请到柜台处理')
            this.$store.dispatch('setTipPage',['订单不存在,请到柜台处理!','warning'])
            this.toTipPage()
          }else{
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理')
            this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
            this.toTipPage()
          }
        }).catch((err)=>{
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理')
           this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

            this.toTipPage()
        })        
      },
      toTipPage () {
       this.$router.push({name:"optippage"}) 
      },
      backSearch(callback){
          // 返回查询接口
          var mydata = {
            orderId: this.payInfo.orderId
          }
          // 判断是微信还是支付宝
          if (this.paymentTypeId ==2) {
              wxOutpatientQuery(mydata,this.token).then((res)=>{
                 this.flag = false
                callback()
              }).catch((err)=>{
                  this.$store.commit('setRegbookTip','系统错误, 请到柜台处理!')
                  this.toTipPage() 
              })
          }else if (this.paymentTypeId ==3) {
              zfbOutpatientQuery(mydata,this.token).then((res)=>{
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
.ye-pay
  text-align center
  color $color-font
  font-size 1.6em
  padding-top 100px
  letter-spacing 5px
</style>
