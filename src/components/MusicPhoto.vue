<template>
  <div class="music-photo">
    <div class="photo-title" @click="toPhotoDetail">
      <p class="title">{{ photo_1.title }}</p>
    </div>
    <div class="music-photo-main">
      <img
        v-if="!selectedImage"
        :src="baseUrl + photo_1.imgurl"
        class="photo-img"
        @click="toPhotoDetail"
      />
      <img :src="selectedImage" v-if="selectedImage" class="photo-img" @click="toPhotoDetail" />
      <div class="photo-like" @click="clickLike">
        <span class="iconfont icon-xin" :class="{ islike: photo_1.islike[0].count > 0 }" />
        <span class="value">{{ photo_1.like[0].count }}</span>
      </div>
      <div class="icon" v-show="photo_1.comcount[0].count > 0" @click="toPhotoDetail">
        <span class="iconfont icon-pinglun" />
        <span class="value">{{ photo_1.comcount[0].count }}</span>
      </div>
      <div class="icon1" v-if="this.user.id == '1'" @click="deletePhoto">
        <span class="iconfont icon-cha" />
      </div>
    </div>
    <!-- <div class="image-box" v-if="selectedImage">
            <img :src="selectedImage" alt="Selected Image">
        </div>  -->
  </div>
</template>
<script>
import { baseUrl } from '@/utils/env';
import { insertphotoFeedbackApi, deletePhotoApi } from '@/api/index';
export default {
  data() {
    return {
      baseUrl,
    };
  },
  created() {
    // alert('MusicPhoto')
    console.log(this.photo);
  },
  mounted() {},
  props: {
    photo: {
      default: {
        title: '',
        like: [{ count: 0 }, { count: 0 }],
        islike: [{ count: 0 }],
        comcount: [{ count: 0 }],
        label: 0,
        id: 100,
      },
    },
  },
  computed: {
    selectedImage() {
      return this.$store.state.selectedImage;
    },
    photo_1() {
      return this.photo;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    toPhotoDetail() {
      if (this.user.id != '::1') {
        this.$emit('toPhotoDetail');
      } else {
        alert('请先登录');
        // 去往个人中心
        this.$router.push('/person');
      }
    },

    clickLike() {
      console.log(this.photo_1.id);
      if (this.photo_1.islike[0].count == 0) {
        // alert('click')
        console.log(this.user.id);
        let data = { type: 0, photoId: this.photo_1.id, userId: this.user.id, moment: new Date() };
        // 前端数据传入后端处理
        insertphotoFeedbackApi(data).then(() => {});
        // 重新渲染
        this.photo_1.like[0].count++;
        this.photo_1.islike[0].count++;
      }
    },

    deletePhoto() {
      console.log(this.photo_1.id);
      // alert('click')
      console.log(this.user.id);
      let data = { id: this.photo_1.id };
      // 前端数据传入后端处理
      deletePhotoApi(data).then(() => {
        this.$emit('clickbtn', this.photo_1.id);
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import '../assets//fonts/icon-xin/iconfont.css';
@import '../assets//fonts/icon-cha/iconfont.css';
.music-photo {
  position: relative;

  .music-photo-main {
    // 相对定位是指 当前设置的位置偏移都是相对 父 的位置而言
    position: relative;
    top: 15px;
    margin-bottom: 20px;

    width: 100%;
    height: auto;
    border: 1px solid #ccc;
    .photo-title {
      position: absolute;
      top: 50%; /* 相对于父元素的上边距离为 50% */
      left: 50%; /* 相对于父元素的左边距离为 50% */
      transform: translate(-50%, -50%); /* 通过 translate 进行居中偏移 */
    }

    .photo-img {
      width: 100%;
      height: auto;
    }
    .icon {
      opacity: 0;
      transition: @trans;

      position: absolute;
      // left:166px;
      left: 20px;
      top: 2px;
      padding-right: 8px;
      padding-left: 10px;
      display: flex;
      align-items: center;

      width: 40px;
      background: #e1e1e1;
      border-radius: 28px;

      padding-right: 8px;
      display: flex;
      align-items: center;

      .value {
        font-size: 14px;
        color: @gray-3;
        line-height: 16px;
        padding-left: 4px;
      }
      .icon-pinglun {
        cursor: pointer;
        transition: @trans;
      }
    }
    .icon {
      opacity: 0;
      transition: @trans;

      position: absolute;
      // left:166px;
      left: 20px;
      top: 2px;
      padding-right: 8px;
      padding-left: 10px;
      display: flex;
      align-items: center;

      width: 40px;
      background: #e1e1e1;
      border-radius: 28px;

      padding-right: 8px;
      display: flex;
      align-items: center;

      .value {
        font-size: 14px;
        color: @gray-3;
        line-height: 16px;
        padding-left: 4px;
      }
      .icon-pinglun {
        cursor: pointer;
        transition: @trans;
      }
    }
    .icon1 {
      opacity: 0;
      transition: @trans;

      position: absolute;
      // left:166px;
      right: 20px;
      top: 2px;
      padding-right: 8px;
      padding-left: 10px;
      display: flex;
      align-items: center;

      width: 40px;
      background: #e1e1e1;
      border-radius: 28px;

      padding-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      .value {
        font-size: 14px;
        color: @gray-3;
        line-height: 16px;
        padding-left: 4px;
      }
      .icon-pinglun {
        cursor: pointer;
        transition: @trans;
      }
    }
    .photo-like {
      opacity: 0;
      transition: @trans;

      position: absolute;

      right: 120px;
      top: 2px;
      padding-right: 8px;
      padding-left: 10px;
      display: flex;
      align-items: center;

      width: 40px;
      background: #e1e1e1;
      border-radius: 28px;
      .icon-xin {
        cursor: pointer;
        transition: @trans;
        &:hover {
          color: @like-color;
        }
      }
      .value {
        font-size: 14px;
        color: @gray-3;
        line-height: 16px;
        padding-left: 4px;
      }

      .islike {
        color: @like-color;
      }
    }
  }

  &:hover {
    .photo-like {
      opacity: 1;
    }
    .icon {
      opacity: 1;
    }
    .icon1 {
      opacity: 1;
    }
  }
}
</style>
