<template>
  <div class="h-user">
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
        <button class="btn sub" :disabled="!disabled" @click="toModify()" >确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import check from 'common/js/checkObject'
export default {
  data() {
    return {
      oldValue: '',
      newValue: '',
      newValueAgain: '',
      isEqual:true
    }
  },
  computed: {
    disabled() {
      return !!this.oldValue && !!this.newValue && !!this.newValueAgain 
    }
  },
  methods: {
    toModify() {
      // 验证密码是否相等
     const isEqual =  check.checkPasswordEqual(this.newValue,this.newValueAgain)
     this.isEqual = isEqual
     if (!isEqual)return false  
    //  提交信息
    }
  },

}
</script>
<style lang="stylus" scoped>
@import '~~common/stylus/form.styl'
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
