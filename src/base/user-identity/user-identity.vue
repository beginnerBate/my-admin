<template>
  <div class="login">
    <div class="con">
      <!-- 读取信息 -->
      <div class="user-info">
        <img src="./user-info.gif" alt="">
      </div>
      <!-- 用户信息 -->
      <!-- button -->
      <div class="button-wrapper">
        <p>请在自助机指示区域放入已绑定就诊ID的卡进行身份验证!</p>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.login
  height 100%
.user-info
  padding-top 2em
  text-align center
  img 
    background #ffffff
    border-radius 18px
.button-wrapper
  text-align center
  padding-top 1em
  color #fff
  letter-spacing 2.5px
  font-size 1.2em
</style>
