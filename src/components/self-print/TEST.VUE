<template>
  <div class="self-query">
    <!-- 自助打印读卡区域 -->
    <div class="sq-left">
      <div class="sq-left-wrapper">
        <div class="sq-con">
        <h3>请扫条形码</h3>
        <div class="user-info"><img src="./card.png"></div>
        </div>
      </div>
    </div><div class="sq-right">
      <!-- 自助签到  上面不能换行！！！-->
      <div class="sq-right-wrapper">
        <div class="sq-con">
          <h3 ref="refName" id="myinput">若扫码失败, 请输入条形码号</h3>
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
            <!-- button -->
            <div class="button-wrapper" @click="submit()">
              <span class="btn-sq"><i>签 到</i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <spsteptwo @close="closeAlert" v-if="AlertFlag"></spsteptwo>
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
          AlertFlag:false
      }
    },
    components: {
      spsteptwo
    },
    mounted () {
      document.addEventListener('click',this.myfocus)
      document.addEventListener('touchmove',this.myfocus)
      document.addEventListener('mousemove',this.myfocus)
      // var that = this;
      //   that.$nextTick(()=>{
      //       this.$refs.refName.click();
      //   })
    },
    destroyed() {
      document.removeEventListener('click',this.myfocus)
      document.removeEventListener('touchmove',this.myfocus)
      document.removeEventListener('mousemove',this.myfocus)
    },
    methods: {
      closeAlert(){
        this.AlertFlag = false
        this.jzId=""
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
      myblur(){
         this.$refs.myJzId.blur()
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
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          }
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
.sq-con
  padding 1em
.sq-right-wrapper
  border-left 1px dashed  #7ca8cf
.sq-left-wrapper
  border-right  1px dashed  #7ca8cf
.user-info
  margin-top: 20px
  img 
    width 100%
    display block
    text-align center
    height 475px
    overflow hidden
    border-radius 2px
.my-key
  background #ffffff
  border-top 2px solid #45719c
  padding 0.5em
  li
    flex 0 0 10%
    div
      padding 0.4em 0
      border-left: 1px solid #45719c;
      border-top: 1px solid #45719c;
      span 
        color #45719c
        display block
        // background-color #45719c
        text-align center
        // border-radius 6px
        font-size 1.5em
    div.active
      background #45719c
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
  // background-color #45719c
  font-size 1.5em
  min-height 1ex
  border 0
  outline 0
  color #45719c
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
.border-wrapper
  border-right: 1px solid #45719c;
  border-bottom: 1px solid #45719c;
  display flex;
  flex-wrap: wrap;
  li:nth-child(37)
    flex 1 1 10%
  li:nth-child(38)
    flex 1 1 10%
</style>
