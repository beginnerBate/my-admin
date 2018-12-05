<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
      <!-- 扫码支付 -->
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
  export default {
    data() {
      return {
        disableFlag: 1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',3)
      this.$store.dispatch('setTipPage',['预 约 成 功!','ok'])
    },
    components:{
      TipPage
    },
    computed:{
      user () {
        return this.$store.state.bookReg.user
      },
      booktime () {
        return this.$store.state.bookReg.booktime
      },
      departmentName() {
        return this.$store.state.bookReg.departName
      },
      bookDoctor () {
        return this.$store.state.bookReg.bookDoctor
      },
      orderNumber() {
        return this.$store.state.bookReg.orderNumber
      }
    },
    methods: {
      toPrint(){
        if (this.disableFlag == 1) {
           this.disableFlag = -1
        }else {
          return
        }
        // 调用打印接口
        var postData = {
                        "name": this.user.name,
                        "subscribeTime":this.booktime.date+ ' ' + this.booktime.week + ' '+ this.booktime.pb,
                        "departmentName":this.departmentName,
                        "doctorName":this.bookDoctor.ysxm,
                        "guaHaoAmount":this.bookDoctor.sumRegister+'元',
                        "flowNumber":this.orderNumber
                        };
        if (typeof sharpForeign!= 'undefined') {
            var code = JSON.parse(sharpForeign.Print_SmallTicket_YYGH(JSON.stringify(postData)))
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
.info-wrapper
  margin-bottom 2em
.doctor-info>p
  font-size 1.8em
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
    font-size 1.8em
    letter-spacing 3px
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
