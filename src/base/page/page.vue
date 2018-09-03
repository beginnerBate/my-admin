<template>
    <div class="list-footer">
      <div><span class="my-btn" :class="{'disabled':current<=1}" @click="setCurrent(current - 1)"><i>上一页</i></span></div>
      <div><span class="my-btn" :class="{'disabled':current>=page}" @click="setCurrent(current + 1)"><i>下一页</i></span></div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      current: this.currentPage
    }
  },
  props: { // 数据总条数
    total: {
      type: Number,
      default: 0
    },
    display: {  //  每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {  //  当前页码
      type: Number,
      default: 1
    },
    pagegroun: {  //  分页条数
      type: Number,
      default: 5,
      coerce: function (v) {
        v = v > 0 ? v : 5
        return v % 2 === 1 ? v : v + 1
      }
    }
  },
  computed: {
    page() { //  总页数
      return Math.ceil(this.total / this.display )
    }
  },
  watch: {
    currentPage(value) {
      this.current = value
    }
  },
  methods: {
    setCurrent (idx) {
      if (this.current != idx && idx>0 && idx < this.page+1) {
        this.current = idx
        this.$emit('pagechange', this.current)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
$color-btn-bg = #219df5     
$color-btn-bg-g = #c7ccc6     
$color-btn-font = #fff     
$color-btn-boder = #90ab98   
$color-btn-shadow = #82a6c6
.my-btn
  display: inline-block
  width: 100px
  padding: 0.6em 0
  text-align center
  font-size: 1.2em
  color $color-btn-font
  background-color $color-btn-bg
  border-radius: 8px
  border-bottom: 1px solid $color-btn-boder
  box-shadow: 0px 1px 0px $color-btn-shadow
.my-btn.disabled
  background-color $color-btn-bg-g
  box-shadow: 0px 1px 0px #6f6f6f
  border-bottom: 1px solid #616161
.list-footer
  padding-top: 1.5em;
  position: absolute
  bottom: 10px
  width: 100%
.list-footer.page-wrapper
  width 60%
.list-footer>div
  display inline-block
  width: 40%
  text-align: center
  margin-left: 8%
</style>


