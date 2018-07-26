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
  font-size 2.5em
  padding-top 38%
  text-align center
</style>

