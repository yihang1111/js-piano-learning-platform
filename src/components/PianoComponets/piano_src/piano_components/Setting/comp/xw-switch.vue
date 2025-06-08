<template>
  <div class="xw-switch" :class="{ 'on-state': !value }" @click="trigger">
    <div class="bar"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  emits: ['change'],
  methods: {
    trigger() {
      this.$emit('change', !this.value);
    },
  },
};
</script>

<style lang="stylus">
.xw-switch {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  padding: 2px 2px;
  margin: 0 2px;
  width: 32px; /* Adjust as needed */
  height: 14px;
  background: #999;
  border-radius: 7px; /* Half of the height */
  border: 2px solid #fff;
  transition: background 0.3s;
  box-shadow: 0 0 5px #0003;
  white-space: nowrap;

  .bar {
    vertical-align: top;
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 0;
    border-radius: 7px; /* Half of the height */
    background: #fff;
    transition: margin 0.3s;
  }

  &.on-state {
    background: #0166bdd9;
    .bar {
      margin: 0 0 0 18px; /* Adjust as needed */
    }
  }
}
</style>
