<template>
      <div>
        <span class="img-wrapper fa fa-clock-o" ></span>
        <span class="title">操作倒计时</span>
        <span class="count">{{count}}</span>
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
        this.time = 120
        if (value.meta.timer) {
          this.time = value.meta.timer
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
  font-size 1.4em
.title
  font-size 1.1em
  letter-spacing 2px
.count
  font-size 1.2em
  letter-spacing 2px
  color #ffffff 
</style>

