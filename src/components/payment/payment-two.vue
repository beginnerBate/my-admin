<template>
   <div class="payment-two">
     <!-- 缴费内容 -->
     <section v-if="!loadflag">
       <!-- 缴费金额 -->
       <div class="payment-money">
         <header>
           <h1><span>{{user.name}}，</span><span>住院号: {{user.zyh}}，</span><span>押金余额: <i class="moneycolor">{{user.balance}} 元</i></span></h1>
         </header>
         <p>请选择缴费金额</p>
         <ul>
           <li v-for="(item,index) in moneyList" :key="index" @click="selectmoney(item,index)"> <span :class="{'active':i == index}">￥{{item}}</span> </li>
         </ul>
         <div class="input-item">
           <input placeholder="请在此输入整百金额" class="input" v-model="inputMoney" @focus="showKey()">
         </div>
       </div>
       <!-- 缴费方式 -->
       <div class="payment-method">
         <section>
           <h1>缴费金额</h1>
           <p><span>￥{{paymoney}}</span></p>
         </section>
         <ul class="payment-select">
          <li class="pay-method" v-for="(item,index) in list" 
          :key="index" 
          @click="selectItem(index,item)">
          <span class="pay-icon" :class="item.icon"></span>
             <span>{{item.text}}</span>
        </li>
         </ul>
       </div>
     </section>
     <!-- loading -->
    <div v-if='loadflag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
    <div class="mykeyboard" v-if="mykeyboard">
        <div class="sq-con">
          <div class="get-id">
            <div class="input-wrapper">
              <input type='text' v-model='keyMoney' class='input-wrapper-num' ref="myJzId" placeholder="请在此输入整百金额,每笔金额最多20000"><span class="money-tip">{{moneyTip}}</span>
            </div>
            <!-- 键盘 -->
            <div class="key">     
              <div class="mykey-wrapper">
                <ul class="my-key">
                  <div class="border-wrapper">
                    <li v-for="(item, index) in key" :key="index">
                      <div :class="{'active': keyi==index}" 
                      @click="KeyUp(item,index)
                       "><span>{{item}}</span></div>
                    </li>  
                  </div>                                                                                           
                </ul>
              </div>
            </div>
            <!-- button -->
            <section class="btn-con">
              <div class="button-wrapper" @click="tosub()">
                <span class="btn-sq"><i>确定</i></span>
              </div>
              <div class="button-wrapper cancle" @click="cancle()">
                <span class="btn-sq"><i>取 消</i></span>
              </div>
            </section>
          </div>
        </div>
    </div>
   </div>
