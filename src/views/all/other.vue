<template>
  <div class="app-container">
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
       type="selection"
       width="55">
      </el-table-column>
      <el-table-column  label="文件名" width="595">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="大小">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改日期">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleDowload(scope.$index, scope.row)">下载</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      multipleSelection: []
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
      console.log(this.$route.meta.type)
    },
    handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
    },
    handleDowload () {
        console.log('处理下载')
    },
    handleDelete () {
        console.log('处理删除')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

