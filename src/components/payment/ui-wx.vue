<template>
  <!-- 扫码支付 -->
  <div class="payment">
    <div class="payment-img">
      <img :src="src" alt="">
    </div>
    <p>打开手机微信,扫一扫完成支付!</p>
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
    },
    created () {
      this.$store.commit('setMenuIdx',2)
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
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
