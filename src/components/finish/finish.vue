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
      <div class="payment">
        <p>预约成功,请取走预约单号!</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.commit('setMenuIdx',3)
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
        // 调用打印接口
        var postData = {
                        "name": this.user.name,
                        "subscribeTime":this.booktime,
                        "departmentName":this.departmentName,
                        "doctorName":this.bookDoctor.ysxm,
                        "guaHaoAmount":this.bookDoctor.sumRegister,
                        "flowNumber":this.orderNumber
                        };
        if (typeof SharpForeign.Print_SmallTicket_YYGH== 'function') {
            var code = SharpForeign.Print_SmallTicket_YYGH(JSON.stringify(postData))
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
    font-size 2.5em
    letter-spacing 3px
    padding-top 4em
</style>
