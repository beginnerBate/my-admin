<template>
  <div class="tip-page">
    <p>{{tipInfo}}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      tipInfo () {
        return this.$store.state.tipPage.regbookTip
      }
    }
  }
</script>
<style lang="stylus" scoped>
.tip-page
  color #ffffff
  font-size 2em
  padding-top 33%
  text-align center
</style>

