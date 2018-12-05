<template>
  <user-identity @authpass="topage200()" @authno="topage406()" @nouser="usernot()" @neterror='neterror()'></user-identity>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  export default {
    components:{
      UserIdentity
    },
    computed: {
      queryType() {
        return this.$store.state.selfQuery.queryType 
      }
    },
    methods: {
      // 用户存在
      topage200() {
        this.toNext()
      },
      // 用户不存在
      usernot() {
        // this.$store.commit('setRegbookTip','没有该用户,请先注册建档!')
        this.$store.dispatch('setTipPage',['没有该用户,请先注册建档!','warning'])
        this.toTipPage()
      },
      topage406() {
        // this.$store.commit('setRegbookTip','用户账号已锁定, 请到柜台处理!')
        this.$store.dispatch('setTipPage',['用户账号已锁定, 请到柜台处理!','warning'])

        this.toTipPage() 
      },
      neterror() {
        // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
        this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

        this.toTipPage()        
      },
      toTipPage () {
       this.$router.push({name:"sqtippage"}) 
      },
      toNext() {
        if (this.queryType == 1) {
         this.$router.push({name:"sqstepthree"}) 
        }else if(this.queryType == 4){
          this.$router.push({name:'sqstepfour'})
        }else if(this.queryType ==2) {
          this.$router.push({name:"sqstepfive"}) 
        }else if (this.queryType ==3) {
          this.$router.push({name:"sqstepsix"}) 
        }
      }
    }
  }
</script>