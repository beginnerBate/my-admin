<template>
  <user-identity></user-identity>
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
    mounted() {
      setTimeout(()=>{
        this.$router.push({name:"opstepthree"})
      },2000)
    }
  }
</script>