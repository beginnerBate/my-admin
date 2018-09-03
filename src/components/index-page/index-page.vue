<template>
    <div class="index-page">
        <!-- 头部 -->
        <header-tip></header-tip>
        <!-- 内容 -->
        <div class="center-content">
            <div class="cenetr-wrapper">
                <div class="center-left">
                    <ul>
                        <router-link tag="li" to="/indexpage/today">当日住院清单</router-link>
                        <router-link tag="li" to="/indexpage/history">历史住院清单</router-link>
                        <router-link tag="li" to="/indexpage/payment">住院押金充值</router-link>
                    </ul>
                </div>
                <div class="center-right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTip from 'base/header-tip/header-tip'
export default {
    components:{
        HeaderTip
    }
}
</script>