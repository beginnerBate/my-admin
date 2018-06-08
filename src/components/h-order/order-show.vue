<template>
  <!-- base-box -->
  <base-box :title="title" @hide="hide()">
   <div class="order-show">
     <div class="order-show-item">
       <h1>订单信息</h1>
       <div class="order-info">
         <span>订单编号: 01</span>
         <span>订单类型: 住院充值</span>
         <span>总费用: 250元</span>
         <span>总项数: 5</span>
         <span>创建时间: 2018-08-05 14:55:10</span>
         <span>支付状态: 支付失败</span>
       </div>
     </div>
     <div class="order-show-item">
       <h1>订单用户信息</h1>
       <div class="order-info">
         <span>用户编号: 01</span>
         <span>用户名: 张三</span>
         <span>就诊卡号: 365245855557</span>
         <span>创建时间: 2018-08-05 14:55:10</span>
         <span>最后登录时间: 2018-08-05 14:55:10</span>
       </div>
     </div>
     <div class="order-show-item">
       <h1>订单项目信息</h1>
       <div class="order-info">
         <span>订单项目编号: 01</span>
         <span>费用: 22元</span>
       </div>
     </div>
   </div>
  </base-box>
</template>
<script>
import BaseBox from 'base/base-box/base-box'
export default {
  data() {
    return {
      title:'订单详情页面'
    }
  },
  components: {
    BaseBox,
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  },
}
</script>
<style lang="stylus" scoped>
.order-show
  padding 1em 3em
  p
    font-size 1.14em
    color #333
    margin 1em
.order-show-item
  border: 1px solid #00a9ba
  margin 1em
  border-radius: 4px;
  box-shadow: 1px 1px 6px #c3c3c3;
  h1
    font-size 1.2em
    color #00a9ba
    padding .5em
    border-bottom: 1px dashed #00a9ba
  .order-info
    padding .5em
    span 
      padding 0 .5em  
      font-size 1.14em
      color #00a9ba
      margin 1em
      display inline-block
</style>
