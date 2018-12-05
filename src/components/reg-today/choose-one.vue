<template>
  <div class="login">
    <!-- department -->
    <div class="department"  v-if='!flag'>
      <div class="department-content">
        <!-- 列表 -->
        <reg-list v-if="pageList" :pageList='pageList' @selectreg='toSelectDoctor($event)'></reg-list>
        <!-- 分页 -->
        <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
      </div>
    </div>
    <!-- loading -->
    <div v-if='flag' class='loading-wrapper'>
      <loading :title="title"></loading>
    </div>
  </div>
</template>
<script>
  import RegList from 'base/reg-list/reg-list'
  import page from 'base/page/page'
  import {getOutpatients} from 'api/guahao.js'
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        list:[],
        pageList:[],
        rows:16,
        page:1,
        pageCount:1,
        total:0,
        err:'',
        flag:false,
        title:"页面加载中..."
      }
    },
    created () {
      // 导航设置 这里适合action
      var list = JSON.stringify([{text:"选择科室"},{text:"选择医生"},{text:"支付挂号费"},{text:"完成挂号"}])
      this.$store.dispatch('pageSet',[0,'当日挂号',list])
      this.getData() 
      // 清空预约医生
      this.$store.commit('setDayDoctorList',[])  
    },
    components:{
      page,
      RegList,
      Loading
    },
    methods: {
      toTipPage () {
        this.$router.push({name:"rttippage"}) 
      },
      getData() {
        var that = this
        this.flag = true
        getOutpatients().then((data)=>{
          if (data.code == '200'){
            that.flag = false
            that.list = data.data
            that.pageCount = Math.ceil(that.list.length/that.rows)
            that.total = that.list.length
            that.getPageData()
          }else if (res.code == '404') {
            // 无数据
            // this.$store.commit('setRegbookTip','没有可挂号科室!')
            this.$store.dispatch('setTipPage',['没有可挂号科室, 请到柜台处理!','warning'])            
            this.toTipPage()  
          }else {
            // 系统错误
            // this.$store.commit('setRegbookTip','系统错误,请到柜台处理!')
            this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])            

            this.toTipPage()  
          }
        }).catch((err)=>{
          // 网络错误
          console.log(err)
            this.$store.dispatch('setTipPage',['系统错误, 请到柜台处理!','error'])           
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
        if (this.rows <= this.total) {
          this.pageList = this.list.filter((val,index)=>{
            if(index<endIndex && index>=startIndex) {
              return true
            }
          })
        }
      },
      toSelectDoctor ($event) {
        // 提交action 获取数据 提交action
        this.$store.dispatch('getDayDocotorList',$event)
        this.$store.commit('setBackFlag','choosetwo')
        this.$router.push({ name: 'choosetwo'})
      },
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/transition.styl'
.login
  height 100%
.department
  height 100%
  overflow hidden
  position relative
.department-content
  padding 1em 0.8em
  padding-top 0.2em
</style>
