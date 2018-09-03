<template>
    <div class="index-page">
        <!-- 头部导航 + 倒计时 -->
        <div class="header-tip home-header">
            <div class="nav">
              <span class="fa fa-undo" @click="back()"> 返回</span> <span class="line">|</span> <span class="fa fa-home" @click="close()"> 首页</span>
            </div>
            <div class="nav-txt">
                <header>
                    <h1>{{$store.state.navTxt}}</h1>
                </header>
            </div>
            <div class="nav-time">
              <time-task @outTime='outTime'></time-task>
            </div>
        </div>
        <!-- 内容 -->
        <div class="center-content">
           <slot></slot>
        </div>
        <!-- 底部导航 -->
        <left-nav></left-nav>
    </div>
</template>

<script>
import TimeTask from 'base/time-task/time-task'
import LeftNav from 'components/left-nav/left-nav'
export default {
    components:{
        TimeTask,
        LeftNav
    },
    methods: {
      back() {
        var curRouteName = this.$router.currentRoute.name
        var myback = this.$router.currentRoute.meta.backpage
        if (myback == 'close') {
          this.close()
        }else {
          // 跳转的页面
          this.$router.push({name:myback})
        }
      },
      close(){
        this.$router.push({name:'indexpage'})      
        this.clearData()
      },
      outTime() {
        this.close()
      },
      // 清空数据
      clearData () {
        // 预存金充值金额清除
      }
    }
}
</script>