<template>
  <user-identity @authpass='next()'></user-identity>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  export default {
    components:{
      UserIdentity
    },
    methods:{
      next() {
        this.$router.push({name:'choosethree'})
      }
    }
  }
</script>