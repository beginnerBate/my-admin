<template>
  <div class="home">
  <header-tip></header-tip>
  <!-- home-header -->
  <div class="home-header">
    <div class="home-btn"><span>当前页面-<i>{{$store.state.navTxt}}</i></span></div>
    <!-- 倒计时 -->
    <div class="home-timer">
      <timer-task @outTime='outTime' ></timer-task>
    </div>
  </div>
  <!-- home-middle -->
  <div class="home-middle">
    <!-- home-left -->
    <div class="home-left">
      <left-nav></left-nav>
    </div>
    <!-- home-right -->
    <div class="home-right">
      <div class="home-right-content">
        <!-- router-view -->
        <!-- <router-view></router-view> -->
        <slot></slot>
      </div>
    </div>
    <!-- home-footer -->
    <div class="home-footer">
      <div><span class="back-pre" @click="back()"><i class="icon icon-back-pre"></i><i>返回</i></span></div>
      <div><span class="back-home" @click="close()"><i class="icon icon-back-home"></i><i>主页</i></span></div>
      <div><span class="back-exit" @click="close()"><i class="icon icon-back-exit"></i><i>退出</i></span></div>
    </div>
  </div>
  <!-- footer-tip -->
  <footer-tip></footer-tip>
  </div>
</template>
<script>
  import LeftNav from 'components/left-nav/left-nav'
  import TimerTask from 'base/time-task/time-task'
  import HeaderTip from 'base/header-tip/header-tip'
  import FooterTip from 'base/footer-tip/footer-tip'
  export default {
    components: {
      LeftNav,
      TimerTask,
      FooterTip,
      HeaderTip
    },
    watch: {
      '$route'(value) {

      }
    },
    methods: {
      back() {
        var curRouteName = this.$router.currentRoute.name
        var myback = this.$router.currentRoute.meta.backpage
        
        if (myback == 'close') {
          this.close()
        }else {
          // 跳转的页面
          this.$router.push({name:myback})
        }
      },
      close(){
        this.$router.push({name:'indexpage'})      
        this.clearData()
      },
      outTime() {
        this.close()
      },
      // 清空数据
      clearData () {
        // 预存金充值金额清除
        this.$store.commit('setPdtotalCost','')
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
.home
  background url('./home_bg.png') no-repeat 
  background-size cover
  height 100%;
  width 100%;
  overflow hidden
.home-header
  padding 1em 1.2em
  color $color-font
  overflow hidden
  margin-top:90px
.home-btn
  min-width 280px
  max-width 300px
  background $color-theme
  border-radius 8px
  padding 0.5em 0
  text-align center
  float left
  span 
    font-size 1.1em
    letter-spacing 2px
    i 
     font-size 1.8em
.home-timer
  float right 
  font-size 1.6em
.home-middle
  overflow hidden
  .home-left
    width 340px
    position fixed
    top 200px
    bottom 0px
    left 0px
  .home-right
    position fixed
    top 200px
    bottom 126px
    left 340px
    right:1em;
    .home-right-content
      width 100%
      height:100%
      border 1px solid $color-theme-h
      border-radius 8px
.home-footer
  position fixed
  bottom 37px
  right 0
  div
    display inline-block
    padding 0.6em 2em
    font-size 1.6em
    color #333
  span 
    display inline-block
    width 178px
    padding 0.4em 0
    border-radius 8px
    text-align center
    border-bottom 3px solid #96a3b3
    box-shadow  0px 3px 0px #84a3c2
    &.back-pre
      background $color-back-pre
    &.back-home
      background $color-back-home
    &.back-exit
      background $color-back-exit
.icon
  display inline-block
  width 38px
  height 38px
  background-size auto 
  background-repeat no-repeat
  vertical-align -10px
  padding-right 20px
.icon-back-pre
  background-image url('~~common/icon/back-pre.png') 
.icon-back-home
  background-image url('~~common/icon/back-home.png') 
.icon-back-exit
  background-image url('~~common/icon/back-exit.png') 
</style>
