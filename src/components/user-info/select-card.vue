<template>
  <select-card @selectcard='selectcard($event)'></select-card>
</template>

<script>
  import SelectCard from 'base/select-card/select-card'
  export default {
    components: {
      SelectCard
    },
    methods: {
      selectcard($event) {
        if ($event ==2 || $event ==3) {
           this.$store.commit('setRegbookTip','目前只支持身份证和就诊卡!') 
           this.toTipPage() 
        }else {
            // 1. 保存setCardType
            this.$store.commit('setCardType',$event)
            // 2. 发送setCardType到客户端
        
            // 3.跳到用户信息验证页面
            this.$router.push({name:'userInfo'})
        }
      },
      toTipPage () {
       this.$router.push({name:"dtippage"}) 
      }
    }
  }
</script>