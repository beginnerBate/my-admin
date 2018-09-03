<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 1.2em
      color: #666
      letter-spacing 4px
</style>
