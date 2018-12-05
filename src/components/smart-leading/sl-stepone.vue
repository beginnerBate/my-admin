<template>
  <div class="self-query">
        <div class="app-content-smart" v-show="!loadFlag">
            <!-- 选择性别按钮 -->
            <div class="sex-choose">
                <p v-for="(item,index) in sexList" :key="index"><span :class='{"active":item.value == sexFlag}' @click="sexEvent(item.value)">{{item.text}}</span></p>
            </div>
            <!-- 选择正面和背部 -->
            <div class="direction-choose">
               <p><span  v-for="(item,index) in directionList" :key="index" :class='{"active":item.value == directionFlag}' @click="directionEvent(item.value)">{{item.text}}</span></p>
            </div>
            <!-- canvas -->
            <div class='img-wrapper' ref='imgWrapper'>
              <img :src="imgList[sexFlag+directionFlag]" alt="" usemap="#Map2" id="imgWrapper" @load="imageLoaded()">
              <map name="Map2" ref="CribMap">            
              </map>
            </div>
            <!-- model-bodyPart -->
            <transition name="slide-fade">
                <div class="model-bodyPart" v-if="modelShow&&partData">
                    <div class="list-title">
                        <p class="fa fa-close" @click="modelShow = false"></p>
                        <p class="mianName">{{modelData.bodyName}}</p>
                    </div>
                    <ul class="smart-list">
                        <li v-for="(item, index) in partData" :key='index'><div><span @click="nextPage(item)">{{item.bodyName}}</span></div></li>
                    </ul>
                </div>
            </transition>
        </div>
            <!-- loading -->
    <div class="loading-wrapper" v-if="loadFlag">
      <loading :title="title"></loading>
    </div>
  </div>
</template>
<script>
  import Loading from 'base/loading/loading'
  import {mainByBodyInfo,secondBodyPart} from 'api/smart.js'
