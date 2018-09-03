<template>
   <div class="payment-three">
     <div class="payment-three-con">
        <!-- 付款信息 -->
        <section>
          <div>
            <header class="payment-three-title">
              <h1>住院押金缴费</h1>
              <p><span>充值金额</span><span>￥{{totalCost}}</span></p>
            </header>
            <div class="payment-three-info">
              <span>支付费用</span>
              <span>￥{{totalCost}}</span>
            </div>
          </div>
        </section>
        <!-- 付款码扫描 -->
        <section>
            <div class="payment-img-wrapper">
              <div class="payment-img">
                <img :src="payInfo.QRcode" alt="">
              </div>
              <p v-if="paymentTypeId ==2">打开手机微信,扫一扫完成支付!</p>
              <p v-if="paymentTypeId ==3">打开手机支付宝,扫一扫完成支付!</p>
            </div>
        </section>
     </div>
     <!-- 加载内容 -->
   </div>
</template>
<script>
  import {wxpdPayOrder,zfbpdPayOrder} from 'api/user'
export default {
    data() {
      return {
        timer:""
      }
    },
    created () {
      // 导航设置 这里适合action
      this.$store.dispatch('childPage',[3,'付款'])
    },
    mounted(){
      // 订单查询
      if (this.paymentTypeId ==2) {
        this.timer = setTimeout(()=>{
          this.getWxPayOrder()
        },1000)
        
      }else if (this.paymentTypeId ==3) {
        this.timer = setTimeout(()=>{
          this.getZfbPayOrder()
        },1000)
      }
    },
  computed: {
      user () {
        return this.$store.state.bookReg.user
      },
      paymentTypeId() {
        return  this.$store.state.bookReg.paymentTypeId
      },
      payInfo () {
        return this.$store.state.bookReg.payInfo
      },
      token() {
        return this.$store.state.bookReg.token
      },
      totalCost () {
         return this.$store.state.bookReg.totalCost
      }
    },
    methods: {
      getWxPayOrder() {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        wxpdPayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$store.commit('setBalance',res.balance)
            this.$store.commit('setPaytime',res.data.payTime)
            this.$store.commit('setPaymoney',res.payment)
            this.$store.commit('setOrderNumber',res.data.orderNumber)
            this.$router.push({name:'paymentok'})
          }else if(res.code == 408){
            // 如果路由没有变化的话,重新请求
            if(this.$router.currentRoute.name=='paymentthree') {
              this.getWxPayOrder()
            }
          }else {
            this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
            this.toTipPage()  
          }
        }).catch((err)=>{
            this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
            this.toTipPage()  
        })
      },
      getZfbPayOrder () {
        var mydata = {
          orderId: this.payInfo.orderId
        }
        zfbpdPayOrder(mydata,this.token).then((res)=>{
          if (res.code == 200) {
            // 请求成功
            this.$store.commit('setBalance',res.balance)
            this.$store.commit('setPaytime',res.data.payTime)
            this.$store.commit('setPaymoney',res.payment)
            this.$store.commit('setOrderNumber',res.data.orderNumber)
            this.$router.push({name:"paymentok"})
          }else if(res.code == 408) {
            // 如果路由没有变化的话,重新请求
            if(this.$router.currentRoute.name=='paymentthree') {
              this.getZfbPayOrder()
            }            
          }else {
            this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
            this.toTipPage()  
          }
        }).catch((err)=>{
            this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])
            this.toTipPage() 
        })
      },
      toTipPage () {
       this.$router.push({name:"infopage"})
      }
    }
}
</script>