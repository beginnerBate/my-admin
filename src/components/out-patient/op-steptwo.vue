<template>
  <user-identity @authpass="topage200()" @authno="topage406()" @nouser="usernot()" @neterror='neterror()'></user-identity>
</template>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  export default {
    components:{
      UserIdentity
    },
    created () {
      this.$store.commit('setMenuIdx',1)
    },
    methods: {
      // 用户存在
      topage200() {
        this.$router.push({name:"opstepthree"})
      },
      // 用户不存在
      usernot() {
        // this.$store.commit('setRegbookTip','没有该用户,请先注册建档!')
        this.$store.dispatch('setTipPage',['没有该用户,请先注册建档!','warning'])
        this.toTipPage()
      },
      // 账号已锁定
      topage406() {
        // this.$store.commit('setRegbookTip','用户账号已锁定, 请到柜台处理!')
        this.$store.dispatch('setTipPage',['用户账号已锁定, 请到柜台处理!','error'])
        this.toTipPage() 
      },
      // 系统错误
      neterror() {
        // this.$store.commit('setRegbookTip','系统错误,请联系维修人员,维修电话 15865458562!')
        this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
        this.toTipPage()        
      },
      toTipPage () {
       this.$router.push({name:"optippage"}) 
      }
    }
  }

</script>