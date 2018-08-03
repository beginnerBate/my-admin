<template>
  <div class="login">
    <!-- doctor header -->
    <div class="doctor-header" v-if='!loadflag'>
      <div class="btn left"><span>{{departName}}</span></div>
      <div class="btn right"><span><i v-if="!(flag==1)" @click="toSpecialist()" :class="{'active':type == 'specialist'}">专家</i><i v-if="!(flag==2)" @click="toOrdinary()" :class="{'active':type == 'ordinary'}">普通</i></span></div>
    </div>
    <!-- department -->
    <div class="doctor" ref="doctor" v-if='!loadflag'>
      <div class="doctor-content" ref="doctorContent">
        <ul class="doctor-list">              
          <li v-for="(item, index) in pageList" :key="index" v-if="pageList.length">
            <div>
              <span>
                <i>{{item.docName}}</i>
                <!-- 此处不能换行 -->
              </span><span>
                <i>挂号费: {{item.sumRegister}}元</i>
                </span><span><i>{{item.numberName}}</i></span><span>
                <i class="pb">下午</i>
                <i>{{item.surplusNumber|yh}}</i>
                <i class="active" @click='toDoctorinfo(item)'>挂号</i>
              </span>
            </div>
          </li>          
        </ul>
        <!-- 分页 -->
        <page :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
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
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        rows:4,
        page:1,
        pageCount:1,
        total:0,
        type:'specialist',
        pageList:[],
        flag:0,
        loadflag:true,
        title:"页面加载中..."  
      }
    },
    created () { 
      this.$store.commit('setMenuIdx',1)
    },
    mounted () {
      if (this.list.length !=0) {
        
        if (this.list.expertDocs.length == 0) {
          this.flag = 1
        }
        if (this.list.ordinaryDocs.length ==0) {
          this.flag = 2
        }
        this.getPageData()
      }
    },
    filters: {
      yh: function(value) {
        return value? '余号'+value : '不限号';
      }
    },
    watch: {
      list(value) {
        if (value.expertDocs.length == 0) {
          this.flag = 1
        }
        if (value.ordinaryDocs.length ==0) {
          this.flag = 2
        }
        this.getPageData()
      }
    },
    components:{
      Page,
      Loading
    },
    computed: {
      departName() {
        return this.$store.state.bookReg.departName
      },
      departId() {
        return this.$store.state.bookReg.departId
      },
      list () {
        return this.$store.state.bookReg.dayDoctorList
      }
    },
    methods: {
      // 获取科室医生
      getPageData() {
        this.loadflag = false
        var startIndex, endIndex;
        var mydata = []
        // 根据类型获取医生
        if (this.type=='specialist') {
          mydata = this.list.expertDocs || []
        }else if( this.type = 'ordinary') {
          mydata = this.list.ordinaryDocs || []
        }

        if (mydata.length == 0 && this.type == 'specialist') {
           mydata = this.list.ordinaryDocs || []
           this.type = 'ordinary'
        }else if (mydata.length == 0 && this.type == 'ordinary') {
           mydata = this.list.expertDocs || []
           this.type = 'specialist'
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
        this.$store.commit('setDayDoctorInfo',$event)
        this.$router.push({name:"regselectcard"})
      }
    }
  }
</script>
<style lang="stylus" scoped>
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
  padding 0.7em 0.2em
  color #fff;
  border-radius 12px
  span 
    font-size 2.1em
.btn.right
  padding 0.48em 1em
.btn.right>span
  display inline-block
  i.active
    background: #36c7fe
    color: #fff
  i
    display: inline-block;
    background: #f5f5f5;
    margin: 0 0.2em;
    padding: 0.1em 0.5em;
    border-radius: 6px;
    color: #0a3876;
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
    font-size: 1.2em
  div>span
    display inline-block
  div>span:first-child
    width 20%
    &>i:first-child
      font-size 1.4em
      padding-left 1em
    &>p
      padding-left 1.4em
    p>i:first-child
      padding-right 20px
  div>span:nth-child(2)
    font-size 1.2em
  div>span:nth-child(3)
    font-size 1.2em
    width: 20%
    text-align center
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: -21%;
    padding: 0 0.5em;
  div>span:nth-child(4)
    width: 40%
    text-align right 
    font-size: 1em;
    i 
      padding-right 30px
      font-size 1.1em
    i.pb
      color #95ca00
    i.active
      display inline-block
      text-align center
      margin 0 1em
      width 100px
      border-radius 8px
      background #ffffff
      color #0a3876
      padding 0.35em 0
      border-bottom 3px solid #9e9e9e
      box-shadow 0px 3px #607d8b
      font-size 1.2em
      background #95ca00
      color #fff
  div>span:nth-child(5)
    width 15%;
    text-align center
    vertical-align: 1.5ch;
    font-size: 1.1em;
    i 
      background green
      padding 0.35em 0.75em
      border-radius 4px
    i.on
      background #d4d4d4
.loading-wrapper
  padding-top 30%
</style>
