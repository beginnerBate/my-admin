<template>
  <div class="h-user">
    <div class="user-top">
      <h1><i class="fa fa-search" aria-hidden="true"></i> 订单信息查询</h1>
      <form autocomplete="off" @onsubmit='tosub()'>
        <div class="user-search">
          <div class="search-item">
            <input type="text" placeholder="订单编号查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="订单类型查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="支付状态查询"><label class="fa fa-search"></label>
          </div>
        </div>
      </form>
    </div>
    <div class="user-content">
      <table class="table">
        <!-- 表格头部 -->
        <thead>
          <tr>
            <th>序号</th>
            <th>订单编号</th>
            <th>订单类型</th>
            <th>总费用（元）</th>
            <th>总项数</th>
            <th>创建时间</th>
            <th>修改时间</th>
            <th>支付状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <!-- 表格数据 -->
        <tbody>
          <tr>
            <th>1</th>
            <th>01</th>
            <th>住院充值</th>
            <th>250</th>
            <th>5</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th>支付失败</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>2</th>
            <th>02</th>
            <th>挂号</th>
            <th>250</th>
            <th>5</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th>支付成功</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>3</th>
            <th>03</th>
            <th>门诊缴费</th>
            <th>250</th>
            <th>5</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th>待支付</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>4</th>
            <th>04</th>
            <th>门诊缴费</th>
            <th>250</th>
            <th>5</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th>支付失败</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
        </tbody>
        <!-- 表格底部 -->
        <tfoot>
          <tr>
            <td colspan="9"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- UserShow 用户详情页面 -->
    <order-show v-if="usershowFlag" @hide="usershowFlag=false"></order-show>
  </div>
</template>

<script>
import Page from 'base/page/page'
import orderShow from './order-show'
import {orderInfo} from 'api/order.js'
export default {
  data() {
    return {
      page:1,
      rows: 10,
      total: 0,
      orderNumber:"",
      orderTypeId:"",
      status:"",
      usershowFlag: false
    }
  },
  components: {
    Page,
    orderShow
  },
  watch: {
    pagechange(value) {
      this.page = value
      // 请求数据
    }
  },
  methods: {
    pagechange() {
      
    },
    // 获取订单列表
    getOrderInfo () {
      var mydata = {
        orderNumber:this.orderNumber,
        orderTypeId:this.orderTypeId,
        status:this.status
      }
      orderInfo(mydata,this.token).then((res)=>{
        console.log(res)
      })
    },
    // 用户详情
    userShow () {
      this.usershowFlag = true
    }
  },
}
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/table.styl'
.h-user
  margin 1em
  padding 0.5em
  border 1px solid #d7dde4
  border-radius 8px
  background #ffffff
.user-top 
  border-bottom 1px solid #c9c9c9
  h1
    border-bottom 1px solid #c9c9c9
    font-size 1.25em
    color #666
    letter-spacing 1px
    padding 0.2em 1em
.user-search
  padding .5em
.user-content
  padding 1.2em 0.5em
</style>
