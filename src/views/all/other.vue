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
          <template slot-scope="scope">{{ scope.$index }}</template>
        </el-table-column>
        <el-table-column label="大小">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="修改日期">
          <template slot-scope="scope">{{ scope.row.pageviews }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="type == 'music' || type == 'video'"
              size="mini"
              @click="action(scope.$index, scope.row)"
            >播放</el-button>
            <el-button size="mini" @click="handleDowload(scope.$index, scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <video-model v-if="showVideoModel" :visible.sync="showVideoModel" :url="video_url" />
    <music-model v-if="showMusicModel" :visible.sync="showMusicModel" :url="music_url" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import tabList from '@/components/tabList/index'
import videoModel from '@/components/modal/video'
import musicModel from '@/components/modal/music'

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
      list: null,
      listLoading: true,
      multipleSelection: [],
      name: '',
      video_url: '',
      music_url: '',
      showVideoModel: false,
      showMusicModel: false
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
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
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
    handleDowload() {
      console.log('处理下载')
    },
    handleDelete() {
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

