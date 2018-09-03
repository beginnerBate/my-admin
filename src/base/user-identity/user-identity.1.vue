<template>
  <div class="login">
    <div class="card-info" v-if='!flag'>
      <!-- 读取信息 -->
      <section v-if="cardType ==3? false : true">
        <div class="sq-left-wrapper">
        <div class="sq-con">
        <h3>{{messageTip}}</h3>
        <div class="user-info"> 
          <img v-if="cardType ==1"  src="./card.png" alt="">
          <img v-if="cardType ==4" src="./card1.png" alt="">
          </div>
        </div>
      </div>
      </section>
      <!-- 输入证件号 -->
      <section>
      <div class="sq-right-wrapper">
        <div class="sq-con">
          <h3>{{inputTip}}</h3>
          <div class="get-id">
            <div class="input-wrapper">
              <input type='text' v-model='inputCardNumber' class='input-wrapper-num' ref="myJzId" @keyup.enter="submit" v-focus>
            </div>
            <!-- 键盘 -->
            <div class="key">     
              <div class="mykey-wrapper">
                <ul class="my-key">
                  <div class="border-wrapper">
                    <li v-for="(item, index) in key" :key="index">
                      <div :class="{'active': keyi==index}" 
                      @click="KeyUp(item,index)
                       "><span>{{item}}</span></div>
                    </li>  
                  </div>                                                                                           
                </ul>
              </div>
            </div>
            <!-- button -->
            <div class="button-wrapper" @click="tosub()">
              <span class="btn-sq"><i>查 询</i></span>
            </div>
          </div>
        </div>
      </div>
      </section>

    </div>
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
    <audio src="static/mp3/identity.mp3" ref="myaudio"></audio>
    <audio src="static/mp3/jzk.mp3" ref="myaudio1"></audio>
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
        inputCardNumber:"",
        flag:false,
        code:'',
        regUserInfo:"",
        cardInfo:"",
        messageTip:'请将二代身份证置于感应区',
        message:"",
        isCall: true,
        timer:"",
        title:"信息验证中,请稍等...",
        audiosrc:"",
        key: ['1','2','3','0','4','5','6','X','7','8','9','清空'],
        curFlag:false,
        keyi:-1,
        inputTip:"",
        getCardFlag: -1
      }
    },
    components:{
      Loading
    },
    created() {
      this.$store.commit('setMenuIdx',1)

    },
    mounted () {
      if (this.cardType == 1) {
          var myaudio = this.$refs.myaudio
          myaudio.play()
          this.messageTip = '请将二代身份证置于感应区!'
          this.inputTip = '若未带身份证, 请输入身份证号'
        this.timer = setInterval(()=>{
          if (this.isCall == true){
            this.getCardInfo()
          }else {
            clearInterval(this.timer)
          }
        },500)
      }else if (this.cardType == 4) {
          var myaudio = this.$refs.myaudio1
          myaudio.play()
          this.messageTip = '请将就诊卡证置于感应区!'
          this.inputTip = '若未带就诊卡, 请输入就诊卡号'
          this.startCard(4)
      }else if (this.cardType ==3) {
          var myaudio = this.$refs.myaudio1
          myaudio.play()
          this.inputTip = '请输入住院号'
      }
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
      },
      getCardFlag(value) {
        if (value == -2) {
          this.startCard()
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
        clearInterval(this.timer1)
        // 页面销毁关闭 
        if (this.cardType == 4) {
          this.closeCard()
        }
    },
    methods: {
    tosub(){
      console.log('dd',this.inputCardNumber)
        if (this.inputCardNumber) { 
          this.cardNumber = this.inputCardNumber
          // this.toUserAuth()     
        }
      },
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
                                    zyh:res.patientInfo.zyh,
                                    balance:res.patientInfo.balance,
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
        if  (typeof sharpForeign != 'undefined') {
             // 身份证 
             if (this.cardType == 1) {
                this.cardInfo = JSON.parse(sharpForeign.GetCardInfoByType(this.cardType))
                if (this.cardInfo.code == '200') {
                this.isCall = false
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
              }
             }
        }
      },
      startCard (cardNo) {
          //  就诊卡 调用磁卡的方法
          // 开启读磁卡
            var  a = sharpForeign.StatrReadCard(cardNo)
            if (JSON.parse(a).code == "200") {
              clearInterval(this.timer1)
              this.timer1 = setInterval(()=>{
                var strRead =  sharpForeign.GetCardNo()
              if (strRead != "" && strRead != undefined && strRead != null) {
                  this.cardInfo = JSON.parse(strRead)

                  if (this.cardInfo.code == '200') {
                    this.isCall = false
                    // 就诊卡号
                    this.cardNumber = this.cardInfo.data
                    this.message = '就诊卡号读取成功!'                              
                  }else {
                    // 失败
                    this.getCardFlag = -2
                    this.message = '刷卡失败,请重新刷磁卡!'
                  }
                clearInterval(this.timer1); 
             }
              },500)
            }
      },
      closeCard() {
        if (typeof sharpForeign != 'undefined'){
          sharpForeign.StopReadCard(4)
        }
      },
      submit(){
        if (this.cardNumber) {
          this.$store.commit('setJzId',this.cardNumber)
          this.$router.push({name:"spsteptwo"})         
        }
      },
      myfocus(){
         this.$refs.myJzId.focus()
      },
      KeyUp(item,index) {
         this.keyi = index
         setTimeout(()=>{
           this.keyi = -1
         },200)
        if (item == '退格') {
          if (this.inputCardNumber<=0) return
          this.inputCardNumber = this.inputCardNumber.substring(0,this.inputCardNumber.length-1)
        }else if (item == '清空') {
          this.inputCardNumber = ''
        }else {
          if (this.inputCardNumber == '' && item == 0) return
          if (this.inputCardNumber.length >= 18)return 
          this.inputCardNumber += item
        }
        this.$refs.myJzId.focus()
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
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
.card-info 
  height 100%
  display flex
  align-content center
  section
    flex 1
.user-info
  padding-top 1em
  text-align center
  img 
    background #ffffff
    border-radius 2px
    padding 3em 1.8em
    width: 83%;
.button-wrapper
  text-align center
  padding-top 1em
  color $color-font
  letter-spacing 2.5px
  font-size 1.8em
.sq-left-wrapper,.sq-right-wrapper
  color #888
  font-size 1.5em
  letter-spacing 2px
  text-align center
  height 100%
.sq-con
  padding 1em
.my-key
  background #ffffff
  border-top 1px solid #cac9c9
  padding 0.5em
  li
    display inline-block
    width 25%
    div
      padding: 0.9em 0.4em
      border-left: 1px solid #cac9c9;
      border-top: 1px solid #cac9c9;
      span 
        color #333
        display block
        text-align center
        font-size 1.2em
    div.active
      background #cac9c9
      span 
        color #ffffff
.input-wrapper
  background-color #fff
  text-align left  
  padding 0.2em 0.1em
.input-wrapper-num
  width 100%
  height 100%
  background-color #fff
  font-size 1.2em
  min-height 1ex
  border 0
  outline 0
  color #333
.cursor
  opacity:0
.get-id
  margin-top 20px
.button-wrapper
  text-align center
  font-size 1.5em
  letter-spacing 1px
  padding 0.3em 0
  margin-top 15px
  border-radius 12px
  // border-bottom: 3px solid #0072ff
  // box-shadow: 0px 3px 0px #00c6ff
  overflow hidden
  background #00c6ff
  background -webkit-linear-gradient(to right, #0072ff, #00c6ff)
  background linear-gradient(to right, #0072ff, #00c6ff)
.border-wrapper
  border-right: 1px solid #cac9c9;
  border-bottom: 1px solid #cac9c9;
</style>
