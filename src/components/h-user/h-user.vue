<template>
  <div class="h-user">
    <div v-if="!errorCode">
        <div class="user-top">
          <h1><i class="fa fa-search" aria-hidden="true"></i> 用户信息查询</h1>
          <form autocomplete="off" @onsubmit='tosub()'>
            <div class="user-search">
              <div class="search-item">
                <input type="text" placeholder="用户编号查询" v-model="patientId"><label class="fa fa-search"></label>
              </div>
              <div class="search-item">
                <input type="text" placeholder="用户名查询" v-model="name"><label class="fa fa-search"></label>
              </div>
              <div class="search-item">
                <input type="text" placeholder="就诊卡号查询" v-model="medicalCardNumber"><label class="fa fa-search"></label>
              </div>
              <div class="search-item" style="margin-top: 26px;"><span class="btn btn-search" @click="findData()"><i class="fa fa-search"></i>查询</span></div>
              <div class="search-item" style="margin-top: 26px;"><span class="btn btn-search" @click="refreshTable()">刷新</span></div>
              <!-- <div><span class="item-label btn-refresh" @click="refreshTable()">刷新</span></div> -->
            </div>
          </form>
        </div>
        <div class="user-content">
          <table class="table" v-if="tableData.length">
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
              <tr v-for="(item, index) in tableData" :key="index">
                <th>{{(index+1)+((page-1) *rows)}}</th>
                <th>{{item.patientId}}</th>
                <th>{{item.name}}</th>
                <th>{{item.medicalCardNumber}}</th>
                <th><span class="btn normal" @click="userShow(item)">详情</span></th>
              </tr>
            </tbody>
            <!-- 表格底部 -->
            <tfoot >
              <tr>
                <td colspan="5"><page :total="total" :current-page="page" @pagechange='pagechange($event)'></page></td>
              </tr>
            </tfoot>
          </table>
          <div v-if="code404" class="tip-nodata"><p>没有相关数据</p></div>
        </div>
    </div>
    <!-- UserShow 用户详情页面 -->
    <user-show v-if="usershowFlag" @hide="usershowFlag=false" :item='item'></user-show>
    <!-- loading -->
    <div class="loading-wrapper" v-if="loading"><loading></loading></div>
    <!-- 系统错误页面 -->
    <div class="error-page" v-if="errorCode">
      <div>{{errorMsg}}</div>
    </div>
  </div>
</template>

<script>
import Page from 'base/page/page'
import UserShow from './user-show'
import Loading from 'base/loading/loading'
import {patientInfo} from 'api/patientInfo.js'
export default {
  data() {
    return {
      page:1,
      rows: 10,
      total: 0,     
      patientId:"",
      name:"",
      medicalCardNumber:"",
      tableData:[],
      loading:false,
      usershowFlag: false,
      errorCode:false,
      code404:false,
      errorMsg:'',
      item:""
    }
  },
  components: {
    Page,
    Loading,
    UserShow
  },
  computed: {
    token () {
      return this.$store.state.loginInfo
    }
  },
  created () {
    this.getPatientInfo()
  },
  methods: {
    // 请求用户信息数据
    getPatientInfo () {
      var mydata = {
        page: this.page,
        rows: this.rows,
        patientId: this.patientId,
        name: this.name,
        medicalCardNumber: this.medicalCardNumber,
      }
      // 加载之前
      this.loading = true
      patientInfo(mydata,this.token).then((res)=>{
        this.loading = false
        if (res.code == '200') {
          this.total = res.total
          this.page = res.curPage
          this.tableData = res.data
          this.code404 = false
        }else if (res.code == '404') {
          this.code404 = true
          this.tableData = []
          this.page = 0
          this.total = 0
        }else {
          this.errorMsg = '系统错误,请联系管理人员！'
          this.errorCode = true
          this.tableData = []
          this.page = 0
          this.total = 0
        }
      }).catch((err)=>{
        this.loading = false
        this.errorMsg = '网络错误,请检查网络！'
        this.errorCode = true
          this.tableData = []
          this.page = 0
          this.total = 0
      }) 

    },
    pagechange($event) {
      this.page = $event
      // 请求数据
      this.getPatientInfo()
    },
    // 查询表格
    findData () {
        this.page = 1
        this.getPatientInfo()
    },
    refreshTable () {
      this.patientId = ''
      this.name = ''
      this.medicalCardNumber = ''
      this.getPatientInfo()
    },
    // 用户详情
    userShow (item) {
      this.usershowFlag = true
      this.item = item
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
.loading-wrapper
  position: absolute;
  top: 36%;
  width: 90%;
  height: 90%;
</style>
