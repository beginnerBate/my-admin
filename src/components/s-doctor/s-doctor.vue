<template>
  <div class="login">
    <!-- doctor header -->
    <div class="doctor-header">
      <div class="btn left"><span>{{name}}</span></div>
      <div class="btn right"><span>
        <i @click="toSpecialist()" :class="{'active':type == 'specialist'}">专家</i><i>/</i><i @click="toOrdinary()" :class="{'active':type == 'ordinary'}">普通</i></span></div>
    </div>
    <!-- department -->
    <div class="doctor" ref="doctor">
      <div class="doctor-content" ref="doctorContent">
        <ul class="doctor-list">         
          <li v-for="(item, index) in pageList" :key="index" v-if="pageList.length">
            <div>
              <span>
                <i>{{item.ysxm}}</i>
              </span>
              <span>
                <i>{{item.docTitle}}</i>
              </span>
              <span>
                <i>挂号费: {{item.sumRegister}}元</i>
              </span>
              <span>
                <i @click="toDoctorinfo(item)">预 约</i>
              </span>
            </div>
          </li>          
        </ul>
        <!-- 分页 -->
        <page :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from 'base/page/page'
  import {getDepartmentDocs} from 'api/guahao.js'
  export default {
    data() {
      return {
        rows:4,
        page:1,
        pageCount:1,
        total:0,
        type:'specialist',
        pageList:[],     
      }
    },
    created () {
      this.pageList = []   
      this.$store.commit('setMenuIdx',1)
    },
    mounted () {
      this.getPageData()
    },
    watch: {
      list(newValue, oldValue) {
        this.getPageData()
      }
    },
    components:{
      Page
    },
    computed: {
      name() {
        return this.$store.state.bookReg.departName
      },
      departId() {
        return this.$store.state.bookReg.departId
      },
      list () {
        return this.$store.state.bookReg.doctorList
      }
    },
    methods: {
      // 获取科室医生
      getPageData() {
        var startIndex, endIndex;
        var mydata = []
        // 根据类型获取医生
        if (this.type=='specialist') {
          mydata = this.list.expertDocsList || []
        }else if( this.type = 'ordinary') {
          mydata = this.list.ordinaryDocsList || []
        }
        this.total = mydata.length 

        startIndex = (this.page-1)*this.rows
        endIndex = (this.page)*this.rows

        this.pageList = mydata.filter((val,index)=>{
              if(index < endIndex && index>=startIndex) {
                return true
              }
          })
      },
      toSpecialist(){
        this.type = 'specialist'
        this.page = 1
        this.getPageData()
      },
      toOrdinary(){
        this.type = 'ordinary'
        this.page = 1
        this.getPageData()
      },
      // 分页获取数据
      pagechange($event) {
         this.page = $event
         this.getPageData()
      },
      toDoctorinfo($event) {
        $event.departId = this.departId
        this.$store.dispatch('getBookDoctorsInfo',$event)
        this.$router.push({path:"/doctor-info"})
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/transition.styl'
@import '~~common/stylus/pagination.styl'
.login
  height 100%
.doctor-header
  padding 1em 0.8em
  overflow hidden
.btn
  min-width 213px
  display inline-block
  background #8ba5bc
  background: linear-gradient(to top, #92abc1, #8ba5bc, #8ba5bc, #8ba5bc)
  letter-spacing 4px
  text-align center
  padding 0.7em 1em
  color #fff;
  border-radius 12px
  span 
    font-size 2.1em
.btn.right>span
  background #e8edf1
  display inline-block
  width 100%
  border-radius 12px
  i.active
    color:#ff6666  
  i:nth-child(2)
    color:#678784
  i
    color:#989ba0
.doctor
  height calc(100% - 100px)
  overflow hidden
.doctor-content
  padding 1em 0.8em
.doctor-list>li
  margin  0.8em 0
  div
    background #607f9e
    border-radius 6px
    padding 0.6em
    color #ffffff
  div>span
    display inline-block
  div>span:first-child
    width 20%
    padding-left 40px
    &>i:first-child
      font-size 1.4em
    p>i:first-child
      padding-right 20px
  div>span:nth-child(2)
    width: 25%;
    font-size: 1.1em;
  div>span:nth-child(3)
    width 30%;
    font-size: 1.4em;
  div>span:nth-child(4)
    width 15%;
    text-align center
    font-size: 1.1em;
    i 
      background #36c7fe
      padding 0.35em 0.75em
      border-radius 4px
      display inline-block
</style>
