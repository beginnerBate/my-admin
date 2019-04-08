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
    components: {
      MainPage
    },
    methods: {
      setType(item) {
        //设置查询类型
      }
    }
  }
</script>