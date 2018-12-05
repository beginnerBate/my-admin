<template>
  <div class="op-stepthree">
    <!-- 挂号记录 -->
    <div class="op-content"  v-if="!loadFlag">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>性别:</i> <i>{{user.sex}}</i></span>
        <span><i>年龄:</i> <i>{{user.age}}</i></span>
        <span><i>电话:</i> <i>{{user.phone}}</i></span>
        <span><i>门诊号:</i> <i>{{user.mz}}</i></span>
        <span><i>就诊卡号:</i> <i>{{user.jzkh}}</i></span>
        <span><i>身份证号:</i> <i>{{user.idNumber}}</i></span>
        <span><i>账户余额:</i> <i>{{user.balance}} 元</i></span>
      </div>
    </div>
      <!-- loading -->
       <div class="loading-wrapper" v-if="loadFlag">
         <loading :title="title"></loading>
       </div>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import {queryPatInfo} from 'api/selfquery.js'
  import {formatDate} from 'common/js/date.js'
  export default {
    data() {
      return {
        loadFlag:true,
        title:"页面加载中...",
        user:""
      }
    },
    created() {
      this.$store.commit('setMenuIdx',2)
      this.getList()
    },
    components:{
      Loading
    },
    computed: {
      token() {
        return this.$store.state.bookReg.token 
      }
    },
    methods: {
      toTipPage () {
        this.$router.push({name:"sqtippage"}) 
      },
      getList() {
        this.loadFlag = true
        queryPatInfo(this.token).then((res)=>{
          if(res.code == '200'){
            this.user = res.data
          }else if (res.code == '404') {
            // 没有数据
 
          }else {
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
        this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

            this.toTipPage()  
          }
          this.loadFlag = false
        }).catch((err)=>{
          this.loadFlag = false
          // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
        this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

          this.toTipPage()  
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
@import '~~common/stylus/navbtn.styl'
.op-stepthree,.op-content
   height 100%
   overflow hidden
.op-content
  display flex
  justify-content center
  align-items center
.info-wrapper>span
  min-width: 540px;
  display flex;
  border-bottom 1px dashed #d6d6d6
  height 60px;
  line-height 60px;
  i 
    flex 1
    display inline-block
  i:first-child
    flex 0 0 30%;  
.money-content
  position absolute
  bottom 10px
  text-align center 
  width 45%
  left 55%
.money-txt
  font-size 2em
  color $color-font
  i:last-child
    color $color-a8
.money-btn .btn-sub
  font-size 2em
  margin-left 50px
.tip-info p
  padding 20%
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font 
</style>
