<template>
  <div class="login">
    <!-- doctor header -->
    <div class="con">
      <div class="btn left"><span>支付方式</span></div>
    </div>
    <!-- 预约信息 -->
    <div class="con">
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:叶威</span>
          <span>门诊ID:123456</span>
        </p>
      </div>
      <!-- 医生信息 -->
      <div class="doctor-info">
        <p>挂号科室: 内科</p>
        <p>门诊医生: 张蕙兰</p>
        <p>挂号费: 13元</p>
      </div>
      <!-- 支付方式 -->
      <div class="payment">
        <span class="txt">支付方式:</span>
        <span class="pay-method" v-for="(item,index) in list" 
          :key="index" 
          :class="{'active': index==i}"
          @click="selectItem(index)">
          <i class="pay-icon" :class="item.icon"></i><i>{{item.text}}</i>
        </span>
        <!-- <span class="pay-method"><i class="pay-icon icon-zfb"></i><i>支付宝支付</i></span>
        <span class="pay-method"><i class="pay-icon icon-yhk"></i><i>银行卡支付</i></span>
        <span class="pay-method"><i class="pay-icon icon-ye"></i><i>余额支付</i></span> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[
          {
            text:'微信支付',
            icon:'icon-wx'
          },
          {
            text:'支付宝支付',
            icon:'icon-zfb'
          },
          {
            text:'银行卡支付',
            icon:'icon-yhk'
          },          
          {
            text:'余额支付',
            icon:'icon-ye'
          }
        ],
        i:-1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
      // this.getData()
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      selectItem(index) {
       this.i = index
       this.toNext()
      },
      toNext() {
        this.$router.push({path:"payment"})
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
.user-info>p>span
  font-size 1.1em
  padding 0em 0.5em
.payment
  padding-left 0.6em
  .txt
    font-size 2em
    color $color-font
    letter-spacing 3px
  .pay-method
    display inline-block
    padding 0.2em 0.2em
    margin: 5px;
    border 2px solid $color-font
    i:last-child
      vertical-align 5px
    &.active
      border 2px solid red
</style>
