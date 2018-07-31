<template>
  <div class="h-user">

        <!-- 错误提示信息 -->
    <transition name="tip-fade">
      <div v-if="tipShow" class="login-tip">
        <span v-if="code200" class="login-ok">密码修改成功,请重新登录</span>
        <span v-if="code400" class="login-err">原密码不正确</span>
        <span v-if="code401" class="login-err">修改失败</span>
        <span v-if="code500" class="login-err">系统错误</span>
        <span v-if="codeAF401" class="login-err">登录失效,请重新登录</span>
        <span v-if="netErr" class="login-err">网络连接失败,请检查网络</span>
      </div>
    </transition>
    <div class="user-top">
      <h1><i class="fa fa-edit" aria-hidden="true"></i> 修改密码</h1>
    </div>
    <div class="user-content">
      <div class="form-item-icon">
        <label  class="fa fa-lock"></label><input type="password" placeholder="请输入原密码" autocomplete="off" v-model="oldValue">
      </div>
      <div class="form-item-icon">
        <label  class="fa fa-lock"></label><input type="password" placeholder="请输入新密码" autocomplete="off" v-model="newValue">
      </div>
      <div class="form-item-icon">
        <label  class="fa fa-lock"></label><input type="password" placeholder="请确认新密码" autocomplete="off" v-model="newValueAgain">
        <span class="error-info" v-if="!isEqual">两次密码不一致</span>
      </div>
      <div class="form-item-icon">
        <button v-if="btnShow" class="btn sub" :disabled="!disabled" @click="toModify()" >确认修改</button>
        <button v-if="!btnShow" class="btn sub"><i class="fa fa-spinner fa-spin fa-1x fa-fw" type="button"></i> 修改中</button>
      </div>
    </div>
  </div>
</template>

<script>
import check from 'common/js/checkObject'
import {updatePassword} from 'api/login'
export default {
  data() {
    return {
      oldValue: '',
      newValue: '',
      newValueAgain: '',
      isEqual:true,
      btnShow:true,
      code200:false,
      code400:false,
      code401:false,
      code500:false,
      codeAF401:false,
      netErr:false
    }
  },
  computed: {
    disabled() {
      return !!this.oldValue && !!this.newValue && !!this.newValueAgain 
    },
    token () {
      return  this.$store.state.loginInfo
    },
    tipShow () {
      return this.code200 || this.code400 || this.code401 || this.code500 || this.codeAF401 || this.netErr
    }
  },
  methods: {
    toModify() {
      // 验证密码是否相等
     const isEqual =  check.checkPasswordEqual(this.newValue,this.newValueAgain)
     this.isEqual = isEqual
     if (!isEqual)return false  
    //  提交信息
    this.btnShow = false
    var mydata = {
      oldPassword:this.oldValue,
      newPassword:this.newValueAgain
    }
    updatePassword(mydata, this.token).then((res)=>{
      if (res.code == '200') {
         // code:200 修改成功 返回登录页面重新登录,清空token
         this.code200 = true
         this.$store.commit('setLoginInfo','')
        setTimeout(function(){
          this.code200 = false
          this.$router.push('/login')
        }.bind(this),1500)
        // 2.设置this.btnShow = true
        this.btnShow = true
      }else if (res.code =='400') {
        // 原密码不正确
        this.code400 = true
        setTimeout(function(){
          this.code400 = false
        }.bind(this),1500)
        this.btnShow = true
      } else if (res.code == '401') {
        // 修改失败
        this.code401 = true
        setTimeout(function(){
          this.code401 = false
        }.bind(this),1500)
        this.btnShow = true    
      } else if (res.code == '500') {
        // 系统错误
        this.code500 = true
        setTimeout(function(){
          this.code500 = false
        }.bind(this),1500)
        this.btnShow = true
      }else if (res.code == 'AF401') {
        // 认证失败,请重新登录,清空token, 返回到login页面
        this.codeAF401 = true
        this.$store.commit('setLoginInfo','')
        setTimeout(function(){
          this.codeAF401 = false
          this.$router.push('/login')
        }.bind(this),1500)
        
        // 2.设置this.btnShow = true
        this.btnShow = true
      }

    }).catch((err)=>{
      //  网络错误
        this.netErr = true
        setTimeout(function(){
          this.netErr = false
        }.bind(this),1500)
        this.btnShow = true
    })
    }
  },

}
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
@import '~~common/stylus/transition.styl'
.h-user
  margin 1em
  padding 0.5em
  border 1px solid #d7dde4
  border-radius 8px
  background #ffffff
.user-top 
  h1
    border-bottom 1px solid #c9c9c9
    font-size 1.25em
    color #666
    letter-spacing 1px
    padding 0.2em 1em
.user-search
  padding .5em
.user-content
  padding 1.2em 0.5em
</style>
