<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:{{user.name}}</span>
          <span>门诊ID:{{user.jzId}}</span>
        </p>
      </div>
      <!-- 支付 -->
      <ui-wx v-if="paymentTypeId ==2" :src="payInfo.QRcode"></ui-wx>
      <ui-ye v-if="paymentTypeId ==''"></ui-ye>
      <ui-zfb v-if="paymentTypeId ==3"></ui-zfb>
    </div>
  </div>
</template>

<script>
  import UiWx from './ui-wx'
  import UiYe from './ui-ye'
  import UiZfb from './ui-zfb'
  export default {
    created () {
      this.$store.commit('setMenuIdx',2)
    },
    components:{
      UiWx,
      UiYe,
      UiZfb
    },
    computed: {
      user () {
        return this.$store.state.bookReg.user
      },
      paymentTypeId() {
        return  this.$store.state.bookReg.paymentTypeId
      },
      payInfo () {
        return this.$store.state.bookReg.payInfo
      },
      departId () {
        return this.$store.state.bookReg.departId
      },
      departName () {
        return this.$store.state.bookReg.departName
      },
      bookDoctor () {
        return this.$store.state.bookReg.bookDoctor
      }
    },
    methods: {
      getWxPayOrder() {
        var mydata = {
          orderId: this.payInfo.orderId,
          payType: this.payInfo.payType,
          sumRegister:0.1, // 测试
          //registrationFee: this.bookDoctor.sumRegister, //测试的时候修改挂号费
          docId: this.bookDoctor.ysId,
          ksId: this.departId,
          ksName:this.departName,
          hm: this.bookDoctor.hm,
          xmId: this.bookDoctor.projectId,
          docName: this.bookDoctor.ysxm,
          patName: this.user.name,
          patSex: this.user.sex
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
  background $color-bg1
  padding 1em 3em
  margin-bottom 2em
  border-radius 8px
  color $color-font
.doctor-info>p
  font-size 1.4em
  margin 0.5em 0
  color $color-font
  padding-left 0.6em
.user-info span
  font-size 1.8em
  padding 0em 0.5em
</style>
