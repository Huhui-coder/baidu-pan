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
    // 查询垃圾桶文件列表
    async featchTranshList({ state, commit }, body) {
      try {
        const res = await axios
          .post(`/fileTrash/QueryFileFromTrash`, body)
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
    // 删除文件
    async deleteTranshFile({ state, commit }, body) {
      const res = await axios.post(`/fileTrash/deleteFileFromTrash`, body)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件删除失败',
          type: 'error'
        }, { root: true })
      }
    },
    // 恢复文件
    async callbackTranshFile({ state, commit }, body) {
      const res = await axios.post(`/fileTrash/restoreFileByFileId`, body)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件删除失败',
          type: 'error'
        }, { root: true })
      }
    }
  }
}

export default module
