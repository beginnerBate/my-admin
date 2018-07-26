<template>
  <div class="login">
    <!-- 预约信息 -->
    <div class="con">
      <!-- 医生信息 -->
      <div class="info-wrapper doctor-info">
        <p>专家: {{bookDoctor.ysxm}}</p>
        <p>科室: {{departName}}</p>
        <p>预约时间: {{booktime.date}} {{booktime.week}} {{booktime.pb}}</p>
        <p>挂号费: {{bookDoctor.sumRegister}}元</p>
      </div>
      <!-- 用户信息 -->
      <div class="info-wrapper user-info">
        <p>
          <span>姓名: {{user.name}}</span>
          <span>就诊卡号: {{user.jzId}}</span><br>
          <span>身份证号: {{user.cardNumber}}</span>
        </p>
      </div>
      <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确 认</i></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {createOrder}  from 'api/pay.js'
  export default {
    data() {
      return {
        list:[],
        i:1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
      this.getData()
    },
    mounted () {
    },
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
    methods: {
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
        var that = this
        createOrder(mydata,this.token).then(function(res){
          if (res.code == 200) {
            // 订单创建成功
            // 保存orderId
            that.$store.commit('setorderId',res.orderId)
            that.$router.push({path:"payment-method"})
          }else if(res.code == 'AF401') {
            console.log('认证失败')
          }
        }).catch(function(res){
          console.log(res)
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
  background $color-bg1
  padding 1em 3em
  margin-bottom 2em
  border-radius 8px
  color $color-font
.doctor-info>p
  font-size 2em
  margin 0.5em 0
.user-info>p>span
  font-size 1.8em
  padding 0em 0.5em
  line-height: 1.8em;
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
