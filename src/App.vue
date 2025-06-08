<template>
  <div class="container" @click="close_bq">
    <router-view></router-view>  
    <!-- <PersonCenter></PersonCenter> -->
  </div>
  
</template>

<script>

// import { PersonCenter } from "./views/PersonCenter.vue";
export default {
  name: 'App',
  components: {
    // PersonCenter
  },
  methods:{
    
  }

}
</script>

<style lang="less">
.container{
  background-color: #f8f8f8;
}
</style>
