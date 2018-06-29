<template>
  <div class="login">
    <!-- department -->
    <div class="department">
      <div class="department-content">
        <ul class="department-list">         
          <li v-if="list" v-for="(item, index) in pageList" :key="index">
            <div @click="toSelectDoctor(index)"><span>{{item.value}}</span></div>
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
        list:[],
        pageList:[],
        rows:20,
        page:1,
        pageCount:1,
      }
    },
    created () {
      this.getData()     
    },
    mounted () {
      // 导航设置
      this.$store.commit('setMenuIdx',0)
    },
    watch: {
      page(newValue, oldValue) {
        this.getPageData()
      }
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
      getPageData () {
        var startIndex = (this.page-1)*this.rows
        var endIndex = (this.page)*this.rows
        console.log(startIndex,endIndex)
        if (this.rows <= this.total) {
          this.pageList = this.list.filter((val,index)=>{
            if(index<=endIndex && index>startIndex) {
              return true
            }
          })
        }
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
      toSelectDoctor () {
        this.$router.push({ path: 'doctor' })
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
.department
  height 100%
  overflow hidden
  position relative
.department-content
  padding 1em 0.8em
.department-list>li
  display inline-block
  width 25%
  div
    padding 0.6em
    span 
      background #fff
      color: #363171
      border-radius 8px
      font-size 2em 
      padding 0.375em 0 
      display inline-block
      width:100%
      text-align center
      font-weight 500
      letter-spacing 4px
      text-shadow 1px 1px 3px #d9dbde
      box-sizing border-box
      border-bottom 3px solid #96a3b3
      box-shadow  0px 3px 0px #84a3c2
      cursor pointer
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
.login-tip
  position absolute
  width 100%
  height 100px
  font-size 0.96em
  text-align center
  margin 2em
  span 
    padding .5em 1.5em
    border-radius 4px
    background-color #fff
    box-shadow: 1px 1px 5px #01463f
    letter-spacing 2px
.login-fail
  color #e21203
.login-ok
  color #00a200
.login-err
  color #e21203
</style>
