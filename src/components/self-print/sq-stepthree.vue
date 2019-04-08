<template>
  <div class="self-query-alert">
    <div v-if="!loadflag" class="alert-wrapper">
      <!-- 签到成功 -->
      <div class="sign" v-if="isUser && !isPrint && !sinFlag">
        <span><i class="fa fa-check-circle-o"></i><i>签到成功</i></span>
      </div>
      <!-- 倒计时 -->
        <div class="home-timer"  v-if="flag">
          <time-task @outTime='outTime' ></time-task>
        </div>
      <!-- 普通门诊 -->
      <ul class="info-wrapper">
        <li class="myuser-info">
            <p><i style="letter-spacing: 18px;">科室名称:</i> <i>{{name}}</i> </p>
            <p><i style="letter-spacing: 18px;">医生姓名:</i> <i>{{name}}</i> </p>
            <p><i style="letter-spacing: 18px;">等待人数:</i> <i>{{waitcount}}</i> </p>
        </li>
      </ul>
      <div v-if="isPrint">      
         <p class="print-logo">
           <span class="fa fa-exclamation-triangle"></span>
           <span class="text">用户已签到!</span>
         </p>
        <div>
        </div>
       </div>
      <div class="tip-info" v-if="!isUser">
         <p class="print-logo">
           <span class="fa fa-exclamation-triangle"></span>
           <span class="text">用户不存在!</span>
           </p>
       </div>
      <div class="tip-info" v-if="sinFlag">
         <p  class="print-logo">
           <span class="fa fa-exclamation-triangle"></span>
           <span class="text">签到失败,请重新扫描!</span>
           </p>
       </div>
           <!-- home-footer -->
    <div class="home-footer" >
      <div><span class="back-pre" @click="back()"><i class="icon icon-back-pre"></i><i>关闭</i></span></div>
    </div>
    </div>
    <!-- tip -->
    <div v-if='loadflag'>
      <!-- loading -->
      <div  class='loading-wrapper'>
        <loading :title="title"></loading>
      </div> 
    </div>
    <!-- printing -->
      <div  class='loading-wrapper' v-if="printState">
        <loading :title="printTxt"></loading>
      </div> 
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import Page from 'base/page/page'
import TimeTask from 'base/time-task/time-task'
import {ItemInfos} from 'api/print.js'
  export default {
    data() {
      return {
        loadflag:true,
        title:'数据读取中...',
        printState:false,
        printTxt:"打印中,请稍等...",
        name:'',
        number:"",
        mywin:"",
        waitcount:'',
        isUser:true,
        flag:true,
        isPrint:false,
        sinFlag:false
      }
    },
    created() {
      // this.getdata()
    },
    components: {
      Loading,
      TimeTask
    },
    computed:{
      jzId() {
        return this.$store.state.bookReg.jzId
      }
    },
    methods: {
      outTime(){
         this.$emit('close')
      },
      toTipPage () {
        this.$router.push({name:"sptippage"})
      },
      getdata() {
        this.loadflag = true
        var that = this
        ItemInfos(this.jzId).then((res)=>{
          that.loadflag = false
          if (res.code ==200) {
            // 请求成功
            this.name = res.data.patName
            this.number = res.data.fzxh
            this.mywin = res.data.ksmc
            this.waitcount = res.data.totalWait
            this.isUser = true
            this.print(res.data)
          }else if(res.code == 404) {
            // 该用户不存在
            this.isUser = false
          }else if (res.code ==405){
            // 用户已打印
            this.isUser = true
            this.isPrint = true
            this.number = res.data.fzxh
            this.mywin = res.data.ksmc
            this.name = res.data.patName
          }else {
            this.isUser = false
            this.sinFlag = true
          }
        }).catch((err)=>{
          that.loadflag = false
          this.sinFlag = true
        })
      },
      print(item) {
        var postData = {
          printTitle:'天长市人民医院',
          checkInName:'药房签到',
          name:item.patName,
          number:item.fzxh,
          roomNumber:item.ksmc,
          waitingNumber:item.totalWait,
          checkInTime:item.signTime
        }
        if (typeof  window.cefQuery != 'undefined') {
            window.cefQuery({
            // request: 'print:{"hName":"'+postData.printTitle+'","checkInName":"'+postData.checkInName+'","name":"'+postData.name+'","number":"'+postData.number+'","roomNumber":"'+postData.roomNumber+'","waitingNumber":"'+postData.waitingNumber+'","checkInTime":"'+postData.checkInTime+'"}',
             request: 'print:[{"info":"'+postData.printTitle+'","x":50,"y":22},{"info":"'+postData.checkInName+'","x":70,"y":40},{"info":"--------------------------------------------","x":5,"y":55},{"info":"姓　　名：'+postData.name+'","x":5,"y":75},{"info":"号　　码：'+postData.number+'","x":5,"y":95},{"info":"诊　　室：'+postData.roomNumber+'","x":5,"y":115},{"info":"等待人数：'+postData.waitingNumber+'","x":5,"y":135},{"info":"签到时间：'+postData.checkInTime+'","x":5,"y":155},{"info":"--------------------------------------------","x":5,"y":175}]',
            onSuccess: function(response) {
            },
            onFailure: function(error_code, error_message) {alert(error_message);}
          });
        }  
      },
      back() {
         this.$emit('close')
      },
      // 清空数据
      clearData () {
        // 自助打印
        this.$store.commit('setJzId','')
      },
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.self-query-alert
  padding: 1em;
  position: fixed;
  background: rgba(0,102,204,0.93);
  top: calc(15vh + 30px)
  // left: calc(40% + 2.3em);
  left: calc(30% + 2.3em);
  border-radius: 8px;
  bottom: 73px
  right: 41px;
  -webkit-box-shadow: 1px 1px 5px #00366d;
  box-shadow: 1px 1px 5px #00366d;
  border: 3px solid #fff;
.tip-info.pd20 p
  padding-top 20%
.btn-wrapper
  text-align center
  position absolute
  bottom 10px
  right 25%
  width 25%
  .btn-sub
    font-size 2em
.table-select
  position relative
.home-footer
  text-align center
  position absolute
  bottom 10px
  width 100%
  div
    display inline-block
    font-size 1.8em
    color #333
  span 
    display inline-block
    width 196px
    padding 0.4em 0
    border-radius 8px
    text-align center
    border-bottom 3px solid #da3030
    box-shadow  0px 3px 0px #c53434
    &.back-pre
      background #f66
      color $color-font
.home-timer
  float right 
  font-size 1.6em
  color: #fff
.info-wrapper
  margin-top:128px;
.alert-wrapper
  overflow: hidden;
.fa-exclamation-triangle
  font-size 1.5em
  margin-right:7px
  color: sandybrown
.text
  vertical-align: 8%
.sign
  position absolute;
  top:50%
  left:50%
  font-size 1.5em
  color: #95ca00
  transform: translate(-50%,-50%);
.fa-check-circle-o
  padding-right:7px
  font-size 2.1em
  font-weight 100 
.sign>span>i:last-child
  vertical-align: 9%
  letter-spacing: 8px
  font-size: 1.5em
  font-weight 400
.print-logo
  position absolute;
  top:50%
  left:50%
  color: #FFF
  transform: translate(-50%,-50%);
  text-align center
  font-size 2.2em
  letter-spacing 4px
  width: 100%
@media screen and (max-width:1000px)
  .self-query-alert
    padding: 1em;
    position: fixed;
    background: rgba(0,102,204,0.93);
    top: calc(10vh + 30px)
    // left: calc(40% + 2.3em);
    left: calc(30% + 1.3em);
    border-radius: 8px;
    bottom: 60px
    right: 25px;
    -webkit-box-shadow: 1px 1px 5px #00366d;
    box-shadow: 1px 1px 5px #00366d;
    border: 3px solid #fff;
  .tip-info p
    padding 25% 0
    text-align center
    font-size 1.8em
    letter-spacing 4px
    color #fff
  .tip-info.pd20 p
    padding-top 20%
  .btn-wrapper
    text-align center
    position absolute
    bottom 10px
    right 25%
    width 25%
    .btn-sub
      font-size 1.8em
  .table-select
    position relative
  .home-footer
    text-align center
    position absolute
    bottom 10px
    width 100%
    div
      display inline-block
      font-size 1.8em
      color #333
    span 
      display inline-block
      width 196px
      padding 0.4em 0
      border-radius 8px
      text-align center
      border-bottom 3px solid #da3030
      box-shadow  0px 3px 0px #c53434
      &.back-pre
        background #f66
        color $color-font
  .home-timer
    float right 
    font-size 1.6em
    color: #fff
  .info-wrapper
    margin-top: 102px;
    font-size: 0.9em;
  .alert-wrapper
    overflow: hidden;
  .fa-exclamation-triangle
    font-size 1.5em
    margin-right:7px
    color: sandybrown
  .text
    vertical-align: 8%
  .sign
    position absolute;
    top:50%
    left:50%
    font-size 1.3em
    color: #95ca00
    transform: translate(-50%,-50%);
  .fa-check-circle-o
    padding-right:7px
    font-size 2.1em
    font-weight 100 
  .sign>span>i:last-child
    vertical-align: 9%
    letter-spacing: 8px
    font-size: 1.5em
    font-weight 400
  .print-logo
    position absolute;
    top:50%
    left:50%
    color: #FFF
    transform: translate(-50%,-50%);
    text-align center
    font-size 1.8em
    letter-spacing 4px
    color #fff
</style>
