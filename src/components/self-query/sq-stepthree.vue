<template>
  <div class="op-stepthree">
    <div class="op-content">
       <div class="op-list" v-if="!loadFlag">
         <table >
           <thead>
             <tr>
               <th>序号</th>
               <th>项目</th>
               <th>类别</th>
               <th>单价</th>
               <th>数量</th>
               <th>金额</th>
               <th>时间</th>
               <!-- <th>操作</th> -->
             </tr>
           </thead>         
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>             
               <template>
                  <th>{{item.project}}</th>
                  <th>{{item.orderType}}</th>
                  <th>{{item.price}}</th>
                  <th>{{item.number}}</th>
                  <th>{{item.amountReceivable}}</th>
                  <th>{{item.occurrenceTime|formatDate}}</th>
                   <div class="tip-info " v-if="item"><p>暂无数据</p></div>
               </template>               
             </tr>
           </tbody>
         </table>
         <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)' :currentPage='page'></page>
       </div>
       <!-- loading -->
       <div class="loading-wrapper" v-if="loadFlag">
         <loading :title="title"></loading>
       </div>
    </div>
  </div>
</template>

<script>
  import Page from 'base/page/page'
  import Loading from 'base/loading/loading'
  import {hisPayRecord} from 'api/selfquery.js'
  import {formatDate} from 'common/js/date.js'
  export default {
    data() {
      return {
        loadFlag:true,
        title:"页面加载中...",
        rows:6,
        page:1,
        pageCount:1,
        total:0,
        list: [],
        tableData:[],
        tabContents:[],
        orderList:[],
        preDepositList:[],
        regList:[]
      }
    },
    created() {
      this.$store.commit('setMenuIdx',2)
      this.getList()
    },
    components:{
      Page,
      Loading
    },
    computed: {
      token() {
        return this.$store.state.bookReg.token 
      },
      user() {
        return this.$store.state.bookReg.user
      }
    },
    filters: {
      formatDate: function(value) {
        var mydate = new Date(value)
        return formatDate(mydate,'yyyy-MM-dd hh:mm:ss');
      }
    },
    methods: {
      toTipPage () {
        this.$router.push({name:"sqtippage"}) 
      },
      getList() {
        this.loadFlag = true
        hisPayRecord(this.token).then((res)=>{
          console.log(res)
          if(res.code == '200'){
            // this.tabContents[0] = res.orderList
            // this.tabContents[1] = res.regList
            // this.tabContents[2] = res.preDeposits
            // // 根据类型判断
            // this.list = this.tabContents[this.num]
            // this.pageCount = Math.ceil(this.list.length/this.rows)
            // this.total = this.list.length
            // this.getPageData() 
          }else if (res.code == '404') {
            // 没有数据
 
          }else {
            this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
            this.toTipPage()  
          }
          this.loadFlag = false
        }).catch((err)=>{
          this.loadFlag = false
          this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
          this.toTipPage()  
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
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
@import '~~common/stylus/navbtn.styl'
.op-stepthree
  padding 1em 0.8em
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
.loading-wrapper
  padding-top 30%
</style>
