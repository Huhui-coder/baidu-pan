import { getToken, setToken, removeToken } from '@/utils/auth'
import axios from '@/utils/axios'

// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  login({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/user/loginUser', data).then(res => {
        if (res.status === 200) {
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
          resolve(Object.assign({ status: true }, res))
          localStorage.setItem('userId', res.data.data.id)
        } else {
          resolve({ status: false })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  register({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/user/registerUser', data).then(res => {
        if (res.status === 200) {
          // commit('SET_TOKEN', data.token)
          // setToken(data.token)
        } else {
          resolve({ status: false })
        }
        return res
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout() {
    localStorage.removeItem('userId')
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 获取统计的数据
  fetchAnaly({ state, commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/user/queryUserOperaInfoByUserId', data).then(res => {
        resolve(res)
        return res
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
