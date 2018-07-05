<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:叶威</span>
          <span>门诊ID:123456</span>
        </p>
      </div>
      <!-- 扫码支付 -->
      <div class="payment">
        <div class="payment-img">
          <img src="" alt="">
        </div>
        <p>确认支付</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[
          {
            text:'微信支付',
            icon:'icon-wx'
          },
          {
            text:'支付宝支付',
            icon:'icon-zfb'
          },
          {
            text:'银行卡支付',
            icon:'icon-yhk'
          },          
          {
            text:'余额支付',
            icon:'icon-ye'
          }
        ],
        i:-1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
      // this.getData()
    },
    mounted () {
    },
    computed: {
    },
    methods: {
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
    border 4px solid $color-a4
    border-radius 20px
    margin 0 auto
  p
    color $color-font
    font-size 1.6em
    letter-spacing 3px
    padding-top 1em
</style>
