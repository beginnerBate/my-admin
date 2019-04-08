<template>
  <div class="home">
  <header-tip></header-tip>
  <!-- home-middle -->
  <div class="home-middle">
    <!-- home-right -->
    <div class="home-right">
      <div class="home-right-content">
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
        // 自助签到
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
  background-color: #F7A3BA
  background-size cover
  height 100%;
  width 100%;
  overflow hidden
.home-header
  padding 1em 1.2em
  color $color-font
  overflow hidden
  margin-top:145px
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
    top calc(15vh + 15px)
    bottom 53px
    left 340px
    right:1em;
    .home-right-content
      width 100%
      height:100%
      border 1px solid #e92266
      border-radius 8px
      overflow hidden
@media screen and (max-width:1000px)
  .home
    // background-color: #0066cc
    background-size cover
    height 100%;
    width 100%;
    overflow hidden
  .home-middle
    overflow hidden
    .home-right
      position fixed
      top calc(10vh + 10px)
      bottom 53px
      left:0.5em !important
      right:0.5em;
      .home-right-content
        width 100%
        height:100%
        border 1px solid #e92266
        border-radius 8px
        overflow hidden  
</style>
