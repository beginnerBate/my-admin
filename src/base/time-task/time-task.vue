<template>
    <div>
      <p>
        <span class="img-wrapper"><img src="./timer.png" alt=""></span>
        <!-- <span class="title">关闭倒计时</span> -->
        <span class="count">{{count}}</span>
      </p>
    </div>
</template>
<script>
export default {
  props:['time'],
  data() {
    return {
      count: '',
      interval:""
    }
  },
  watch: {
      // '$route'(value) {
      //   console.log(value)
      //   this.time = 15
      //   // 提示页面给5秒钟
      //   if (value.name.indexOf('tippage') != -1) {
      //     this.time = 15
      //   }
      //   if (value.meta.timer) {
      //     this.time = value.meta.timer
      //   }
      //   clearInterval(this.interval)
      //    this._countDown();
      // }
  },
  created() {
    this._countDown();
  },
  methods: {
    _countDown() {
      this.count = this.time
     this.interval = setInterval(() => {
        this.count--;
        if (this.count == 0) {
          this.$emit('outTime')
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
};
</script>
<style lang="stylus" scoped>
.img-wrapper
  display inline-block
  width 45px
  img 
    width 100%
    height auto
.title
  vertical-align 0.6em
  font-size 1.1em
  letter-spacing 2px
.count
  vertical-align 0.2em
  font-size 1.4em
  letter-spacing 2px
  color #ffffff
  font-weight 600
  text-shadow: 1px 1px 4px #ff6666 
</style>

