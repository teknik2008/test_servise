// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueSocketio from 'vue-socket.io'
import io from 'socket.io-client'
import('vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)
let config = store.state.config
const socketInstance = io(config.host, {
  transports: ['polling', 'websocket']
})
Vue.use(VueSocketio, socketInstance, store)
Vue.config.productionTip = false

console.log(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App }
})
