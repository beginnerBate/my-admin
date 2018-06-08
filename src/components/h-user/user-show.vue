<template>
  <!-- base-box -->
  <base-box :title="title" @hide="hide()">
    <div class="user-show">
      <p>用户编号: 01</p>
      <p>用户名称: 张三</p>
      <p>就诊卡号: 2356851155355245</p>
      <p>创建时间: 2018-05-06 12:55:88</p>
      <p>最后登录时间: 2018-05-09 12:55:88</p>
    </div>
  </base-box>
</template>
<script>
import BaseBox from 'base/base-box/base-box'
export default {
  data() {
    return {
      title:'用户详情页面'
    }
  },
  components: {
    BaseBox,
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  },
}
</script>
<style lang="stylus" scoped>
.user-show
  padding 1em 3em
  p
    font-size 1.14em
    color #333
    margin 1em
</style>
