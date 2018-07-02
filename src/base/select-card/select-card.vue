<template>
  <div class="select-card">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img :src="item.icon" @click="slectcard(item.remark)">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          remark:"身份证",
          icon:require('./sfz.png')
        },        
        {
          remark:"医保卡",
          icon:require("./ybk.png")
        },        
        {
          remark:"居民健康卡",
          icon:require("./jkk.png")
        },        
        {
          remark:"就诊卡",
          icon:require("./jzk.png")
        },
      ]
    }
  },
  methods: {
    slectcard(value) {
      this.$emit('selectcard', value)
    }
  }
}
</script>
<style lang="stylus" scoped>
.select-card
  padding 1em 0.8em
  ul>li
    display inline-block
    width 50%
    text-align center
    img 
      margin 2em 0
      height 206px
</style>


