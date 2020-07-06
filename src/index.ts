import './less/app.less'
import './less/index.less'
import router from '@/router'
import Vue from 'vue'
import plugins from '@/plugins'
import filters from '@/filters'
import store from '@/store'

import App from './app.vue'

import { Button } from 'vant'

Vue.use(Button)

declare const module: any
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept()
}

Vue.use(plugins).use(filters)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
