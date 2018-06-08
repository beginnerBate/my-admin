<template>
  <div class="h-menu">
    <ul>
      <!-- list菜单 -->
      <template v-for= "(item,index) in list" >
        <li :key="index">
          <div @click="item.open = !item.open" class="h-menu-item" :class="menuIdx == index?'active':''">
            <i class="fa fa-fw" :class="item.icon"></i>
            <span>{{item.name}}</span>
            <i class="fa fa-angle-down" :class="{'fa-rotate-180':item.open}"></i>
          </div>
          <ul v-if="item.children" class="menu-child" :class="{'open': item.open}">
            <template  v-for="(val,idx) in item.children">
              <router-link :to="val.url" :key="idx" tag="li" @click.native="activeEvent(index)">
                <i class="fa fa-fw" :class="val.icon"></i>
                <span>{{val.name}}</span>
              </router-link>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        open: false,
        list:[
          {
            name: '用户管理',
            icon: 'fa-user',
            open:false,
            children:[
              {
                name: "用户信息",
                icon: 'fa-user',
                url:'/home/user'
              }
            ]
          },
          {
            name: '订单管理',
            icon: 'fa-indent',
            open:false,
            children:[
              {
                name: "订单信息",
                icon: 'fa-indent',
                url:'/home/order'
              }
            ]
          },
          {
            name: '挂号管理',
            icon: 'fa-id-card-o',
            open:false,
            children:[
              {
                name: "挂号信息",
                icon: 'fa-id-card-o',
                url:'/home/regist'
              }
            ]
          },
          {
            name: '缴费管理',
            icon: 'fa-money',
            open:false,
            children:[
              {
                name: "缴费信息",
                icon: 'fa-money',
                url:'/home/payment'
              }
            ]
          },
          {
            name: '系统设置',
            icon: 'fa-cog',
            open:false,
            children:[
              {
                name: "修改密码",
                icon: 'fa-pencil-square-o',
                url:'/home/modify'
              }
            ]
          }
        ]
      }
    },
    created () {
      // initOpen
      this.$nextTick(()=>{
        this.initOpen()
      })
    },
    computed: {
      menuIdx() {
        return this.$store.state.menuIdx 
      }
    },
    methods: {
      activeEvent (index) {
        // 提交menuIdx
        this.$store.commit('setMenuIdx',index)
      },
      initOpen () {
        if (this.menuIdx == -1) {
          return false
        }
        // 获取index
        var idx = this.menuIdx
        this.list[idx].open = true
      }
    }
  }
</script>
<style lang="stylus" scoped>
.h-menu
  color #9ea7b7
.menu-child
  background #313540
  // padding 5px 0
  transition: all 0.25s ease;
  max-height 0px 
  overflow hidden
  li
    padding: 14px 24px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all .2s ease-in-out
  li:hover
    color: #fff
  li.router-link-active
    color: #fff
    background: #00a9ba
.h-menu-item
  padding 14px 24px
  cursor pointer
  z-index 1
  transition all .2s ease-in-out
  .fa-angle-down
    transition: transform .2s ease-in-out
    position absolute
    margin: 3px 0 0 20px;
.h-menu-item:hover,.h-menu-item.active
  color: #fff;
  background: #464c5b;
.open
  max-height 999px 
.up
  transition rotate(180deg)
</style>
