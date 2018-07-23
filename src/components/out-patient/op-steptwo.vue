<template>
  <user-identity @authpass='toNext()' @anthno="toError()"></user-identity>
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
      toNext() {
        this.$router.push({name:"opstepthree"})
      },
      toError() {
        // 返回主页面注册建党
        alert('验证失败，返回注册建党模块！')
      }
    }
  }

</script>