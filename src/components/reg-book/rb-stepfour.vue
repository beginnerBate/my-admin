<template>
  <div class="con">
    <div class="user-info info-wrapper">
      <p>姓 名: {{regUserInfo.name}}</p>
      <p>性 别: {{regUserInfo.sex}}</p>
      <p>就诊卡号: {{jzId}}</p>
      <p>绑定卡: {{cardName}}</p>
      <p>身 份 证 号 :{{regUserInfo.cardNumber}}</p>
    </div>
    <p class="tip-finish">☺恭喜您完成建档, 点击'打印'按钮,可打印您的建档信息, 请取走您的证件, 谢谢!</p>
    <!-- button -->
    <div class="button-wrapper">
      <span class="btn-sub" @click="toNext()"><i>打 印</i></span>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit('setMenuIdx',3)
  },
  computed: {
    regUserInfo () {
      return this.$store.state.bookReg.reguserinfo
    },
    jzId () {
      return this.$store.state.bookReg.jzId
    },
    cardName () {
      var cardType = this.$store.state.bookReg.cardType
      if (cardType == 1) {
        return '身份证'
      }
      if (cardType ==2) {
        return '医保卡'
      }
      if (cardType ==3) {
        return '健康卡'
      }
    }
  },
  methods:{
    toNext() {
      console.log('')
    }
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
