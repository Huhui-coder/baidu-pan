<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="isModel"
      class="mention-dialog"
      width="1350px"
      @close="closeDialog()"
    >
      <div class="wrap">
        <div class="container">
          <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: () => false
    },
    url: {
      type: String,
      require: true,
      default: () => ''
    }
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              'https://vdn2.vzuu.com/SD/779d9f70-e041-11e9-a55f-ae30382254c8.mp4?disable_local_cache=1&bu=http-com&expiration=1578639698&auth_key=1578639698-0-0-831d63c877b1bab2b792eb7d526c96d9&f=mp4&v=bsy', // 路径
            type: 'video/mp4' // 类型
          }
        ],
        poster: '../../static/images/test.jpg', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  computed: {
    isModel: {
      get() {
        return this.visible
      },
      set(newName) {
        return newName
      }
    }
  },
  watch: {
    visible(value) {}
  },
  mounted() {},
  methods: {
    onClick(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        return false
      }
    },
    comeback() {
      this.$router.go(-1)
    },
    closeDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
