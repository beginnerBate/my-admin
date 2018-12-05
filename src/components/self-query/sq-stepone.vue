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
        console.log($event)
      if ($event == -1) {
          return
        }else if($event == 2 || $event == 3) {
          // 提示只支持身份证注册建档
          this.$store.dispatch('setTipPage',['目前只支持身份证注册建档!','warning'])
          this.toTipPage()
        }else {
          // 1. 保存setCardType
           this.$store.commit('setCardType',$event)
          // 3.跳到用户信息验证页面
          this.$router.push({name:'sqsteptwo'})
        }
      },
      toTipPage () {
        this.$router.push({name:'sqtippage'})
      }
    }
  }
</script>