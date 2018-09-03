<template>
<div class="info-page">
    <!-- 图标模块 -->
    <div class="icon-pos">
      <!-- info 信息 -->
        <!-- <span  v-if="tipType == 'info'" class="page-icon info"><i class="fa fa-info fa-4x"></i></span> -->
        <!-- <span  class="page-icon info"><i class="fa fa-info fa-4x"></i></span> -->
        <!-- check 对的 -->
        <!-- <span  v-if="tipType == 'ok'" class="page-icon check"><i class="fa fa-check fa-4x"></i></span> -->
        <span  class="page-icon check"><i class="fa fa-check fa-4x"></i></span>
        <!-- error 错误 -->
        <!-- <span  v-if="tipType == 'error'" class="page-icon error"><i class="fa fa-times fa-4x"></i></span> -->
        <!-- warning 警告 -->
        <!-- <span  v-if="tipType == 'warning'" class="page-icon exclamation"><i class="fa fa-exclamation fa-4x"></i></span> -->
    </div>
    <div class="info-tip pay-ok-info">
      <p class="payok">充值成功</p>
      <p><span>充值金额:</span><span class="money">{{paymoney}} 元</span></p>
      <p><span>账户余额:</span><span class="money">{{balance}} 元</span></p>
      <p class="print"><span>是否需要打印凭条</span><span><i class="btn-yes" @click="ToPrint()">是</i><i class="btn-no">否</i></span></p>
      <p class="tip">请记得取走您的证件和银行卡</p>
    </div>
</div>
</template>

<script>
import {formatDate} from 'common/js/date.js'
export default {
    computed: {
      // 充值金额
      paymoney () {
        return this.$store.state.bookReg.paymoney
      },
      // 账户余额
      balance () {
        return this.$store.state.bookReg.balance
      },
      // 付款时间
      payTime(){
         var mydate = new Date(this.$store.state.bookReg.payTime)
        return formatDate(mydate,'yyyy/MM/dd hh:mm:ss');
      },
      // 流水号
      orderNumber () {
        return this.$store.state.bookReg.orderNumber
      },
      user () {
        return this.$store.state.bookReg.user
      },
    },
    methods:{
      ToPrint() {
        var postobj = {    
           "name": this.user.name,     
           "inpatientNo": this.user.zyh,     
           "rechargeAmount": this.paymoney,     
           "originalAmount": this.balance,    
           "rechargeTime": this.payTime,     
           "flowNumber": this.orderNumber
            }; 
            console.log(postobj)
       var data =  JSON.parse(sharpForeign.Print_InpatientDemoeposit(JSON.stringify(postobj)))
       if (data.code == 200) {
            this.$store.dispatch('setTipPage',['打印成功','ok'])
            this.toTipPage()  
       }
      },
      toTipPage () {
       this.$router.push({name:"infopage"})
      }
    }
}
</script>
<style lang="stylus">
.icon-pos
  text-align center
  position absolute
  top:-50px
  left calc(50% - 50px)
.page-icon 
  display inline-block;
  width 100px;
  height 100px;
  border:4px solid #fff;
  border-radius 50%
  display:flex
  text-align center
  align-items center
  justify-content center
  color #fff
.info
  background #00c6ff
  background -webkit-linear-gradient(to right, #0072ff, #00c6ff)
  background linear-gradient(to right, #219df5, #00c6ff)
  text-shadow: 1px 1px 3px #005571;
.check
  background: #56ab2f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #a8e063, #56ab2f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #a8e063, #56ab2f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-shadow: 1px 1px 3px #226304;
.error
  background: #cb2d3e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ef473a, #cb2d3e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ef473a, #cb2d3e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-shadow: 1px 1px 3px #82000e;
.exclamation
  background: #fc4a1a;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f7b733, #fc4a1a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-shadow: 1px 1px 3px #6f1800;
.info-tip
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  letter-spacing: 5px;
  color #888888
.pay-ok-info
  flex-direction column
  p
    margin-top 20px 
    width: 100%
    box-sizing border-box
  .payok
    color:#56ab2f
    font-weight 600
    text-align center
  p:not(:first-child)
    padding-left 80px
    padding-right 80px
    font-size:22px
    color: slategray;
  p.tip
    color: tomato;
.money
  color:#ef473a
  padding-left: 20px;
.print
  display flex;
  justify-content space-between
  border:1px dashed  #d4d4d4
  padding 26px 0
  i 
    display inline-block
    width: 80px
    height:40px
    line-height 40px
    border:1px solid #d2d2d2
    text-align center
    border-radius:3px;
  i:first-child
    margin-right 20px;
</style>
