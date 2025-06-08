<template>
    <div class="top-bar">
      
    </div>
  </template>
  
  <script>
  export default {
    data(){
      return{
        
      }
    },
    components:{
    },
    computed:{
        id(){
            return this.$store.state.id
        },
        user(){
            return this.$store.state.user
        },
    },
    created(){
      
    },
    mounted(){
    },
    methods:{
    }
  }
  </script>
  
  <style lang="less" scoped>
  .top-bar{
   
  }
  </style>
