<template>
    <div>
    <p><span>历史消费明细</span></p>
    <p><span>就诊记录</span></p>
    <p><span>公共查询</span></p>
  </div>
</template>
<script>
export default {
  created() {
          // 导航设置 这里适合action
      var list = JSON.stringify([])
      this.$store.dispatch('pageSet',[-1,'门诊缴费',list])
  }
}
</script>

