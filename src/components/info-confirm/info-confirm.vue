<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con" v-if='!flag'>
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
      <!-- 医生信息 -->
      <div class="doctor-info">
        <p><i>挂号科室:</i> <i>{{departName}}</i></p>
        <p><i>门诊医生:</i> <i>{{bookDoctor.ysxm|mydocName}}</i></p>
        <p><i>挂号费用:</i> <i>{{bookDoctor.sumRegister}}元</i></p>
        <p><i>预约时间:</i> <i>{{booktime.date}} {{booktime.week}} {{booktime.pb}}</i></p>
      </div>
      <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确 认</i></span>
      </div>
    </div>
    <!-- loading -->
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>

<script>
  import {createOrder}  from 'api/pay.js'
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        list:[],
        i:1,
        flag:false,
        title:'页面加载中...'
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
      this.getData()
    },
    mounted () {
    },
    components: {Loading},
    computed: {
      bookDoctor() {
        return this.$store.state.bookReg.bookDoctor
      },
      departName() {
        return this.$store.state.bookReg.departName
      },
      booktime () {
        return this.$store.state.bookReg.booktime
      },
      user () {
        return this.$store.state.bookReg.user
      },
      token() {
        return this.$store.state.bookReg.token
      }
    },
    filters:{
      mydocName(value) {
        if(value=='') {
          return '普通医生'
        }else{
          return value
        }
      }
    },
    methods: {
      toTipPage () {
       this.$router.push({name:"dtippage"}) 
      },
      getData() {
        for (var i=0;i<10;i++) {
          this.list.push({value:"余号100"})
        }
      },
      selectItem(index) {
        if (!(index%2==0)){
          this.i = index
        }
      },
      toNext() {
        this.createOrder()
      },
      // 创建订单
      createOrder() {
        var mydata = {
          visitTime: this.booktime.date,     
          docNumber: this.bookDoctor.hm
        }
        // 创建订单之前
        this.flag = true
        var that = this
        createOrder(mydata,this.token).then(function(res){
          if (res.code == 200) {
            // 订单创建成功
            // 保存orderId
            that.$store.commit('setorderId',res.orderId)
            that.$router.push({path:"payment-method"})
          }else if(res.code == '400') {
              this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
              this.toTipPage()  
          }else {
            this.$store.commit('setRegbookTip','订单创建失败,请到柜台处理!')
            this.toTipPage()  
          }
        }).catch(function(res){
            this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
            this.toTipPage()  
        }) 
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
.info-wrapper
  margin-bottom 2em
.doctor-info
  background  $color-bg1
  padding 0.4em
  border-radius 4px
.doctor-info>p
  font-size 2em
  margin 0.5em 0
  color $color-font
  padding-left 0.6em
  i:first-child
    letter-spacing: 3px;
  i:nth-child(2)
    color #ff6666
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
.loading-wrapper
  padding-top 30%
</style>
