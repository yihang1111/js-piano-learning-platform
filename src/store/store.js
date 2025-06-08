import { createStore } from 'vuex'
// 导入 Vuex 库，Vuex 是 Vue.js 的状态管理库，用于管理应用程序中的共享状态。

import pckey2key from './pckey-key';


export default createStore({
  state() {
    return {
      mainDoc: '', // 主文档
      hideNavBar: false, // 是否隐藏导航条
      cacheConf: {
        showKbdNum: false, // 显示键盘上的数字
        scale: 1, // 保存对barScale控制的参数，1-20
        barScale: 1, // 键盘可见区比例
        left: 0.5, // 0-1之间，表示键盘偏移数据
        pckey2key: pckey2key(),
      },
      user: '',
      hello:{string: '游客'},
      url:'',
      showComponentC: true,
      showComponentP: false,
      id: 1,
    }
  },

  mutations: {
    setData(state, data) {
      state.mainDoc = data && data.doc;
    },
    // 获取用户标识
    getUser(state, user){
      state.user = user
    },
    // 欢迎语
    getHello(state, hello){
      state.hello = hello
    },
    setId(state, newId) {
      state.id = newId; // 更新用户 ID
    }
  },

  actions: {},

  // 如果你想添加 getters，也可以在这里定义
  getters: {
    // getter 函数可以在这里定义
  }
})


// export default function () {
//   const store = createStore({
//     state: {
//       mainDoc: '', // 主文档
//       hideNavBar: false, // 是否隐藏导航条
//       cacheConf: {
//         showKbdNum: true, // 显示键盘上的数字
//         scale: 1, // 保存对barScale控制的参数，1-20
//         barScale: 1, // 键盘可见区比例
//         left: 0.5, // 0-1之间，表示键盘偏移数据
//         pckey2key: pckey2key(),
//       },
//     },

//     mutations: {
//       setData(state, data) {
//         state.mainDoc = data && data.doc;
//       },
//     },

//     actions: {},
//   });

//   return store;
// }