</template>
<script>
import {createOrder} from 'api/user'
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      loadflag:false,
      title:"页面加载中...",
      moneyList: [500,1000,2000,5000,10000,20000],
      paymoney:'',
      inputMoney:"",
      keyMoney:"",
      mykeyboard:false,
      i:-1,
      paymentTypeId:"", //支付方式
      totalCost:"" ,//订单总金额,
      moneyTip:"",
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
        flag:-1,
        item:'',
        key: ['1','2','3','4','5','6','7','8','9','退格','0','清空'],
        keyi:-1
    }
  },
    components:{
    Loading
  },
  computed: {
    user() {
      return this.$store.state.bookReg.user 
    },
    token() {
        return this.$store.state.bookReg.token
      },
  },
  created() {
    // 导航设置 这里适合action
    this.$store.dispatch('childPage',[2,'选择缴费金额与方式'])
  },
  watch: {
    inputMoney(value) {
      if (value) {
          this.paymoney = value
      }
       
    },
    paymoney(value) {
      if (value=='') {
        this.flag = -1
      }else if( this.i !=-1){
        this.flag =1
      }
    },
    keyMoney(value) {
      if (value<=20000) {
        this.moneyTip = '每笔充值最多20000元'
      }else {
        this.moneyTip = '输入金额过大,请重新输入'
      }
    }
  },
  methods: {
    showKey(){
      this.mykeyboard = true
      this.i = -1
    },
    KeyUp(item,index) {
        this.keyi = index
        setTimeout(()=>{
          this.keyi = -1
        },200)
      if (item == '退格') {
        if (this.keyMoney<=0) return
        this.keyMoney = this.keyMoney.substring(0,this.keyMoney.length-1)
      }else if (item == '清空') {
        this.keyMoney = ''
      }else {
        if (this.keyMoney == '' && item == 0) return
        if (this.keyMoney.length ==5 ) return
        this.keyMoney += item
      }
      this.$refs.myJzId.focus()
    },
    cancle() {
      this.keyMoney = ''
      this.mykeyboard = false
    },
    tosub() {
      if (this.keyMoney<=20000) {
        this.inputMoney = this.keyMoney
        this.mykeyboard = false
        this.keyMoney = ''
      }else {

      }
    },
    toTipPage () {
       this.$router.push({name:"infopage"}) 
    },
    selectmoney(item,index) {
      this.i = index            
      this.inputMoney = ''
      this.paymoney = item
    },
    selectItem(index,item) {
       this.item = item
      if (this.paymoney!=''){
          this.flag = 1
          this.createOrder()
      }else {
        this.flag = -1
      }
      },
    toNext() {
        if (this.i == -1 ) return
        if (this.paymoney>20000) return
        this.createOrder()
      },
      createOrder() {
        var mydata = {
          paymentTypeId: this.item.paymentTypeId,
          totalCost: this.paymoney,
          patientName:this.user.name    
        }
        var that = this
        that.loadflag = true
        createOrder(mydata,this.token).then(function(res){
          that.loadflag = false
          if (res.code == 200) {
            // 保存setPdtotalCost
            that.$store.commit('settotalCost',mydata.totalCost)
            that.$store.commit('setPaymentTypeId',mydata.paymentTypeId)
            that.$store.commit('setPayInfo',{orderId:res.orderId,QRcode:res.QRcode})
            that.$router.push({name:"paymentthree"})
          }else if(res.code == 'AF401') {
            // this.$store.commit('setRegbookTip','用户认证失败,请到柜台处理!') 
            that.$store.dispatch('setTipPage',['用户认证失败,请到柜台处理!','error'])
            that.toTipPage()  
          }else if  (res.code =='400') {
            // this.$store.commit('setRegbookTip','订单创建失败,请到柜台处理!') 
            that.$store.dispatch('setTipPage',['订单创建失败,请到柜台处理!','error'])
            that.toTipPage()  
          }else if (res.code =='406'){
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!') 
            that.$store.dispatch('setTipPage',['输入金额过大,每笔充值最多20000元','warning'])
            that.toTipPage()  
          }else {
            that.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
            that.toTipPage()  
          }
        }).catch(function(res){
          console.log(res)
            that.loadflag = false
            that.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
            that.toTipPage()  
        }) 
      }
  }
}
</script>
<style lang="stylus" scoped>
.sq-con
  padding 4em
.my-key
  background #ffffff
  border-top 1px solid #cac9c9
  padding 1em
  li
    display inline-block
    width 25%
    div
      padding: 1.8em 0.4em
      border-left: 1px solid #cac9c9;
      border-top: 1px solid #cac9c9;
      span 
        color #333
        display block
        text-align center
        font-size 1.8em
    div.active
      background #cac9c9
      span 
        color #ffffff
.input-wrapper
  background-color #fff
  text-align left  
  padding 0.2em 0.1em
.input-wrapper-num
  width 100%
  height 50px
  background-color #fff
  font-size 1.2em
  min-height 1ex
  border 0
  outline 0
  color #333
.cursor
  opacity:0
.get-id
  margin-top 20px
.button-wrapper
  text-align center
  font-size 1.5em
  letter-spacing 1px
  padding 1em 0
  margin-top 15px
  margin-left: 0px;
  margin-right:30px;
  border-radius 4px
  overflow hidden
  color #ffffff
  background #00c6ff
  background -webkit-linear-gradient(to right, #0072ff, #00c6ff)
  background linear-gradient(to right, #0072ff, #00c6ff)
.button-wrapper.cancle
  background: #9E9E9E;
  background: #ADA996;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #d4d4d4, #9E9E9E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #d4d4d4, #9E9E9E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin-left: 30px;
  margin-right:0px;
.border-wrapper
  border-right: 1px solid #cac9c9;
  border-bottom: 1px solid #cac9c9;
.mykeyboard
  position: fixed;
  top: 0;
  background: rgba(158, 158, 158, 0.52);
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
.btn-con
  display flex
  div
    flex 1
</style>
