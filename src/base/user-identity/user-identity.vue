<template>
  <div class="login">
    <div class="con" v-if='!flag'>
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
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>

<script>
  import {userAuth} from 'api/user'
  import Loading from 'base/loading/loading'
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
        message:'请在自助机指示区域放入已绑定就诊ID的卡进行身份验证!',
        isCall: true,
        timer:"",
        title:"读卡成功,用户信息验证中,请稍等..."
      }
    },
    components:{
      Loading
    },
    created () {
      this.$store.commit('setMenuIdx',1)
      if (this.cardType == 1) {
        this.SpeechText('请放入身份证')
      }else if (this.cardType == 4) {
        this.SpeechText('请放入就诊卡')
      }
    },
    mounted () {

      this.timer = setInterval(()=>{
        if (this.isCall == true){
          this.getCardInfo()
        }else {
          clearInterval(this.timer)
        }
      },500)
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
      },
      isCall (value) {
        if (value == false) {
          clearInterval(this.timer)
        }
      }
    },
    computed: {
      cardType() {
        return this.$store.state.bookReg.cardType
      }
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods: {
      toUserAuth() {
        var that = this
          userAuth({cardType:this.cardType, cardNumber: this.cardNumber})
          .then(function(res){
            that.code = res.code
            that.toSendInfo()
             if (res.code == 200) {
               that.title = '验证成功!'
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
             }else if (res.code=='404'){               
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
              this.cardInfo = JSON.parse(window.external.GetCardInfoByType(this.cardType))
              if (this.cardInfo.code == '200') {
                this.isCall = false
                if (this.cardType == 1) {
                      // 身份证                 
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
                }else if (this.cardType == 4){
                  // 就诊卡号
                   this.cardNumber = this.cardInfo.data
                   this.message = '就诊卡号读取成功!'
                } 
              }else {
                this.isCall = true
                this.message = this.cardInfo.data
              }
        } else  {
          // 模拟数据测试
          if (this.cardType == 1) {
                // 身份证                 
          this.cardNumber = '368186199545176884'
          this.$store.commit('setReguserinfo',
                                              {
                                                name:"模拟数据01",
                                                sex:"女",
                                                cardNumber:'368186199545176884',
                                                birthday:"19985468"
                                              }
          )
          this.message = '身份证读取成功!'
          }else if (this.cardType == 4){
            // 就诊卡号
              this.cardNumber = '17391069'
              this.message = '就诊卡号读取成功!'
          } 

        }
      },
      SpeechText(value) {
        if (typeof window.external.SpeechText == 'function') {
          window.external.SpeechText(value)
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
.loading-wrapper
  padding-top 30%
</style>
