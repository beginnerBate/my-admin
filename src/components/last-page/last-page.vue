<template>
    <div class="last-page">
        <!-- 头部导航 + 倒计时 -->
        <div class="header-tip home-header">
            <div class="nav">
            <span class="fa fa-home" @click="close()"> 首页</span>
            </div>
            <div class="nav-time">
              <time-task @outTime='outTime'></time-task>
            </div>
        </div>
        <!-- 内容 -->
        <div class="last-page-center">
           <slot></slot>
        </div>
    </div>
</template>

<script>
import TimeTask from 'base/time-task/time-task'
export default {
    components:{
        TimeTask,
    },
    methods: {
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