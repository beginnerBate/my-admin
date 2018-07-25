<template>
<div class="self-query">
  <main-page>
    <router-view></router-view>
  </main-page>
</div>
</template>
<script>
import MainPage from 'components/main-page/main-page'
  export default {
    data() {
      return {
        queryList: [
          {
            value:"缴费记录查询",
            queryType:1
          },
          {
            value:"就诊记录查询",
            queryType:2
          }
        ]
      }
    },
    components: {
      MainPage
    },
    created() {
      // 导航设置 这里适合action
      var list = JSON.stringify([])
      this.$store.dispatch('pageSet',[-1,'自助查询',list])
    },
    methods: {
      setType(item) {
        //设置查询类型
        this.$store.commit('setQueryType',item)
        // 选择卡号
        this.$router.push({name:'sqstepone'})
      }
    },
  }
</script>

