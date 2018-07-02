<template>
  <div class="login">
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
        <p><span>总缴费金额:</span> <span>￥150元</span></p>
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
            text:'余额支付',
            icon:'icon-ye'
          }
        ],
        i:-1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
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
        this.$router.push({name:"opstepfive"})
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
  font-size 2.4em
  margin 2em 0
  text-align center
  color $color-font
  padding-left 0.6em
  span:last-child
    color $color-a10
.user-info>p>span
  font-size 1.1em
  padding 0em 0.5em
.payment
  padding-left 0.6em
  text-align center
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
