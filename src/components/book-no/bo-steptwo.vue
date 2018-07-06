<template>
  <user-identity @authpass="toNext()"></user-identity>
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
        this.$router.push({name:"bostepthree"})
      }
    }
  }
</script>