import request from '@/utils/request'

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
        const res = await request
          .post(`/file/saveOrUpdateFile`, file, {
            timeout: 120000,
            'Content-Type': 'multipart/form-data'
          })
        commit('updateFile', res.data)
        if (state.showMsg) {
          commit('$message', {
            message: '文件上传成功',
            type: 'success'
          }, { root: true })
        }
        return res
      }
      catch (err) {
        commit('$message', {
          message: '文件上传失败',
          type: 'error'
        }, { root: true })
        throw err
      }
    },
    // 修改文件
    async updateFile({ state, commit }, { id, file }) {
      const res = await request.put(`/files/${id}`, file)
      commit('updateFile', res.data)
    },

    // 删除文件
    async deleteFile({ state, commit }, body) { 
      const res = await request.post(`/file/delFileById`, body)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件删除失败',
          type: 'error'
        }, { root: true })
      }
    },
    // 查询文件列表文件
    async queryAllFile({ state, commit }, body) { 
      const res = await request.post(`/file/queryAllFileDetail`, body)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件查询失败',
          type: 'error'
        }, { root: true })
      }
    },
    // 查询文件类型文件
    async queryFileType({ state, commit }, params) { 
      const res = await request.get(`/file/queryAllFileDetail`, params)
      commit('updateFile', res.data)
      if (!res.data) {
        commit('$message', {
          message: '文件查询失败',
          type: 'error'
        }, { root: true })
      }
    }
  }
}

export default module
