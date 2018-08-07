<template>
  <select-card @selectcard='selectcard($event)'></select-card>
</template>

<script>
  import SelectCard from 'base/select-card/select-card'
  export default {
    created() {
      // 导航设置 这里适合action
      var list = JSON.stringify([{text:"选择卡种类"},{text:"读取卡信息"},{text:"填写充值信息"},{text:"完成充值并打印"}])
      this.$store.dispatch('pageSet',[0,'预存金充值',list])
    },
    components: {
      SelectCard
    },
    methods: {
      selectcard($event) {
        if ($event ==2 || $event ==3) {
           this.$store.commit('setRegbookTip','目前只支持身份证和就诊卡充值!') 
           this.toTipPage()  
        }else{
          // 1. 保存setCardType
          this.$store.commit('setCardType',$event)
          // 2. 发送setCardType到客户端
      
          // 3.跳到用户信息验证页面
          this.$router.push({name:'pdsteptwo'})
        }
      },
      toTipPage () {
        this.$router.push({name:"pdtippage"}) 
      }
    }
  }
</script>