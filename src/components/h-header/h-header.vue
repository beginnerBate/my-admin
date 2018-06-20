<template>
  <div class="h-header">
    <span class="logo"> 
      <i class="fa fa-h-square"></i>
      <span>自助终端后台管理系统</span>
    </span>
    <div class="h-nav">
      <ul>
        <!-- <li>全屏</li> -->
        <li><i class="fa fa-sign-out" aria-hidden="true"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>
<style lang="stylus" scoped>
.h-header
  padding 0 1.4em
  position relative
  height 100%
  .logo
    color #fff
    font-size 1.6em
    letter-spacing 4px
    text-shadow 1px 1px 5px #009d9a
    vertical-align -1ex 
    i 
      font-size 1.7em
      // padding-right .1em
      padding-top 10px
    span
      vertical-align 0.6ex
  .h-nav
    position absolute
    top 0
    right 1em
    height 100%
    color #fafafa
    ul>li
      display inline-block
      padding-top 18px
</style>
