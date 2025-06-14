<template>
  <div class="person">
    <PianoBanner />
    <register />
  </div>
</template>

<script>
// 引入组件
import register from '@/components/Register/index.vue';
import PianoBanner from '@/components/PianoBanner.vue';

export default {
  data() {
    return {};
  },

  components: {
    // 注册组件
    register,
    PianoBanner,
  },

  // 在这里，state 计算属性依赖于 this.$store.state，因此当 Vuex store 的状态发生变化时，state 会自动更新。
  // 通过这种方式，组件可以轻松地访问 Vuex store 中的状态，并且能够实时响应状态的变化。
  computed: {
    // state() {
    //     const store = inject('store')
    //     return store.state;
    // },
  },

  methods: {},
};
</script>
<style lang="less" scoped></style>
