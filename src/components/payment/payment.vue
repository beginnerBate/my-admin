<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:{{user.name}}</span>
          <span>门诊ID:{{user.jzId}}</span>
        </p>
      </div>
      <!-- 支付 -->
      <ui-wx v-if="paymentTypeId ==2" :src="payInfo.QRcode"></ui-wx>
      <ui-ye v-if="paymentTypeId ==''"></ui-ye>
      <ui-zfb v-if="paymentTypeId ==3" :src="payInfo.QRcode"></ui-zfb>
    </div>
  </div>
</template>

<script>
  import UiWx from './ui-wx'
  import UiYe from './ui-ye'
  import UiZfb from './ui-zfb'
  import {wxPayOrder,zfbPayOrder,yePayOrder} from 'api/pay'
  export default {
    data() {
      return {
        timer: ''
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
    },
    components:{
      UiWx,
      UiYe,
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
      getWxPayOrder() {
        // 清除定时器
        var mydata = {
          orderId: this.payInfo.orderId
        }
        wxPayOrder(mydata,this.token).then((res)=>{
          console.log(res)
          if (res.code == 200) {
            // 请求成功
            this.$router.push({path:'finish'})
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
        zfbPayOrder(mydata,this.token).then((res)=>{
          console.log(res)
          if (res.code == 200) {
            // 请求成功
            this.$router.push({path:'finish'})
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
        console.log(mydata)
        yePayOrder(mydata,this.token).then((res)=>{
          console.log(res)
          if (res.code == 200) {
            // 请求成功
            this.$router.push({path:'finish'})
          }else{
            // 重新请求
            // this.getYePayOrder()
          }
        }).catch((err)=>{
          console.log('err')
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
</style>
