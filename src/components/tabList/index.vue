<template>
  <div class="wrap">
    <div class="upload">
      <el-upload action style="display:inline-block" :before-upload="handleUpload">
        <el-button>上传文件</el-button>
      </el-upload>
    </div>
    <div class="search">
      <el-form ref="form" :inline="true" :model="form" class="device-form">
        <el-form-item class="online">
          <el-input
            v-model="form.fileName"
            clearable
            placeholder="请输入关键字"
            style="margin:0"
            @keyup.enter.native="onSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      form: {
        fileName: ''
      },
      userId:localStorage.getItem('userId')
    }
  },
  methods: {
    ...mapActions('file', ['uploadFile']),

    handleUpload(file) {
      const fileName = file.name
      const form = new FormData()
      form.append('file', file)
      form.append('userId',this.userId)
      this.uploadFile(form).then(rs => {
        console.log(rs)
      })
      return false
    },
    onSearch() {
      console.log('search')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  height: 30px;
  padding: 0 10px 10px 10px;
}
</style>
