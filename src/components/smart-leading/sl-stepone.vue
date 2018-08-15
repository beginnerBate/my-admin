<template>
  <div class="self-query">
    该模块暂未开发
    <div>测试模块</div>
    <p>浏览器对flex的支持情况: {{flex}}</p>
    <p>svg: {{svg}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flex: '',
      svg:""
    }
  },
  created () {
    this.flex = CSS.supports("display", "flex");  
    this.svg =  hasSVG()

  }
}
function hasSVG(){
	var SVG_NS = 'http://www.w3.org/2000/svg';
	return !!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect;
}
</script>

<style lang="stylus" scoped>
.self-query
  padding 2em 1em
  p
    margin 2em
    font-size 1.8em
    color #fff
    letter-spacing 2px
    span
      display inline-block
      width 200px
      background #009a99 
      text-align center
      border-radius 8px
      padding 0.4em
      border-bottom 3px solid #275274
      box-shadow 0px 3px 0px #32567a
</style>
