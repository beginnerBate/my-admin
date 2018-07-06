<template>
  <user-identity></user-identity>
</template>

<script>
  import UserIdentity from 'base/user-identity/user-identity'
  import {userAuth} from 'api/user'
  export default {
    data() {
      return {
        flag: false,
        cardNumber:"",
      }
    },
    components:{
      UserIdentity
    },
    created () {
      this.$store.commit('setMenuIdx',1)
    },
    mounted () {
      setTimeout(()=>{
          if  (typeof getUserInfo == 'function') {
            this.cardNumber = getUserInfo().cardNumber         
          }
      },3000)
    },
    watch: {
      cardNumber(newValue) {
        if(newValue && this.cardType) {
          this.flag = true
        }
      },
      flag(value){
        if (value === true) {
          this.toUserAuth()
        }
      }
    },
    computed: {
      cardType() {
        return this.$store.state.bookReg.cardType
      }
    },
    methods: {
      toUserAuth() {
        var that = this
          userAuth({cardType:this.cardType, cardNumber: this.cardNumber})
          .then(function(res){
             if (res.code == 200) {
              // 提交用户信息和token
              that.$store.dispatch('getUserInfo',{
                                    token:res.token,
                                    name:res.patientInfo.name,
                                    jzId:res.patientInfo.jzId,
                                    cardNumber: that.cardNumber
                                  })
              // 跳转到信息确认页面
              that.toNext()
             }
          }).catch(function (err) {
            console.log(err)
          })
      },
      toNext() {
        this.$router.push({name:"opstepthree"})
      }
    }
  }
  // 模拟 getUserInfo
  function getUserInfo () {
    return {cardNumber:"123456789987654321"}
  }
</script>