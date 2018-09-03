<template>
  <div>
    <div>
      <!-- 今日日期 -->
      <div class="today-info"><span><i>日期: </i> <i>{{date|formatDate1}}</i></span> <span><i>费用总计: </i> <i class="money">{{totalCost}}元</i></span></div>
      <div class="op-list">
         <table v-if="tableData.length">
           <thead>
             <tr>
               <th>序号</th>
               <th>项目名称</th>
               <th>费用类型</th>
               <th>单价(元)</th>
               <th>数量</th>
               <th>小计(元)</th>
               <th>时间</th>
             </tr>
           </thead>
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
               <th>{{item.itemName}}</th>
               <th>{{item.feeType}}</th>
               <th>{{item.unitPrice}}</th>
               <th>{{item.number}}</th>
               <th>{{item.totalCost}}</th>
               <th>{{item.occuredTime|formatDate}}</th>
               <!-- <th>{{item.visitTime|formatDate1}}</th> -->
             </tr>
           </tbody>
         </table>
         <!-- 分页 -->
         <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
          <div class="tip-info " v-if="!tableData.length && !loadFlag"><p>没有住院清单记录</p></div>
       </div>
    </div>
    <!-- loading -->
    <div class="loading-wrapper" v-if="loadFlag">
      <loading :title="title"></loading>
    </div>
  </div>
</template>

<script>
import Page from 'base/page/page'
import Loading from 'base/loading/loading'
import {formatDate} from 'common/js/date.js'
import {todayInfo,systemTime} from 'api/user'
export default {
    data() {
      return {
        loadFlag:true,
        title:"数据加载中...",
        rows:5,
        page:1,
        pageCount:1,
        total:0,
        list: [],
        tableData:[],
        date:"",
        totalCost:""
      }
    },
    components:{
      Loading,
      Page
    },
    computed: {
      token() {
        return this.$store.state.bookReg.token
      }
    },
    created() {
      // 导航设置 这里适合action
      this.$store.dispatch('childPage',[2,'当日住院清单'])
      this.getData()
      // 获取服务器时间
      this.getTime()
    },
    filters: {
      formatDate: function(value) {
        var mydate = new Date(value)
        return formatDate(mydate,'yyyy-MM-dd hh:mm:ss');
      },
      formatDate1: function(value) {
        var mydate = new Date(value)
        return formatDate(mydate,'yyyy-MM-dd');
      }
    },
    methods: {
      getTime () {
        systemTime().then((res)=>{
          if(res.code == 200) {
            this.date = res.data
          }
        })
      },
      getData () {
        this.loadFlag = true
        todayInfo(this.token,{startTime:"0",endTime:"0"}).then((res)=>{
          console.log(res)
          if (res.code == 200) {
            // 有数据
            this.list = res.data
            this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = this.list.length
            this.getPageData()   
            this.totalCost = res.total
          }else if (res.code == 404){
            // 没有消费记录
             this.list = []
            // this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = 0  
            this.page = 1 
            this.tableData = []
            this.totalCost = 0
          }else {
            // 系统错误
            this.$store.dispatch('setTipPage',['系统错误!','error'])    
            this.$router.push({name:"infopage"})        
          }
          this.loadFlag = false
        }).catch((err)=>{
          this.loadFlag = false
            this.$store.dispatch('setTipPage',['系统错误!','error'])    
            this.$router.push({name:"infopage"}) 
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
    }
}
</script>
<style lang="stylus">
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
// .today-info
//   background: white;
//   padding: 16px 0;
//   box-shadow: 1px 1px 5px #d4d4d4;
//   border-radius: 4px;
//   font-size: 18px;
//   color: #555;
//   span 
//     padding 0 20px
.op-list
  padding 1em 0
table
  width 100%
  thead
    background-color $color-a2
    font-size 1.3em
    tr
      border 1px solid $color-a3
    tr>th
      padding 0.4em 0
      color $color-font
      border-left 1px solid $color-a3
  tbody
    font-size 1em
    color $color-a7
    tr
      border 1px solid $color-a3
      background #fff
    tr>th
      padding 1.5em 0      
      font-size 1em
      border-left 1px solid $color-a3
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