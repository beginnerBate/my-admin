<template>
  <user-identity></user-identity>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  export default {
    components:{
      UserIdentity
    },
    mounted() {
      setTimeout(()=>{
        this.$router.push({name:"choosethree"})
      },2000)
    }
  }
</script>