<template>
  <div class="self-query">
        <div class="app-content-smart" v-show="!loadFlag">
            <div>
                <ul class='body-list'>
                    <li v-for="(item,index) in pageList" :key="index">
                        <div class="body-info">
                            <p><span>症状名称:</span><span>{{item.diseaseName}}</span></p>
                            <p><span>症状描述:</span><span>{{item.diseaseMemo}}</span></p>
                            <p><span>所在科室:</span><span>{{item.departmentName}}</span></p>
                            <div class="btn"><span @click="toSelectDoctor(item)">预约挂号</span><span @click="toSelectDoctor01(item)">立即挂号</span></div>
                        </div>
                    </li>
                </ul>
                <!-- 分页 -->
                <page v-if="total>rows" :total= 'total' :display='rows' @pagechange='pagechange($event)'></page>
            </div>
            <div class="info"></div>
        </div>
            <!-- loading -->
    <div class="loading-wrapper" v-if="loadFlag">
      <loading :title="title"></loading>
    </div>
  </div>
</template>
<script>
  import Loading from 'base/loading/loading'
  import page from 'base/page/page'
  import {bodyPart} from 'api/smart.js'
  export default {
        data() {
            return {
                list:[],
                pageList:[],
                rows:3,
                page:1,
                pageCount:1,
                total:0,
                loadFlag:true,
                title:"页面加载中"
            }
        },
        created(){
            this.getData()
        },
        components:{
            Loading,
            page
        },
        computed: {
            bodyPartId() {
                return this.$store.state.bookReg.bodyData 
            }
        },
        methods: {
            getData() {
                var that = this
                bodyPart(this.bodyPartId).then((res)=>{
                    this.loadFlag = false
                    if (res.code ==200) {
                        that.list = res.data
                        that.pageCount = Math.ceil(that.list.length/that.rows)
                        that.total = that.list.length
                        that.getPageData()
                    }else{

                    }
                }).catch(()=>{

                })
            },      
            pagechange($event) {
                this.page = $event
                this.getPageData()
            },
            getPageData () {
                var startIndex = (this.page-1)*this.rows
                var endIndex = (this.page)*this.rows
                this.pageList = this.list.filter((val,index)=>{
                    if(index<endIndex && index>=startIndex) {
                       return true
                    }
                })
            },
            toSelectDoctor(item){
                var data = {}
                data.id = item.departmentId
                data.name = item.departmentName
                var list = JSON.stringify([{text:"选择科室"},{text:"选择医生"},{text:"支付挂号费"},{text:"完成挂号"}])
                this.$store.dispatch('pageSet',[0,'预约挂号',list])
                // 清空预约医生
                this.$store.commit('setDoctorList',[])  
                this.$store.dispatch('getDocotorList',data)
                 this.$store.commit('setBackFlag','slsteptwo')
                this.$router.push({ name: 'doctor'})
            },
            toSelectDoctor01(item){
                var data = {}
                data.id = item.departmentId
                data.name = item.departmentName
                var list = JSON.stringify([{text:"选择科室"},{text:"选择医生"},{text:"支付挂号费"},{text:"完成挂号"}])
                this.$store.dispatch('pageSet',[0,'当日挂号',list])
                // 清空预约医生
                this.$store.commit('setDayDoctorList',[])  
                this.$store.dispatch('getDayDocotorList',data)
                this.$store.commit('setBackFlag','slsteptwo')
                this.$router.push({ name: 'choosetwo'})
            }
        }
        
  }
</script>
<style lang="stylus" scoped>
.body-list
//   display flex
//   flex-wrap wrap
  li
    // flex: 0 0 50% 
    div
      background #607f9e
      margin 10px
      padding 10px
      border-radius 8px
.body-info
  color #fff
  p
    display flex
  p>span:first-child
    color #f1f1f1
    font-weight 800
    letter-spacing 3px
    flex 0 0 90px
  .btn
    justify-content flex-end
    display flex
    margin 0
    padding-bottom 5px
    span
      border-radius 8px 
      flex 1 
      margin 0 50px 
      background #36c7fe 
      padding 12px 
      text-align center 
      font-weight 800 
      letter-spacing 3px
      max-width 100px
    span:last-child
      background #96c900
</style>
