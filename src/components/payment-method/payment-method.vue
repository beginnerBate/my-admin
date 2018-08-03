<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con" v-if='!flag'>
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
      <!-- 医生信息 -->
      <div class="doctor-info">
        <p><i>挂号科室:</i> <i>{{departName}}</i></p>
        <p><i>门诊医生:</i> <i>{{bookDoctor.ysxm|mydocName}}</i></p>
        <p><i>挂号费用:</i> <i>{{bookDoctor.sumRegister}}元</i></p>
      </div>
      <!-- 支付方式 -->
      <div class="payment">
        <span class="txt">支付方式:</span>
        <span class="pay-method" v-for="(item,index) in list" 
          :key="index" 
          :class="{'active': index==i}"
          @click="selectItem(index,item)">
          <i class="pay-icon" :class="item.icon"></i><i>{{item.text}}</i>
        </span>
      </div>
      <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确 认</i></span>
      </div>
    </div>
    <!-- loading -->
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>

<script>
import {payMethod}  from 'api/pay.js'
import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        list:[
          {
            text:'微信支付',
            icon:'icon-wx',
            payType:1,
            paymentTypeId:2
          },
          {
            text:'支付宝支付',
            icon:'icon-zfb',
            payType:1,
            paymentTypeId:3
          },        
          {
            text:'余额支付',
            icon:'icon-ye',
            payType:0,
            paymentTypeId:''

          }
        ],
        i:-1,
        item:'',
        flag:false,
        title:'页面加载中...'
      }
    },
    created () {
      this.$store.commit('setMenuIdx',2)
    },
    components: {Loading},
    filters:{
      mydocName(value) {
        if(value=='') {
          return '普通医生'
        }else{
          return value
        }
      }
    },
    computed: {
      bookDoctor() {
        return this.$store.state.bookReg.bookDoctor
      },
      departName() {
        return this.$store.state.bookReg.departName
      },
      booktime () {
        return this.$store.state.bookReg.booktime
      },
      user () {
        return this.$store.state.bookReg.user
      },
      token() {
        return this.$store.state.bookReg.token
      },
      orderId () {
        return this.$store.state.bookReg.orderId
      }
    },
    methods: {
      toTipPage () {
        this.$router.push({name:"dtippage"}) 
      },
      selectItem(index,item) {
       this.i = index
       this.item = item
      },
      toNext() {
        if (this.i==-1)return
        this.payMethod()
      },
      payMethod() {
        var mydata = {
          payType:this.item.payType,
          orderId:this.orderId
        }
        if (this.item.paymentTypeId !='') {
            mydata.paymentTypeId = this.item.paymentTypeId
        }
        var that = this
        payMethod(mydata,this.token).then(function(res){
          if (res.code == 200) {
            if (mydata.paymentTypeId == 2) {
                // 微信支付
                that.$store.commit('setPaymentTypeId',2)
                that.$store.commit('setPayInfo',{orderId:res.orderId,QRcode:res.QRcode,payType:mydata.payType})
                that.$router.push({path:"payment"})
            }else if(mydata.paymentTypeId ==3) {
                // 支付宝支付
                that.$store.commit('setPaymentTypeId',3)
                that.$store.commit('setPayInfo',{orderId:res.orderId,QRcode:res.QRcode,payType:mydata.payType})
                that.$router.push({path:"payment"})
            }else {
                // 余额支付
                that.$store.commit('setPaymentTypeId','')
                that.$store.commit('setPayInfo',{orderId:res.orderId,payType:mydata.payType})
                that.$router.push({path:"payment"})
            }
            // this.$router.push({path:"payment"}) 
          }else if(res.code == '400') {
              this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
              this.toTipPage()  
          }else {
            this.$store.commit('setRegbookTip','订单创建失败,请到柜台处理!')
            this.toTipPage()  
          }
        }).catch(function(res){
            this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
            this.toTipPage()  
        })  
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.login
  height 100%
.info-wrapper
  margin-bottom 2em
.doctor-info>p
  font-size 2em
  margin 0.5em 0
  color $color-font
  padding-left 0.6em
  i:first-child
    letter-spacing: 3px;
  i:nth-child(2)
    color #ff6666
.payment
  padding-left 1em
  .txt
    font-size 2em
    color $color-font
    letter-spacing 3px
  .pay-method
    display inline-block
    padding 0.2em 0.2em
    margin: 5px;
    border 2px solid $color-font
    i:last-child
      vertical-align 5px
    &.active
      border 3px solid red
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
.loading-wrapper
  padding-top 30%
</style>
