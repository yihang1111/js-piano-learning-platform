<template>
    <div ref="piano" class="piano" >
      <PianoKeyboard />  
    </div>
  </template>
  <script>
  import PianoKeyboard from './PianoComponets/piano_src/piano_components/Footer/PianoKeyboard.vue';
  import { setPiano, resize } from './PianoComponets/piano_src/piano_components/size';

  import { loadSoundfont, tryInitAudioContext } from './PianoComponets/piano_src/piano_components/midi/xiwnn-midi/index';
  import { start, stop } from './PianoComponets/piano_src/piano_components/Footer/keyboard-pc';

  import { isIE } from './PianoComponets/piano_src/piano_comp/tools/version-test';

  // 导入了一个名为 xwMessage 的组件或模块，路径指向了 @/comp/xw-comp/xw-message。通常，@ 符号用于表示项目的根目录。
  // 这个导入语句将 xwMessage 组件或模块引入到当前文件中，以便在后续代码中使用它。
  import xwMessage from './PianoComponets/piano_src/piano_comp/xw-comp/xw-message';
  import { computed } from 'vue';
  // import { setPiano, start, stop, resize, loadSoundfont, tryInitAudioContext } from './piano_lib/runtime'; // 假设你已经导入这些方法

  export default {
    components: {
      PianoKeyboard,
    },
    data() {
      return {
        loading: false,
        loadmsg: '',
        persent: 0,
        isunsupported: isIE(),
      };
    },
    computed: {
      hideNavBar() {
        return computed(() => {
          return this.$store.state.hideNavBar;
        });
      }
    },
    mounted() {
      this.$refs.piano.style.bottom = '0'; // 这样做是因为搜索引擎的快照显示不全
      setPiano(this);
      this.init();
      this.initSize();
    },
    unmounted() {
      stop();
    },
    methods: {
      initSize() {
        const width = window.innerWidth;
        if (width > 0) {
          if (width < 415) {
            this.$store.state.cacheConf.scale = 20;
          } else if (width < 600) {
            this.$store.state.cacheConf.scale = 15;
          } else if (width < 800) {
            this.$store.state.cacheConf.scale = 10;
          } else {
            return;
          }
          this.$nextTick(resize);
        }
      },
      init() {
        this.loadJS()
          .then(() => {})
          .catch((e) => {
            // console.error(e);
            xwMessage.error(e.message || 'loading soundfonts error');
          });
        start(this.$store.state.cacheConf);
      },

      async loadJS() {
        this.loading = true;
        try {
          await loadSoundfont({
            soundfontUrl: '/js/piano/soundfont',
            instrument: 'acoustic_grand_piano',
            onProgress: (type, loaded) => {
              if (type === 'mp3') {
                this.persent = (loaded / 1434960) * 100; // MP3 的大小
              } else {
                this.persent = (loaded / 1707887) * 100; // ogg 的大小
              }
            },
          });
          this.loadmsg = 'loading...';
          await tryInitAudioContext();
          this.loadmsg = 'load resources success';
        } catch (e) {
          this.loadmsg = 'load resources ERROR';
          // console.log(e);
        }
        this.loading = false;
      },
    },
  };

  </script>
  <style lang="stylus">
  .piano {
      background: white;

      position: absolute;
      overflow: hidden;
      top:77%;
      left: 0;
      right: 0;
      // padding-bottom: 1px;
      // bottom: 0px; // 这样做是因为搜索引擎的快照显示不全
      // background #0002;
      margin-top: 1px
      // background-image url("@/assets/images/deepblue.png")
      >.loading {
          position absolute;
          z-index 20;
          top 50%;
          left 50%;
          width 200px;
          background #fff;
          padding 0 0 10px 0;
          box-shadow 0 0 5px #0003;
          border-radius 5px;
          overflow hidden
          transform translate(-50%, -50%);
          >.loading-status {
              position relative
              height 7em;
              font-size: 13px;
              .loading-icon {
                  padding 3em 0 0 ;
              }
          }
          >.text {
              padding 20px 0;
              font-size 15px;
              text-align center;
          }
          >.loading-bar {
              display block;
              height 2px;
              max-width 100%;
              background #0166bdd9;
          }
      }
  
  }
  </style>
  