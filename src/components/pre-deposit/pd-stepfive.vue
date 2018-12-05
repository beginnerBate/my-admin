<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名</i>: <i>{{user.name}}</i></span>
        <span><i>就诊卡号</i>: <i>{{user.jzId}}</i></span>
        <span><i>充值金额</i>: <i>{{pdtotalCost}}元</i></span>
      </div>
      <!-- 提示信息 -->
      <tip-page></tip-page>
      <!-- 打印按钮 -->
      <div class="button-wrapper">
        <span class="btn-sub" @click="toPrint()" :class="{'disabled': disableFlag == -1}"><i>打 印 小 票</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import TipPage from 'base/tip-page/tip-page'
import {formatDate} from 'common/js/date.js'
  export default {
    data() {
      return {
        disableFlag: 1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',3)
      this.$store.dispatch('setTipPage',['充 值 成 功!','ok'])
    },
    components:{
      TipPage
    },
    computed: {
      pdtotalCost() {
        return this.$store.state.bookReg.pdtotalCost
      },
      balance () {
        return this.$store.state.bookReg.balance
      },
      payTime(){
         var mydate = new Date(this.$store.state.bookReg.payTime)
        return formatDate(mydate,'yyyy/MM/dd hh:mm:ss');
      },
      user () {
        return this.$store.state.bookReg.user
      },
      orderNumber() {
        return this.$store.state.bookReg.orderNumber
      }
    },
    methods: {
      toPrint() {
        if (this.disableFlag == 1) {
           this.disableFlag = -1
        }else {
          return
        }   
        // 调用打印接口
        var postData = {
                        "rechargeAmount": this.pdtotalCost+'元',
                        "originalAmount":this.balance+'元',
                        "cardNo":this.user.jzId,
                        "flowNumber":this.orderNumber,
                        "rechargeTime":this.payTime
                        };
        if (typeof sharpForeign != 'undefined') {
            var code = JSON.parse(sharpForeign.Print_SmallTicket_YCJCZ(JSON.stringify(postData)))
            if (code.code==200) {
              this.disableFlag = -1
            }else {
              this.disableFlag = 1
            }     
        }
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
.user-info p
  font-size 1.8em
  padding 0em 0.5em
.payment
  text-align center
  p
    color $color-font
    font-size 1.8em
    letter-spacing 3px
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
