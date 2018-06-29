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
              </span>
              <span>
                <i>预约数: 100</i>
              </span>
              <span>
                <i>有 号</i>
              </span>
              <span>
                <i @click="toDoctorinfo()">预 约</i>
              </span>
            </div>
          </li>          
          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
              </span>
              <span>
                <i>预约数: 100</i>
              </span>
              <span>
                <i>有 号</i>
              </span>
              <span>
                <i @click="toDoctorinfo()">预 约</i>
              </span>
            </div>
          </li>          
          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
              </span>
              <span>
                <i>预约数: 100</i>
              </span>
              <span>
                <i>有 号</i>
              </span>
              <span>
                <i @click="toDoctorinfo()">预 约</i>
              </span>
            </div>
          </li>          
          <li>
            <div>
              <span>
                <i>张蕙兰</i>
                <p><i>主治医师</i> <i>挂号费: 20元</i></p>
              </span>
              <span>
                <i>预约数: 100</i>
              </span>
              <span>
                <i>有 号</i>
              </span>
              <span @click="toDoctorinfo()">
                <i>预 约</i>
              </span>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="list-footer">
          <div><span class="my-btn" :class="{'disabled':page==1}" @click="prePage()"><i>上一页</i></span></div>
          <div><span class="my-btn" :class="{'disabled':page==pageCount}" @click="nextPage()"><i>下一页</i></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rows:4,
        page:1,
        pageCount:1,
        list:[],
        specialistData:[],
        ordinaryData:[]        
      }
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
      // 获取科室医生
      getList(){
        setTimeout(()=>{
          for (var i=0;i<110;i++) {
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
        this.$router.push({path:"/doctor-info"})
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/transition.styl'
@import '~~common/stylus/pagination.styl'
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
    p>i:first-child
      padding-right 20px
  div>span:nth-child(2)
    width: 25%;
    text-align: center;
    vertical-align: 1ch;
    font-size: 1.4em;
  div>span:nth-child(3)
    width 15%;
    text-align center
    vertical-align: 1.5ch;
    font-size: 1.1em;
    i.on
      color green
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
canvas 
  background #009688
  background: linear-gradient(to bottom,  #1c4879, #1b4780, #194977)
</style>
