<template>
  <user-identity @authpass="topage200()" @authno="topage406()" @nouser="usernot()" @neterror='neterror()'></user-identity>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  export default {
    components:{
      UserIdentity
    },
    created(){
      this.$store.commit('setMenuIdx',1)
    },
    methods: {
      // 用户存在
      topage200() {
        this.$router.push({name:"pdstepthree"}) 
      },
      // 用户不存在
      usernot() {
        console.log('dd')
        this.$store.commit('setRegbookTip','没有该用户,请先注册建档!')
        this.toTipPage()
      },
      topage406() {
         console.log('dd')
        this.$store.commit('setRegbookTip','用户账号已锁定, 请到柜台处理!')
        this.toTipPage() 
      },
      neterror() {
        this.$store.commit('setRegbookTip','系统错误,请联系维修人员,维修电话 15865458562!')
        this.toTipPage()        
      },
      toTipPage () {
       this.$router.push({name:"pdtippage"}) 
      },
    }
  }
</script>