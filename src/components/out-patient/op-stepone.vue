<template>
  <select-card @selectcard='selectcard($event)'></select-card>
</template>

<script>
  import SelectCard from 'base/select-card/select-card'
  export default {
    created() {
      // 导航设置 这里适合action
      var list = JSON.stringify([{text:"选择卡种类"},{text:"读取卡信息"},{text:"选择缴费项目"},{text:"完成缴费"}])
      this.$store.dispatch('pageSet',[0,'门诊缴费',list])
    },
    components: {
      SelectCard
    },
    methods: {
      selectcard($event) {
        // 1. 保存setCardType
        this.$store.commit('setCardType',$event)
        // 2. 发送setCardType到客户端
    
        // 3.跳到用户信息验证页面
        this.$router.push({name:'opsteptwo'})
      }
    }
  }
</script>

<style scoped>

</style>