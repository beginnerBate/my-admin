<template>
  <div class="self-query">
    <p v-for="(item, index) in queryList" :key="index">
      <span @click="setType(item.queryType)">{{item.value}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        queryList: [
          {
            value:"生化打印清单",
            queryType:1
          }
        ]
      }
    },
    methods: {
      setType(item) {
        if (item == 1) {
           window.external.Print_ShenHuaCheckProject("1","1");
        }
      }
    },
  }
</script>
<style lang="stylus" scoped>
.self-query
  padding 2em 1em
  p
    margin 2em
    font-size 1.8em
    color #fff
    letter-spacing 2px
    span
      display inline-block
      width 200px
      background #009a99 
      text-align center
      border-radius 8px
      padding 0.4em
      border-bottom 3px solid #275274
      box-shadow 0px 3px 0px #32567a
</style>
