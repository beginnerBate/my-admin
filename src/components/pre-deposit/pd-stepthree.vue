<template>
  <div class="con">
    <div class="myuser-info" v-if="!loadflag">
      <span><i>姓名</i>: <i>{{patientInfo.name}}</i></span>
      <span><i>就诊卡号</i>: <i>{{patientInfo.jzId}}</i></span>
    </div>
    <div class="complete-info" v-if="!loadflag">
      <div class="my-phone"><label> 充 值 金 额 : ￥ </label><input v-model="mymoney" readonly ></div>
      <!-- 键盘 -->
      <div class="mykey-wrapper">
        <ul class="my-key">
          <li v-for="(item, index) in key" :key="index" @click="KeyUp(item)">
            <div><span>{{item}}</span></div>
          </li>                                                                                             
        </ul>
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
        <span class="btn-sub" :class="{'disabled':flag==-1}" @click="toNext()"><i>确 认</i></span>
      </div>
    </div>
    <div v-if='loadflag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>
<script>
import {createPredeposit} from 'api/pay'
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      loadflag:false,
      title:"页面加载中...",
      mymoney:'',
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
          }
        ],
        i:-1,
        flag:-1,
        item:'',
        key: ['1','2','3','4','5','6','7','8','9','0','退格','清空'],
    }
  },
  components:{
    Loading
  },
  computed: {
    patientInfo() {
      return this.$store.state.bookReg.user
    },
    token() {
        return this.$store.state.bookReg.token
      },
    pdtotalCost () {
         return this.$store.state.bookReg.pdtotalCost
      }
  },
  created() {
    this.$store.commit('setMenuIdx',2)
    if (this.pdtotalCost) {
      this.mymoney = this.pdtotalCost
    }
  },
  watch: {
    mymoney(value) {
      if (value=='') {
        this.flag = -1
      }else if(this.i !=-1){

        this.flag =1
      }
    }
  },
  methods:{
    toTipPage () {
       this.$router.push({name:"pdtippage"}) 
    },
    KeyUp(item) {
      if (item == '退格') {
        if (this.mymoney<=0) return
        this.mymoney = this.mymoney.substring(0,this.mymoney.length-1)
        console.log(this.mymoney)
      }else if (item == '清空') {
        this.mymoney = ''
      }else {
        if (this.mymoney == '' && item == 0) return
        this.mymoney += item
      }
    },
    selectItem(index,item) {
      if (this.mymoney!=''){
          this.flag = 1
      }else {
        this.flag = -1
      }
       this.i = index
       this.item = item
      },
      toNext() {
        if (this.i == -1 ) return
        this.createOrder()
      },
      createOrder() {
        var mydata = {
          paymentTypeId: this.item.paymentTypeId,
          totalCost: this.mymoney    
        }
        var that = this
        that.loadflag = true
        createPredeposit(mydata,this.token).then(function(res){
          if (res.code == 200) {
            // 保存setPdtotalCost
            that.$store.commit('setPdtotalCost',mydata.totalCost)
            that.$store.commit('setPaymentTypeId',mydata.paymentTypeId)
            that.$store.commit('setPayInfo',{orderId:res.orderId,QRcode:res.QRcode})
            that.$router.push({name:"pdstepfour"})
          }else if(res.code == 'AF401') {
            this.$store.commit('setRegbookTip','用户认证失败,请到柜台处理!') 
            this.toTipPage()  
          }else if  (res.code =='400') {
            this.$store.commit('setRegbookTip','订单创建失败,请到柜台处理!') 
            this.toTipPage()  
          }else {
            this.$store.commit('setRegbookTip','系统错误,请到柜台处理!') 
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
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.complete-info
  overflow hidden
  color $color-font
  margin-top 1.5em
  text-align center
  &>div:first-child
    // font-size 1.8em
    label 
      font-size 2em
    input  
      padding 0.2em 0.4em
      color $color-font
      background $color-a1
      border-radius 8px 
      display: inline-block;
      max-width 200px
      letter-spacing 5px
      outline none 
      border 0
      font-size 2em
.mykey-wrapper
  margin-left 200px
  margin-right 200px
  margin-top 30px
.my-key
  background $color-font
  border-radius 8px
  padding 0.5em
  li
    display inline-block
    width 33.3%
    div
      padding 0.4em
      span 
        display block
        background-color $color-theme
        text-align center
        border-radius 6px
        font-size 2em
.payment
  padding-left 0.6em
  // font-size 1.6em
  margin-top 1.5em
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
