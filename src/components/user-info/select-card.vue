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
        if ($event == -1) {
          return
        }
        // 1. 保存setCardType
        this.$store.commit('setCardType',$event)
        // 2. 发送setCardType到客户端
    
        // 3.跳到用户信息验证页面
        this.$router.push({name:'userInfo'})
      }
    }
  }
</script>