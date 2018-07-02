<template>
  <div class="bo-four">
     打印成功, 请取走您的取票号和卡!
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('setMenuIdx',3)
    }
  }
</script>
<style lang="stylus" scoped>
.bo-four
  margin-top 8em
  text-align center
  color #ffffff
  font-size 2em
  letter-spacing 4px
</style>
