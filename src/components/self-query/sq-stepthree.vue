<template>
  <div class="op-stepthree">
    <div class="op-content">
       <div class="op-user-info">
         <ul class="nav-btn">
           <li v-for="(item,index) in tabs" 
           :key="index" 
           :class="{active: index == num}"
           @click="tab(index)"><span>{{item.name}}</span></li>
         </ul>
       </div>
       <div class="op-list">
         <table >
           <thead>
             <tr v-if=" num==0">
               <th>序号</th>
               <th>医嘱内容</th>
               <th>类别</th>
               <th>单价</th>
               <th>数量</th>
               <th>金额</th>
               <th>时间</th>
               <!-- <th>操作</th> -->
             </tr>  
             <tr v-if="num==1">
               <th>序号</th>
               <th>项目</th>
               <th>类别</th>
               <th>单价</th>
               <th>数量</th>
               <th>金额</th>
               <th>时间</th>
               <!-- <th>操作</th> -->
             </tr>
             <tr v-show="num==2">
               <th>序号</th>
               <th>单据号</th>
               <th>金额</th>
               <th>结算方式</th>
               <th>收款时间</th>
               <!-- <th>操作</th> -->
             </tr>           
           </thead>         
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
               <template v-if='num ==0 '>
                  <th>{{item.orderInfo}}</th>
                  <th>{{item.orderType}}</th>
                  <th>{{item.price}}</th>
                  <th>{{item.number}}</th>
                  <th>{{item.amountReceivable}}</th>
                  <th>{{item.occurrenceTime|formatDate}}</th>
                   <div class="tip-info " v-if="item"><p>暂无数据</p></div>
               </template>               
               <template v-if='num ==1 '>
                  <th>{{item.project}}</th>
                  <th>{{item.orderType}}</th>
                  <th>{{item.price}}</th>
                  <th>{{item.number}}</th>
                  <th>{{item.amountReceivable}}</th>
                  <th>{{item.occurrenceTime|formatDate}}</th>
                   <div class="tip-info " v-if="item"><p>暂无数据</p></div>
               </template>               
               <template v-if='num ==2 '>
                  <th>{{item.no}}</th>
                  <th>{{item.money}}</th>
                  <th>{{item.payType}}</th>
                  <th>{{item.settlementTime|formatDate}}</th>
                   <div class="tip-info " v-if="item"><p>暂无数据</p></div>
               </template>
             </tr>
           </tbody>
         </table>
         <page :total= 'total' :display='rows' @pagechange='pagechange($event)' class="page-wrapper" :currentPage='page'></page>
       </div>
    </div>
  </div>
</template>

<script>
  import Page from 'base/page/page'
  import {hisPayRecord} from 'api/selfquery.js'
  import {formatDate} from 'common/js/date.js'
  export default {
    data() {
      return {
        rows:6,
        page:1,
        pageCount:1,
        total:0,
        list: [],
        tableData:[],
        ischecked:'',
        checkedValue:[],
        tabs:[{name:"医嘱缴费记录",type:"orderList"},{name:"挂号缴费记录",type:"regList"},{name:"预存金充值记录",type:"preDepositList"}],
        tabContents:[],
        num:0,
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
      Page
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
    watch: {
      num(value) { 
        if (this.tabContents.length!=0) {
          this.list = this.tabContents[value]
          this.pageCount = Math.ceil(this.list.length/this.rows)
          this.total = this.list.length
          this.page = 1
          this.getPageData() 
        }      
      }
    },
    methods: {
      getList() {
        hisPayRecord(this.token).then((res)=>{
          if(res.code == "200"){
            this.tabContents[0] = res.orderList
            this.tabContents[1] = res.regList
            this.tabContents[2] = res.preDeposits
            // 根据类型判断
            this.list = this.tabContents[this.num]
            this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = this.list.length
            this.getPageData() 
          }
        }).catch((err)=>{
          console.log(err)
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
      toNext() {
        // 判断是否被选中
        if(this.checkedValue.length==0) return false
        var orderId = this.checkedValue.join(',')
        this.$router.push({name:'bostepfour'})
      },
      tab(index) {
        this.num = index
        // 分页重置
        this.page = 1
      }
    },
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
@import '~~common/stylus/navbtn.styl'
.op-stepthree
  padding 1em 0.8em
.op-user-info
  padding 1em
  color $color-font
  border-radius 8px
  overflow hidden
  p>span 
    padding-right 40px
    letter-spacing 2px
    font-size 1.4em
.op-list
  padding 1em 0
  margin-top: 1.4em;
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
</style>
