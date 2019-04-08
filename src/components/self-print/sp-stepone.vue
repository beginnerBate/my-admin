<template>
  <div class="self-query">
    <!-- 自助打印读卡区域 -->
    <div class="sq-left">
      <div class="sq-left-wrapper">
        <div class="sq-con">
        <h3>{{title3}}</h3>
        <div class="user-info user-img"><img src="./card.png"></div>
                   <!-- button -->
        <div class="button-wrapper" @click="back()">
          <span class="btn-sq"><i>返回</i></span>
        </div>
        </div>
      </div>
    </div><div class="sq-right">
      <!-- 自助签到  上面不能换行！！！-->
      <div class="sq-right-wrapper">
        <div class="sq-con">
          <h3>{{titleRight}}</h3>
          <div class="get-id">
            <div class="input-wrapper">
              <input type='text' v-model='jzId' class='input-wrapper-num' ref="myJzId" @keyup.enter="submit" v-focus>
            </div>
            <!-- 键盘 -->
            <div class="key">     
              <div class="mykey-wrapper">
                <ul class="my-key">
                  <div class="border-wrapper">
                    <li v-for="(item, index) in key" :key="index">
                      <div :class="{'active': i==index}" 
                      @click="KeyUp(item,index)
                       "><span>{{item}}</span></div>
                    </li>  
                  </div>                                                                                           
                </ul>
              </div>
            </div>
          </div>
            <!-- button -->
            <div class="button-wrapper" @click="submit()">
              <span class="btn-sq"><i>签 到</i></span>
            </div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <spsteptwo @close="closeAlert" v-if="AlertFlag"></spsteptwo>
    <audio src="static/mp3/ybk.mp3" ref="myaudio"></audio>
    <audio src="static/mp3/jzk.mp3" ref="myaudio1"></audio>
  </div>
