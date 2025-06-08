<template>
  <div class="visit-ct">
    
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    mainDoc() {
      return this.$store.state.mainDoc;
    },
  },

  methods: {
    
  },
};
</script>

<style lang="stylus">
.visit-ct {
  width 100%;
  height 100%;
  background-image url("@/assets/images/deepblue.png")
  z-index 100;
}
</style>
