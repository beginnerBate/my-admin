<template>
  <div class="login">
    <!-- doctor header -->
    <div class="con">
      <div class="btn left"><span>外科</span></div>
    </div>
    <!-- doctor-info -->
    <div class="doctor-header">
      <p class="doctor-name">张蕙兰</p>
      <p class="doctor-info"><span>主治医师</span><span>挂号费: 20元</span></p>
    </div>
    <!-- doctor 排班信息 -->
    <div class="con">
      <ul class="doctor-list">
        <li v-for="(item,index) in list" :key="index">
          <div>
            <div :class="{'over':index%2==0,'active':i==index}" @click="selectItem(index)">
              <p>06-26 周二 下午 <span>{{item.value}}</span></p>
              <span v-if="index%2==0" class="over-icon">已满</span>
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
        i:-1
      }
    },
    created () {
      this.getData()
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      getData() {
        for (var i=0;i<10;i++) {
          this.list.push({value:"余号100"})
        }
      },
      selectItem(index) {
        if (!(index%2==0)){
          this.i = index
        }
      },
      toNext() {
        if (this.i == -1) {
          return false
        }else {
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
  font-size 1.8em
  letter-spacing 2px
  color $color-font
.doctor-info
  font-size 1.2em
  letter-spacing 2px
  color $color-font 
  span 
    padding-right 1em
.doctor-list>li
  display inline-block
  width 25%
.doctor-list>li>div
  padding 0.6em 0.36em
.doctor-list>li>div>div
  background-color $color-bg1 
  padding 0.6em 0.5em
  border-radius 4px
  p
    border 1px solid
    color $color-a2
    padding 0.5em 0.4em
    font-size 0.9em
  &.active
    background $color-btn-bg
    p
      color $color-font
  &.over
    position relative
    p
      border 1px solid
      color $color-a1
    .over-icon
      position absolute
      background $color-a3
      writing-mode vertical-lr
      color $color-font
      font-size 1em
      right:0
      top:0.6em
      padding 0.12em 0em
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
</style>
