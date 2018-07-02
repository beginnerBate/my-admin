<template>
  <div class="login">
    <!-- doctor header -->
    <div class="doctor-header">
      <div class="btn left"><span>外科</span></div>
      <div class="btn right"><span><i @click="toSpecialist()">专家</i><i>/</i><i @click="toOrdinary()">普通</i></span></div>
    </div>
    <!-- department -->
    <div class="doctor" ref="doctor">
      <div class="doctor-content" ref="doctorContent">
        <ul class="doctor-list">         
          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
                <!-- 此处不能换行 -->
              </span><span>
                <i>上午</i>
                <i>下午</i>
                <i>余号:100</i>
                <i class="disabled">未开放</i>
              </span>
            </div>
          </li>          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
                <!-- 此处不能换行 -->
              </span><span>
                <i class="active">上午</i>
                <i>下午</i>
                <i>余号:100</i>
                <i class="active" @click='toDoctorinfo'>预约</i>
              </span>
            </div>
          </li>          
          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
                <!-- 此处不能换行 -->
              </span><span>
                <i>上午</i>
                <i>下午</i>
                <i>余号:100</i>
                <i class="disabled">未开放</i>
              </span>
            </div>
          </li>          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
                <!-- 此处不能换行 -->
              </span><span>
                <i>上午</i>
                <i>下午</i>
                <i>余号:100</i>
                <i class="disabled">未开放</i>
              </span>
            </div>
          </li>          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
                <!-- 此处不能换行 -->
              </span><span>
                <i>上午</i>
                <i>下午</i>
                <i>余号:100</i>
                <i class="disabled">未开放</i>
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
  export default {
    data() {
      return {
        rows:5,
        page:1,
        pageCount:1,
        total:5,
        list:[],
        specialistData:[],
        ordinaryData:[]        
      }
    },
    components:{
      Page
    },
    created () {
      this.$store.commit('setMenuIdx',1)
      this.getList()
    },
    mounted () {
    },
    computed: {
      tipShow() {
        return this.failShow
      }
    },
    methods: {
      //
      pagechange($event) {
        this.page = $event
      },
      // 获取科室医生
      getList(){
        setTimeout(()=>{
          for (var i=0;i<6;i++) {
            this.list.push({value:i})
           }
           this.pageCount = Math.ceil(this.list.length/this.rows)
           this.total = this.list.length
          //  this.getPageData()
          },1000)
      },
      toSpecialist(){
        
      },
      toOrdinary(){

      },
      nextPage() {
        if (this.page<this.pageCount) {
          this.page++
        }
      },
      prePage() {
        if (this.page>1) {
          this.page--
        }
      },
      toDoctorinfo() {
        this.$router.push({name:"getinfo"})
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
.login
  height 100%
.doctor-header
  padding 1em 0.8em
  overflow hidden
.btn
  width 213px
  display inline-block
  background #8ba5bc
  background: linear-gradient(to top, #92abc1, #8ba5bc, #8ba5bc, #8ba5bc)
  letter-spacing 4px
  text-align center
  padding 0.7em 0
  color #fff;
  border-radius 12px
  span 
    font-size 2.1em
.btn.right>span
  background #e8edf1
  display inline-block
  width 100%
  border-radius 12px
  i:first-child
    color:#cf1810  
  i:nth-child(2)
    color:#678784
  i:nth-child(3)
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
    width 40%
    &>i:first-child
      font-size 1.4em
      padding-left 1em
    &>p
      padding-left 1.4em
    p>i:first-child
      padding-right 20px
  div>span:nth-child(2)
    width: 60%;
    vertical-align: 1em;
    font-size: 1em;
    i
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
    i.disabled
      background #e4e4e4
    i.active
      background #95ca00
      color #fff
  div>span:nth-child(4)
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
</style>
