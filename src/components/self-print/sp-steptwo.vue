<template>
  <div class="self-query">
    <div v-if="(!loadflag) && (!printState)">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper" v-if="tableData.length">
        <span><i>姓名:</i> <i>{{tableData[0].name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{tableData[0].visitId}}</i></span>
      </div>
      <div class="op-list" v-if="tableData.length">
         <table>
           <thead>
             <tr>
               <th>序号</th>
               <th>检查项</th>
               <th>标本</th>
               <th>送检时间</th>
               <th>报告时间</th>
               <th>选择</th>
             </tr>
           </thead>
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
               <th>{{item.itemName}}</th>
               <th>{{item.specimen}}</th>
               <th>{{item.sendInspectionTime}}</th>
               <th>{{item.reportingTime}}</th>
               <th class="table-select">
                 <input type="checkbox" 
                 :id="'checkbox'+index" 
                 class="checkbox" 
                 :value="item"
                 v-model="checkedValue"
                 hidden
                 ><label :for="'checkbox'+index" class="labelbox"><i>√</i></label></th>
             </tr>
           </tbody>
         </table>
      </div>
      <div class="tip-info" v-if="!tableData.length">
         <p>暂无数据</p>
       </div>
      <!-- button -->
         <div class="btn-content" v-if="tableData.length">
           <div class="btn-wrapper">
             <span @click="print()"><i class="btn-sub" :class="{'disabled':checkedValue.length==0}">打 印</i></span>
           </div>
         </div>
         <!-- 分页 -->
         <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)' class="page-wrapper"></page>
    </div>
    <!-- tip -->
    <div v-if='loadflag'>
      <!-- loading -->
      <div  class='loading-wrapper'>
        <loading :title="title"></loading>
      </div> 
    </div>
    <!-- printing -->
      <div  class='loading-wrapper' v-if="printState">
        <loading :title="printTxt"></loading>
      </div> 
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import Page from 'base/page/page'
import {ItemInfos} from 'api/print.js'
  export default {
    data() {
      return {
        loadflag:true,
        title:'页面加载中...',
        printState:false,
        printTxt:"打印中,请稍等",
        rows:8,
        page:1,
        pageCount:1,
        total:0,
        list: [],
        tableData:[],
        ischecked:'',
        checkedValue:[],
        isData:'',
        nodata:'' 
      }
    },
    created() {
      this.getdata()
    },
    watch: {
      list(value) {
        if (value) {
          this.checkedValue = value
        }
      }
    },
    components: {
      Loading,
      Page
    },
    computed:{
      jzId() {
        return this.$store.state.bookReg.jzId
      }
    },
    methods: {
      toTipPage () {
        this.$router.push({name:"sptippage"})
      },
      getdata() {
        this.loadflag = true
        var that = this
        ItemInfos(this.jzId).then((res)=>{
          that.loadflag = false
          if (res.code ==200) {
            // 请求成功
            this.list = res.listPrintInfos
            this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = this.list.length
             this.getPageData()
          }else if(res.code == 404) {
            // 没有数据
            that.tableData = []
          }else {
            // 系统错误
            that.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
            that.toTipPage()
          }
        }).catch((err)=>{
          that.loadflag = false
          that.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
          that.toTipPage()
        })
      },
      pagechange($event) {
        this.page = $event
        this.getPageData()
      },
      getPageData () {
        var startIndex = (this.page-1)*this.rows
        var endIndex = (this.page)*this.rows
        this.tableData = this.list.filter((val,index)=>{
            if(index<endIndex && index>=startIndex) {
              return true
            }
          })
      },
      print() {
        if (this.checkedValue.length == 0) return 0
        var postData = JSON.stringify(this.checkedValue)
        var mydata;
        this.printState = true
        if (typeof  SharpForeign.Print_ShenHuaCheckProject == 'function') {
          var mydata = JSON.parse(SharpForeign.Print_ShenHuaCheckProject(postData)) 
            if (mydata.code ==200) {
              // 打印完成
              this.printState = false
              this.$store.commit('setRegbookTip','打印成功')
              this.toTipPage()
            }else{
              this.printState = false
              this.$store.commit('setRegbookTip','打印失败')
              this.toTipPage()
            }
        }
       
      }
    },
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.self-query
  padding 1em
.op-list
  // padding 1em
  margin-top 20px
table
  width 100%
  thead
    background-color $color-a1
    font-size 1.4em
    tr
      border 2px solid $color-a5
    tr>th
      padding 0.4em 0
      color $color-font
      border-left 1px solid $color-a5
  tbody
    font-size 1.1em
    color $color-a7
    tr
      border 1px solid $color-a1
      background #fff
    tr>th
      padding 0.5em 0      
      font-size 1.2em
      border-left 1px solid $color-a1
    tr:nth-of-type(2n+1)
      background #fafafa
.table-select
  position relative
.tip-info p
  padding 25%
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font 
.btn-wrapper
  text-align center
  position absolute
  bottom 15px
  right 0 
  width 40%
  .btn-sub
    font-size 2em
</style>
