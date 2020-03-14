import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import file from './modules/file'
import transh from './modules/transh'
import { Message } from 'element-ui'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    file,
    transh
  },
  getters,
  mutations: {
    $message(state, data) {
      Message(data)
    }
  }
})

export default store
