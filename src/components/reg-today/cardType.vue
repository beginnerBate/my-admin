<template>
  <select-card @selectcard="getCardType($event)"></select-card>
</template>

<script>
  import selectCard from 'base/select-card/select-card'
  export default {
    components:{
      selectCard
    },
    methods:{
      getCardType($event) {
        // 1. 保存setCardType
        this.$store.commit('setCardType',$event)
        // 2. 发送setCardType到客户端

        // 3.跳到用户信息验证页面
        this.$router.push({name:'reggetinfo'})
      }
    }
  }
</script>