<template>
  <div  class="left-nav">
     <ul>
       <li v-for="(item,index) in list" :key="index">
         <div>      
           <span :class="{'active': index==menuIdx, 'actived':index<menuIdx}">{{item.text}}</span>
           <span  v-if="!(index===list.length-1)">→</span>
         </div>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  computed:{
    list() {
      return JSON.parse(this.$store.state.leftNav)
    },
    menuIdx() {
      return this.$store.state.menuIdx
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
.left-nav
  color #cac9c9
  position fixed
  bottom:0
  height 40px
  line-height 40px
  padding-left 20px
  ul
    height 40px
    display flex
    li
      // flex:1
      position relative
    li>div:first-child
      // padding-left 1em
      overflow hidden
      &>span.active
        display inline-block
        // font-size 1.5em
        color $color-theme
        // border 2px solid $color-theme      
      &>span:nth-child(2)
        padding-left 0.2em
        padding-right 0.2em
        // font-size 2em
        letter-spacing 2px
</style>
