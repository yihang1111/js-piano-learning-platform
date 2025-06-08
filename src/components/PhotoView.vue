<template>
    <transition name="window" >
        <div class="photo-window-left">

            <div class="post-header" v-show="false">
                <div class="icon-box">
                    <span class="iconfont icon-cha" @click="changePFlag"></span>
                </div>  
            </div>
            

            <div class="post-main">
                <slot></slot>
                <!-- <div class="slot"></div> -->
            </div> 
        </div>
    </transition>
</template>
<script setup >
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
    label:{
        default:{},
    },
    id:{
        default:0,
    },
})

const emit = defineEmits(['changePFlag'])
function changePFlag(){
    emit('changePFlag');
}
// onMounted(closePost);

props;
</script>
<style lang="less" scoped>
@import '@/assets/fonts/icon-cha/iconfont.css';
.window{
    width: 50%;
    position: relative;
    &-enter{
        &-from{
            transform: translateY(300px);
        }
        &-active{
            transition: @slow-trans;
        }
        &-to{
            transform: translateY(0px);
        }
    }
    &-leave{
        &-from{
            transform: translateY(0px);
        }
        &-active{
            transition: @fast-trans;
        }
        &-to{
            transform: translateY(300px);
        }
    }

}

.photo-window-left{
    
    background: #fafafa;
    width: 100%;
    height: 100%;
    z-index: 1000;

    position: fixed;
    top:60px;
    right:0px;
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);

    .label{
        position: fixed;
        top:0px;
        z-index: 99999;
        margin-top: 0px;

        background-color: white;
        box-shadow: 0 0 0px 0px ;
        width:100%;
        transition: @slow-trans;
        
        display: flex;
        justify-content: flex-start;
        padding-left: 40px;

        .label-list{
            padding: 0 14px;
            line-height: 28px;
            margin: 4px;
            color: @gray-2;
            
            // 改变鼠标样式
            cursor:pointer;
        }
        .labelSelected{
            color: @gray-1;
            font-weight: 600;
            border: 1px solid @gray-1;
            border-radius: 14px;
        }   
    }

    .post-main{
        // border: 1px solid #eee;
        background: white;
        width: 1000px;
        box-sizing: border-box; 
    }
}

</style>

