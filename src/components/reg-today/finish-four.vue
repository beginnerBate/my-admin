<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:{{user.name}}</span>
          <span>就诊卡号:{{user.jzId}}</span>
        </p>
      </div>
      <!-- 扫码支付 -->
      <div class="payment">
        <p>挂号完成,请取走挂号单号!</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.commit('setMenuIdx',3)
      // this.getData()
    },
    mounted () {
    },
    computed: {
      user () {
        return this.$store.state.bookReg.user
      }
    },
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
  p
    color $color-font
    font-size 2em
    letter-spacing 3px
    padding-top 5em
</style>
