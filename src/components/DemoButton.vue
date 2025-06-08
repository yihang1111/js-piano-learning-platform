<template>
<!-- 通过 :class="[size, status]" 这样的绑定，组件的 CSS 类名将会根据 size 和 status 的值动态添加到元素上。 -->
    <button :class="[button_size, button_status]" class="demo_button"><slot></slot></button>
    
</template>
<script >
export default{
    props:{
        button_size:{
            default:'middle',
        },
        button_status:{
            default:'primary',
        }
    }
}
    
</script>
<style lang="less" scoped>
.demo_button{
    text-align: center;
    border: none;
    cursor:pointer;
}
// 五个字的按钮
.mmax{
    width:120px;
    height:35px;
    border-radius:24px;
    margin-left: 10px;
    padding: 0 24px;
    font-size: 14px;
    font-weight: 600; 
}
// 四个字的按钮
.max{
    width:120px;
    height:40px;
    border-radius:24px;
    padding: 0 24px;
    font-size: 18px;
    font-weight: 600;
}
// 两个字的按钮
.middle{
    width:100px;
    height:40px;
    border-radius:24px;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 600;
}
.small{
    width:70px;
    height:48px;
    border-radius:24px;
    padding: 0 20px;
}
.primary{
    background: @gray-1;
    color: @gray-10;
}
.secondary{
    background: @gray-10;
    color: @gray-1;
    border: 1px solid @gray-1;
}
.cprimary{
    background: @primary-color ;
    color: @gray-10;
    font-size: 600;
}
.csecondary{
    background: @gray-10;
    color: @gray-1;
}


.noteallowed{
    // 不可点击效果
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
