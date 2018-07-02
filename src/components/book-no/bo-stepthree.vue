<template>
  <div class="op-stepthree">
    <div class="op-content">
       <div class="op-user-info">
         <p><span>姓名: XXX</span><span>门诊ID: XXXXX</span></p>
       </div>
       <div class="op-list">
         <table>
           <thead>
             <tr>
               <th>序号</th>
               <th>科室</th>
               <th>医生</th>
               <th>号别</th>
               <th>挂号费</th>
               <th>就诊时间</th>
               <th>操作</th>
             </tr>
           </thead>
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page-1)*rows +index+1}}</th>
               <th>{{item.type}}</th>
               <th>{{item.project}}</th>
               <th>{{item.num}}</th>
               <th>{{item.price}}</th>
               <th>{{item.time}}</th>
               <th><input type="checkbox" name="" id=""></th>
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
         <page :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
       </div>
    </div>
  </div>
</template>

<script>
  import Page from 'base/page/page'
  export default {
    data() {
      return {
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
      Page
    },
    methods: {
      getList() {
        for (var i = 0; i< 30; i++) {
          this.list.push({type:`内科${i}`,project:"张医生"+i+1+"",num:'普通',price:14,time:"06-26 周二 上午"})
        }
        this.pageCount = Math.ceil(this.list.length/this.rows)
        this.total = this.list.length
        this.getPageData()
      },
      pagechange($event) {
        this.page = $event
        this.getPageData()
      },
      getPageData () {
        var startIndex = (this.page-1)*this.rows
        var endIndex = (this.page)*this.rows
        if (this.rows <= this.total) {
          this.tableData = this.list.filter((val,index)=>{
            if(index<=endIndex && index>startIndex) {
              return true
            }
          })
        }
      },
      toNext() {
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
  bottom 100px
  text-align center 
  width 100%
.money-txt
  font-size 2em
  color $color-font
  i:last-child
    color $color-a8
.money-btn .btn-sub
  font-size 2em
  margin-left 50px
</style>
