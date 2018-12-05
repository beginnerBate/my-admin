<template>
  <div class="home">
    <header-tip></header-tip>
      <router-view></router-view>
    <footer-tip></footer-tip>
  </div>
</template>
<script>
  import LeftNav from 'components/left-nav/left-nav'
  import TimerTask from 'base/time-task/time-task'
  import HeaderTip from 'base/header-tip/header-tip'
  import FooterTip from 'base/footer-tip/footer-tip'
  export default {
    components: {
      LeftNav,
      TimerTask,
      FooterTip,
      HeaderTip
    },
    watch: {
      '$route'(value) {
      }
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
        that.$store.commit('setAutoFlag',true)
        this.$router.push({name:'indexpage'})      
        this.clearData()
      },
      outTime() {
        this.close()
      },
      // 清空数据
      clearData () {
        // 预存金充值金额清除
        this.$store.commit('setPdtotalCost','')
        // 当日挂号
        this.$store.dispatch('getDayDocotorList','')
        this.$store.commit('setDayDoctorInfo','')
        this.$store.commit('setCardType','')
        this.$store.dispatch('getUserInfo','')
        // 自助打印
        this.$store.commit('setJzId','')
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
.home
  background url('./home_bg.png') no-repeat 
  background-size cover
  height 100%;
  width 100%;
  overflow hidden
</style>
