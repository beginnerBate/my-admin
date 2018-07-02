<template>
<main-page>
  <!-- <router-view></router-view> -->
  <div class="self-query">
    <p><span>历史消费明细</span></p>
    <p><span>就诊记录</span></p>
    <p><span>公共查询</span></p>
  </div>
</main-page>
</template>

<script>
import MainPage from 'components/main-page/main-page'
  export default {
    components: {
      MainPage
    },
    created() {
      // 导航设置 这里适合action
      var list = JSON.stringify([])
      this.$store.dispatch('pageSet',[-1,'自助查询',list])
    },
  }
</script>
<style lang="stylus" scoped>
.self-query
  padding 2em 1em
  p
    margin 2em
    font-size 1.3em
    color #fff
    letter-spacing 2px
    span
      display inline-block
      width 200px
      background #009a99 
      text-align center
      border-radius 8px
      padding 0.4em 0
      border-bottom 3px solid #275274
      box-shadow 0px 3px 0px #32567a
</style>
