import './less/app.less';
import './less/index.less';
import './app.ts';
import router from '@/router';
import Vue from 'vue';
import plugins from '@/plugins';
import filters from '@/filters';
import store from '@/store';

import App from './app.vue';

declare const module: any;
if(module.hot && process.env.NODE_ENV === 'development'){
  module.hot.accept()
}

Vue.use(plugins)
   .use(filters);

new Vue({
  router,
  store,
  render: h=> h(App),
}).$mount('#app');