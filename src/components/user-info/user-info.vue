<template>
  <div class="login">
    <div class="con">
      <!-- 读取信息 -->
      <div class="user-info">
        <img src="./user-info.gif" alt="">
      </div>
      <!-- 用户信息 -->
      <!-- button -->
      <div class="button-wrapper">
        <p>请在自助机指示区域放入已绑定就诊ID的卡进行身份验证!</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {userAuth} from 'api/user'
  export default {
    data() {
      return {
        list:[],
        i:1,
        cardType:'',
        cardNumber:'',
        flag:false
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
    },
    mounted () {
      setTimeout(()=>{
          if  (typeof getUserInfo == 'function') {
            this.cardType = getUserInfo().cardType
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
                                    cardNumber: res.patientInfo.idNumber
                                  })
              // 跳转到信息确认页面
              that.toNext()
             }
          }).catch(function (err) {
            console.log(err)
          })
      },
      toNext() {
        this.$router.push({path:"info-confirm"})
      }
    }
  }
  // 模拟 getUserInfo
  function getUserInfo () {
    return {cardType:'1',cardNumber:"320325199507895264"}
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.login
  height 100%
.user-info
  padding-top 2em
  text-align center
  img 
    background #ffffff
    border-radius 18px
.button-wrapper
  text-align center
  padding-top 1em
  color $color-font
  letter-spacing 2.5px
  font-size 1.8em
</style>
