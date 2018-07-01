<template>
  <div class="login">
    <!-- department -->
    <div class="department">
      <div class="department-content">
        <!-- 列表 -->
        <reg-list v-if="pageList" :pageList='pageList' @selectreg='toSelectDoctor()'></reg-list>
        <!-- 分页 -->
        <page :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
      </div>
    </div>
  </div>
</template>
<script>
  import RegList from 'base/reg-list/reg-list'
  import page from 'base/page/page'
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        list:[],
        pageList:[],
        rows:20,
        page:1,
        pageCount:1,
        total:0
      }
    },
    created () {
      // 导航设置 这里适合action
      var list = JSON.stringify([{text:"选择科室"},{text:"选择医生"},{text:"支付挂号费"},{text:"完成挂号"}])
      this.$store.dispatch('pageSet',[0,'当日挂号',list])
      this.getData()     
    },
    components:{
      page,
      RegList
    },
    methods: {
      getData() {
        setTimeout(()=>{
          for (var i=0;i<110;i++) {
            this.list.push({value:`科室${i}`})
           }
           this.pageCount = Math.ceil(this.list.length/this.rows)
           this.total = this.list.length
            this.getPageData()
          },1000)
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
            if(index<=endIndex && index>startIndex) {
              return true
            }
          })
        }
      },
      toSelectDoctor () {
        this.$router.push({ name: 'choosetwo' })
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
</style>
