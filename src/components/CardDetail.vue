<template>
  <div class="card-detail">
    <TalkCard :cards="card" :id="id" class="card" />

    <div class="form">
      <textarea class="message" placeholder="评论一下..." v-model="discuss" />
      <div class="btn">
        <input type="text" class="name" placeholder="签名" v-model="name" />
        <DemoButton class="comm-btn" :class="{ noteallowed: !isDis }" @click="submit"
          >评论</DemoButton
        >
      </div>
    </div>

    <p class="comment-top">评论 {{ card.comcount[0].count }}</p>
    <div class="comment-main">
      <div class="comment-li" v-for="(item, index) in comments" :key="index">
        <div class="user-head" :style="{ backgroundImage: portrait[item.imgurl] }" />
        <div class="comment-right">
          <div class="right-top">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ switchdate(item.moment) }}</p>
          </div>
          <div class="right-mesg">{{ item.comment }}</div>
        </div>
      </div>
      <!-- <p class="more" @click="getComment" v-show="false">加载更多</p> -->
    </div>
  </div>
</template>
<script>
import TalkCard from './TalkCard.vue';
import DemoButton from './DemoButton.vue';
import { portrait } from '@/utils/data';
import { switchdate } from '@/utils/switchTime';
import { insertCommentApi } from '@/api/index';
import { findCommentPageApi } from '@/api/index';
export default {
  data() {
    return {
      // 评论真数据
      comments: [],

      portrait,
      switchdate,

      discuss: '',
      name: '匿名',

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
    card() {
      return this.cards;
    },
    user() {
      return this.$store.state.user;
    },
    getflag() {
      return this.getFlag;
    },
  },
  props: {
    cards: {
      default: {
        like: [{ count: 0 }],
        islike: [{ count: 0 }],
        comcount: [{ count: 0 }],
      },
    },
    id: {
      default: 0,
    },
    getFlag: {
      default: false,
    },
  },
  methods: {
    submit() {
      if (this.isDis) {
        let img = Math.floor(Math.random() * 14);
        let data = {
          postId: this.card.id,
          userId: this.user.id,
          moment: new Date(),
          imgurl: img,
          comment: this.discuss,
          name: this.name,
        };
        console.log(data);
        insertCommentApi(data).then(() => {
          // console.log(data);
          this.comments.unshift(data);
          this.card.comcount[0].count++;

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
          id: this.card.id,
        };
        // console.log(this.card.id);
        findCommentPageApi(data).then((res) => {
          this.comments = this.comments.concat(res.message);

          // console.log(res.message);
          // console.log(res.message.length,this.nowpage);
          // if(res.message.length == this.pagesize){
          //     this.page ++
          // }else{
          //     this.page = 0
          // }
          // console.log(this.comments);
        });
      }
    },
  },
  mounted() {
    this.getComment(); // 请求新数据
  },
  watch: {
    card() {
      this.page = 1;
      this.comments = [];
      this.getComment();
    },
  },

  components: {
    TalkCard,
    DemoButton,
  },
};
</script>
<style lang="less" scoped>
.card-detail{
    position: relative;
    padding: 10px;

    .card{
        border: 1px solid @primary-color;
    }
    .top-btn{

        position: fixed;
        background: white;
        top: 52px;
        width: 100%;
        clip-path: inset(0 377px 0 0);

        padding: 10px;
        display: flex;
        .revoke{
            color: @primary-color;
            cursor: pointer;
            padding-right: 30px;
            font-size: 16px;
        }
        .report{
            color:@warning-color;
            font-size: 16px;
        }
        .icon-box{
            width: 25px;
            height: 25px;
            margin-left: 850px;
            padding-left: 8px;

            cursor:pointer;
            transition: @trans;
            &:hover{
                background-color: #f0f0f0;
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
            margin-left: 40px;
            resize:none;
            height: 100px;
            width: 90%;
        }
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
                padding-bottom: 2px;
                margin-top: 8px;
                margin-right: 20px;
                margin-left: 60%;
            }
        }
    }
    .comment-top{
        position: absolute;
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
                    width: 800px; /* 固定宽度 */
                    min-height: 20px; /* 设置一个最小高度，以确保内容较少时也有一定高度 */
                    white-space: normal;

                    overflow: hidden; /* 隐藏溢出部分的文字 */
                    // white-space: nowrap; /* 文字不换行 */
                    text-overflow: ellipsis; /* 使用省略号表示文本被截断 */
                }
            }

        }

        .more{
            color:@gray-2;
            text-align: center;
            padding: 20px;

            cursor: pointer;
        }
    }
}
</style>
