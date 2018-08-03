<template>
  <div class="op-stepthree">
    <div class="op-content" v-if="!flag">
      <!-- 用户信息 -->
      <div class="myuser-info">
        <span><i>姓名</i>: <i>{{user.name}}</i></span>
        <span><i>就诊卡号</i>: <i>{{user.jzId}}</i></span>
      </div>
       <div class="op-list" v-if="tableData.length">
         <table>
           <thead>
             <tr>
               <th>序号</th>
               <th>类别</th>
               <th>项目</th>
               <th>数量</th>
               <th>单价</th>
               <th>小计</th>
             </tr>
           </thead>
           <!-- 数据渲染 -->
           <tbody>
             <tr v-for='(item,index) in tableData' :key="index">
               <th>{{(page -1)*rows +index+1}}</th>
               <th>{{item.orderType}}</th>
               <th>{{item.project}}</th>
               <th>{{item.number}}</th>
               <th>{{item.price}}</th>
               <th>{{item.amountReceivable}}</th>
             </tr>
           </tbody>
         </table>
         <!-- 总计 -->
         <div class="money-content">
           <div class="money-wrapper">
             <span class="money-txt"><i>总费用:</i><i>￥{{totalCost}}元</i></span>
             <span class="money-btn" @click="toNext()"><i class="btn-sub">支 付</i></span>
           </div>
         </div>
         <!-- 分页 -->
         <div class="page-wrapper">
           <page :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
         </div>
         
       </div>
       <div class="tip-info" v-if="!tableData.length">
         <p>暂无缴费项目</p>
       </div>
    </div>
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>

<script>
  import Page from 'base/page/page'
  import Loading from 'base/loading/loading'
  import {payProjectList} from 'api/outpatient'
  import {outpatientOrder} from 'api/outpatient'
  export default {
    data() {
      return {
        rows:6,
        page:1,
        pageCount:1,
        totalCost:'',
        list: [],
        tableData:[],
        total:0,
        flag:false,
        title:"页面加载中..."
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
      user() {
        return this.$store.state.bookReg.user 
      },
      token() {
        return this.$store.state.bookReg.token
      }
    },
    methods: {
      toTipPage () {
       this.$router.push({name:"optippage"}) 
      },
      getList() {
        this.flag = true
        payProjectList(this.token).then((res)=>{
           if (res.code == 200) {
             this.flag = false
             this.list = res.data.docList
             this.totalCost = res.data.totalCost
             this.pageCount = Math.ceil(this.list.length/this.rows)
             this.total = this.list.length
             this.getPageData()
            // 设置总费用
            this.$store.commit('setTotalCost',res.data.totalCost)
           }
        }).catch((err)=>{
          
        })

      },
      pagechange($event) {
        this.page = $event
        this.getPageData()
      },
      getPageData () {
        var startIndex = (this.page-1)*this.rows
        var endIndex = (this.page)*this.rows
        console.log(this.list)
          this.tableData = this.list.filter((val,index)=>{
            if(index<endIndex && index>=startIndex) {
              return true
            }
          })
      },
      toNext() {
        this.createOrder()
      },
      createOrder() {
        var that = this
        this.flag = true
        outpatientOrder(this.token).then(function(res){
          if (res.code == 200) {
            // 订单创建成功
            // 保存orderId
            that.$store.commit('setorderId',res.orderId)
            that.$router.push({name:'opstepfour'})
          }else if(res.code == 'AF401') {
            console.log('认证失败')
          }
        }).catch(function(res){
          console.log(res)
        }) 
      }
    },
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.op-stepthree
  padding 1em 0.8em
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
  text-align right 
  right 2em
.money-txt
  font-size 2em
  color $color-font
  i:last-child
    color $color-a8
.money-btn .btn-sub
  font-size 2em
  margin-left 50px
.page-wrapper
  position relative
  width 60%
  .list-footer
    bottom auto
.tip-info p
  padding 25%
  text-align center
  font-size 1.8em
  letter-spacing 4px
  color $color-font 
.loading-wrapper
  padding-top 30%
</style>
