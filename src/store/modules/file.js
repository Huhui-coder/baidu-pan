import axios from '@/utils/axios'

const module = {
  namespaced: true,
  state: {
    file: {},
    showMsg: true
  },
  getters: {
    file(state) {
      return state.file
    }
  },
  mutations: {
    updateFile(state, data) {
      state.file = data
    },
    setShowMsg(state, v) {
      // 打开or关闭提示
      state.showMsg = v
    }
  },
  actions: {
    // 上传文件
    async uploadFile({ state, commit }, file) {
      try {
        const res = await axios
          .post(`/file/uploadFile`, file, {
            timeout: 120000
          })
        commit('updateFile', res.data)
        if (state.showMsg) {
          commit('$message', {
            message: '文件上传成功',
            type: 'success'
          }, { root: true })
        }
        return res
      } catch (err) {
        commit('$message', {
          message: '文件上传失败',
          type: 'error'
        }, { root: true })
        throw err
      }
    },
    // 查询文件列表
    async featchFileList({ state, commit }, body) {
      try {
        const res = await axios
          .post(`/file/queryAllFileDetail`, body)
        commit('updateFile', res.data)
        if (state.showMsg) {
          commit('$message', {
            message: '文件查询成功',
            type: 'success'
          }, { root: true })
        }
        return res
      } catch (err) {
        commit('$message', {
          message: '文件查询失败',
          type: 'error'
        }, { root: true })
        throw err
      }
    },
    // 修改文件
    async updateFile({ state, commit }, { id, file }) {
      const res = await axios.put(`/files/${id}`, file)
      commit('updateFile', res.data)
    },
    // 下载文件   /file/downLoadFileDetail
    async downFile({ state, commit }, body) {
      try {
        const res = await axios
          .get(`/file/downLoadFileDetail/${body.userId}/${body.fileId}`,)
        commit('updateFile', res.data)
        if (state.showMsg) {
          commit('$message', {
            message: '文件下载成功',
            type: 'success'
          }, { root: true })
        }
        return res
      } catch (err) {
        commit('$message', {
          message: '文件下载失败',
          type: 'error'
        }, { root: true })
        throw err
      }
    },
    // 删除文件
    async deleteFile({ state, commit }, body) {
      const res = await axios.post(`/file/delFileById`, body)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件删除失败',
          type: 'error'
        }, { root: true })
      } else {
        commit('$message', {
          message: '文件删除成功，可在回收站进行查看',
          type: 'success'
        }, { root: true })
      }
    },
    // 查询文件列表文件
    async queryAllFile({ state, commit }, body) {
      const res = await axios.post(`/file/queryAllFileDetail`, body)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件查询失败',
          type: 'error'
        }, { root: true })
      } else {
        commit('$message', {
          message: '文件查询成功',
          type: 'success'
        }, { root: true })
      }
    },
    // 查询文件类型文件
    async queryFileType({ state, commit }, params) {
      const res = await axios.get(`/file/queryAllFileDetail`, params)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件查询失败',
          type: 'error'
        }, { root: true })
      } else {
        commit('$message', {
          message: '文件查询成功',
          type: 'success'
        }, { root: true })
      }
    },
    // 查询当前已知的文件类型
    async fileTypeApi({ state, commit }, params) {
      const res = await axios.get(`/file/getFileType`, params)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件查询失败',
          type: 'error'
        }, { root: true })
      } else {
        commit('$message', {
          message: '文件查询成功',
          type: 'success'
        }, { root: true })
      }
      return res
    }
  }
}

export default module
