<template>
  <select-cardbook @selectcard='selectcard($event)'></select-cardbook>
</template>

<script>
  import SelectCardbook from 'base/select-card/select-cardbook'
  export default {
    created() {
      // 导航设置 这里适合action
      var list = JSON.stringify([{text:"选择卡种类"},{text:"读取卡信息"},{text:"完善信息"},{text:"完成建档"}])
      this.$store.dispatch('pageSet',[0,'注册建档',list])
    },
    components: {
      SelectCardbook
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
        this.$router.push({name:'rbsteptwo'})
      }
    }
  }
</script>

<style scoped>

</style>