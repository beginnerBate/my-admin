<template>
  <div class="con">
    <div class="myuser-info info-wrapper">
      <span><i>用户姓名 :</i> <i>{{regUserInfo.name}}</i></span>
      <span><i>用户性别 :</i> <i>{{regUserInfo.sex}}</i></span>
      <span><i>就诊卡号 :</i> <i>{{jzId}}</i></span>
      <span><i>绑定卡名 :</i> <i>{{cardName}}</i></span>
      <span><i>身份证号 :</i> <i>{{regUserInfo.cardNumber}}</i></span>
    </div>
    <p class="tip-finish" v-if="flag">{{tipInfo}}</p>
    <div v-if='!flag' class='loading-wrapper'>
      <loading :title="tipInfo"></loading>
    </div>
    <!-- button -->
    <div class="button-wrapper" v-if="flag">
      <span class="btn-sub" @click.once="toNext()"><i>打 印</i></span>
    </div>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      message: "☺恭喜您完成建档, 点击'打印'按钮,可打印您的建档信息, 请取走您的证件, 谢谢!",
      tipInfo:"数据处理中...",
      flag:false
    }
  },
  created() {
    this.$store.commit('setMenuIdx',3)
  },
  components:{
    Loading
  },
  mounted () {
    setTimeout(()=>{
      this.makecard()
    },1000)
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
      // 打印小票
      var postData = {"name": this.regUserInfo.name,"sex": this.regUserInfo.sex,"jiuzhenId":this.jzId};
      if (typeof SharpForeign.Print_SmallTicket_ZCJD == 'function') {
          var code = SharpForeign.Print_SmallTicket_ZCJD(JSON.stringify(postData))
      }      
    },
    makecard () {
      if (typeof SharpForeign.WriteMedicalM1Card == 'function') {
          var res = JSON.parse(SharpForeign.WriteMedicalM1Card(this.jzId))
          if (res.code == '200') {
            this.tipInfo = this.message
            this.flag = true
          }else if (res.code =='206') {
            this.flag = true
            this.tipInfo = "数据处理成功, 出卡失败, 请到柜台处理！点击'打印'按钮,可打印您的建档信息, 请取走您的证件, 谢谢!"
          }else {
            this.flag = true
            this.tipInfo = "出卡失败,请到柜台处理！点击'打印'按钮,可打印您的建档信息, 请取走您的证件, 谢谢!"
          }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.info-wrapper>span
  display block
  line-height 40px
  i:first-child 
    display inline-block
    width 130px
    text-align right 
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
