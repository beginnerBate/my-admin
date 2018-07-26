<template>
  <div class="con">
    <div class="user-info info-wrapper">
      <span>姓名: {{regUserInfo.name}} </span>
      <span>性别: {{regUserInfo.sex}}</span>
      <p>身份证号: {{regUserInfo.cardNumber}}</p>
    </div>
    <div class="complete-info">
      <div class="my-phone"><label> 手 机 号 码 : </label><input type="number" v-model="myPhone" readonly></div>
      <!-- 键盘 -->
      <div class="mykey-wrapper">
        <ul class="my-key">
          <li v-for="(item, index) in key" :key="index" @click="KeyUp(item)">
            <div><span>{{item}}</span></div>
          </li>                                                                                             
        </ul>
      </div>
       <!-- button -->
      <div class="button-wrapper">
        <span class="btn-sub" :class="{'disabled':i==-1}" @click="toNext()"><i>确 认</i></span>
      </div>
    </div>
  </div>
</template>
<script>
import {regUser} from 'api/user'
export default {
  data() {
    return {
      key: ['1','2','3','4','5','6','7','8','9','0','退格','清空'],
      myPhone:'',
      i:-1
    }
  },
  computed:{
    regUserInfo () {
      return this.$store.state.bookReg.reguserinfo
    }
  },
  created() {
    this.$store.commit('setMenuIdx',2)
  },
  watch: {
    myPhone(value) {
      if (value.length == 11) {
        this.i = 1
      }else{
        this.i = -1
      }
    }
  },
  methods:{
    KeyUp(item) {
      if (item == '退格') {
        if (this.myPhone<=0) return
        this.myPhone = this.myPhone.substring(0,this.myPhone.length-1)
        console.log(this.myPhone)
      }else if (item == '清空') {
        this.myPhone = ''
      }else {
        if (this.myPhone.length >= 11)return 
        this.myPhone += item
      }
    },
    toNext() {
      if(this.i==-1) {
        console.log('请输入正确的手机号码')
      }else {
        // 注册建档
        this.regUser()
      }
    },
    regUser() {
      var mydata = {
        name: this.regUserInfo.name,
        sex: this.regUserInfo.sex,
        jtdh: this.myPhone,
        cardType: this.$store.state.bookReg.cardType,
        cardNo: this.regUserInfo.cardNumber,
        birthday:this.regUserInfo.birthday
      }
      regUser(mydata).then((res)=>{
        if (res.code == '200') {
          // 保存就诊id === 就诊卡号
          this.$store.commit('setJzId',res.data)
          this.$router.push({name:"rbstepfour"})
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~~common/stylus/variables.styl'
@import '~~common/stylus/button.styl'
.info-wrapper 
  padding 0.4em
  color $color-font
  background $color-a1
  font-size 1.5em
  border-radius 8px
.complete-info
  overflow hidden
  color $color-font
  margin-top 3em
  text-align center
  &>div:first-child
    font-size 1.8em
    input  
      padding 0.2em 0.4em
      color $color-font
      background $color-a1
      border-radius 8px 
      display: inline-block;
      max-width 300px
      letter-spacing 5px
      outline none 
      border 0
      font-size 1.4em
.mykey-wrapper
  margin-left 200px
  margin-right 200px
  margin-top 30px
.my-key
  background $color-font
  border-radius 8px
  padding 0.5em
  li
    display inline-block
    width 33.3%
    div
      padding 0.4em
      span 
        display block
        background-color $color-theme
        text-align center
        border-radius 6px
        font-size 2.5em
.button-wrapper
  position absolute
  bottom 1.2em
  width 100%
  text-align center
  font-size 1.4em
</style>
