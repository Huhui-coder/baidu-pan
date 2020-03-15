<template>
  <div>
    <!-- <tab-list /> -->
    <div>
      <div v-viewer class="images">
        <img
          v-for="(src,index) in list"
          :key="index"
          :src="fileLink+src.filePath"
          :onerror="errorImg"
        >

      </div>
    </div>
  </div>
</template>

<script>
import tabList from '@/components/tabList/index'
import { mapActions, mapState } from 'vuex'
import config from '../../utils/config'

export default {
  components: { tabList },
  data() {
    return {
      list: [],
      listLoading: true,
      userId: localStorage.getItem('userId'),
      fileLink: config.fileUrl,
      errorImg: require('@/assets/404_images/404.png')
    }
  },
  computed: {
    fileType() {
      return this.$route.meta.fileType
    }
  },
  created() {
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions('file', ['featchFileList', 'downFile', 'deleteFile', 'fileTypeApi']),

    async fetchData() {
      this.listLoading = true

      const body = {
        userId: this.userId,
        parentId: 0,
        fileTypeId: this.fileType
      }
      const res = await this.featchFileList(body)
      this.list = res.data.data
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.images{
  padding: 10px;
  margin:10px;
  img{
  width:300px;
  height: auto;
  }
}
</style>
