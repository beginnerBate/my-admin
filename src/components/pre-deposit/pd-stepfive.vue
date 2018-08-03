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
      <div class="payment">
        <p>充值成功！</p>
        <p>点击'打印'按钮， 可打印您的充值信息,请取走您的卡，谢谢！</p>
      </div>
      <!-- 打印按钮 -->
      <div class="button-wrapper">
        <span class="btn-sub" @click="toPrint()" :class="{'disabled': disableFlag == -1}"><i>打 印</i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disableFlag: 1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',3)
    },
    computed: {
      pdtotalCost() {
        return this.$store.state.bookReg.pdtotalCost
      },
      balance () {
        return this.$store.state.bookReg.balance
      },
      user () {
        return this.$store.state.bookReg.user
      },
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
                        "rechargeAmount": this.pdtotalCost,
                        "originalAmount":this.balance,
                        "name":this.user.name,
                        "flowNumber":""
                        };
        if (typeof window.external.Print_SmallTicket_YCJCZ== 'function') {
            var code = JSON.parse(window.external.Print_SmallTicket_YCJCZ(JSON.stringify(postData)))
            if (code.code==200) {
              this.disableFlag = -1
            }else {
              this.disableFlag = 1
            }
          
        } 
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
.user-info p
  font-size 1.8em
  padding 0em 0.5em
.payment
  text-align center
  p
    color $color-font
    font-size 1.5em
    letter-spacing 3px
    padding-top 5em
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
