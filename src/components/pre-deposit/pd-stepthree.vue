<template>
  <div class="con">
    <div class="user-info info-wrapper">
      <span>姓名: {{patientInfo.name}}</span>
      <span>性别: {{patientInfo.sex}}</span>
      <p>充值金额: {{patientInfo.cardNumber}}</p>
    </div>
    <div class="complete-info">
      <div class="my-phone"><label> 充 值 金 额 : ￥ </label><input type="number" v-model="mymoney" ></div>
      <!-- 支付方式 -->
      <div class="payment">
        <span class="txt">支付方式:</span>
        <span class="pay-method" v-for="(item,index) in list" 
          :key="index" 
          :class="{'active': index==i}"
          @click="selectItem(index,item)">
          <i class="pay-icon large" :class="item.icon"></i><i>{{item.text}}</i>
        </span>
      </div>
      <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确 认</i></span>
      </div>
    </div>
  </div>
</template>
<script>
import {createPredeposit} from 'api/pay'
export default {
  data() {
    return {
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
        item:''
    }
  },
  computed: {
    patientInfo() {
      return this.$store.state.bookReg.user
    },
    token() {
        return this.$store.state.bookReg.token
      }
  },
  created() {
    this.$store.commit('setMenuIdx',2)
  },
  methods:{
    selectItem(index,item) {
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
        createPredeposit(mydata,this.token).then(function(res){
          if (res.code == 200) {
            // 保存setPdtotalCost
            that.$store.commit('setPdtotalCost',mydata.totalCost)
            that.$store.commit('setPaymentTypeId',mydata.paymentTypeId)
            that.$store.commit('setPayInfo',{orderId:res.orderId,QRcode:res.QRcode})
            that.$router.push({name:"pdstepfour"})
          }else if(res.code == 'AF401') {
            console.log('认证失败')
          }
        }).catch(function(res){
          console.log(res)
        }) 
      }
  }
}
</script>

<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.info-wrapper 
  padding 0.4em
  color $color-font
  background $color-a1
  font-size 1.8em
  border-radius 8px
.complete-info
  overflow hidden
  color $color-font
  margin-top 3em
  text-align center
  &>div:first-child
    font-size 1.8em
    label 
      font-size 2em
    input  
      padding 0.2em 0.4em
      color $color-font
      background $color-a1
      border-radius 8px 
      display: inline-block;
      max-width 300px
      letter-spacing 5px
      outline none 
      border 0
      font-size 2em
.payment
  padding-left 0.6em
  font-size 1.6em
  margin-top 3em
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
      border 3px solid #95ca00
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
