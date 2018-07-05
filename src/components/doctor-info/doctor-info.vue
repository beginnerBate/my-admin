<template>
  <div class="login">
    <!-- doctor header -->
    <div class="con doctor-wrapper">
      <p class="doctor-name">
        <span>{{departName}}</span>
        <span>{{bookDoctor.ysxm}}</span>
        <span class="doctor-info"><span>{{bookDoctor.docTitle}}</span><span>挂号费: {{bookDoctor.sumRegister}}元</span></span>
      </p>
    </div>
    <!-- doctor-info -->
    <!-- doctor 排班信息 -->
    <div class="con doctor-list-wrapper">
      <ul class="doctor-list">
        <li v-for="(item,index) in doctorInfo" :key="index">
          <div>
            <div :class="{'active':i==index}" @click="selectItem(index,item)">
              <p>{{item.week}}({{item.monthDay}})  <br>{{item.pb}}<br><span class="num"> {{item.surplusNumber|yh}}</span></p>
            </div>
          </div>
        </li>
      </ul>
      <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确 定</i></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[],
        i:-1,
        item:""
      }
    },
    created () {
    },
    mounted () {
    },
    filters: {
      yh: function(value) {
        return value? '余号'+value : '不限号';
      }
    },
    computed: {
      doctorInfo() {
        return this.$store.state.bookReg.doctorInfo
      },
      bookDoctor(){
        return this.$store.state.bookReg.bookDoctor
      },
      departName() {
        return this.$store.state.bookReg.departName
      }
    },
    methods: {
      selectItem(index,item) {
         this.i = index
         this.item = item
      },
      toNext() {
        if (this.i == -1) {
          this.item = ''
          return false
        }else {
          // 保存预约挂号信息
          this.$store.commit('setBooktime',{week:this.item.week,date:this.item.date,pb:this.item.pb})
          this.$router.push({path:"user-info"}) 
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.login
  height 100%
.doctor-header
  padding-left 2em
.doctor-name
  font-size 2.3em
  letter-spacing 2px
  color $color-font
  background: #92abc1;
  text-shadow: 1px 1px 7px #597898;
  border-radius 6px
  text-align: center;
  padding: 0.2em 0;
.doctor-info
  font-size 0.9em
  letter-spacing 2px
  color $color-font 
  span 
    padding-right 1em
.doctor-list-wrapper
  padding-top 0
.doctor-list>li
  display inline-block
  width 20%
.doctor-list>li>div
  padding 0.45em 0.36em
.doctor-list>li>div>div
  background-color $color-bg1 
  padding 0.6em 0.5em
  border-radius 4px
  p
    border 1px solid
    color $color-font
    padding 0.5em 0
    font-size 1.39em
    border-radius 8px
    text-align center
    .num
      padding-left 10px
      color #96c900
  &.active
    background $color-btn-bg
    p
      color $color-font
      .num
        color $color-font
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
</style>
