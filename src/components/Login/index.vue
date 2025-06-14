<template>
  <div class="login-container">
    <HeaderBar style="height: 14px" />
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li />
            <li>
              <a class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span />
                <input type="text" placeholder="邮箱/用户名/手机号" v-model="username" />
              </div>
              <div class="input-text clearFix">
                <span class="pwd" />
                <input type="text" placeholder="请输入密码" v-model="password" />
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="" />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click="goPhotoPage">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import { loginApi } from '@/api/index';
import { inject } from 'vue';
export default {
  name: 'PersonLogin',
  data() {
    return {
      // 用户
      username: '',
      // 密码
      password: '',

      // 用户信息
      user: [],
    };
  },
  components: {
    HeaderBar,
  },
  computed: {
    state() {
      const store = inject('store');
      return store.state;
    },
    id() {
      return this.$store.state.id;
    },
  },
  methods: {
    goPhotoPage() {
      if (this.username && this.password) {
        let userData = {
          username: this.username,
          password: this.password,
        };
        // console.log(userData);
        loginApi(userData)
          .then((res) => {
            // console.log(res);
            this.user = this.user.concat(res.message);

            // console.log(this.user[0].id); 3

            // 假设登录成功后，从响应中获取用户ID，并存储到状态中
            if (this.user[0].id) {
              let k = `${this.user[0].id}`;
              let user = {
                id: k,
              };
              this.$store.commit('getUser', user);
            } else {
              console.error('User ID not found in response data.');
            }

            // 登录成功后重定向到/PhotoPage
            alert('登录成功');
            this.$router.push('/PhotoPage');
          })
          .catch((error) => {
            console.error('Login error:', error);
            let user = {
              id: '::1',
            };
            this.$store.commit('getUser', user);
            alert('登录失败'); // 提示登录失败
          });
      } else {
        alert('输入用户名和密码'); // 提示输入用户名和密码
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #256492;
    // background: url(./images/loginbg.png) no-repeat;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      // background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      left: 32.7%;
      position: relative;
      padding: 20px;
      top: 20px;
      border-radius: 25px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            // border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            color: #1f7ac9;
            width: 300px;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 12px;
        // border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 40px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(../../assets/images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #1f7ac9;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #1f7ac9;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            margin-left: -20px;
            // float: left;

            li {
              float: left;
              margin-right: 5px;
              margin-bottom: 5px;
              img {
                margin-bottom: 2px;
              }
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
