<template>
  <div class="login">
    <div class="con">
      <!-- 读取信息 -->
      <div class="user-info">
        <img src="./user-info.gif" alt="">
      </div>
      <!-- 用户信息 -->
      <!-- button -->
      <div class="button-wrapper">
        <p>请在自助机指示区域放入已绑定就诊ID的卡进行身份验证!</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[],
        i:1
      }
    },
    created () {
      this.$store.commit('setMenuIdx',1)
      this.getData()
    },
    mounted () {
      setTimeout(()=>{
          this.$router.push({path:'info-confirm'})
      },3000)
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
        this.$router.push({path:"info-confirm"})
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
.user-info
  padding-top 2em
  text-align center
  img 
    background #ffffff
    border-radius 18px
.button-wrapper
  text-align center
  padding-top 1em
  color $color-font
  letter-spacing 2.5px
  font-size 1.2em
</style>
