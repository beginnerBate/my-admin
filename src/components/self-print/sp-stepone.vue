<template>
  <div class="self-query">
    <!-- 自助打印读卡区域 -->
    <div class="sq-left">
      <div class="sq-left-wrapper">
        <h3>请将就诊卡置于感应区</h3>
        <div class="user-info"><img src="./user-info.gif"></div>
      </div>
    </div><div class="sq-right">
      <!-- 自助打印填卡区域  上面不能换行！！！-->
      <div class="sq-right-wrapper">
        <h3>若未带就诊卡, 请输入就诊卡号</h3>
        <div class="get-id">
          <div class="input-wrapper">
            <input type='text' v-model='jzId' class='input-wrapper-num' ref="myJzId" @keyup.enter="submit" v-focus>
          </div>
          <!-- 键盘 -->
          <div class="key">     
            <div class="mykey-wrapper">
              <ul class="my-key">
                <li v-for="(item, index) in key" :key="index" @click="KeyUp(item)">
                  <div><span>{{item}}</span></div>
                </li>                                                                                             
              </ul>
            </div>
          </div>
          <!-- button -->
          <div class="button-wrapper" @click="submit()">
            <span class="btn-sq"  :class="{'disabled': disableFlag == -1}"><i>查 询</i></span>
          </div>
        </div>
      </div>
    </div>
    <audio src="static/mp3/jzk.mp3" ref="myaudio1"></audio>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        jzId:'',
         key: ['1','2','3','4','5','6','7','8','9','0','退格','清空'],
         curFlag:false,
         disableFlag:0,
          isCall:true,
          cardInfo:"",
          cardNumber:'',
          flag:false,
          timer:""
      }
    },
    mounted () {
      this.speech()
      var that = this
      document.addEventListener('click',this.myfocus)
    },
    watch: {
      jzId(value) {
        if (value) {
        var par = /\d+/
        this.jzId = value.match(par)? value.match(par)[0] : ''
        }else {
          this.jzId = ''
        }
      }
    },
    destroyed() {
      document.removeEventListener('click',this.myfocus)
      clearInterval(this.timer)
    },
    methods: {
      submit(){
        if (this.jzId) {
          this.$store.commit('setJzId',this.jzId)
          this.$router.push({name:"spsteptwo"})         
        }
      },
      myfocus(){
         this.$refs.myJzId.focus()
      },
      KeyUp(item) {
        if (item == '退格') {
          if (this.jzId<=0) return
          this.jzId = this.jzId.substring(0,this.jzId.length-1)
        }else if (item == '清空') {
          this.jzId = ''
        }else {
          if (this.jzId == '' && item == 0) return
          if (this.jzId.length >= 18)return 
          this.jzId += item
        }
        this.$refs.myJzId.focus()
      },
      getCardInfo () {
        if  (typeof sharpForeign != 'undefined') {
              this.cardInfo = JSON.parse(sharpForeign.GetCardInfoByType(4))
              if (this.cardInfo.code == '200') {
                this.isCall = false
                  // 就诊卡号
                this.cardNumber = this.cardInfo.data
                this.jzId = this.cardInfo.data
                this.submit()
              }else if(this.cardInfo.code=='300'){
                this.isCall = true
              }else{
                this.isCall = false
              }
          }
        },
      speech() {
          var myaudio = this.$refs.myaudio1
          myaudio.play()
          var that = this
          that.timer = setInterval(()=>{
            if (that.isCall == true){
              that.getCardInfo()
            }else {
              clearInterval(that.timer)
            }
          },500)
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
.sq-left,.sq-right
  display inline-block
  width 50%
  height 100%
  overflow hidden
.sq-left-wrapper,.sq-right-wrapper
  padding 1em
  color #ffffff
  font-size 1.6em
  letter-spacing 5px
  text-align center
  height 100%
.sq-right-wrapper
  border-left 1px dashed  #7ca8cf
.sq-left-wrapper
  border-right  1px dashed  #7ca8cf
.user-info
  padding-top 4em
  text-align center
  
  img 
    background #ffffff
    border-radius 18px
.my-key
  background #ffffff
  // border-radius 8px
  padding 0.5em
  li
    display inline-block
    width 33.3%
    div
      padding 0.4em
      span 
        display block
        background-color #45719c
        text-align center
        border-radius 6px
        font-size 1.5em
.input-wrapper
  background-color #45719c
  text-align left  
  padding 0.2em 0.1em
.input-wrapper-num
  width 100%
  height 100%
  background-color #45719c
  font-size 1.5em
  min-height 1ex
  border 0
  outline 0
  color #ffffff
.cursor
  opacity:0
.get-id
  margin-top 20px
.button-wrapper
  background #5e92c5
  text-align center
  font-size 1.5em
  letter-spacing 1px
  padding 0.3em 0
  margin-top 15px
  border-radius 12px
  border-bottom: 3px solid #30679c
  box-shadow: 0px 3px 0px #346b9e
  overflow hidden
</style>
