<template>
  <div class="op-stepthree">
    <div class="op-content">
       <div class="op-user-info">
         <p><span>姓名: {{user.name}}</span><span>就诊卡号: {{user.jzId}}</span></p>
       </div>
       <div class="op-list">
         <table>
           <thead>
             <tr>
               <th>序号</th>
               <th>消费类型</th>
               <th>消费名称</th>
               <th>消费金额</th>
               <th>消费时间</th>
               <th>操作</th>
             </tr>
           </thead>
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
               <th>{{item.deptName}}</th>
               <th>{{item.docName}}</th>
               <th>{{item.numberType}}</th>
               <th>{{item.sumRegister}}</th>
               <th>{{item.vistTime}}</th>
               <th><span>详情</span></th>
             </tr>
           </tbody>
         </table>
         <!-- 总计 -->
         <div class="money-content">
           <div class="money-wrapper">
             <span class="money-btn" @click="toNext()"><i class="btn-sub">打 印</i></span>
           </div>
         </div>
         <!-- 分页 -->
         <page :total= 'total' :display='rows' @pagechange='pagechange($event)' class="page-wrapper"></page>
       </div>
    </div>
  </div>
</template>

<script>
  import Page from 'base/page/page'
  import {hisPayRecord} from 'api/selfquery.js'
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
        checkedValue:[]
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
    methods: {
      getList() {
        hisPayRecord(this.token).then((res)=>{
          console.log(res)
          if(res.code == "200"){
            this.list = res.data
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
      }
    },
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
.page-wrapper
  width 55% !important
</style>
