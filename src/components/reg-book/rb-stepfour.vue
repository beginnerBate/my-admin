<template>
  <div class="con">
    <div class="user-info info-wrapper">
      <p>姓 名: XXX</p>
      <p>性 别: 男</p>
      <p>就诊卡号: 55555</p>
      <p>绑定卡: 身份证</p>
      <p>身 份 证 号 :18655555555</p>
    </div>
    <p class="tip-finish">☺恭喜您完成建档, 点击'打印'按钮,可打印您的建档信息, 请取走您的证件, 谢谢!</p>
    <!-- button -->
    <div class="button-wrapper">
      <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>打 印</i></span>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit('setMenuIdx',3)
  }
}
</script>

<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.info-wrapper 
  padding 0.4em
  color $color-font
  background $color-a1
  font-size 1.6em
  border-radius 8px
  line-height 1.5em
.tip-finish
  padding-top 4em
  color $color-font
  font-size 1.4em
  text-align center
  letter-spacing 2px
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
