<template>
  <div class="h-user">
    <div class="user-top">
      <h1><i class="fa fa-search" aria-hidden="true"></i> 缴费信息查询</h1>
      <form autocomplete="off" @onsubmit='tosub()'>
        <div class="user-search">
          <div class="search-item">
            <input type="text" placeholder="缴费编号查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="支付类型查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="用户姓名查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="订单编号查询"><label class="fa fa-search"></label>
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
            <th>缴费编号</th>
            <th>用户姓名</th>
            <th>收费项目</th>
            <th>项目明细</th>
            <th>数量</th>
            <th>计算单位</th>
            <th>单价（元）</th>
            <th>应收金额(元)</th>
            <th>实收金额</th>
            <th>发生时间</th>
            <th>修改时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <!-- 表格数据 -->
        <tbody>
          <tr>
            <th>1</th>
            <th>01</th>
            <th>张三</th>
            <th>xxx口服液</th>
            <th>xxx明细</th>
            <th>5</th>
            <th>盒</th>
            <th>12</th>
            <th>60</th>
            <th>60</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>2</th>
            <th>02</th>
            <th>张三</th>
            <th>xxx口服液</th>
            <th>xxx明细</th>
            <th>5</th>
            <th>盒</th>
            <th>12</th>
            <th>60</th>
            <th>60</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>3</th>
            <th>03</th>
            <th>张三</th>
            <th>xxx口服液</th>
            <th>xxx明细</th>
            <th>5</th>
            <th>盒</th>
            <th>12</th>
            <th>60</th>
            <th>60</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>4</th>
            <th>04</th>
            <th>张三</th>
            <th>xxx口服液</th>
            <th>xxx明细</th>
            <th>5</th>
            <th>盒</th>
            <th>12</th>
            <th>60</th>
            <th>60</th>
            <th>2018-5-02 12:12:44</th>
            <th>2018-5-02 12:12:44</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
        </tbody>
        <!-- 表格底部 -->
        <tfoot>
          <tr>
            <td colspan="13"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- payment-show 用户详情页面 -->
    <payment-show v-if="usershowFlag" @hide="usershowFlag=false"></payment-show>
  </div>
</template>

<script>
import Page from 'base/page/page'
import paymentShow from './payment-show'
export default {
  data() {
    return {
      page:1,
      row: 10,
      total: 10,
      usershowFlag: false
    }
  },
  components: {
    Page,
    paymentShow
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
