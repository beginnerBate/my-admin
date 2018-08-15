<template>
  <div class="op-stepthree">
    <div class="op-content" v-if='!loadflag'>
      <!-- 用户信息 -->
      <div class="myuser-info info-wrapper">
        <span><i>姓名:</i> <i>{{user.name}}</i> </span>
        <span><i>就诊卡号:</i> <i>{{user.jzId}}</i></span>
      </div>
      <div class="op-list" v-if="isData == true">
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
               <th>{{item.deptName}}</th>
               <th>{{item.docName}}</th>
               <th>{{item.numberType}}</th>
               <th>{{item.sumRegister}}</th>
               <th>{{item.vistTime}}</th>
               <th class="table-select">
                 <input type="checkbox" 
                 :id="'checkbox'+index" 
                 class="checkbox" 
                 :value="item"
                 v-model="checkedValue"
                 ><label :for="'checkbox'+index" class="labelbox"><i>√</i></label></th>
             </tr>
           </tbody>
         </table>
         <!-- 总计 -->
         <div class="money-content">
           <div class="money-wrapper">
             <span class="money-btn" @click="toNext()"><i class="btn-sub" :class="{'disabled':checkedValue.length==0}">打 印</i></span>
           </div>
         </div>
         <!-- 分页 -->
         <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)' class="page-wrapper"></page>
       </div>
      <div class="tip-info" v-else>
         <p>{{nodata}}</p>
       </div>
    </div>
    <!-- loading -->
    <div v-if='loadflag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div> 
  </div>
</template>

<script>
  import Page from 'base/page/page'
  import {numberInfoList} from 'api/bookno.js'
  import Loading from 'base/loading/loading'
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
        loadflag:true,
        title:"页面加载中...",
        isData:'',
        nodata:''  
      }
    },
    created() {
      this.$store.commit('setMenuIdx',2)
      this.getList()
      // 默认全选
    },
    watch: {
      list(value) {
        if (value) {
          this.checkedValue = value
        }
      }
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
    methods: {
      toTipPage () {
        this.$router.push({name:"botippage"}) 
      },
      getList() {
        this.loadflag = true
        numberInfoList(this.token).then((res)=>{
          this.loadflag = false
          if(res.code == "200"){
            this.isData = true
            this.list = res.data
            this.pageCount = Math.ceil(this.list.length/this.rows)
            this.total = this.list.length
            this.getPageData() 
          }else if(res.code =='404') {
            this.isData = false
            // 无数据
            this.list = []
            this.nodata = '暂无挂号信息'
          }else {
            this.$store.commit('setRegbookTip','系统错误, 请到柜台处理')
            this.toTipPage()
          }
        }).catch((err)=>{
          this.loadflag = false
          this.$store.commit('setRegbookTip','系统错误, 请到柜台处理')
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
      toNext() {
        // 判断是否被选中
        if(this.checkedValue.length==0) return false
        // 存储打印预约取号信息
        this.$store.commit('setBookNumber', this.checkedValue)
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
.table-select
  position relative
.money-content
  position absolute
  bottom 10px
  text-align center 
  width 40%
  right 0
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
