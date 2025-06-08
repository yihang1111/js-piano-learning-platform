<template>
    
    <div class="photo-window-right">
        <div class="icon-box" >
            <p class="action-name" v-if="!np">{{ photo.title }} </p>
            <span class="iconfont icon-cha" @click="closePW"></span>
        </div>  
        <div class="post-main" ref="postMain"  @wheel.prevent="handleWindowWheel">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import {defineProps,defineEmits,ref} from 'vue'
const  props = defineProps({
    photo:{
        default:{}
    },
    np:{
        default:false,
    }
})
props;

    // const translateY = ref(0); // 定义一个响应式变量用于控制滚动效果
    const postMain = ref(null);

    const handleWindowWheel = (event) => {
        const delta = event.deltaY;
        const speed = Math.abs(delta) < 100 ? 1 : Math.ceil(Math.abs(delta) / 100);

        let scrollDistance = speed * (delta > 0 ? 20 : -20);

        if (postMain.value.scrollTop === 0 && delta < 0) {
            scrollDistance = 0;
        } else if (postMain.value.scrollTop + postMain.value.clientHeight >= postMain.value.scrollHeight && delta > 0) {
            scrollDistance = 0;
        }

        postMain.value.scrollTop += scrollDistance;
    };

    const emit = defineEmits(['closePW'])
    // 点击cha触发关闭窗口函数
    function closePW(){
        emit('closePW');
    }


</script>
<style lang="less" scoped>
@import '@/assets/fonts/icon-cha/iconfont.css';
.photo-window-right{

    background: white;
    // padding: 20px;
    padding-top: 10px;
    // margin-left: 40px;
    width: 32%;
    height: 100%;
    z-index: 1000;

    position: fixed;
    right: 0px;
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);
    .action-name{
        // display: flex;
        // align-items: center;
        // justify-content: center;
        position: relative;
        top:10px;
        left: -368px;

        width: 350px;

        font-size: 20px;
        color: @gray-1;
        font-weight: 600;
    }
    .blank{
        position: fixed;
        background: white;
        top: 78px;
        width: 110%;
        height: 30px;
        clip-path: inset(0 100px 0 0);
        // border: 1px solid red;
        z-index: 10;
    }

    .icon-box{
        width: 25px;
        height: 25px;
        margin-left: 380px;
        padding-left: 8px;
        padding-top: 3px;
        margin-top: 30px;
        margin-bottom: 10px;
        cursor:pointer;
        transition: @trans;
        // &:hover{
        //     background-color: #f0f0f0;
        // }
        .iconfont{
            position: fixed;
            top: 44px;
            left: 371px;
        }
    }

    .post-main{
        // border: 1px solid #eee;
        background: white;
        height: 400px;
        overflow-x: auto;
        margin-top: -80px;
        margin: 2px;
        // padding: 20px;

        // 在需要时显示垂直滚动条，当内容超出容器高度时才会显示垂直滚动条，否则不显示。
        overflow-y: auto;
        box-sizing: border-box; 
    }

    .post-main::-webkit-scrollbar{
        width: 4px;
        height: 4px;
    }
    .post-main::-webkit-scrollbar-thumb{
        border-radius: 4px;
        background: rgba(0,0,0,0.2);

    }
    .post-main::-webkit-scrollbar-track{
        border-radius: 4px;
        background: rgba(0,0,0,0);
    }
}
</style>
