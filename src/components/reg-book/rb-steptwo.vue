<template>
  <user-identity @authpass="topage200()" @authno="topage406()" @nouser="toNext()" @neterror='neterror()'></user-identity>
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
      toNext() {
        this.$router.push({name:"rbstepthree"}) 
      },
      topage406() {
        this.$store.commit('setRegbookTip','用户账号已锁定, 请到柜台处理!')
        this.toTipPage()
      },      
      topage200() {
        this.$store.commit('setRegbookTip','用户已存在!')
        this.toTipPage()
      },
      neterror() {
        this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
        this.toTipPage()        
      },
      toTipPage () {
       this.$router.push({name:"rbtippage"}) 
      }
    }
  }
</script>