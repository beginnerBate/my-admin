<template>
<div class="info-page">
    <!-- 图标模块 -->
    <div class="icon-pos">
      <!-- info 信息 -->
        <span  v-if="tipType == 'info'" class="page-icon info"><i class="fa fa-info fa-4x"></i></span>
        <!-- <span  class="page-icon info"><i class="fa fa-info fa-4x"></i></span> -->
        <!-- check 对的 -->
        <span  v-if="tipType == 'ok'" class="page-icon check"><i class="fa fa-check fa-4x"></i></span>
        <!-- error 错误 -->
        <span  v-if="tipType == 'error'" class="page-icon error"><i class="fa fa-times fa-4x"></i></span>
        <!-- warning 警告 -->
        <span  v-if="tipType == 'warning'" class="page-icon exclamation"><i class="fa fa-exclamation fa-4x"></i></span>
    </div>
    <div class="info-tip">
      <p>{{tipInfo}}</p>
      <!-- <p>病人信息未登记</p> -->
    </div>
</div>
</template>

<script>
export default {
    computed: {
      tipInfo () {
        return this.$store.state.tipPage.regbookTip
      },
      tipType () {
        return this.$store.state.tipPage.tipType
      }
    }
}
</script>
<style lang="stylus">
.icon-pos
  text-align center
  position absolute
  top:-50px
  left calc(50% - 50px)
.page-icon 
  display inline-block;
  width 100px;
  height 100px;
  border:4px solid #fff;
  border-radius 50%
  display:flex
  text-align center
  align-items center
  justify-content center
  color #fff
.info
  background #00c6ff
  background -webkit-linear-gradient(to right, #0072ff, #00c6ff)
  background linear-gradient(to right, #219df5, #00c6ff)
  text-shadow: 1px 1px 3px #005571;
.check
  background: #56ab2f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #a8e063, #56ab2f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #a8e063, #56ab2f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-shadow: 1px 1px 3px #226304;
.error
  background: #cb2d3e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ef473a, #cb2d3e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ef473a, #cb2d3e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-shadow: 1px 1px 3px #82000e;
.exclamation
  background: #fc4a1a;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-shadow: 1px 1px 3px #6f1800;
.info-tip
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  letter-spacing: 5px;
  color #888888
</style>
