<template>
  <div class="tip-page">
    <div v-if="tipType == 'error'"><img src="./icon_error.png" width="100px" height="100px"></div>
    <div v-if="tipType == 'info'"><img src="./icon_info.png" width="100px" height="100px"></div>
    <div v-if="tipType == 'ok'"><img src="./icon_right.png" width="100px" height="100px"></div>
    <!-- <div v-if="tipType == 'ok'"><span class="fa fa-ok"></span></div> -->
    <div v-if="tipType == 'warning'"><img src="./icon_warning.png" width="100px" height="100px"></div>
    <p>{{tipInfo}}</p>
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
<style lang="stylus" scoped>
.tip-page
  color #ffffff
  text-align center
  width 100%
  height 100px
  position absolute
  top 45%
  margin -45px 0 0 0
  font-size: 1.8em;
  letter-spacing: 4px;
</style>