export default {
  data() {
    return {
      loadFlag:true,
      title:"页面加载中...",
      imgList:{
          manPositive:require('./manPositive.png'),
          manBack:require('./manBack.png'),
          womanPositive:require('./womanPositive.png'),
          womanBack:require('./womanBack.png')
      },
      list:{

        manPositive:`  <area shape="poly" coords="115,88,111,84,108,80,107,74,106,69,107,61,107,54,107,44,110,33,113,27,119,20,123,15,131,10,137,7,144,5,151,5,160,7,164,12,169,13,173,17,178,22,181,29,182,33,183,38,184,41,184,49,185,56,181,61,185,66,184,74,181,79,178,83,176,87,175,92,173,97,169,101,167,107,161,111,155,117,146,120,138,117,132,113,125,110,121,102,117,95,114,90" data-mainBodyPartId="1">
                    <area shape="poly" coords="121,108,124,111,126,114,129,114,134,117,139,119,142,121,146,122,151,121,155,119,159,115,162,113,165,110,169,105,172,102,169,110,171,119,169,125,170,133,174,136,180,140,177,153,115,153,112,147,108,139,113,137,120,133,121,129,122,120,122,123" data-mainBodyPartId="2">
                    <area shape="poly" coords="73,151,78,156,79,163,81,170,80,182,80,188,77,195,76,209,76,215,76,222,77,233,76,242,72,251,71,259,70,263,68,269,68,274,66,276,67,285,67,294,66,302,64,310,63,319,61,329,60,335,59,344,56,351,54,358,52,366,50,374,48,382,47,392,46,400,45,408,49,414,52,422,55,426,55,436,56,448,55,455,53,461,47,463,51,471,44,471,38,468,33,463,30,454,26,445,22,438,30,389,30,369,30,353,31,339,32,307,32,300,39,274,41,235,45,219,46,209,45,199,45,192,46,181,51,172,55,164,63,159" data-mainBodyPartId="28">
                    <area shape="poly" coords="217,152,223,158,229,161,233,168,238,174,240,183,241,190,241,199,242,209,243,216,244,226,247,237,247,246,248,254,249,263,249,270,251,280,253,288,256,293,257,302,257,312,259,389,266,437,256,461,243,471,238,468,236,424,244,408,233,352,225,315,222,291,220,269,215,253,213,243,212,197,210,185,212,166,212,158" data-mainBodyPartId="28">
                    <area shape="poly" coords="83,180,207,178,209,186,211,195,211,202,212,213,212,224,212,235,211,244,208,251,207,258,205,265,203,275,198,282,87,285,85,272,82,261,80,250,78,241,75,211" data-mainBodyPartId="3">
                    <area shape="poly" coords="88,289,89,298,88,306,89,315,86,325,85,333,84,341,84,349,79,354,82,361,82,371,82,373,82,383,210,383,209,377,209,369,209,362,210,356,208,350,206,343,206,338,204,332,202,327,203,322,201,316,201,311,202,308,202,303,200,300,199,295,199,290,198,287" data-mainBodyPartId="4">
                    <area shape="poly" coords="81,391,82,386,210,386,209,393,210,401,210,406,212,415,214,427,215,440,216,450,216,464,217,475,211,479,79,486,75,479,74,461,77,434,80,424,82,409,83,397" data-mainBodyPartId="7">
                    <area shape="poly" coords="77,489,216,482,203,800,78,795,95,696,83,614,88,573" data-mainBodyPartId="29">`,
                            
        manBack:`      <area shape="poly" coords="116,119,165,118,167,113,168,109,171,104,173,101,177,96,180,92,179,86,180,80,178,77,178,69,178,64,176,57,175,51,172,46,169,42,165,38,161,33,157,29,152,26,145,26,138,25,131,24,124,26,121,30,117,34,111,38,109,43,104,50,103,56,102,61,105,68,103,74,102,80,102,89,103,95,110,104,113,115" data-mainBodyPartId="1">
      <area shape="rect" coords="125,123,157,371" data-mainBodyPartId="84">
      <area shape="poly" coords="158,151,174,153,182,154,191,158,201,161,214,165,219,170,218,169,216,193,157,195" data-mainBodyPartId="91">
      <area shape="poly" coords="65,179,63,174,63,170,69,167,73,164,79,163,82,161,88,158,95,156,102,155,106,153,112,153,118,154,124,156,124,194,66,199" data-mainBodyPartId="91">
      <area shape="poly" coords="157,197,215,195,218,204,217,213,213,223,213,231,211,244,210,251,208,261,206,269,206,275,157,278" data-mainBodyPartId="9">
      <area shape="poly" coords="67,202,72,202,77,202,84,202,88,201,96,200,101,200,107,198,112,198,119,197,123,197,124,279,77,284,76,270,75,260,74,247,72,232" data-mainBodyPartId="9">
      <area shape="poly" coords="157,279,205,276,205,282,203,286,201,291,198,297,198,303,198,308,198,317,198,323,198,330,198,337,200,343,201,352,202,359,203,364,206,368,203,376,193,375,181,378,170,380,162,380,155,379" data-mainBodyPartId="5">
      <area shape="poly" coords="78,286,84,285,87,283,95,283,101,283,108,283,116,281,124,280,125,379,117,382,109,381,101,381,90,379,81,378,78,373,78,367,81,361,83,353,85,342,86,332,86,324,85,312,83,307" data-mainBodyPartId="5">
      <area shape="poly" coords="78,381,77,393,77,402,77,415,77,423,75,435,72,446,72,458,72,470,72,480,73,492,209,494,211,486,210,475,210,465,210,453,207,446,207,439,206,432,206,423,204,416,204,408,204,401,203,392,203,385,203,381,203,378" data-mainBodyPartId="6">
      <area shape="poly" coords="81,610,79,651,81,660,83,671,84,682,87,693,90,703,90,713,90,722,90,728,90,735,90,740,85,741,83,746,80,751,80,757,84,760,86,764,88,772,92,777,96,780,103,784,107,780,112,775,113,768,114,757,114,745,112,730,112,723,112,713,112,707,113,692,116,673,117,663,120,654,119,646,117,609,118,595,123,559,126,541,127,527,131,495,73,493,76,527,84,544" data-mainBodyPartId="29">
      <area shape="poly" coords="150,497,151,504,153,510,154,516,155,521,157,533,158,550,159,565,161,576,161,587,164,596,165,606,164,616,164,628,164,640,163,655,164,665,167,674,169,685,170,697,170,708,171,719,170,727,168,737,168,747,169,756,169,765,172,772,177,778,184,781,188,778,191,774,191,767,195,758,198,752,198,746,192,739,192,728,192,715,193,703,196,693,197,680,199,672,202,660,204,654,204,639,201,625,203,615,196,604,199,600,197,588,199,564,199,548,199,525,203,510,205,495" data-mainBodyPartId="29">
      <area shape="poly" coords="221,172,228,179,234,186,240,195,241,206,241,214,241,226,244,232,246,246,247,255,248,264,247,272,249,285,251,298,253,311,256,317,254,400,254,407,258,410,256,419,257,427,261,441,262,451,257,459,254,466,248,473,239,480,233,480,237,470,241,464,244,456,245,444,240,442,238,442,234,446,233,454,233,461,229,463,227,451,227,429,233,423,238,415,238,396,235,383,231,373,228,359,224,352,224,336,223,318,220,296,220,285,216,279,213,267,211,256" data-mainBodyPartId="28">
      <area shape="poly" coords="61,174,54,179,49,186,46,192,44,201,41,210,40,219,39,227,37,235,38,241,36,247,35,257,34,267,34,277,34,284,32,294,30,302,28,313,25,317,27,324,26,337,26,349,26,360,26,372,26,386,28,400,27,408,25,417,24,427,22,436,19,445,20,454,22,459,23,468,30,472,37,479,45,485,45,480,43,474,38,469,38,462,35,453,37,445,41,443,46,445,46,452,46,458,48,464,50,467,53,459,53,446,53,439,50,434,47,426,43,423,44,412,46,389,53,367,58,354,61,339,60,330,62,324,62,293,67,278,70,268,73,259" data-mainBodyPartId="28">`,      
    
        womanPositive:` <area shape="poly" coords="127,139,128,142,133,144,135,146,142,149,150,149,156,148,156,148,159,143,164,141,166,138,170,137,176,135,180,131,185,127,187,123,187,117,185,114,184,108,182,101,181,96,180,88,178,80,175,73,170,67,166,61,160,58,155,56,150,56,144,56,139,57,134,57,129,60,122,66,124,67,119,69,118,77,115,84,113,91,111,96,109,101,110,106,110,111,107,117,106,124,107,130,113,134,122,138" data-mainBodyPartId="1">
                    <area shape="poly" coords="128,144,129,150,128,157,125,162,123,167,115,170,105,171,183,171,170,167,166,163,163,160,161,158,162,155,162,151,163,147,165,144,160,144,157,149,151,150,146,150,138,150,136,147,129,145" data-mainBodyPartId="2">
                    <area shape="poly" coords="96,221,97,227,95,231,94,236,95,244,94,253,95,263,98,271,98,280,100,286,107,288,192,287,194,281,196,273,197,261,198,255,199,248,200,239,197,234,198,228,198,224,200,219,199,212,199,207,198,201,197,197,103,201,95,205,94,214" data-mainBodyPartId="3">
                    <area shape="poly" coords="94,339,100,343,106,344,111,346,119,348,128,349,136,350,146,350,152,350,161,350,167,349,180,349,191,347,195,344,199,341,197,335,195,333,191,329,190,325,187,323,188,318,185,314,185,311,186,305,186,301,189,296,191,291,102,291,105,296,106,303,106,309,105,319,102,326,98,336,96,339" data-mainBodyPartId="4">
                    <area shape="poly" coords="198,173,204,177,210,183,216,188,219,195,222,205,225,212,227,221,228,230,230,239,233,248,241,269,250,291,256,308,264,341,272,378,281,407,280,422,272,436,259,424,256,421,255,406,256,395,261,385,248,355,236,322,225,287,214,259,200,225" data-mainBodyPartId="28">
                    <area shape="poly" coords="92,176,92,186,92,202,91,216,93,222,75,267,69,284,56,322,47,346,39,357,34,375,32,382,38,401,36,419,22,434,12,420,12,402,24,369,27,340,37,304,55,264,61,240,66,218,72,197,79,187,82,181" data-mainBodyPartId="28">
                    <area shape="poly" coords="93,343,92,351,89,356,88,364,84,370,86,378,84,385,84,396,83,417,82,433,209,436,209,426,208,408,205,378,204,360,201,345,200,341,194,348,160,353,115,353" data-mainBodyPartId="8">
                    <area shape="poly" coords="84,440,94,438,108,437,138,438,134,453,130,485,128,507,129,530,124,546,123,560,122,587,120,607,118,625,117,642,116,659,115,676,119,682,115,700,113,717,117,728,115,738,110,744,98,740,94,734,96,707,99,696,101,665,95,629,93,602,91,559,95,544,95,520,91,467" data-mainBodyPartId="29">
                    <area shape="poly" coords="154,440,206,439,204,447,202,460,201,484,198,507,198,519,197,530,195,539,199,549,200,561,200,610,194,646,193,665,194,693,201,728,201,738,184,745,177,736,175,728,176,694,177,660,170,594,170,554,164,534,162,489,159,459" data-mainBodyPartId="29">`,
        
        womanBack:` <area shape="poly" coords="102,122,104,130,107,137,113,142,121,147,129,148,168,148,181,141,188,137,190,132,190,125,189,117,188,111,187,104,182,95,179,83,174,70,163,60,149,55,137,57,125,62,113,74" data-mainBodyPartId="1">
                    <area shape="rect" coords="133,153,162,383" data-mainBodyPartId="84">
                    <area shape="poly" coords="167,170,178,179,193,184,202,186,202,193,201,212,162,220,162,186,162,171" data-mainBodyPartId="91">
                    <area shape="poly" coords="125,172,117,177,111,182,100,183,91,186,89,195,88,211,89,220,132,220,131,184,130,174,126,171" data-mainBodyPartId="91">
                    <area shape="poly" coords="89,224,88,232,88,239,89,251,93,268,92,281,94,292,96,304,98,313,134,319,133,224" data-mainBodyPartId="9">
                    <area shape="poly" coords="162,225,201,220,205,230,208,239,205,249,203,266,202,285,200,297,199,307,194,314,161,319" data-mainBodyPartId="9">
                    <area shape="poly" coords="99,316,133,320,132,380,84,383,93,362,98,353,102,339" data-mainBodyPartId="5">
                    <area shape="poly" coords="163,321,193,316,192,323,191,332,191,342,195,354,200,361,205,371,208,381,161,381" data-mainBodyPartId="5">
                    <area shape="poly" coords="84,388,82,406,80,426,79,452,80,472,212,478,215,454,213,418,210,398,208,385" data-mainBodyPartId="6">
                    <area shape="poly" coords="82,478,86,491,88,512,91,549,93,581,93,596,87,612,86,630,86,659,90,684,94,711,95,730,96,748,91,760,114,764,118,755,114,745,114,718,115,692,122,649,122,607,127,578,134,494,136,487,139,481" data-mainBodyPartId="29">
                    <area shape="poly" coords="157,487,163,510,165,557,173,603,172,637,174,657,177,685,180,714,181,747,175,756,196,764,204,762,200,748,199,714,203,690,208,662,209,636,203,600,201,532,210,484" data-mainBodyPartId="29">
                    <area shape="poly" coords="205,187,218,194,230,210,239,244,251,293,266,324,270,344,281,402,292,441,281,469,279,461,282,440,269,432,268,442,264,444,264,425,269,405,256,375,240,335,226,288,209,246,203,216" data-mainBodyPartId="28">
                    <area shape="poly" coords="86,188,75,196,64,209,59,227,47,276,35,308,23,343,12,401,1,438,11,466,17,462,13,443,26,430,27,443,32,442,32,426,27,413,25,404,43,368,53,341,68,286,86,242" data-mainBodyPartId="28">`
      },
      sexList:[{value:'man',text:'男性'},{value:'woman',text:'女性'}],
      sexFlag:'man',
      directionList:[{value:'Positive',text:'正面'},{value:'Back',text:'背面'}],
      directionFlag:'Positive',
      imageWidth:0,
      imageHeigth:0,
      modelShow:false,
      bodyData:[],
      bodyId:'',
      partId:'',
      partData:[]

    }
  },
  components:{
      Loading
  },
  computed:{
      modelData(){
          return this.bodyData.length>0 && this.bodyData.filter((item)=>{
              if(item.id == this.bodyId){
                  return item
              }
          })[0]
      }
  },
  created(){
      this.mainByBodyInfo()
  },
  watch:{
      partId(value){
          if(value) {

          }
      }
  },
  methods: {
    toTipPage(){
          this.$router.push({name:"sltippage"}) 
      },
    mainByBodyInfo(){
         this.loadFlag = true
        mainByBodyInfo().then((res)=>{
          if(res.code == '200'){
            this.bodyData = res.data
          }else if (res.code == '404') {
            // 没有数据
            this.list = []
          }else {
            this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
            this.toTipPage()  
          }
          this.loadFlag = false
        }).catch((err)=>{
          this.loadFlag = false
          this.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
          this.toTipPage()  
        })
    },
    sexEvent(value) {
      this.sexFlag = value
    },
    directionEvent(value){
      this.directionFlag = value
    },
    imageLoaded(){
        this.imageHeigth = document.getElementsByClassName('home-right')[0].offsetHeight
         this.imageWidth  = Math.round(295 * (this.imageHeigth/813))
        this.$refs.CribMap.innerHTML = this.list[this.sexFlag+this.directionFlag]
        this.$nextTick(()=>{
            this.adjust()
            this.smart()
        })
 
    },
    smart(){
        var that = this;
        var area =  this.$refs.CribMap.getElementsByTagName('area');
       [].slice.call(area).forEach(ele => {
           ele.onclick = function(event) {
               that.bodyId = ele.dataset.mainbodypartid
               secondBodyPart(that.bodyId).then((res)=>{
                   if (res.code=="200") {
                        that.modelShow = true
                        that.partData = res.data
                   }else if (res.code == '404') {
            // 没有数据
                        that.listPart = []
                    }else {
                        that.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
                        that.toTipPage()  
                    }
                    that.loadFlag = false
                }).catch((err)=>{
                    that.loadFlag = false
                    that.$store.dispatch('setTipPage',['系统错误,请到柜台处理!','error'])
                    that.toTipPage()  
                })
              
           }
       });
    },
    adjust(){
        //获取MAP中元素属性  
        var map = this.$refs.CribMap 
        var element = map.childNodes; 
        var itemNumber = element.length / 2;  
        var that = this;
        for (var i = 0; i < itemNumber; i++) {  
            var item = 2 * i + 1;  
            var oldCoords = element[item].coords;  
            var newcoords = that.adjustPosition(oldCoords);  
            // console.log('newcoords',newcoords)
            element[item].setAttribute("coords", newcoords);  
        }  
    },
    adjustPosition(position){
        var pageWidth = 295//获取页面宽度  
        var pageHeith = 813//获取页面高度 
        var each = position.split(","); 
        var newPosition = "";  
        //获取每个坐标点  
        for (var i = 0; i < each.length; i++) {  
            each[i] = Math.round(parseInt(each[i]) * this.imageWidth/pageWidth).toString();//x坐标  
            i++;  
            each[i] = Math.round(parseInt(each[i]) * this.imageHeigth/pageHeith).toString();//y坐标  
        }  
        //生成新的坐标点         
        for (var i = 0; i < each.length; i++) {  
            newPosition += each[i];  
            if (i < each.length - 1) {  
                newPosition += ",";  
            }  
        } 
         return newPosition;  
    },
    nextPage(item){
        this.$store.commit('setBodyData',item.bodyPartId)
        this.$router.push({name:"slsteptwo"})
    }
  },
}  
</script>

