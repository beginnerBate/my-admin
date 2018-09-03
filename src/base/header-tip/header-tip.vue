<template>
  <div class="header-tip">
    <p class="header-logo">
      <img src="./logo.png">
      <span @click="close">南京医科大学第二附属医院住院服务终端</span>
    </p>
    <p class="header-date">
      <span><i>{{sysDate}}</i> <i>{{sysWeek}}</i> <i>{{sysTime}}</i></span></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sysDate:"",
      sysWeek:"",
      sysTime:""
    }
  },
  created () {
    this.getdate()
  },
  methods: {
    close(){
        if(typeof sharpForeign != 'undefined') {
          sharpForeign.CloseThis()
        }
    },
    getdate() {
       setInterval(()=>{
        var todayDate = new Date();
        var date = todayDate.getDate();
        var month= todayDate.getMonth() +1;
        var year= todayDate.getYear();
        if(navigator.appName == "Netscape")
        {
          this.sysDate = (1900+year) + "年" + month + "月" + date + "日 ";
        }
        if(navigator.appVersion.indexOf("MSIE") != -1)
        {
          this.sysDate = year + "年" + month + "月" + date + "日 ";
        }
        this.sysWeek = ' 星期'+'日一二三四五六'.charAt(new Date().getDay  ())
        var hour = todayDate.getHours() < 10 ? "0" + todayDate.getHours() : todayDate.getHours();
        var minute = todayDate.getMinutes() < 10 ? "0" + todayDate.getMinutes() : todayDate.getMinutes();
        var second = todayDate.getSeconds() < 10 ? "0" + todayDate.getSeconds() : todayDate.getSeconds();
        this.sysTime = hour+':'+ minute +':'+second
      },1000)
    }
  }
}
</script>