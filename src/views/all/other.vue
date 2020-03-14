<template>
  <div>
    <tab-list />
    <div class="app-container">
      <div class="total">
        <div>全部{{ name }}</div>
        <div>已加载{{ type }}</div>
      </div>
      <el-table
        ref="multipleTable"
        :key="key"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="文件名" width="495">
          <template slot-scope="scope">{{ scope.row.fileName }}</template>
        </el-table-column>
        <el-table-column label="大小">
          <template slot-scope="scope">
            <span>{{ scope.row.fileSize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改日期">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="type == 'music' || type == 'video'"
              size="mini"
              @click="action(scope.$index, scope.row)"
            >播放</el-button>
            <el-button size="mini" @click="handleDowload(scope.row.id)">下载</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <video-model v-if="showVideoModel" :visible.sync="showVideoModel" :url="video_url" />
    <music-model v-if="showMusicModel" :visible.sync="showMusicModel" :url="music_url" />
  </div>
</template>

<script>
import tabList from '@/components/tabList/index'
import videoModel from '@/components/modal/video'
import musicModel from '@/components/modal/music'
import { mapActions, mapState } from 'vuex'
import { downLoadFile} from '@/utils/index'


export default {
  components: { tabList, videoModel, musicModel },

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      multipleSelection: [],
      name: '',
      video_url: '',
      music_url: '',
      showVideoModel: false,
      showMusicModel: false,
      userId:localStorage.getItem('userId')
    }
  },
  computed: {
    type() {
      return this.$route.meta.type
    },
    key() {
      return +new Date()
    }
  },
  created() {
    this.fetchData()
    this.fetch()
  },
  methods: {
    ...mapActions('file', ['featchFileList','downFile','deleteFile']),

    async fetchData() {
      this.listLoading = true
      let body = {
        userId:this.userId,
        parentId:0
      }
      let res = await this.featchFileList(body)
      console.log(res.data.data)
      this.list = res.data.data
      this.listLoading = false
    },
    fetch() {
      const mapper = {
        all: '文件',
        image: '图片',
        document: '文档',
        video: '视频',
        music: '音乐',
        other: '其他'
      }
      this.name = mapper[this.$route.meta.type]
      console.log(this.$route.meta.type)
    },
    action() {
      if (this.$route.meta.type === 'music') {
        this.showMusicModel = true
      } else {
        this.showVideoModel = true
      }
      console.log('action')
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
   async  handleDowload(id) {
      // let body = {
      //   userId:this.userId,
      //   fileId:id
      // }
      // // /file/downLoadFileDetail/{userId}/{fileId}
      // let res = await this.downFile(body)
      // downLoadFile('ssss',res)
      window.location.href = `http://192.168.0.105:8080/upload-demo/file/downLoadFileDetail/${this.userId}/${id}`
    },
    async handleDelete(id) {
      let body = {
        userId:this.userId,
        fileId:id
      }
      let res = await this.deleteFile(body)
      console.log('处理删除')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .total {
    display: flex;
    justify-content: space-between;
    color: rgb(102, 102, 102);
    font: 12px / 1.5 "Microsoft YaHei", arial, SimSun, 宋体;
    line-height: 16px;
  }
}
</style>

