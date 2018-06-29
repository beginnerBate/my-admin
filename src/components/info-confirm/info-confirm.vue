<template>
  <div class="login">
    <!-- doctor header -->
    <div class="con">
      <div class="btn left"><span>预约确认</span></div>
    </div>
    <!-- 预约信息 -->
    <div class="con">
      <!-- 医生信息 -->
      <div class="info-wrapper doctor-info">
        <p>专家: 张蕙兰</p>
        <p>科室: 内科</p>
        <p>预约时间: 2018-05-22 周三 下午</p>
        <p>挂号费: 13元</p>
      </div>
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名:叶威</span>
          <span>门诊ID:123456</span>
          <span>身份证号:3689541225XX12XXXX</span>
        </p>
      </div>
      <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确认预约</i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[],
        i:1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
      this.getData()
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      getData() {
        for (var i=0;i<10;i++) {
          this.list.push({value:"余号100"})
        }
      },
      selectItem(index) {
        if (!(index%2==0)){
          this.i = index
        }
      },
      toNext() {
        this.$router.push({path:"payment-method"})
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
  font-size 1.18em
  margin 0.5em 0
.user-info>p>span
  font-size 1.1em
  padding 0em 0.5em
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
</style>
