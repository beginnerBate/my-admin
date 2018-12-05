<template>
  <div class="ebook">
    <div v-if="(!loadflag)">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{printInfo.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{printInfo.visitId}}</i></span>
      </div>
      <!-- PDF重复生成或生成失败 -->
      <div class="tip-info" v-if="pdf == 403">
         <p> PDF重复生成或生成失败</p>
       </div>
      <!-- 二维码生成失败 -->
      <div class="tip-info" v-if="pdf == 400">
         <p> 二维码生成失败</p>
       </div>
      <!-- 二维码生成OK -->
      <div class="scan-code" v-if="pdf == 200">
        <div><img :src="scancode"></div>
         <p> 请打开微信扫一扫</p>
       </div>
    </div>
    <!-- tip -->
    <div v-if='loadflag'>
      <!-- loading -->
      <div  class='loading-wrapper'>
        <loading :title="title"></loading>
      </div> 
    </div>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import {createQRCode} from 'api/print.js'
  export default {
    data() {
      return {
        loadflag:true,
        title:'页面加载中...',
        pdf:'',
        scancode:""
      }
    },
    created() {
      this.getEbook()
      // setTimeout(()=>{
      //   this.loadflag = false
      // },1000)
      // console.log(this.printInfo)
    },
    watch: {
    },
    components: {
      Loading,
    },
    computed:{
      jzId() {
        return this.$store.state.bookReg.jzId
      },
      printInfo () {
        return this.$store.state.bookReg.printInfo
      },
      no() {
        return this.$store.state.bookReg.no
      }
    },
    methods: {
      toTipPage () {
        this.$router.push({name:"sptippage"})
      },
      getEbook() {
        // 获取电子报告
        createQRCode(this.jzId,this.no).then((res)=>{
          if(res.code ==403) {
            // PDF重复生成或生成失败
            this.pdf = '403'
          }else if(res.code ==200) {
            // 成功
            this.pdf = '200'
            this.scancode = res.data
          }else if(res.code == 400){
            // 二维码生成失败
            this.pdf = '400'
          }else{
            this.loadflag = false
            this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
            this.toTipPage()            
          }
          this.loadflag = false
        }).catch((err)=>{
          this.loadflag = false
          this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
          this.toTipPage()
        })
      }
    },
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.ebook
  padding 1em
.tip-info p
  padding 25%
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font 
.scan-code
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font
  div
    width 200px
    height 200px
    overflow hidden
    margin 20px auto
    border-radius 8px
    border 8px solid #fff
    img 
     width 100%
     height auto
</style>
