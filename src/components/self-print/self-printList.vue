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
            value:"医保卡签到",
            queryType:1
          },
          {
            value:"就诊卡签到",
            queryType:2
          }
        ]
      }
    },
    created(){
      this.$store.commit('setTimeFlag',true)
    },
    computed:{
      token () {
        return this.$store.state.bookReg.token
      }
    },
    methods: {
      setType(item) {
        // 存储类型
        if (item ==2){
          alert('就诊卡签到开发中');
        }else{
          this.$store.commit('setCardType',item);
          this.$router.push({name:"spstepone"});
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
.self-query
  padding 2em 1em
.sq-list
  height calc(100% - 2em)
  display:flex;
.sq-list>li
    font-size 1.5em
    color #fff
    letter-spacing 2px
    text-align center
    flex:1;
    padding:1em;
    display: flex;
    align-items: center;
    justify-content: center;
    div
     flex:1;
     display flex;
    span
      flex:1
      text-align center
      border-radius 8px
      letter-spacing 5px
      font-size 1.5em
      padding 10vh 0;
.sq-list>li:first-child>div>span:first-child
  background #E91E63
.sq-list>li:nth-child(2)>div>span:first-child
  background #a10abb
.sq-list>li:nth-child(3)>div>span:first-child
  background #009a99
.sq-list>li:nth-child(4)>div>span:first-child
  background #f66
</style>
