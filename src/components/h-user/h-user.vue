<template>
  <div class="h-user">
    <div class="user-top">
      <h1><i class="fa fa-search" aria-hidden="true"></i> 用户信息查询</h1>
      <form autocomplete="off" @onsubmit='tosub()'>
        <div class="user-search">
          <div class="search-item">
            <input type="text" placeholder="用户编号查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="用户名查询"><label class="fa fa-search"></label>
          </div>
          <div class="search-item">
            <input type="text" placeholder="就诊卡号查询"><label class="fa fa-search"></label>
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
            <th>用户编号</th>
            <th>用户姓名</th>
            <th>就诊卡号</th>
            <th>操作</th>
          </tr>
        </thead>
        <!-- 表格数据 -->
        <tbody>
          <tr>
            <th>1</th>
            <th>01</th>
            <th>张三</th>
            <th>38516242201</th>
            <th><span class="btn normal" @click="userShow()">详情</span></th>
          </tr>
          <tr>
            <th>1</th>
            <th>01</th>
            <th>张三</th>
            <th>38516242201</th>
            <th><span class="btn normal">详情</span></th>
          </tr>
          <tr>
            <th>1</th>
            <th>01</th>
            <th>张三</th>
            <th>38516242201</th>
            <th><span class="btn normal">详情</span></th>
          </tr>
          <tr>
            <th>1</th>
            <th>01</th>
            <th>张三</th>
            <th>38516242201</th>
            <th><span class="btn normal">详情</span></th>
          </tr>
        </tbody>
        <!-- 表格底部 -->
        <tfoot>
          <tr>
            <td colspan="5"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- UserShow 用户详情页面 -->
    <user-show v-if="usershowFlag" @hide="usershowFlag=false"></user-show>
  </div>
</template>

<script>
import Page from 'base/page/page'
import UserShow from './user-show'
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
    UserShow
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
