<template>
  <div class="login">
        <!-- 错误提示信息 -->
    <transition name="tip-fade">
      <div v-if="tipShow" class="login-tip">
        <span v-if="failShow" class="login-fail">用户名或者密码错误!</span>
        <span v-if="errShow" class="login-err">网络错误,登录超时!</span>
        <span v-if="okShow" class="login-ok">登录成功</span>
        <span v-if="Show401" class="login-ok">账号已被冻结</span>
        <span v-if="Show402" class="login-ok">账号未审核</span>
        <span v-if="Show500" class="login-ok">系统错误</span>
      </div>
    </transition>
    <!-- login -->
    <div class="login-header">
      <h1>自助终端后台管理系统</h1>
    </div>
    <div class="login-con">
      <form autocomplete="off" >
        <div class=" login-form form-item-icon">
          <label for="username" class="fa fa-user"></label><input type="text" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="login-form form-item-icon">
          <label for="password" class="fa fa-lock"></label><input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="login-form">
          <button v-if="btnShow" :disabled="!disabled" class="btn sub" @click="toLogin()" type="button">确定</button>
          <button v-if="!btnShow" class="btn sub"><i class="fa fa-spinner fa-spin fa-1x fa-fw" type="button"></i> 登录中</button>
        </div>
      </form>
    </div>
    <!-- canvas背景 -->
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
  import Round_item from 'common/js/Round_item'
  import {loginTo} from 'api/login'
  export default {
    data() {
      return {
        username: '',
        password: '',
        btnShow:true,
        failShow:false,
        errShow:false,
        okShow:false,
        Show401:false,
        Show402:false,
        Show500:false
      }
    },
    mounted () {
      this.showCanvasBackground()
    },
    computed: {
      disabled() {
        return !!this.username && !!this.password 
      },
      tipShow() {
        return this.failShow || this.errShow || this.okShow || this.Show401 || this.Show402 || this.Show402 || this.Show500
      }
    },
    methods: {
      toLogin () {
        this.btnShow = false
        var mydata = {
          username: this.username,
          password: this.password,
          exp:1
        }
        loginTo(mydata).then((res)=>{
          // 1.提示用户名或着密码错误,请重新登录,一秒之后自动消失
          if (res.code == '400') {
              this.failShow = true
              setTimeout(function(){
                this.failShow = false
              }.bind(this),1500)
              
              // 2.设置this.btnShow = true
              this.btnShow = true
//--------------------------登录成功 start------------------
          }else if (res.code== '200') {
              // 1. 提示登录成功
              this.okShow = true
              // 2. 存储登录信息
              this.$store.commit('setLoginInfo',res.token)
              // 3. 进入后台管理系统首页
              this.$router.push('/home')
//--------------------------账号已被冻结 start------------------
          }else if (res.code =='401') {
              this.Show401 = true
              setTimeout(function(){
                this.Show401 = false
              }.bind(this),1500)
              
              // 2.设置this.btnShow = true
              this.btnShow = true
//--------------------------账号未审核 start------------------            
          }else if (res.code == '402') {
              this.Show402 = true
              setTimeout(function(){
                this.Show402 = false
              }.bind(this),1500)
              
              // 2.设置this.btnShow = true
              this.btnShow = true
          }else {
              this.Show500 = true
              setTimeout(function(){
                this.Show500 = false
              }.bind(this),1500)
              
              // 2.设置this.btnShow = true
              this.btnShow = true
          }
        }).catch((err)=>{
        //  1. 提示网络超时请重新登录,一秒之后自动消失
          this.errShow = true
          setTimeout(function(){
            this.errShow = false
          }.bind(this),1500)
          
          // 2.设置this.btnShow = true
          this.btnShow = true        
        })

        
      },
      showCanvasBackground(){
        var canvas = this.$refs.canvas
        var content = canvas.getContext('2d')
        canvas.style.position = 'fixed'
        canvas.style.top = 0
        canvas.style.zIndex = -1
        // 设置高度和宽度
        var WIDTH = canvas.width = document.body.clientWidth
        var HEIGHT = canvas.height = document.body.clientHeight
        var initRoundPopulation = 40
        var round = []
        for (var i = 0; i < initRoundPopulation; i++) {
            round[i] = new Round_item(i, Math.random() * WIDTH, Math.random() * HEIGHT,content);
            round[i].draw();
        }
        animate()
        function animate() {
            content.clearRect(0, 0, WIDTH, HEIGHT);

            for (var i in round) {
                round[i].move();
            }
            requestAnimationFrame(animate)
        }
      },

    }
  }
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/transition.styl'
.login
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
  box-shadow 1px 1px 8px #007b70
  form
    display block
    padding: 1.6em 3em;
.login-form
  padding .6em 0
  input 
    width 100%
  .btn
    margin 0 auto
    display block
    width 372px
    margin-bottom 1em
canvas 
  background #009688
  background: linear-gradient(to bottom,  #009688, #00e2cd, #009688)
.login-tip
  position absolute
  width 100%
  height 100px
  font-size 0.96em
  text-align center
  margin 2em 0
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
