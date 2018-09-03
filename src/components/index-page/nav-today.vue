<template>
    <div class="center-right-wrapper">
        <section>
            <header class="right-header">
                <h1>请选择查询方式</h1>
            </header>
            <ul class="select-card">
                <li>
                    <div @click="identity()">
                        <span class="fa fa-user fa-3x"></span>
                        <span><i>身份证</i><i>凭身份证查询</i></span>
                    </div>
                </li>
                <li>
                    <div>
                        <span class="fa fa-address-card-o fa-2x"></span>
                        <span><i>社保卡</i><i>凭社保卡查询</i></span>
                    </div>
                </li>
                <li>
                    <div @click="jzk">
                        <span class="fa fa-credit-card fa-2x"></span>
                        <span><i>就诊卡</i><i>凭就诊卡查询</i></span>
                    </div>
                </li>
                <li>
                    <div @click="zyh">
                        <span class="fa fa-id-badge fa-2x"></span>
                        <span><i>住院号</i><i>凭住院号查询</i></span>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    methods: {
        // 身份证信息校验
        identity() {
            // 设置cardType
            this.$store.commit('setCardType',1)
            this.nextPage()
        },
        // 就诊卡信息校验
        jzk() {
            this.$store.commit('setCardType',4)
            this.nextPage()
        },
        zyh() {
            this.$store.commit('setCardType',3)
            this.nextPage()           
        },
        nextPage () {
          this.$router.push({name:"todayone"})
        }
    },
}
</script>