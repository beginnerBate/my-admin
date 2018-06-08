<template>
  <div class="home">
    <!-- 头部组件 -->
    <div class="home-header">
      <h-header></h-header>
    </div>
    <!-- 右侧导航菜单 -->
    <div class="home-menu">
      <h-menu></h-menu>
    </div>
    <!-- 左侧内容页面 -->
    <div class="home-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HHeader from 'components/h-header/h-header'
import HMenu from 'components/h-menu/h-menu'
export default {
  components:{
    HHeader,
    HMenu
  }  
}
</script>
<style lang="stylus" scoped>
.home
  width 100%
  height 100%
  position absolute
.home-header
  position fixed
  width 100%
  height 60px
  background #009688
  background: linear-gradient(to left,   #009688, #00adc3, #009688)
.home-menu
  position fixed
  height 100%
  width 200px
  top 60px
  left 0
  overflow auto 
  background rgb(73, 80, 96)
.home-content
  position absolute
  top:60px
  left:200px
  right 0
  bottom 0
  overflow auto
  background-color #f0f0f0
</style>
