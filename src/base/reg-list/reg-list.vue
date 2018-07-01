<template>
  <ul class="department-list">         
    <li  v-for="(item, index) in pageList" :key="index">
      <div @click="selectItem(index)"><span>{{item.value}}</span></div>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      pageList: {
        type: Array,
        default:[] 
      }
    },
    methods: {
      selectItem(index) {
        this.$emit('selectreg')
      }
    },
  }
</script>
<style lang="stylus" scoped>
.department-list>li
  display inline-block
  width 25%
  div
    padding 0.6em
    span 
      background #fff
      color: #363171
      border-radius 8px
      font-size 2em 
      padding 0.375em 0 
      display inline-block
      width:100%
      text-align center
      font-weight 500
      letter-spacing 4px
      text-shadow 1px 1px 3px #d9dbde
      box-sizing border-box
      border-bottom 3px solid #96a3b3
      box-shadow  0px 3px 0px #84a3c2
      cursor pointer
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
</style>

