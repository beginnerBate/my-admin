<template>
  <div class="home">
  <header-tip></header-tip>
  <!-- home-header -->
  <div class="home-header">
    <div class="home-btn"><span><i>{{$store.state.navTxt}}</i></span></div>
        <!-- 倒计时 -->
    <div class="home-timer"  v-if="flag">
      <time-task @outTime='outTime' ></time-task>
    </div>

  </div>
  <!-- home-middle -->
  <div class="home-middle">
    <!-- home-right -->
    <div class="home-right">
      <div class="home-right-content">
        <!-- router-view -->
        <!-- <router-view></router-view> -->
        <slot></slot>
      </div>
    </div>
  </div>
  <!-- footer-tip -->
  <footer-tip></footer-tip>
  </div>
</template>
<script>
  import HeaderTip from 'base/header-tip/header-tip'
  import FooterTip from 'base/footer-tip/footer-tip'
  import TimeTask from 'base/time-task/time-task'
  export default {
    data() {
      return {
        flag: false
      }
    },
    components: {
      FooterTip,
      HeaderTip,
      TimeTask
    },
    watch: {
      '$route'(value) {
        if (value.name == 'spsteptwo' || value.name =='sptippage') {
          this.flag = true
        }else{
          this.flag = false
        }
      }
    },
    methods: {
      back() {
        this.close()
      },
      close(){
        this.$router.push({path:'/self-print/SpStepone'})      
        this.clearData()
      },
      // 清空数据
      clearData () {
        // 自助打印
        this.$store.commit('setJzId','')
      },
      outTime() {
        this.close()
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
.home
  // background url('./home_bg.png') no-repeat 
  background-color: #517aa2
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
    bottom 76px
    left 340px
    right:1em;
    .home-right-content
      width 100%
      height:100%
      border 1px solid $color-theme-h
      border-radius 8px
      overflow hidden
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
