<template>
  <div class="op-stepthree">
    <div class="op-content" v-if="!loadFlag">
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
       <div class="op-list">
         <table v-if="tableData.length">
           <thead>
             <tr>
               <th>序号</th>
               <th>医生姓名</th>
               <th>科室名称</th>
               <th>挂号类别</th>
               <th>挂号费</th>
               <th>创建时间</th>
               <th>就诊时间</th>
             </tr>
           </thead>
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
               <th>{{item.docName}}</th>
               <th>{{item.deptName}}</th>
               <th>{{item.numberType}}</th>
               <th>{{item.sumRegister}} 元</th>
               <th>{{item.createTime|formatDate}}</th>
               <th>{{item.visitTime|formatDate1}}</th>
             </tr>
           </tbody>
         </table>
         <!-- 分页 -->
         <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
          <div class="tip-info " v-if="!tableData.length"><p>暂无挂号记录</p></div>
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
  import {hisMedicalRecord} from 'api/selfquery.js'
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
      },
      formatDate1: function(value) {
        var mydate = new Date(value)
        return formatDate(mydate,'yyyy-MM-dd');
      }
    },
    methods: {
      getList() {
        this.loadFlag = true
        hisMedicalRecord(this.token).then((res)=>{
          if(res.code == "200"){
            this.list = res.data
            this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = this.list.length
            this.getPageData() 
          }else if( res.code == '404'){
            this.list = []
          }else {
            // 系统错误
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
        this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])

            this.toTipPage()   
          }
          this.loadFlag = false
        }).catch((err)=>{
          // 系统错误
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
      },
      toTipPage () {
       this.$router.push({name:"sqtippage"}) 
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.op-stepthree
  padding 1em 0.8em
.op-user-info
  padding 1em
  color $color-font
  background-color $color-a1
  border-radius 8px
  span 
    padding-right 40px
    letter-spacing 2px
    font-size 1.4em
.op-list
  padding 1em 0
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
  padding 25%
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font 
</style>
