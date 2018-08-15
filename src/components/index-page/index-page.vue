<template>
  <div class="home">
  <!-- home-header -->
  <header-tip></header-tip>
  <!-- home-middle -->
  <div class="home-middle">
     <button @click="close()" style="position:fixed">退出程序</button>
    <ul>
      <li  v-for="(item,index) in list" :key="index"><div><router-link tag="img" :to="item"  :src="require('./main_0'+(index+1)+'.png')"></router-link></div></li>
    </ul>
  </div>
  <!-- footer-tip -->
  <footer-tip></footer-tip>
  </div>
</template>
<script>
  import HeaderTip from 'base/header-tip/header-tip'
  import FooterTip from 'base/footer-tip/footer-tip'
  export default {
    data() {
      return {
        list: ['/regbook/RbStepone','/predeposit/pdStepone','/OutPatient/op-stepone','/regtoday/choose-one','/department','/bookno/bo-stepone','/self-query','/self-print/SpStepone','/smartleading/slstepone']
      }
    },
    components: {
      HeaderTip,
      FooterTip
    },
    methods: {
      close(){
        if(typeof SharpForeign.CloseThis == 'function') {
          SharpForeign.CloseThis()
        }
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
  margin-top 90px
  margin-bottom:40px
  ul
    padding 100px 
    li
      width:33.3%
      display inline-block
      text-align center
      div
        padding-bottom 50px
</style>
