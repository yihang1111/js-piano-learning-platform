<template>
  <div class="new-card">
    <!-- 帖子 -->
    <div class="card-main">
      <!-- <div class="blank"></div> -->

      <div class="choose-biaoqian">
        <input type="text" disabled placeholder="选择标签..." class="input" />
        <span class="iconfont icon-biaoqian" @click="change_bqFlag" />
        <span class="biaoqian" @click="change_bqFlag">标签</span>
      </div>

      <!-- bqFlag  -->
      <div class="label" v-show="bqFlag">
        <div class="label-top">
          <p class="content">选择标签</p>
        </div>
        <div class="label-main">
          <p class="iconfont icon-biaoqian" v-for="(item, index) in label[id]" :key="index">
            <span
              class="biaoqian"
              :class="{ labelSelected: label_num == index }"
              @click="SwitchListNode(index)"
              >{{ item }}</span
            >
          </p>
        </div>
      </div>

      <br />
      <div class="text">
        <textarea placeholder="内容..." class="message" maxlength="500" v-model="message" />
        <!-- <textarea placeholder="内容..." class="message" maxlength="500"></textarea> -->
      </div>
    </div>
    <div class="footbtn" v-show="true">
      <DemoButton button_size="max" button_status="secondary" @click="closeNewCard" class="concel"
        >取消</DemoButton
      >
      <DemoButton button_size="max" class="submit" @click="submit">发布</DemoButton>
    </div>
  </div>
</template>
<script>
import { label } from '@/utils/data';
import DemoButton from './DemoButton.vue';
// profileApi
import { insertWallApi } from '@/api/index';
export default {
  data() {
    return {
      // 标签
      label,
      label_num: 0,

      // 标签模态框
      bqFlag: false,

      // 内容
      message: '',
      // 作者
      name: 'aaa',
    };
  },
  computed: {
    // 标记游客
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.getUser();
  },
  components: {
    DemoButton,
  },
  props: {
    biaoqian: {
      default: [],
    },
    id: {
      default: 0,
    },
  },
  methods: {
    SwitchListNode(index) {
      this.label_num = index;
    },
    // 打开或关闭标签模态框
    change_bqFlag() {
      this.bqFlag = !this.bqFlag;
    },

    // 关闭这个 新建内容 的模态框
    closeNewCard() {
      this.$emit('newCardClose');
    },

    // 处理得到游客唯一标识 userId
    getUser() {
      let timer = setInterval(() => {
        if (this.user) {
          clearInterval(timer);
        }
      }, 10);
    },

    // 提交 新建帖
    submit() {
      // 标签模态框修改为不弹出状态
      this.bqFlag = false;

      let data = {
        type: this.id,
        message: this.message,
        userId: this.user.id,
        name: '匿名',
        moment: new Date(),
        label: this.label_num,
      };
      // console.log(data);

      // 输入的帖子内容不为空，则会将数据写入数据库
      if (this.message) {
        insertWallApi(data)
          .then((res) => {
            // 后端处理后的数据是res
            // console.log(res);

            let newdata = {
              type: this.id,
              message: this.message,
              userId: this.user.id,
              name: '匿名',
              moment: new Date(),
              label: this.label_num,
              id: res.message.insertId,
              islike: [{ count: 0 }],
              like: [{ count: 0 }],
              comcount: [{ count: 0 }],
              report: [{ count: 0 }],
              revoke: [{ count: 0 }],
            };
            // 触发数据渲染并插入页面事件
            this.$emit('clickbtn', newdata);
            this.message = '';
          })
          .catch((error) => {
            console.error('Error fetching user:', error);
          });
      }
    },

    //
    showPhoto() {},
    // 图片提交
    updatePhoto() {},
  },
};
</script>
<style lang="less" scoped>
@import '@/assets/fonts/icon-biaoqian/iconfont.css';
@import '../assets/fonts/icon-jiahao/iconfont.css';
@import '../assets/fonts/icon-xiugai/iconfont.css';
.new-card {
  padding: 0 20px;

  .card-main {
    position: relative;
    .blank {
      clip-path: inset(0 85px 0 0);
      position: absolute;
      top: 13.65%;
      border: #376bb6 0px solid;
      height: 18px;
      width: 100%;
      background-color: white;
    }

    /* 取消文字选中 */
    user-select: none;

    height: 270px;
    background: white;
    padding: 12px;

    .choose-biaoqian {
      position: fixed;
      background: white;
      top: 52px;
      width: 100%;
      clip-path: inset(0 377px 0 0);
      .input {
        width: 50%;
        box-sizing: border-box;
        border: #dfdfdf 1px solid;
        background: none;

        padding: 8px;
        margin-top: 10px;
        margin-bottom: 5px;
        margin-right: 10px;
      }

      .icon-biaoqian {
        cursor: pointer;
        color: #376bb6;
        margin-right: 3px;
      }
      .biaoqian {
        cursor: pointer;
        font-size: 13px;
        color: #376bb6;
      }
    }
    .text {
      padding-top: 15px;
      .message {
        background: #fafafa;
        border: none;
        padding: 8px;
        padding-top: 10px;
        box-sizing: border-box;
        resize: none;

        height: 280px;
        width: 100%;
      }
    }

    .label {
      width: 150px;

      position: fixed;
      z-index: 1000;
      top: 100px;
      left: 55%;

      border: #bfbfbf solid 1px;
      box-shadow: 0 0 2px 2px #e5e5e5;
      .label-top {
        height: 30px;
        background: #fafafa;

        .content {
          line-height: 30px;
          text-align: left;
          padding-left: 10px;
          font-weight: 600;
        }
      }
      .label-main {
        padding: 5px 0 10px 10px;
        background: white;

        .icon-biaoqian {
          color: #376bb6;
        }
        .biaoqian {
          cursor: pointer;

          padding: 3px 8px;
          border-radius: 20px;
          margin-left: 3px;
          font-size: 13px;
          color: #376bb6;
        }
      }
      .labelSelected {
        background: #ebebeb;
        font-weight: 600;
      }
    }
  }
  .footbtn {
    clip-path: inset(0 63px 0 0);
    padding: 20px 40px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
    left: 20px;
    width: 100%;
    // background-color: white;
    // .submit{
    //     // position: relative;
    //     // left: 500px;
    // }
    .concel {
      margin-left: 100px;
      margin-right: 400px;
    }
  }
}
</style>
