<template>
  <div ref="nbCont" class="note-bar" :style="{ height: `${height}px` }">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import { setNoteBar } from '../size';
import { drow } from './note-bar-drow';

export default {
  data() {
    return {
      height: 459.982,
      width: 200,
      scale: 1,
      left: 0,
    };
  },

  mounted() {
    setNoteBar(this);
    this.enable = true;
    this.tick();
  },

  unmounted() {
    this.enable = false;
  },

  methods: {
    tick() {
      if (this.enable) {
        drow(this.$refs.canvas, this.scale, this.left);
        requestAnimationFrame(this.tick);
      }
    },
    setSize(w, h, s, l) {
      // console.log(w, h, s);
      h = 459;
      this.height = 459;
      this.width = w;
      this.scale = s;
      this.left = l;
      this.$refs.canvas.width = w;
      this.$refs.canvas.height = 459;
    },
  },
};
</script>

<style lang="stylus">
.note-bar {
    position absolute;
    z-index 10;
    top 0;
    width 100%;
    height 459.982px;
    touch-action: none;
    cursor: default;
    // background-color #2341;
    user-select none;
    pointer-events none;
    > canvas {
        width 100%;
        height 100%;
    }
}
</style>
