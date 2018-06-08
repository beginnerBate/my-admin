<template>
  <div class="login">
    <div class="login-header">
      <h1>自助终端后台管理系统</h1>
    </div>
    <div class="login-con">
      <form autocomplete="off">
        <div class="login-form">
          <label for="username">用户名</label><input type="text" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="login-form">
          <label for="password">密 码</label><input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="login-form">
          <button :disabled="!disabled" class="btn sub" @click="toLogin()">确定</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      disabled() {
        return !!this.username && !!this.password 
      }
    },
    methods: {
      toLogin () {
        this.$router.push('/home')
      }
    }
  }
</script>
<style lang="stylus" scoped>
.login
  background: linear-gradient(to bottom,  #3897f7, #0575e6)
  height 100%
.login-header
  overflow hidden
.login-header h1
  font-size 2.4em
  color #fafafa
  letter-spacing 6px
  margin-top 5em
  text-align center
.login-con
  width 500px
  margin-top 2em
  margin-left auto
  margin-right auto
  background #fff
  border-radius 8px
  box-shadow 1px 1px 8px #005cb9
  form
    display block
    padding: 1.6em 3em;
.login-form
  padding .8em 0
  label
    width 70px
    display inline-block
    vertical-align -0.8ex
    color #888
  input 
    // width 300px
    border-radius 4px
  .btn
    margin 0 auto
    display block
    width 120px
.tip
  position absolute
  font-size 0.8em
  color red
  margin 10px
</style>