<style lang="stylus" scoped>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
.app-content-smart{
    position: absolute;
    height: 100%;
    width: 100%;
}
.sex-choose{
    position: absolute;
    bottom: 20px;
    left: 20px;
}
.sex-choose>p{
    margin: 16px 0;
}
.sex-choose>p>span{
    display: inline-block;
    width: 6vw;
    height: 6vw;
    border:1px solid #36c7fe;
    border-radius: 50%;
    line-height: 6vw;
    text-align: center;
    color:#e0e0e0;
    font-size: 20px;
    // font-weight bold;
    letter-spacing: 4px;
}
.sex-choose>p>span.active{
    color: #fff;
    background: #36c7fe;  
}
.direction-choose{
    position: absolute;
    bottom: 45px;
    right: 20px;
}
.direction-choose>p{
    width: 20vw;
    font-size: 14px;
    border-radius:40px;
    // background-color: #d4d4d4;
    display: flex;
    justify-content: space-between;
    border: 1px solid #36c7fe;
}
.direction-choose>p>span{
    padding: 14px;
    display: inline-block;
    color:#fff;
    text-align: center;
    width: 50%;
    font-size:20px;
}
.direction-choose>p>span.active{
    color: #fff;
    background: #36c7fe;
    border-radius: 40px;
    width: 50%;
}
.img-wrapper{
	width: 100%;
	height 100%
	text-align: center;
	// background: #fff;
}
.img-wrapper>img{
	width:auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
}
.model-bodyPart{
    position: absolute;
    min-width: 100%;
    height: 100%;
    background-color: rgba(26, 72, 118, 1);
    top: 0%;
    right: 0;
    overflow-y: auto;
    border-radius:8px;
}
.list-title{
    margin:10px;
    color: #444;
    text-align: center;
    letter-spacing: 2px;
    // font-weight: 800;
    display:flex;
}
.list-title>.mianName{
    border-radius: 4px;
    flex:1;
    background: #36c7fe;
    line-height: 51px;
    color: #fff;
    font-size: 1.5em;
}
.list-title>.fa{
    background: #f66;
    color: #fff;
    border-radius: 14%;
    width: 60px;
    height: 56px;
    line-height: 56px;
    margin-right: 20px;
    font-size: 3em;
    box-shadow: 0px 4px 0px #ca5f5f;
    text-shadow: 1px 1px 3px #fd0a0a;
}
.smart-list{
    margin: 10px;
    display:flex;
    flex-wrap:wrap;
}
.smart-list>li{
    // border-bottom: 1px solid #e3e3e3;
    text-align: center;
    color:#666;
    flex: 0 0 25%;
}
.smart-list>li>div{
    padding: 10px;
    display:flex;
}
.smart-list>li>div>span{
    background:#fff;
    flex:1;
    padding:16px 0;
    border-radius :8px;
}
</style>
