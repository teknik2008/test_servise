import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

console.log(actions)

export default new Vuex.Store({
  actions, state, getters, mutations
})
