<template>
  <transition name="window">
    <div class="post-window" v-show="wFlag">
      <div class="post-header">
        <div class="top-btn" v-show="rr">
          <p class="revoke">联系作者</p>
          <p class="report">举报</p>
          <p class="report" v-if="id == '1'" @click="deleteCard">删除</p>
        </div>
        <p class="action-name">{{ title }}</p>
        <div class="icon-box">
          <span class="iconfont icon-cha" @click="changePostW" />
        </div>
      </div>

      <div class="post-main" ref="postMain" @wheel.prevent="handleWindowWheel">
        <slot />
      </div>
    </div>
  </transition>
</template>
<script setup>
import store from '@/store/store';
import { defineProps, defineEmits, ref, computed } from 'vue';

// const translateY = ref(0); // 定义一个响应式变量用于控制滚动效果
const postMain = ref(null);

const handleWindowWheel = (event) => {
  const delta = event.deltaY;
  const speed = Math.abs(delta) < 100 ? 1 : Math.ceil(Math.abs(delta) / 100);

  let scrollDistance = speed * (delta > 0 ? 20 : -20);

  if (postMain.value.scrollTop === 0 && delta < 0) {
    scrollDistance = 0;
  } else if (
    postMain.value.scrollTop + postMain.value.clientHeight >= postMain.value.scrollHeight &&
    delta > 0
  ) {
    scrollDistance = 0;
  }

  postMain.value.scrollTop += scrollDistance;
};

const props = defineProps({
  title: {
    default: '标题',
  },
  wFlag: {
    default: false,
  },

  label: {
    default: {},
  },
  id: {
    default: 0,
  },
  rr: {
    default: false,
  },
});

const id = computed(() => store.state.user.id);
const emit = defineEmits(['changeW']);

// 该方法触发 在父组件中使用的本组件 其上定义的事件 changeW 方法
function deleteCard() {
  emit('clickbtn');
}
function changePostW() {
  // event.preventDefault();
  emit('changeW', -1);
}

// onMounted(closePost);

props;
</script>
<style lang="less" scoped>
@import '@/assets/fonts/icon-cha/iconfont.css';
.window {
  &-enter {
    &-from {
      transform: translateY(300px);
    }
    &-active {
      transition: @trans;
    }
    &-to {
      transform: translateY(0px);
    }
  }
  &-leave {
    &-from {
      transform: translateY(0px);
    }
    &-active {
      transition: @trans;
    }
    &-to {
      transform: translateY(300px);
    }
  }
}

.post-window {
  background: #fafafa;
  padding: 40px;
  padding-top: 10px;
  margin-left: 0px;
  width: 100%;
  // height: 100%;
  height: 450px;
  z-index: 1000;

  position: fixed;
  top: 97px;
  // right:0px;

  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);

  .post-header {
    display: flex;
    justify-content: space-between;
    position: relative;

    width: 78%;

    .top-btn {
      position: fixed;
      // background: white;
      top: 3px;
      width: 60%;
      clip-path: inset(0 377px 0 0);

      padding: 10px;
      display: flex;
      .revoke {
        color: @primary-color;
        cursor: pointer;
        padding-right: 30px;
        font-size: 16px;
      }
      .report {
        color: @primary-color;
        cursor: pointer;
        color: @warning-color;
        font-size: 16px;
        margin-right: 30px;
      }
      .icon-box {
        width: 25px;
        height: 25px;
        margin-left: 850px;
        padding-left: 8px;

        cursor: pointer;
        transition: @trans;
        &:hover {
          background-color: #f0f0f0;
        }
      }
    }

    .action-name {
      font-size: 16px;
      color: @gray-1;
      font-weight: 600;
    }
    .icon-box {
      width: 25px;
      height: 25px;
      padding-left: 10px;
      padding-top: 5px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: @trans;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .post-main {
    // border: 1px solid #eee;
    background: white;
    width: 1000px;
    height: 80%;
    overflow-x: auto;
    margin: 2px;
    // padding: 20px;

    // 在需要时显示垂直滚动条，当内容超出容器高度时才会显示垂直滚动条，否则不显示。
    overflow-y: auto;
    box-sizing: border-box;
  }

  .post-main::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  .post-main::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }
  .post-main::-webkit-scrollbar-track {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }
}
</style>
