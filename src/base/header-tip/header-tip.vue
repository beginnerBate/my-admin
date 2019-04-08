<template>
  <div class="header-tip">
    <p class="header-logo" @click="confirm">
      <img src="./logo.png" class="logo-img">
    </p>
    <p class="header-date" v-if="$store.state.bookReg.timeFlag">
      <span class="header-title">{{titleText}}</span>
      <span class="header-servertime">{{serverTime}}</span>
    </p>
        <!-- 倒计时 -->
    <div class="home-timer" v-if="!$store.state.bookReg.timeFlag">
      <timer-task @outTime='outTime'></timer-task>
    </div>
  </div>
</template>
<script>
import {serverTime} from 'api/print'
  import TimerTask from 'base/time-task/time-task1'
export default {
    components: {
      TimerTask,
    },
  data() {
    return {
      serverTime:"",
      titleText: "妇科门诊签到",
      apiAdress:""
    }
  },
  created () {
    var that = this;
    serverTime().then((res)=>{
        if (res.code==200) {
          that.serverTime =res.data
        }
      }).catch(()=>{})
    that.getdate()
  },
  methods: {
    confirm: function(){
      var r = window.confirm("确定关闭程序吗？")
       if (r==true){
          if(typeof sharpForeign != 'undefined') {
            sharpForeign.CloseThis()
          }
        }
    },
    outTime() {
         this.$router.push({path:'/self-print/list'}) 
    },
    getdate() {
       setInterval(()=>{
         serverTime().then((res)=>{
           if (res.code==200) {
             this.serverTime =res.data
           }
         }).catch(()=>{
         })
       },1000*5)
    }
  },
}
</script>

<style lang="stylus" scoped>
.home-timer
  float right 
  font-size 1.6em
  padding 4vh
.header-tip
  position fixed
  top 0
  width 100%
  height 15vh
  overflow hidden
  background #ffffff
  padding 0 0.5em
  box-sizing: border-box
  display flex
  p
    letter-spacing 2px
    font-size 1.75em
    color #E91E63
  .header-logo
    flex 1
    display flex
    align-items center
    span 
      vertical-align 50%
  .header-date
    float right
    font-size 1.5em
    letter-spacing 0px
    display flex
    flex-direction column
    justify-content: center;
    span
      flex:1
      align-items: center;
      display:flex
      justify-content: center;
.logo-img
  width  50vh
  height  13vh
  vertical-align  1.5vh
.logo-title
  width 50%
  max-width 433px
.header-title
  font-size 1.2em
  text-shadow: 1px 1px 5px #efecec;
.header-servertime
  font-size 0.95em
@media screen and (max-width:1000px)
  .header-tip
    position fixed
    top 0
    width 100%
    height 10vh
    overflow hidden
    background #ffffff
    padding 0 0.5em
    box-sizing: border-box
    display flex
    p
      letter-spacing 2px
      font-size 1.75em
      color #0066cc
    .header-logo
      flex 1
      display flex
      align-items center
      span 
        vertical-align 50%
    .header-date
      float right
      font-size 1.1em
      letter-spacing 0px
      line-height 10vh
  .logo-img
    width  40vh
    height  8vh
    vertical-align  1.5vh
  .logo-title
    width 47%
</style>