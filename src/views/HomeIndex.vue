<template>
    <div class="home">
        <HeaderBar></HeaderBar>
        <router-view></router-view>
        <!-- 使用组件 -->
    </div>
</template>

<script>
// 引入组件
import HeaderBar from '@/components/HeaderBar.vue'
import {signIpApi} from '@/api/index'
export default {
    data(){
        return{

        }
    },

    components:{
        // 注册组件
        HeaderBar,
    },

    computed:{

    },
    mounted(){
    },

    created(){
        this.getUser()
    },

    methods:{
        getUser(){
            signIpApi().then((res) => {
                // console.log(res);
                let user = {
                    id: res.ip,
                }
                this.$store.commit('getUser', user)
            }).catch((error) => {
                console.error("Error fetching user:", error);
            });
        }
    }

}
    
</script>
<style lang="less" scoped>
// @import url(../styles/commons.less);
// 引入icon的css文件
// @import '../assets/fonts/icon/iconfont.css';


</style>