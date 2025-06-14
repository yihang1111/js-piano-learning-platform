<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a> </span>
      </h3>
      <div class="content">
        <label>用户名:</label>
        <input type="text" placeholder="请输入你的用户名" v-model="username" />
        <span class="error-msg" v-if="userflag">用户名不能为空</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password" />
        <span class="error-msg" v-if="codeflag">密码不能为空</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1" />
        <span class="error-msg" v-if="code1flag">密码不一致</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree" />
        <span>同意协议并注册《用户协议》</span>
      </div>
      <div class="btn">
        <DemoButton button_size="mmax" @click="userRegister">注册</DemoButton>
      </div>
    </div>
  </div>
</template>

<script>
import DemoButton from '../DemoButton.vue';
import { reguserApi } from '@/api/index';
export default {
  name: 'RegisterPage',
  data() {
    return {
      // 用户
      username: '',
      // 密码
      password: '',
      password1: '',
      agree: true,
      codeflag: false,
      userflag: false,
      code1flag: false,
    };
  },
  components: {
    DemoButton,
  },
  methods: {
    // 用户注册
    userRegister() {
      if (this.password != this.password1) {
        this.code1flag = true;
      }
      // 提交后端
      if (this.username && this.password && this.password == this.password1) {
        let userData = {
          username: this.username,
          password: this.password,
        };
        reguserApi(userData).then((res) => {
          console.log(res);
          this.$router.push('/person');
        });
      } else {
        alert('注册失败，请重新输入');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      // background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #1f7ac9;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 25px 0 0 44px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #1f7ac9;
        border: 1px solid #1f7ac9;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }
}
</style>
