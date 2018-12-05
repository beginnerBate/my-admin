<template>
  <div class="self-query">
    <ul class="sq-list">
      <li v-for="(item, index) in queryList" :key="index">
        <div><span @click="setType(item.queryType)">{{item.value}}</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        queryList: [
          {
            value:"挂号记录查询",
            queryType:4
          },
          {
            value:"医嘱缴费查询",
            queryType:2
          },          
          {
            value:"充值记录查询",
            queryType:3
          },
          {
            value:"个人信息查询",
            queryType:1
          }
        ]
      }
    },
    computed:{
      token () {
        return this.$store.state.bookReg.token
      }
    },
    methods: {
      setType(item) {
        if (this.token) {
          // 已验证信息
          if (item ==1) {
            // 个人信息查询
            this.$router.push({name:"sqstepthree"}) 
          }else if(item ==2) {
            // 医嘱缴费查询
            this.$router.push({name:"sqstepfive"}) 
          }else if (item ==3) {
            // 充值查询
            this.$router.push({name:"sqstepsix"}) 
          }else {
            // 挂号记录查询
            this.$router.push({name:"sqstepfour"}) 
          }
        }else {
        //设置查询类型
        this.$store.commit('setQueryType',item)
        // 选择卡号
        this.$router.push({name:'sqstepone'})
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
.self-query
  padding 2em 1em
.sq-list
  padding 0 7em
.sq-list>li
    display inline-block
    width 50%
    height 50%
    font-size 1.5em
    color #fff
    letter-spacing 2px
    text-align center
    div
      margin 1.5em 3.5em
    span
      display inline-block
      width 100%
      height 200px
      line-height 200px
      background #009a99 
      text-align center
      border-radius 8px
      letter-spacing 5px
      font-size 1.5em
.sq-list>li:first-child>div>span:first-child
  background #FFC107
.sq-list>li:nth-child(2)>div>span:first-child
  background #2196F3
.sq-list>li:nth-child(3)>div>span:first-child
  background #009a99
.sq-list>li:nth-child(4)>div>span:first-child
  background #f66
</style>
