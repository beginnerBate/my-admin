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
        <p>{{message}}</p>
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
        regUserInfo:"",
        cardInfo:"",
        message:'请在自助机指示区域放入已绑定就诊ID的卡进行身份验证!'
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
    },
    mounted () {
      this.getCardInfo()
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
      },
      getCardInfo () {
        if  (typeof window.external.GetCardInfoByType == 'function') {
              console.log(this.cardType)
              this.cardInfo = JSON.parse(window.external.GetCardInfoByType(this.cardType))
              console.log('d',this.cardInfo)
              if (this.cardInfo.code == '200') {
                this.cardNumber = this.cardInfo.data.IdNumber 
                this.$store.commit('setReguserinfo',
                                                    {
                                                      name:this.cardInfo.data.Name,
                                                      sex:this.cardInfo.data.Sex,
                                                      cardNumber:this.cardInfo.data.IdNumber,
                                                      birthday:this.cardInfo.data.Birth
                                                    }
                )
                this.message = '身份证读取成功!'
              }else {
                this.message = this.cardInfo.data
                this.getCardInfo()
              }
        } 
      }
    }
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
