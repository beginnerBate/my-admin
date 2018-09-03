<template>
  <user-identity @authpass="topage200()" @authno="topage406()" @nouser="usernot()" @neterror='neterror()'></user-identity>
</template>

<script>
import UserIdentity from 'base/user-identity/user-identity'
export default {
    components:{
      UserIdentity
    },
    computed: {
      cardType() {
        return this.$store.state.bookReg.cardType
      }
    },
    created() {
      // 导航设置 这里适合action
      var list = JSON.stringify([{text:"首页"},{text:"刷卡或者输入卡号"},{text:"选择代充值金额和支付方式"},{text:"付款"},{text:"支付成功"}])
      this.$store.dispatch('pageSet',[1,'住院押金充值',list])
      if (this.cardType == 1) {
        this.text = '住院押金充值' 
      }else if (this.cardType ==3) {
        this.text = '住院押金充值'
      }else if(this.cardType == 4) {
        this.text = '住院押金充值'
      }else {
        this.text = '住院押金充值'
      }
      this.$store.dispatch('pageSet',[1,this.text,list])
    },
    methods: {
      // 用户存在
      topage200() {
        this.$router.push({name:"paymenttwo"})
      },
      // 病人未登记
      usernot() {
        // this.$store.commit('setRegbookTip','没有该用户,请先注册建档!')
        this.$store.dispatch('setTipPage',['病人未登记!','warning'])  
        this.toTipPage()
      },
      topage406() {
        // this.$store.commit('setRegbookTip','用户账号已锁定, 请到柜台处理!')
        this.$store.dispatch('setTipPage',['用户账号已锁定,请到柜台处理!','warning'])
        this.toTipPage() 
      },
      neterror() {
        // this.$store.commit('setRegbookTip','系统错误,请联系维修人员,维修电话 15865458562!')
        this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
        this.toTipPage()        
      },
      toTipPage () {
       this.$router.push({name:"infopage"}) 
      }
    }
}
</script>

<style scoped>

</style>