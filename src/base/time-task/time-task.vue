<template>
    <div>
      <p>
        <span class="img-wrapper"><img src="./timer.png" alt=""></span>
        <span class="title">操作倒计时</span>
        <span class="count">{{count}}</span>
      </p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      count: '',
      time: 120,
      interval:""
    }
  },
  watch: {
      '$route'(value) {
        console.log(value)
        this.time = 120
        // 提示页面给5秒钟
        if (value.name.indexOf('tippage') != -1) {
          this.time = 5
        }
        clearInterval(this.interval)
         this._countDown();
      }
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
  width 55px
  img 
    width 100%
    height auto
.title
  vertical-align 0.6em
  font-size 1.1em
  letter-spacing 2px
.count
  vertical-align 0.4em
  font-size 1.4em
  letter-spacing 2px
  color #ff6666 
  font-weight 600
  text-shadow: 1px 1px 4px #013d8e;
</style>

