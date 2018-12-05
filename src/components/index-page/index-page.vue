<template>
  <div class="home-middle">
    <h1 id="h1"></h1>
    <ul v-if="flag">
      <li  v-for="(item,index) in list" :key="index"><div><router-link tag="img" :to="item"  :src="require('./main_0'+(index+1)+'.png')"></router-link></div></li>
    </ul>
    <div v-else @click="setAuto">
      <div class="guanggao">
        <h1>欢迎使用自助一体服务系统</h1>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderTip from 'base/header-tip/header-tip'
  import FooterTip from 'base/footer-tip/footer-tip'
  export default {
    data() {
      return {
        nowTime:"",
        timer:'',
        list: ['/regbook/RbStepone','/predeposit/pdStepone','/OutPatient/op-stepone','/regtoday/choose-one','/home/department','/bookno/bo-stepone','/self-query','/self-print/SpStepone','/smartleading']
      }
    },
    computed: {
      flag() {
        return this.$store.state.bookReg.autoFlag
      },
      othersTime() {
         return this.$store.state.bookReg.othersTime
      },
      reactStatus(){
        return this.$store.state.bookReg.reactStatus
      }
    },
    watch:{
      flag(value){
        if (value == true) {
            clearInterval(this.timer)
            this.timer = setInterval(()=>{
              console.log(this.othersTime)
              window.autoReactStop()
            },1000)
        }else{
          clearInterval(this.timer)
        }
      },
      reactStatus(value){
        if(value == false) {
          clearInterval(this.timer)
        }else{
          if (this.flag == true) {
          console.log(11)
              clearInterval(this.timer)
              this.timer = setInterval(()=>{
                console.log(this.othersTime)
                window.autoReactStop()
              },1000)
        }else{
          clearInterval(this.timer)
        } 
        }
      }
    },
    created(){
      var that = this;
      if (this.reactStatus == false) {  
         clearInterval(this.timer)    
      }else{
          if (this.flag == true) {
            clearInterval(this.timer)
            this.timer = setInterval(()=>{
              window.autoReactStop()
            },1000)
        }else{
          clearInterval(this.timer)
        }
      } 
      window.autoReact = function() {
        var othersTime = new Date()
        that.$store.commit('setOthersTime', othersTime)
        that.$store.commit('setAutoFlag',true)
        that.$store.commit('setReactStatus',true)
      }
      window.autoReactStop = ()=> {     
        if (that.othersTime =='')return
        if (that.reactStatus == false) {
          clearInterval(that.timer)
          return
        }
        that.nowTime = new Date()
        var second  = parseInt((that.nowTime - that.othersTime)/ 1000)
        if (second >=5){
          that.$store.commit('setAutoFlag',false)
        }
      }
    },
    methods: {
      setAuto() {
       this.$store.commit('setReactStatus',false)
        this.$store.commit('setAutoFlag',true)
        clearInterval(this.timer)
      }
    },
    components: {
      HeaderTip,
      FooterTip
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    destroyed(){
       clearInterval(this.timer)
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
.home-middle
  overflow hidden
  margin-top 90px
  margin-bottom:40px
  ul
    padding 100px 
    li
      width:33.3%
      display inline-block
      text-align center
      div
        padding-bottom 50px
.guanggao
   color #fff 
   text-align center
   height calc(100vh - 127px)
   h1
     position: absolute
     top: 50%
     width: 100%
     font-size 4em
     letter-spacing 3px
</style>
