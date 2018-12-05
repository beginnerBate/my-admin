<template>
  <div class="op-stepthree">
    <!-- 缴费记录 -->
    <div class="op-content" v-if="!loadFlag">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
       <div class="op-list">
         <table  v-if="tableData.length">
           <thead>
             <tr>
               <th>序号</th>
               <th>医嘱内容</th>
               <th>类别</th>
               <th>单价</th>
               <th>数量</th>
               <th>金额</th>
               <th>时间</th>
             </tr>           
           </thead>         
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
                  <th>{{item.orderInfo}}</th>
                  <th>{{item.orderType}}</th>
                  <th>{{item.price}}</th>
                  <th>{{item.number}}</th>
                  <th>{{item.amountReceivable}}</th>
                  <th>{{item.occurrenceTime|formatDate}}</th>
             </tr>
           </tbody>
         </table>
         <page  v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)' :currentPage='page'></page>
         <div class="tip-info " v-if="!tableData.length"><p>暂无医嘱缴费记录</p></div>
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
  import {jiaofeiRecord} from 'api/selfquery.js'
  import {formatDate} from 'common/js/date.js'
  export default {
    data() {
      return {
        loadFlag:true,
        title:"页面加载中...",
        rows:7,
        page:1,
        pageCount:1,
        total:0,
        list: [],
        tableData:[]
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
        jiaofeiRecord(this.token).then((res)=>{
          if(res.code == '200'){
            this.list = res.data
            this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = this.list.length
            this.getPageData() 
          }else if (res.code == '404') {
            // 没有数据
            this.list = []
          }else {
           this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
            this.toTipPage()  
          }
          this.loadFlag = false
        }).catch((err)=>{
          this.loadFlag = false
          // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
           this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

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
  padding 1em
.op-list
  margin-top: 20px
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
.tip-info p
  padding 20%
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font 
</style>
