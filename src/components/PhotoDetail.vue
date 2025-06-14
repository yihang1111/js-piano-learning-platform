<template>
  <div class="photo-detail">
    <div class="bg" />

    <div class="viewer-photo" ref="postMain">
      <div class="box-img" @wheel.prevent="handleWindowWheel">
        <!-- photos[0] -->
        <img :src="baseUrl + photo_1.imgurl" class="photo-img" />
      </div>
    </div>

    <!-- <div class="text">
            <textarea placeholder="内容..." class="message" maxlength="500" v-model="message"></textarea> 
            <textarea placeholder="内容..." class="message" maxlength="500"></textarea>
        </div> -->
    <!-- <div class="viewer-photo">
            <img src="../../static/0.jpg" class="photo-img"/>
        </div> -->

    <div class="switch sw-left" v-if="npFlag">
      <span class="iconfont icon-xiangzuo" />
    </div>
    <div class="switch sw-right" v-if="npFlag">
      <span class="iconfont icon-xiangyou" />
    </div>
  </div>
</template>
<script>
import { photos } from '../../mock/index';
import { baseUrl } from '@/utils/env';
import { ref } from 'vue';
photos;
export default {
  data() {
    return {
      baseUrl,
    };
  },
  created() {
    console.log(this.photo_1);
  },
  computed: {
    npFlag() {
      return this.np;
    },
    url() {
      return this.$store.state.url;
    },
    photo_1() {
      return this.photo;
    },
  },
  props: {
    photo: {
      default: {
        like: [{ count: 0 }],
        islike: [{ count: 0 }],
        comcount: [{ count: 0 }, { count: 0 }],
        photoId: 1,
        imgurl: '',
        title: '',
      },
    },

    np: {
      default: false,
    },
  },
  setup() {
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
    return {
      handleWindowWheel,
      postMain,
    };
  },
};

// imgurl.value = props.photoSelected

// const translateY = ref(0); // 定义一个响应式变量用于控制滚动效果
</script>
<style lang="less" scoped>
@import '../assets/fonts/icon-xiangzuo/iconfont.css';
@import '../assets/fonts/icon-xiangyou/iconfont.css';

.photo-detail {
  position: fixed;
  left: 0;

  width: 100%;
  height: 100%;
  border: 1px solid red;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    height: 100%;
    width: 100%;
  }
  .viewer-photo {
    position: relative;
    // 上 左 下 右
    padding: 0 455px 0 20px;

    box-sizing: border-box;
    width: 100%;
    height: 100%;

    // 让图片滚动起来
    overflow-y: auto;

    .box-img {
      height: 100%;
      margin-top: 40px;
      padding-bottom: 150px;
      .photo-img {
        // top:10px;
        // bottom: 10px;

        border: 1px solid black;
        width: 800px;
        height: auto;

        cursor: pointer;
      }
    }
  }
  .viewer-photo::-webkit-scrollbar {
    width: 6px;
    height: 4px;
  }
  .viewer-photo::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }
  .viewer-photo::-webkit-scrollbar-track {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0);
  }

  .switch {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #949494;
    color: @gray-10;

    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0.5;
    transition: @trans;
    cursor: pointer;

    .iconfont {
      font-size: 24px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .sw-left {
    left: 20px;
  }
  .sw-right {
    right: 460px;
  }
}
</style>
