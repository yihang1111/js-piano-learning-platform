<template>
  <div class="new-card">
    <div class="card-main">
      <!-- 照片 -->
      <div class="choose-biaoqian" v-if="npFlag">
        <input type="text" disabled placeholder="选择标签..." class="input" />
        <span class="iconfont icon-biaoqian" @click="change_bqFlag" />
        <span class="biaoqian" @click="change_bqFlag">标签</span>
      </div>
      <br />
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
      <div class="title" v-if="npFlag">
        <div class="btn">
          <input type="text" class="name" placeholder="图片标题" v-model="title" />
        </div>
      </div>
      <div class="add-photo" v-if="npFlag">
        <input
          type="file"
          name="file"
          id="file"
          class="file"
          multiple="multiple"
          @change="showPhoto"
        />

        <div class="add-bt" v-if="url == ''">
          <span class="iconfont icon-jiahao" />
        </div>

        <div class="change-bt" v-if="url != ''">
          <span class="iconfont icon-xiugai" />
        </div>
        <div class="photo-div"><img :src="state.url" /></div>
      </div>
      <div class="upload_btn" v-if="npFlag">
        <DemoButton class="comm-btn" @click="upload">上传</DemoButton>
      </div>
      <br />
      <div class="form" v-if="!npFlag">
        <textarea class="message" placeholder="评论一下..." v-model="discuss" />
        <div class="btn">
          <input type="text" class="name" placeholder="签名" v-model="name" />
          <DemoButton class="comm-btn" @click="submit">发布</DemoButton>
        </div>
      </div>
      <p class="comment-top" v-if="!npFlag">评论 {{ photo.comcount[0].count }}</p>
      <div class="comment-main" v-if="!npFlag">
        <div class="comment-li" v-for="(item, index) in photocomments" :key="index">
          <div class="user-head" :style="{ backgroundImage: portrait[item.imgurl] }" />
          <div class="comment-right">
            <div class="right-top">
              <p class="name">{{ item.name }}</p>
              <p class="time">{{ switchdate(item.moment) }}</p>
            </div>
            <div class="right-mesg">{{ item.comment }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DemoButton from './DemoButton.vue';
import { portrait } from '@/utils/data';
import { switchdate } from '@/utils/switchTime';
import { label } from '@/utils/data';
import {
  insertPhotoCommentApi,
  profileApi,
  insertPhotoApi,
  findPhotoCommentPageApi,
} from '@/api/index';
// import { photos} from '../../mock/index'
import { getObjectURL } from '@/utils/switchTime';
import { signIpApi } from '@/api/index';

import { inject } from 'vue';

export default {
  data() {
    return {
      photocomments: [],
      // 标签
      label,
      label_num: -1,

      // 标签模态框
      bqFlag: false,

      portrait,
      switchdate,

      discuss: '',
      title: '未命名',

      page: 1,
      pagesize: 400,
    };
  },
  computed: {
    isDis() {
      if (this.discuss && this.name) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.state.user;
    },
    photo() {
      return this.photo1;
    },
    npFlag() {
      return this.np;
    },
    state() {
      const store = inject('store');
      return store.state;
    },
    url() {
      return this.$store.state.url;
    },
  },
  components: {
    DemoButton,
  },
  props: {
    biaoqian: {
      default: [],
    },
    id: {
      default: 1,
    },
    photo1: {
      default: {
        like: [{ count: 0 }],
        islike: [{ count: 0 }],
        comcount: [{ count: 0 }],
      },
    },
    np: {
      default: false,
    },
  },
  created() {},
  mounted() {
    this.getComment(); // 请求新数据
  },
  watch: {
    photo() {
      this.page = 1;
      this.photocomments = [];
      this.getComment();
    },
  },
  methods: {
    getUserIp() {
      signIpApi()
        .then((res) => {
          console.log(res);
          let user = {
            id: res.ip,
          };
          this.$store.commit('getUser', user);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    },
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

    submit() {
      if (this.isDis) {
        // console.log(this.isDis);
        let img = Math.floor(Math.random() * 14);
        let data = {
          photoId: this.photo.id,
          userId: this.user.id,
          moment: new Date(),
          imgurl: img,
          comment: this.discuss,
          name: this.name,
        };
        // console.log(data);
        insertPhotoCommentApi(data).then(() => {
          // console.log(data);
          this.photocomments.unshift(data);
          this.photo.comcount[0].count++;

          // 清空评论框
          this.discuss = '';
        });
      }
    },
    // 从后端获取评论
    getComment() {
      // alert('wo')
      if (this.page == 1) {
        let data = {
          page: this.page,
          pagesize: this.pagesize,
          id: this.photo.id,
        };

        // alert(data)
        findPhotoCommentPageApi(data).then((res) => {
          this.photocomments = this.photocomments.concat(res.message);
          // console.log(this.photocomments);
        });
      }
    },

    // 图片显示
    showPhoto() {
      const fileInput = document.getElementById('file');
      console.log(fileInput);
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];

        this.state.url = getObjectURL(file);
      }
    },
    upload() {
      let data = {
        type: this.id,
        imgurl: '',
        label: this.label_num,
        title: this.title,
      };
      if (this.id == 1 && this.url) {
        this.updatePhoto(data);
      }
    },
    // 图片提交
    updatePhoto(data) {
      let file = document.getElementById('file');
      if (file.files.length > 0) {
        let formData = new FormData();
        formData.append('file', file.files[0]);

        // 提交后端
        profileApi(formData).then((res) => {
          console.log(res);
          data.imgurl = res;

          insertPhotoApi(data).then((result) => {
            console.log(result);
            let photoData = {
              type: this.id,
              imgurl: data.res,
              id: result.message.insertId,
              label: this.label_num,
              islike: [{ count: 0 }],
              like: [{ count: 0 }],
              comcount: [{ count: 0 }],
              report: [{ count: 0 }],
              revoke: [{ count: 0 }],
            };
            this.$emit('clickbt', photoData);
            this.state.url = '';
            // this.$router.push({ name: 'PhotoPage', params: { param1: this.user.id}})
            location.reload();
            // alert(this.user.id)
          });
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '@/assets/fonts/icon-biaoqian/iconfont.css';
.new-card{
    padding: 0 20px;
    .card-main{

        position: relative;

        .choose-biaoqian{
            position: fixed;
            background: white;
            top: 52px;
            width: 100%;
            clip-path: inset(0 377px 0 0);
            .input{
                width: 50%;
                box-sizing: border-box;
                border: #dfdfdf 1px solid;
                background: none;

                padding:8px;
                margin-top: 10px;
                margin-bottom: 5px;
                margin-right: 10px;
            }

            .icon-biaoqian{
                cursor:pointer;
                color: #376bb6;
                margin-right: 3px;
            }
            .biaoqian{
                cursor:pointer;
                font-size: 13px;
                color: #376bb6;
            }


        }

        .upload_btn{
            position: fixed;
            bottom: 84px;
            right: 40px;
        }

        .add-photo{
            padding-bottom: 20px;
            position: relative;

            .file{
                position: absolute;
                z-index: 10;
                top: -1opx;
                width: 64px;
                height: 74px;
                opacity: 0;
                cursor: pointer;
            }
            .add-bt{
                width: 64px;
                height: 64px;
                border: 1px solid @gray-3;
                border-radius: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                .icon-jiahao{
                    font-size: 24px;
                }
            }
            .photo-div{
                // max-height: 200px;
                // height: 300px;
                width: 100%;
                background: #333;
                overflow: hidden;
                display: flex;
                align-items: center;

                img{
                    width: 100%;
                }
            }

            .change-bt{
                position: absolute;
                top: 12px;
                left: 12px;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                background: rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;

                .icon-xiugai{
                    color: white;
                }
            }


        }
        .form{
            .message{
                background: #fafafa;
                border:none;
                padding: 8px;
                box-sizing: border-box;
                margin-top: 12px;
                margin-left: 0px;
                resize:none;
                height: 100px;
                width: 90%;
            }
            .btn{
                padding-top: 6px;
                .name{
                    width: 200px;
                    height: 40px;

                    box-sizing: border-box;
                    border: #dfdfdf 1px solid;
                    background: none;

                    padding: 8px;
                    padding-bottom: 2px;
                    margin-top: 8px;
                    margin-right: 20px;
                    margin-left: 0px;
                }
            }
        }

        .comment-top{
            // position: absolute;
            left: 60px;
            font-weight: 600;
            padding-top: 20px;
        }

        .comment-main{
            position: relative;
            top:50px;
            left: 30px;
            width: 95%;

            .comment-li{
                display: flex;
                padding-bottom: 30px;
                width: 88%;
                .user-head{
                    flex:none;
                    width: 28px;
                    height: 28px;
                    border-radius: 20px;
                    overflow: hidden;
                    // background-image: linear-gradient(180deg, #FFA9D9 0%, #E83D3D 100%);s
                }
                .comment-right{
                    padding-left: 8px;
                    width: 100%;
                    .right-top{
                        display: flex;
                        align-items: center;
                        .name{
                            font-weight: 600;
                        }
                        .time{
                            font-size: 12px;
                            padding-left: 4px;
                            color: @gray-3;
                        }
                    }

                    .right-mesg{
                        padding-top: 4px;
                        // width: 800px; /* 固定宽度 */
                        min-height: 20px; /* 设置一个最小高度，以确保内容较少时也有一定高度 */
                        white-space: normal;

                        overflow: hidden; /* 隐藏溢出部分的文字 */
                        // white-space: nowrap; /* 文字不换行 */
                        text-overflow: ellipsis; /* 使用省略号表示文本被截断 */
                    }
                }

            }
        }
         /* 取消文字选中 */
        user-select: none;

        height: 270px;
        background: white;
        padding: 12px;

        .choose-biaoqian{
            position: fixed;
            background: white;
            top: 52px;
            width: 100%;
            clip-path: inset(0 85px 0 0);
            .input{
                width: 50%;
                box-sizing: border-box;
                border: #dfdfdf 1px solid;
                background: none;

                padding:8px;
                margin-top: 10px;
                margin-bottom: 5px;
                margin-right: 10px;
            }

            .icon-biaoqian{
                cursor:pointer;
                color: #376bb6;
                margin-right: 3px;
            }
            .biaoqian{
                cursor:pointer;
                font-size: 13px;
                color: #376bb6;
            }


        }
        .text{
            padding-top: 0px;
            .message{
                background: #fafafa;
                border:none;
                padding: 8px;
                padding-top: 10px;
                box-sizing: border-box;
                resize:none;

                height: 200px;
                width: 100%;

            }
        }


        .label{
            width: 150px;

            position: fixed;
            z-index: 1000;
            top: 100px;
            left: 55%;

            border: #bfbfbf solid 1px;
            box-shadow: 0 0 2px 2px #e5e5e5;
            .label-top{
                height: 30px;
                background: #fafafa;

                .content{
                    line-height: 30px;
                    text-align:left;
                    padding-left: 10px;
                    font-weight: 600;
                }
            }
            .label-main{
                padding:5px 0 10px 10px;
                background: white;


                .icon-biaoqian{
                    color: #376bb6;
                }
                .biaoqian{

                    cursor:pointer;

                    padding: 3px 8px;
                    border-radius: 20px;
                    margin-left: 3px;
                    font-size: 13px;
                    color: #376bb6;
                }
            }
            .labelSelected{
                background: #EBEBEB;
                font-weight: 600;
            }
        }

        .title{

            .btn{
                padding-top: 6px;
                .comm-btn{
                    position: relative;
                    left: 5px
                    // margin-left: 5%;
                }
                .name{
                    width: 200px;
                    height: 40px;

                    box-sizing: border-box;
                    border: #dfdfdf 1px solid;
                    background: none;

                    padding: 8px;
                    padding-top: 2px;
                    padding-bottom: 2px;
                    margin-right: 20px;
                    margin-bottom: 10px;
                }
            }
        }

    }
    .footbtn{
        clip-path: inset(0 63px 0 0);
        padding: 20px 40px;
        box-sizing: border-box;
        position: fixed;
        bottom: 0px;
        width: 100%;
        background-color: white;
        .submit{
            position: relative;
            left: 500px;
        }
        .concel{
            margin-left: 100px;
        }

    }
}
</style>
