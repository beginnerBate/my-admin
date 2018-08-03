<template>
<div>
  <div class="bo-four"  v-if="flag">
     {{tipMsg}}
  </div>
  <div v-if='!flag' class='loading-wrapper'>
    <loading :title="tipMsg"></loading>
  </div>
</div>
</template>

<script>
  import {printingFetchNumber} from 'api/bookno'
  import Loading from 'base/loading/loading'
  export default {
    created() {
      this.$store.commit('setMenuIdx',3)
      this.getbookNumber()
    },
    data() {
      return {
        tipMsg: "打印中,请稍等...",
        flag:false
      }
    },
    components:{
      Loading
    },
    computed: {
      user () {
        return this.$store.state.bookReg.user
      },
      bookNumber () {
        return this.$store.state.bookReg.bookNumber
      },
      token () {
        return this.$store.state.bookReg.token
      }
    },
    methods: {
      getbookNumber () {
        this.bookNumber.forEach((item,index)=>{
          this.toPrint(item)
        })
      },
      toPrint(data) {
        var mydata ;
        var postData = {
          "name":this.user.name,
          "subscribeTime":data.vistTime,
          "departmentName":data.deptName,
          "doctorName": data.docName,
          "guaHaoAmount": data.sumRegister
        };
        if (typeof window.external.Print_SmallTicket_ZZQH == 'function') {
          mydata = JSON.parse(window.external.Print_SmallTicket_ZZQH(JSON.stringify(postData)))
          if (mydata.code == '200') {
            // 打印成功
             this.flag = true
           printingFetchNumber({recordId:data.localRegRecordId}, this.token).then((res)=>{
          //  console.log(res)
           })
            this.tipMsg = '打印成功,请取走您的小票和就诊卡！'
          }else {
             this.flag = true
            // 打印失败
            this.tipMsg = '打印失败, 请到柜台处理'
          }
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
.bo-four
  margin-top 8em
  text-align center
  color #ffffff
  font-size 2em
  letter-spacing 4px
.loading-wrapper
  padding-top 30%
</style>
