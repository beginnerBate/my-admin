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
        cardNumber:'',
        flag:false,
        code:'',
        regUserInfo:""
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
    },
    mounted () {
      setTimeout(()=>{
          if  (typeof getUserInfo == 'function') {
            this.cardNumber = getUserInfo().cardNumber  
            var regUserInfo = getUserInfo() 
            console.log(regUserInfo)
            this.$store.commit('setReguserinfo',regUserInfo)    
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
            that.code = res.code
            that.toSendInfo()
             if (res.code == 200) {
              // 提交用户信息和token
              that.$store.dispatch('getUserInfo',{
                                    token:res.token,
                                    name:res.patientInfo.name,
                                    sex:res.patientInfo.sex,
                                    jzId:res.patientInfo.jzId,
                                    cardNumber: res.patientInfo.idNumber
                                  })
              // 跳转到信息确认页面
              that.toNext()
             }else if (res.code == "H404" || res.code=='404'){               
               that.toNouser()
             }else if (res.code =='406') {
               that.toError()
             }else {
               that.tosystemError()
             }
          }).catch(function (err) {
            that.tosystemError()
          })
      },
      toNext() {
        // 通过验证
        this.$emit('authpass')
      },
      toNouser  () {
        // 用户不存在
        console.log('nono')
        this.$emit('nouser')
      },
      toError() {
        // 用户已锁定
        this.$emit('authno')
      },
      toSendInfo() {
        this.$emit('sendinfo',this.code)
      },
      tosystemError(){
        this.$emit('neterror')
      }
    }
  }
  // 模拟 getUserInfo 对接硬件获取用户信息
  function getUserInfo () {
    return {cardNumber:"320840190212170707",name:"豪大大", sex:'女', birthday:"19921217"}
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
