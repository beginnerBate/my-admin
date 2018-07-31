<template>
  <!-- base-box -->
  <base-box :title="title" @hide="hide()">
    <div class="user-show">
      <p>用户编号: {{item.patientId}}</p>
      <p>用户名称: {{item.name}}</p>
      <p>就诊卡号: {{item.medicalCardNumber}}</p>
      <p>创建时间: {{item.createDatetime | formatDate}}</p>
      <p>最后登录时间: {{item.lastLoginDatetime | formatDate}}</p>
    </div>
  </base-box>
</template>
<script>
import BaseBox from 'base/base-box/base-box'
import {formatDate} from 'common/js/date'
export default {
  data() {
    return {
      title:'用户详情页面'
    }
  },
  components: {
    BaseBox,
  },
  filters: {
    formatDate (value) {
      var mydate = new Date(value)
      return formatDate(mydate, 'yyyy-MM-dd hh:mm:dd')
    }
  },
  props:{
    item:''
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
