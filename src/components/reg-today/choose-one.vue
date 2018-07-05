<template>
  <div class="login">
    <!-- department -->
    <div class="department">
      <div class="department-content">
        <!-- 列表 -->
        <reg-list v-if="pageList" :pageList='pageList' @selectreg='toSelectDoctor($event)'></reg-list>
        <!-- 分页 -->
        <page :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
      </div>
    </div>
    <!-- 系统错误 -->
    <p v-if="err">{{err}}</p>
  </div>
</template>
<script>
  import RegList from 'base/reg-list/reg-list'
  import page from 'base/page/page'
  import {getOutpatients} from 'api/guahao.js'
  export default {
    data() {
      return {
        list:[],
        pageList:[],
        rows:16,
        page:1,
        pageCount:1,
        total:0,
        err:''
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
      RegList
    },
    methods: {
      getData() {
        var that = this
        getOutpatients().then(function(data){
          if (data.code == '200'){
            that.list = data.data
            that.pageCount = Math.ceil(that.list.length/that.rows)
            that.total = that.list.length
            that.getPageData()
          }
        }).catch(function(err){
          console.log(err)
          that.err = '系统错误'
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
        console.log($event)
        // 提交action 获取数据 提交action
        this.$store.dispatch('getDayDocotorList',$event)
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
