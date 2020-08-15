import Vue from 'vue'
import App from './App.vue'
import router from './router'

import YmapPlugin from 'vue-yandex-maps'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const settings = {
  apiKey: '9aea7bb6-c605-4070-8e26-bb5de98573d6',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

Vue.use(BootstrapVue)
Vue.use(YmapPlugin, settings)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