</template>
<script>
import spsteptwo from 'components/self-print/sp-steptwo'
  export default {
    data() {
      return {
        jzId:'',
         key:['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','退格','清空'],
         curFlag:false,
          flag:false,
          i:-1,
          AlertFlag:false,
          title3:"",
          titleRight:"",
          cardInfo:"",
          message:'',
          isCall: true
      }
    },
    components: {
      spsteptwo
    },
    created(){
      this.$store.commit('setTimeFlag',false)
    },
    computed: {
      cardType() {
        return this.$store.state.bookReg.cardType
      }
    },
    watch: {
      isCall (value) {
        if (value == false) {
          clearInterval(this.timer)
        }
      }
    },
    mounted () {
      if(this.cardType ==1) {
        this.title3 ="请插入医保卡"
        this.titleRight = '若医保卡读取失败,请输入医保卡号'
        var myaudio = this.$refs.myaudio
        myaudio.play()
      }else if(this.cardType ==2){
        this.title3 ='请插入就诊卡'
        this.titleRight = '若就诊卡读取失败,请输入就诊卡号'
        var myaudio = this.$refs.myaudio1;
        myaudio.play()
      }
      this.timer = setInterval(()=>{
        if (this.isCall == true){
          this.getCardInfo()
        }else {
          clearInterval(this.timer)
        }
      },2000)
      document.addEventListener('click',this.myfocus)
      document.addEventListener('touchmove',this.myfocus)
      document.addEventListener('mousemove',this.myfocus)
    },
    destroyed() {
      document.removeEventListener('click',this.myfocus)
      document.removeEventListener('touchmove',this.myfocus)
      document.removeEventListener('mousemove',this.myfocus)
      clearInterval(this.timer)
    },
    methods: {
      back(){
        this.$router.push({path:'/self-print/list'}) 
      },
      closeAlert(){
        this.AlertFlag = false
        this.jzId=""
        this.back()
      },
      submit(){
        if (this.jzId) {
          if(this.AlertFlag == false){
            this.$store.commit('setJzId',this.jzId)
            // 请求数据 显示弹框
            this.jzId = ''     
            this.AlertFlag = true
          }else{
            return false;
          }
        }
      },
      myfocus(){
         this.$refs.myJzId.focus()
      },
      KeyUp(item,index) {
         this.i = index
         setTimeout(()=>{
           this.i = -1
         },200)
        if (item == '退格') {
          if (this.jzId.length<=0) return
          this.jzId = this.jzId.substring(0,this.jzId.length-1)
        }else if (item == '清空') {
          this.jzId = ''
        }else {
          this.jzId += item
        }
        this.$refs.myJzId.focus()
      },
      getCardInfo () {
        // if  (typeof sharpForeign != 'undefined') {
        //       if (this.cardType == 1){
        //           this.cardInfo = JSON.parse(sharpForeign.ReadSSCardNo())
        //           console.log(this.cardInfo)
        //           if (this.cardInfo.code == '200') {
        //               this.isCall = false
        //               this.jzId = this.cardInfo.data
        //               this.message = '医保卡读取成功!'
        //               this.submit()
        //               // 如果是300 就继续调用
        //           }else if(this.cardInfo.code =='300'){
        //               this.isCall = true
        //               this.message = this.cardInfo.data
        //           }else{
        //               this.isCall = false
        //               this.message = this.cardInfo.data
        //           }
        //       }
        // }
        var that = this;
        if  (typeof sharpForeignAsync != 'undefined') {
              if (this.cardType == 1){
                  sharpForeignAsync.ReadSSCardNo(function(obj){
                        that.cardInfo = JSON.parse(obj);
                         console.log(that.cardInfo)
                        if (that.cardInfo.code == '200') {
                            that.isCall = false
                            that.jzId = that.cardInfo.data
                            that.message = '医保卡读取成功!'
                            that.submit()
                            // 如果是300 就继续调用
                        }else if(that.cardInfo.code =='300'){
                            that.isCall = true
                            that.message = that.cardInfo.data
                        }else{
                            that.isCall = false
                            that.message = that.cardInfo.data
                        }
                  });
                 
              }
        }
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
  height 100%
  overflow hidden
.sq-left
  width 30%
.sq-right
  width 70%
.sq-left
  float left
.sq-right
  float right 
.sq-left-wrapper,.sq-right-wrapper
  color #ffffff
  font-size 1.6em
  letter-spacing 5px
  text-align center
  height 100%
.sq-con-left 
  padding 1em 
.sq-con
  padding 1em
  height: 100%;
  box-sizing: border-box;
  display flex
  flex-wrap wrap 
  flex-direction column
.sq-right-wrapper
  border-left 1px dashed  #ee5084
.sq-left-wrapper
  border-right  1px dashed  #ee5084
.user-info
  margin-top: 20px
  img 
    max-width 295px;
    display inline-block
    text-align center
    height auto
    overflow hidden
    border-radius 2px
.my-key
  background #ffffff
  border-top 2px solid #E91E63
  padding 0.5em
  display: flex;
  li
    flex 0 0 10%
    display: flex;
    div
      border-left: 1px solid #E91E63;
      border-top: 1px solid #E91E63;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      span 
        color #E91E63
        display block
        text-align center
        font-size 1.5em
    div.active
      background #E91E63
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
  font-size 1.5em
  min-height 1ex
  border 0
  outline 0
  color #E91E63
.cursor
  opacity:0
.get-id
  margin-top 20px
  flex:1
  display flex
  flex-wrap wrap 
  flex-direction column
  box-sizing border-box 
  .key
    flex:1
    display: flex;
    .mykey-wrapper
      display flex
.button-wrapper
  background #E91E63
  text-align center
  font-size 1.5em
  letter-spacing 1px
  padding 0.3em 0
  margin-top 15px
  border-radius 12px
  border-bottom: 3px solid #d60049
  box-shadow: 0px 3px 0px #af003b
  overflow hidden
.border-wrapper
  border-right: 1px solid #E91E63;
  border-bottom: 1px solid #E91E63;
  display flex;
  flex-wrap: wrap;
  li:nth-child(37)
    flex 1 1 10%
  li:nth-child(38)
    flex 1 1 10%
.user-img
  margin-top: 20px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  align-items: center;
@media screen and (max-width:1000px)
  .sq-left-wrapper,.sq-right-wrapper
    color #ffffff
    font-size 1.3em
    letter-spacing 5px
    text-align center
    height 100%
</style>
