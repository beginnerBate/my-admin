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
        <div style="padding-top:9em"><img src="./icon_right.png" width="100px" height="100px"></div>
        <p>挂号完成,请取走挂号单号!</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.commit('setMenuIdx',3)
    },
    mounted () {
      this.toPrint()
    },
    computed: {
      user () {
        return this.$store.state.bookReg.user
      },
      orderNumber() {
        return this.$store.state.bookReg.orderNumber
      },
      departmentName() {
        return this.$store.state.bookReg.departName
      },
      dayDoctorInfo () {
        return this.$store.state.bookReg.dayDoctorInfo
      },
    },
    methods: {
      toPrint(){
        // 调用打印接口
        var postData = {
                        "name": this.user.name,
                        "departmentName":this.departmentName,
                        "doctorName":this.dayDoctorInfo.docName,
                        "guaHaoAmount":this.dayDoctorInfo.sumRegister +'元',
                        "flowNumber":this.orderNumber
                        };
        if (typeof sharpForeign != 'undefined') {
            var code = sharpForeign.Print_SmallTicket_DRGH(JSON.stringify(postData))
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
    font-size 1.8em
    letter-spacing 3px
    // padding-top 5em
</style>
