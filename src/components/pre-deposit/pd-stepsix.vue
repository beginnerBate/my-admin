<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <div>
          <p>充值成功:{{pdtotalCost}}</p>
          <p>当前卡内余额:{{balance}}</p>
        </div>
      </div>
      <!-- 扫码支付 -->
      <div class="payment">
        <p>点击'打印'按钮， 可打印您的充值信息,请取走您的卡，谢谢！</p>
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
      pdtotalCost() {
        return this.$store.state.bookReg.pdtotalCost
      },
      balance () {
        return this.$store.state.bookReg.balance
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
.user-info p
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
