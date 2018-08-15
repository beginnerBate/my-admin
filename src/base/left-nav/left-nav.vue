<template>
  <div  class="left-nav">
     <ul>
       <li v-for="(item,index) in list" :key="index">
         <div>
           <span :class="{'active': index==menuIdx, 'actived':index<menuIdx}">{{index+1}}</span>
           <span>{{item.text}}</span>
         </div>
         <div  v-if="index===3? false: true" class="line"></div>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
  },
  computed:{
    menuIdx() {
      return this.$store.state.menuIdx
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
.left-nav
  color $color-font
  height 100%
  ul
    height 100%
    li
      height 25%
      position relative
    li>div:first-child
      padding-left 1em
      overflow hidden
      &>span.active:first-child
        display inline-block
        border-radius 50%
        padding 0.36em 0.72em
        font-size 1.5em
        background-color $color-theme
        border 2px solid $color-theme      
      &>span.actived:first-child
        display inline-block
        border-radius 50%
        padding 0.36em 0.72em
        font-size 1.5em
        background-color $color-theme
        border 2px solid $color-theme
        color $color-theme
        position relative
        &:after
          content '√'
          position absolute
          color $color-font
          left 35%
      &>span:first-child
        display inline-block
        border-radius 50%
        padding 0.36em 0.72em
        font-size 1.5em
        border 2px solid $color-theme-l
        background-color $color-theme-ll
      &>span:nth-child(2)
        padding 0.36em 0.72em
        font-size 1.5em
        letter-spacing 3px
    li>div.line
      position absolute
      width 2px
      height 100%
      top 3.34em
      left 42px
      background-color $color-theme-l
</style>
