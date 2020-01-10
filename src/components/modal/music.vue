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
          <div class="title">音乐</div>
          <aplayer
            autoplay
            :music="{
              title: 'Preparation',
              artist: 'Hans Zimmer/Richard Harvey',
              src: 'https://s320.xiami.net/831/105831/2100343070/1776114674_60254582_h.mp3?ccode=xiami_web_web&expire=86400&duration=225&psid=5d1f83e71ab0a5c4df97b808e5a4fa79&ups_client_netip=183.230.102.100&ups_ts=1578637408&ups_userid=0&utid=JhICFs6zjDACAbfkUSVL65gD&vid=1776114674&fn=1776114674_60254582_h.mp3&vkey=Bdfc7b1fbba31ee9fb677471bf1b69253',
              pic: 'http://devtest.qiniudn.com/Preparation.jpg',
              lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
            }"
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
      options: []
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
