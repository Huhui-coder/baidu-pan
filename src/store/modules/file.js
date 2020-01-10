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
    // 获取文件信息
    getFile({ state, commit }, fileId) {
      return request.get(`/files/${fileId}`).then(res => {
        commit('updateFile', res.data)
      })
    },
    // 上传文件
    uploadFile({ state, commit }, file) {
      return request
        .post(`/files`, file, {
          timeout: 120000, // 最多2分钟
          'Content-Type': 'multipart/form-data'
        })
        .then(res => {
          commit('updateFile', res.data)
          if (state.showMsg) {
            commit(
              '$message',
              {
                message: '文件上传成功',
                type: 'success'
              },
              { root: true }
            )
          }
          return res
        })
        .catch(err => {
          commit(
            '$message',
            {
              message: '文件上传失败',
              type: 'error'
            },
            { root: true }
          )
          throw err
        })
    },
    // 修改文件
    updateFile({ state, commit }, { id, file }) {
      return request.put(`/files/${id}`, file).then(res => {
        commit('updateFile', res.data)
      })
    },

    // 删除文件
    deleteFile({ state, commit }, fileId) {
      return request.delete(`/files/${fileId}`).then(res => {
        commit('updateFile', res.data)
        if (!res.data) {
          commit(
            '$message',
            {
              message: '文件删除失败',
              type: 'error'
            },
            { root: true }
          )
        }
      })
    }
  }
}

export default module
