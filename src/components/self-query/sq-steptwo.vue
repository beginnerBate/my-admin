<template>
  <user-identity @authpass="toNext()"></user-identity>
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
      toNext() {
        if (this.queryType == 1) {
         this.$router.push({name:"sqstepthree"}) 
        }else if(this.queryType == 2){
          this.$router.push({name:'sqstepfour'})
        }
      }
    }
  }
</script>